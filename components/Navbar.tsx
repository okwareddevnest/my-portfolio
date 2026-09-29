import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Logo } from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { CONTACT_LABEL, contactHref } from "@/lib/site";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/resume", label: "Resume" },
];

const Navbar = () => {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8"
      >
        <Link href="/" aria-label="okwaretech home" className="rounded-md">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-150 ${
                  active ? "bg-text/[0.06] text-text" : "text-muted hover:text-text"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <span className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
          <a
            href={contactHref}
            className="ml-2 rounded-full bg-text px-4 py-2 text-sm font-semibold text-background transition-transform duration-150 hover:bg-primary hover:text-on-accent active:scale-[0.98]"
          >
            {CONTACT_LABEL}
          </a>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-text hover:bg-text/5"
          >
            {open ? <IconX size={20} stroke={1.75} /> : <IconMenu2 size={20} stroke={1.75} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border bg-background md:hidden"
          >
            <div className="mx-auto flex max-w-[1400px] flex-col px-4 py-3">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === href ? "page" : undefined}
                  className="border-b border-border/60 py-3.5 text-lg text-text last:border-0"
                >
                  {label}
                </Link>
              ))}
              <a
                href={contactHref}
                className="mt-3 rounded-full bg-text px-4 py-3 text-center text-base font-semibold text-background"
              >
                {CONTACT_LABEL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
