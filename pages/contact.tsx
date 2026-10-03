import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "../components/Metadata";
import {
  IconArrowUpRight,
  IconBrandWhatsapp,
  IconCheck,
  IconCopy,
  IconMail,
} from "@tabler/icons-react";
import { emailHref, site, whatsappHref } from "../lib/site";

const COPIED_RESET_MS = 2000;

// "+254704860552" reads as "+254 704 860 552".
const formatPhone = (phone: string): string =>
  phone.replace(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");

type CopyState = "idle" | "copied" | "failed";

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch (err) {
      console.error(`Copying ${label} failed`, err);
      setState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), COPIED_RESET_MS);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-text transition-colors duration-150 hover:border-text"
    >
      {state === "copied" ? (
        <IconCheck size={16} stroke={2} aria-hidden="true" />
      ) : (
        <IconCopy size={16} stroke={2} aria-hidden="true" />
      )}
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Select it to copy" : `Copy ${label}`}
      </span>
    </button>
  );
};

interface Channel {
  title: string;
  value: string;
  note: string;
  href: string;
  action: string;
  copyLabel: string;
  copyValue: string;
  external: boolean;
  Icon: ComponentType<{ size?: number; stroke?: number; "aria-hidden"?: boolean }>;
}

const channels: Channel[] = [
  {
    title: "WhatsApp",
    value: formatPhone(site.whatsapp),
    note: "The quickest way to reach me. Send a message or a voice note about what you need.",
    href: whatsappHref,
    action: "Chat on WhatsApp",
    copyLabel: "number",
    copyValue: site.whatsapp,
    external: true,
    Icon: IconBrandWhatsapp,
  },
  {
    title: "Email",
    value: site.email,
    note: "Best for detailed briefs, documents and anything you want on record.",
    href: emailHref,
    action: "Send an email",
    copyLabel: "email",
    copyValue: site.email,
    external: false,
    Icon: IconMail,
  },
];

const ContactPage = () => (
  <div className="flex min-h-[100dvh] flex-col bg-background">
    <Metadata
      title="Contact"
      description={`Contact ${site.owner} at ${site.studio} on WhatsApp (${formatPhone(site.whatsapp)}) or by email at ${site.email} about business systems, web and mobile products, and integrations.`}
      keywords="contact, hire software engineer, okwaretech, Dedan Okware, WhatsApp, email, Nairobi, Kenya"
    />
    <Navbar />

    <main className="mx-auto w-full max-w-[1400px] flex-grow px-4 pb-24 pt-16 md:px-8 md:pt-24">
      <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-text md:text-6xl">
        Contact
      </h1>
      <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
        Tell me what you need built and when you need it. I&apos;ll reply with how I would
        build it. Based in {site.location}.
      </p>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {channels.map(({ title, value, note, href, action, copyLabel, copyValue, external, Icon }) => (
          <li
            key={title}
            className="flex min-w-0 flex-col gap-5 rounded-md border border-border bg-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-text/[0.06] text-text">
                <Icon size={22} stroke={1.75} aria-hidden={true} />
              </span>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-text">{title}</h2>
            </div>
            <p className="select-all break-words text-2xl font-semibold tracking-[-0.02em] text-text md:text-3xl">
              {value}
            </p>
            <p className="max-w-[44ch] leading-relaxed text-muted">{note}</p>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-accent transition-[background-color,transform] duration-150 hover:bg-primary-dark active:scale-[0.98]"
              >
                {action}
                <IconArrowUpRight size={18} stroke={2} aria-hidden="true" />
              </a>
              <CopyButton value={copyValue} label={copyLabel} />
            </div>
          </li>
        ))}
      </ul>
    </main>

    <Footer />
  </div>
);

export default ContactPage;
