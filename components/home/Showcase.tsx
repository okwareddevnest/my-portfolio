import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import type { RackSlide, RackTarget } from "./RackCanvas";
import type { Project } from "@/store/store";
import type { FeaturedProject } from "@/data/featured";
import { CONTACT_LABEL, contactHref, site } from "@/lib/site";

// three.js is ~150 kB gzipped; it loads after the page is interactive and never on the server.
const RackCanvas = dynamic(() => import("./RackCanvas"), {
  ssr: false,
  loading: () => <RackPlaceholder />,
});

const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_CYCLE_MS = 3600;

export interface ShowcaseItem extends FeaturedProject {
  project: Project;
}

function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function RackPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
      <div className="aspect-[16/10] w-[62%] animate-pulse rounded-md border border-border bg-card" />
    </div>
  );
}

export function Showcase({ items }: { items: ShowcaseItem[] }) {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reduce = useMediaQuery(REDUCED_QUERY) === true;
  const [webgl, setWebgl] = useState(true);
  const target = useRef<RackTarget>({ index: 0, tilt: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const slides = useMemo<RackSlide[]>(
    () => items.map((item) => ({ image: item.project.previewImage, label: item.project.name })),
    [items],
  );

  // Desktop: scroll position drives the rack.
  useEffect(() => {
    if (!isDesktop || !webgl || reduce || !heroRef.current || !listRef.current) return;
    let revert = () => {};
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !heroRef.current || !listRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const last = items.length - 1;
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 35%",
          onUpdate: (self) => {
            target.current.tilt = self.progress;
          },
        });
        ScrollTrigger.create({
          trigger: listRef.current,
          start: "top center",
          end: "bottom center",
          onUpdate: (self) => {
            const index = self.progress * items.length - 0.5;
            target.current.index = Math.min(Math.max(index, 0), last);
          },
        });
      });
      revert = () => ctx.revert();
    })().catch((error) => console.error("[Showcase] failed to load scroll engine", error));
    return () => {
      cancelled = true;
      revert();
    };
  }, [isDesktop, webgl, reduce, items.length]);

  // Desktop with reduced motion: step the rack to whichever project is centred, no easing.
  useEffect(() => {
    if (!isDesktop || !webgl || !reduce || !listRef.current) return;
    target.current.tilt = 1;
    const blocks = Array.from(listRef.current.children);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) target.current.index = blocks.indexOf(entry.target);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, [isDesktop, webgl, reduce]);

  // Phones: the rack sits in the hero and turns through the work on its own.
  useEffect(() => {
    if (isDesktop !== false || !webgl) return;
    target.current.tilt = 0.55;
    if (reduce) return;
    const timer = window.setInterval(() => {
      target.current.index = (Math.round(target.current.index) + 1) % items.length;
    }, MOBILE_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [isDesktop, webgl, reduce, items.length]);

  const rack = (
    <RackCanvas
      slides={slides}
      target={target}
      reducedMotion={reduce}
      onUnavailable={() => setWebgl(false)}
    />
  );
  const showStickyRack = isDesktop === true && webgl;
  const showBlockImages = isDesktop !== true || !webgl;

  return (
    <div
      className={`mx-auto max-w-[1400px] px-4 md:px-8 ${
        showStickyRack ? "grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12" : ""
      }`}
    >
      <div>
        <div
          ref={heroRef}
          className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center pb-16 pt-12 lg:pt-16"
        >
          <p className="text-sm text-muted">
            {site.owner}, {site.role.toLowerCase()}
          </p>
          <h1 className="mt-5 max-w-[15ch] text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-text md:text-6xl">
            Software that keeps working.
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-muted">
            I ship payments, blockchain and developer tools from Nairobi and Nakuru, and client systems
            through my studio, okwaretech.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-accent transition-[background-color,transform] duration-150 hover:bg-primary-dark active:scale-[0.98]"
            >
              {CONTACT_LABEL}
              <IconArrowUpRight size={18} stroke={2} aria-hidden="true" />
            </a>
            <Link
              href="/resume"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-base text-text transition-colors duration-150 hover:border-text"
            >
              Resume
            </Link>
          </div>

          {isDesktop === false && webgl && (
            <div className="mt-12 aspect-[4/3] w-full">{rack}</div>
          )}
        </div>

        <section id="work" aria-labelledby="work-title" className="pb-8">
          <h2 id="work-title" className="sr-only">
            Selected work
          </h2>
          <ol ref={listRef}>
            {items.map((item) => (
              <WorkBlock key={item.name} item={item} showImage={showBlockImages} />
            ))}
          </ol>
        </section>
      </div>

      {showStickyRack && (
        <div className="relative">
          <div className="sticky top-16 h-[calc(100dvh-4rem)]">{rack}</div>
        </div>
      )}
    </div>
  );
}

function WorkBlock({ item, showImage }: { item: ShowcaseItem; showImage: boolean }) {
  const { project } = item;
  return (
    <li className="flex flex-col justify-center border-t border-border py-14 lg:min-h-[86dvh] lg:py-24">
      {showImage && (
        <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden rounded-md border border-border bg-card">
          <Image
            src={project.previewImage}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}
      <p className="text-sm text-muted">{item.kind}</p>
      <h3 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-text md:text-4xl">
        {project.name.split(" - ")[0]}
      </h3>
      <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">{item.summary}</p>
      <p className="mt-6 flex items-center gap-3 text-base text-text">
        <span className="h-px w-8 bg-primary" aria-hidden="true" />
        {item.proof}
      </p>
      <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-muted">
        {project.technologies.slice(0, 6).join(", ")}
      </p>
      <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold">
        {project.demoLink && (
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary underline-offset-4 hover:underline"
          >
            Visit live site
            <IconArrowUpRight size={16} stroke={2} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-text underline-offset-4 hover:underline"
          >
            <IconBrandGithub size={16} stroke={1.75} aria-hidden="true" />
            Source
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </li>
  );
}
