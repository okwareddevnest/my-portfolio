import { useEffect, useRef, type MutableRefObject } from "react";
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
  type Texture,
} from "three";

export interface RackSlide {
  image: string;
  label: string;
}

/** Written by the page as the visitor scrolls; read every frame. */
export interface RackTarget {
  index: number; // fractional project index, 0..slides-1
  tilt: number; // 0 = three-quarter hero view, 1 = square to the camera
}

interface RackCanvasProps {
  slides: RackSlide[];
  target: MutableRefObject<RackTarget>;
  reducedMotion: boolean;
  onUnavailable: () => void;
  className?: string;
}

const SLAB_W = 3.2;
const SLAB_H = 2.0;
const SLAB_D = 0.07;
const WHEEL_RADIUS = 4.4;
const STEP_ANGLE = 0.62; // radians between neighbouring slabs on the wheel
const FADE_START = 0.3; // neighbours dim as they leave the front of the wheel
const FADE_SPAN = 1.4;
const DAMPING = 5.5; // higher settles faster

function readToken(name: string): Color {
  const channels = getComputedStyle(document.documentElement)
    .getPropertyValue(`--c-${name}`)
    .trim()
    .split(/\s+/)
    .map(Number);
  return new Color(channels[0] / 255, channels[1] / 255, channels[2] / 255);
}

// Crop the screenshot to the slab like CSS object-fit: cover, keeping the top
// of the page (where the product's hero lives) in view.
function coverTopAligned(texture: Texture) {
  const image = texture.image as { width: number; height: number };
  const imageAspect = image.width / image.height;
  const slabAspect = SLAB_W / SLAB_H;
  if (imageAspect > slabAspect) {
    texture.repeat.set(slabAspect / imageAspect, 1);
    texture.offset.set((1 - texture.repeat.x) / 2, 0);
  } else {
    texture.repeat.set(1, imageAspect / slabAspect);
    texture.offset.set(0, 1 - texture.repeat.y);
  }
}

export default function RackCanvas({
  slides,
  target,
  reducedMotion,
  onUnavailable,
  className = "",
}: RackCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const unavailableRef = useRef(onUnavailable);
  unavailableRef.current = onUnavailable;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch (error) {
      console.warn("[RackCanvas] WebGL unavailable, falling back to static images", error);
      unavailableRef.current();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(32, 1, 0.1, 100);
    scene.add(new AmbientLight(0xffffff, 1.4));
    const key = new DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 4, 6);
    scene.add(key);

    let disposed = false;
    const wheel = new Group();
    scene.add(wheel);

    const geometry = new BoxGeometry(SLAB_W, SLAB_H, SLAB_D);
    const loader = new TextureLoader();
    const textures: Texture[] = [];
    const edgeMaterials: MeshStandardMaterial[] = [];
    const faceMaterials: MeshBasicMaterial[] = [];

    const slabs = slides.map((slide) => {
      const edge = new MeshStandardMaterial({ roughness: 0.55, metalness: 0.15, transparent: true });
      const face = new MeshBasicMaterial({ transparent: true });
      edgeMaterials.push(edge);
      faceMaterials.push(face);

      loader.load(
        slide.image,
        (texture) => {
          if (disposed) {
            texture.dispose();
            return;
          }
          texture.colorSpace = SRGBColorSpace;
          texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
          coverTopAligned(texture);
          face.map = texture;
          face.color.set(0xffffff);
          face.needsUpdate = true;
          textures.push(texture);
          needsFrame = true;
        },
        undefined,
        (error) => console.warn(`[RackCanvas] could not load ${slide.image}`, error),
      );

      // BoxGeometry material order is +x, -x, +y, -y, +z, -z; the screenshot faces +z.
      const materials = [edge, edge, edge, edge, face, edge];
      const mesh = new Mesh(geometry, materials);
      mesh.name = slide.label;
      wheel.add(mesh);
      return mesh;
    });

    const applyTheme = () => {
      const ink = readToken("ink");
      const line = readToken("line");
      edgeMaterials.forEach((material) => material.color.copy(ink));
      // Until a screenshot arrives the face shows the border tone, which reads
      // as an empty plate rather than a black hole.
      faceMaterials.forEach((material) => {
        if (!material.map) material.color.copy(line);
      });
      needsFrame = true;
    };

    const current = { index: target.current.index, tilt: target.current.tilt };
    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    let needsFrame = true;
    let visible = true;
    let frame = 0;
    let last = performance.now();

    applyTheme();

    const layout = () => {
      const index = current.index;
      slabs.forEach((mesh, i) => {
        const offset = i - index;
        const angle = offset * STEP_ANGLE;
        mesh.position.set(0, -Math.sin(angle) * WHEEL_RADIUS, Math.cos(angle) * WHEEL_RADIUS - WHEEL_RADIUS);
        mesh.rotation.x = angle;
        const opacity = MathUtils.clamp(1 - (Math.abs(offset) - FADE_START) / FADE_SPAN, 0, 1);
        edgeMaterials[i].opacity = opacity;
        faceMaterials[i].opacity = opacity;
        mesh.visible = opacity > 0.01;
      });
      wheel.rotation.y = MathUtils.lerp(-0.5, -0.14, current.tilt) + pointer.sx * 0.14;
      wheel.rotation.x = MathUtils.lerp(0.12, 0.02, current.tilt) - pointer.sy * 0.08;
      wheel.rotation.z = MathUtils.lerp(0.06, 0, current.tilt);
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = `${width}px`;
      renderer.domElement.style.height = `${height}px`;
      camera.aspect = width / height;
      // Fit the slab to ~60% of the canvas width, never closer than the arc needs.
      const halfFov = MathUtils.degToRad(camera.fov / 2);
      const distanceForWidth = SLAB_W / 0.6 / (2 * Math.tan(halfFov) * camera.aspect);
      camera.position.set(0, 0, Math.max(9, distanceForWidth));
      camera.lookAt(0, 0, -0.6);
      camera.updateProjectionMatrix();
      needsFrame = true;
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const goal = target.current;

      if (reducedMotion) {
        if (goal.index !== current.index || goal.tilt !== current.tilt) {
          current.index = goal.index;
          current.tilt = goal.tilt;
          needsFrame = true;
        }
      } else {
        const blend = 1 - Math.exp(-dt * DAMPING);
        const before = current.index + current.tilt + pointer.sx + pointer.sy;
        current.index += (goal.index - current.index) * blend;
        current.tilt += (goal.tilt - current.tilt) * blend;
        pointer.sx += (pointer.x - pointer.sx) * blend;
        pointer.sy += (pointer.y - pointer.sy) * blend;
        const after = current.index + current.tilt + pointer.sx + pointer.sy;
        if (Math.abs(after - before) > 1e-5) needsFrame = true;
      }

      if (!needsFrame || !visible) return;
      needsFrame = false;
      layout();
      renderer.render(scene, camera);
    };

    const onPointer = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointer, { passive: true });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    // Stop drawing while the canvas is off screen or the tab is hidden.
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) needsFrame = true;
    });
    intersection.observe(host);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        last = performance.now();
        needsFrame = true;
        frame = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("[RackCanvas] WebGL context lost, falling back to static images");
      unavailableRef.current();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    resize();
    frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      resizeObserver.disconnect();
      intersection.disconnect();
      themeObserver.disconnect();
      geometry.dispose();
      edgeMaterials.forEach((material) => material.dispose());
      faceMaterials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [slides, target, reducedMotion]);

  return <div ref={hostRef} className={`h-full w-full ${className}`} />;
}
