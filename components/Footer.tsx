import Link from "next/link";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import Logo from "./Logo";
import { site } from "@/lib/site";

const pages = [
  { href: "/projects", label: "All projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/achievements", label: "Achievements" },
  { href: "/certificates", label: "Certificates" },
  { href: "/resume", label: "Resume" },
];

const socials = [
  { href: site.socials.github, label: "GitHub", Icon: IconBrandGithub },
  { href: site.socials.linkedin, label: "LinkedIn", Icon: IconBrandLinkedin },
  { href: site.socials.x, label: "X", Icon: IconBrandX },
];

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_auto] md:px-8">
      <div className="max-w-sm">
        <Logo />
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The software studio of {site.owner}. Products, client systems and open-source tools,
          built and run from Nairobi.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm">
        {pages.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="text-muted transition-colors hover:text-text">
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <ul className="flex gap-2 md:flex-col">
        {socials.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-text"
            >
              <Icon size={18} stroke={1.75} />
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-2 border-t border-border px-4 py-6 text-xs text-muted md:px-8">
      <span>
        {new Date().getFullYear()} {site.studio}. {site.owner}.
      </span>
      <a href={site.url} className="hover:text-text">
        okwaretech.com
      </a>
    </div>
  </footer>
);

export default Footer;
