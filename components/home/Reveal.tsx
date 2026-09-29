import { useAnimate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

const EASE = [0.16, 1, 0.3, 1] as const;

// Fades a block up as it enters the viewport. The hidden from-state is applied
// in the browser, and only to blocks still below the fold, so the server HTML
// (and any visitor whose JavaScript never runs) shows everything.
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, amount: 0.25 });
  const armed = useRef(false);

  useEffect(() => {
    const element = scope.current;
    if (reduce || !element || element.getBoundingClientRect().top < window.innerHeight) return;
    element.style.opacity = "0";
    element.style.transform = "translateY(24px)";
    armed.current = true;
  }, [reduce, scope]);

  useEffect(() => {
    if (!inView || !armed.current || !scope.current) return;
    armed.current = false;
    const controls = animate(
      scope.current,
      { opacity: [0, 1], transform: ["translateY(24px)", "translateY(0px)"] },
      { duration: 0.7, delay, ease: EASE },
    );
    return () => controls.stop();
  }, [inView, animate, delay, scope]);

  const Tag = as;
  return (
    // The scope is typed HTMLElement to serve both tags; React's ref typing is
    // per-tag (div vs li), so the cast bridges an equivalence TS can't express.
    <Tag ref={scope as never} className={className}>
      {children}
    </Tag>
  );
}
