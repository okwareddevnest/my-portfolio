import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "../components/Metadata";
import { Reveal } from "../components/home/Reveal";
import { Showcase, type ShowcaseItem } from "../components/home/Showcase";
import { usePortfolioStore } from "../store/store";
import { disciplines, featured, figures } from "../data/featured";
import { resume } from "../data/resume";
import { CONTACT_LABEL, contactHref, site } from "../lib/site";

export default function Home() {
  const projects = usePortfolioStore((state) => state.projects);

  const items = useMemo<ShowcaseItem[]>(
    () =>
      featured.flatMap((entry) => {
        const project = projects.find((candidate) => candidate.name === entry.name);
        if (!project) {
          console.error(`[home] featured project "${entry.name}" is missing from the store`);
          return [];
        }
        return [{ ...entry, project }];
      }),
    [projects],
  );

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Metadata
        title="Software Engineer and Studio"
        description="Dedan Okware is a senior software engineer in Nairobi building payments, blockchain and developer tools, and client systems through his studio, okwaretech."
        keywords="Dedan Okware, okwaretech, senior software engineer, Nairobi, Kenya, Next.js, Flutter, Rust, Tauri, Internet Computer, blockchain developer"
      />
      <Navbar />
      <main className="flex-grow">
        <Showcase items={items} />
        <Figures />
        <Disciplines />
        <Experience />
        <Studio />
      </main>
      <Footer />
    </div>
  );
}

function Figures() {
  return (
    <section aria-labelledby="figures-title" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2
          id="figures-title"
          className="max-w-[22ch] text-3xl font-semibold tracking-[-0.03em] text-text md:text-5xl"
        >
          Measured in the people who use it.
        </h2>
      </Reveal>
      <dl className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        {figures.map((figure, index) => (
          <Reveal key={figure.value} delay={index * 0.08} className="border-t border-text pt-6">
            <dt className="sr-only">{figure.label}</dt>
            <dd>
              <span
                className={`block font-semibold tracking-[-0.045em] text-text ${
                  index === 0 ? "text-6xl md:text-8xl" : "text-5xl md:text-6xl"
                }`}
              >
                {figure.value}
              </span>
              <span className="mt-3 block max-w-[28ch] text-base text-muted">{figure.label}</span>
            </dd>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}

function Disciplines() {
  const [frontend, lead, backend, mobile, chain] = disciplines;
  return (
    <section aria-labelledby="roles-title" className="mx-auto max-w-[1400px] px-4 pb-24 md:px-8 md:pb-32">
      <Reveal>
        <h2
          id="roles-title"
          className="max-w-[22ch] text-3xl font-semibold tracking-[-0.03em] text-text md:text-5xl"
        >
          Five disciplines, all shipped to production.
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-3 md:grid-cols-6 md:grid-rows-[auto_auto_auto]">
        <Reveal className="relative min-h-[360px] overflow-hidden rounded-md bg-card md:col-span-2 md:row-span-2">
          <Image
            src="/profile.png"
            alt={`Portrait of ${site.owner}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-top grayscale"
          />
        </Reveal>
        <Cell className="bg-primary text-on-accent md:col-span-4" discipline={frontend} tone="accent" />
        <Cell className="border border-border bg-card md:col-span-2" discipline={lead} />
        <Cell className="bg-text text-background md:col-span-2" discipline={backend} tone="ink" />
        <Cell className="border border-border bg-card md:col-span-2" discipline={mobile} />
        <Reveal className="relative overflow-hidden rounded-md border border-border bg-card md:col-span-4">
          <div className="grid h-full md:grid-cols-[1fr_1fr]">
            <div className="p-7 md:p-10">
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-text">{chain.title}</h3>
              <p className="mt-3 max-w-[44ch] text-base leading-relaxed text-muted">{chain.body}</p>
            </div>
            <div className="relative min-h-[220px]">
              <Image
                src="/achievements/regional-round-2nd-place.png"
                alt="WCHL 2025 Regional Round certificate awarding 2nd place to OHMS by Dedan Okware"
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover object-[50%_38%]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cell({
  discipline,
  className,
  tone,
}: {
  discipline: (typeof disciplines)[number];
  className: string;
  tone?: "accent" | "ink";
}) {
  const bodyTone = tone ? "opacity-80" : "text-muted";
  return (
    <Reveal className={`flex min-h-[176px] flex-col justify-end rounded-md p-7 md:p-8 ${className}`}>
      <h3 className={`text-2xl font-semibold tracking-[-0.02em] ${tone ? "" : "text-text"}`}>
        {discipline.title}
      </h3>
      <p className={`mt-3 max-w-[48ch] text-base leading-relaxed ${bodyTone}`}>{discipline.body}</p>
    </Reveal>
  );
}

function Experience() {
  return (
    <section aria-labelledby="experience-title" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 md:py-32">
        <Reveal>
          <h2
            id="experience-title"
            className="text-3xl font-semibold tracking-[-0.03em] text-text md:text-5xl"
          >
            Where I&apos;ve worked.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {resume.experience.map((role, index) => (
            <Reveal as="li" key={`${role.company}-${role.title}`} delay={(index % 2) * 0.06}>
                <p className="tabular text-sm text-muted">{role.period}</p>
                <p className="mt-2 text-xl font-semibold tracking-[-0.015em] text-text">{role.title}</p>
                <p className="mt-1 text-base text-muted">{role.company}</p>
            </Reveal>
          ))}
        </ul>
        <Link
          href="/experience"
          className="mt-12 inline-flex items-center gap-2 text-base font-semibold text-primary underline-offset-4 hover:underline"
        >
          Full experience
          <IconArrowRight size={18} stroke={2} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section aria-labelledby="studio-title" className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-24 md:px-8 md:py-32 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <Reveal>
          <p className="text-sm text-muted">okwaretech</p>
          <h2
            id="studio-title"
            className="mt-4 max-w-[18ch] text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-text md:text-6xl"
          >
            Need something built that has to keep working?
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[42ch] text-lg leading-relaxed text-muted">
            okwaretech takes on business systems, web and mobile products, and integrations.
            Send what you need and when you need it, and I&apos;ll reply with how I would build it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-accent transition-[background-color,transform] duration-150 hover:bg-primary-dark active:scale-[0.98]"
            >
              {CONTACT_LABEL}
              <IconArrowUpRight size={18} stroke={2} aria-hidden="true" />
            </a>
            <a href={`mailto:${site.email}`} className="text-base text-text underline underline-offset-4">
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
