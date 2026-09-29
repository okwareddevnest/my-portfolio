import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "../components/Metadata";
import { RESUME_FILE_NAME, resume } from "../data/resume";
import type { ResumeCredential } from "../data/resume";
import { IconDownload, IconLoader2 } from "@tabler/icons-react";
import { CONTACT_LABEL, contactHref } from "../lib/site";

// Revoking the object URL in the same tick as click() cancels the download in
// some browsers, so it is released after the navigation has started.
const OBJECT_URL_RELEASE_MS = 1000;

// The PDF is typeset as real text (not a screenshot) so ATS parsers can read
// every word; the renderer is loaded on click to keep it out of the page bundle.
const downloadResumePdf = async (): Promise<void> => {
  const [{ pdf }, { ResumePdf }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("../components/ResumePdf"),
  ]);
  const blob = await pdf(<ResumePdf data={resume} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = RESUME_FILE_NAME;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), OBJECT_URL_RELEASE_MS);
};

const SectionHeading = ({ children }: { children: string }) => (
  <h2 className="text-sm font-bold uppercase tracking-wider text-[#1F3499] border-b border-[#1F3499] pb-1 mb-3 mt-6">
    {children}
  </h2>
);

const CredentialList = ({ items }: { items: ResumeCredential[] }) => (
  <ul className="space-y-1">
    {items.map((item) => (
      <li key={item.name} className="flex flex-wrap justify-between gap-x-4 text-sm">
        <span>
          <strong className="font-bold">{item.name}</strong> - {item.issuer}
        </span>
        <span className="text-gray-600">{item.date}</span>
      </li>
    ))}
  </ul>
);

const Resume = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      await downloadResumePdf();
    } catch {
      setError("The PDF could not be generated. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Metadata
        title="Resume"
        description="Resume of Dedan Okware, Senior Software Engineer across frontend, backend, blockchain and technical leadership. Lead Front End Engineer at Fingo Africa, former Technical Lead at Power Learn Project Africa, Blockchain Software Engineer at Bonded, WCHL 2nd Place (Kenya and Africa)."
        keywords="resume, CV, senior software engineer, full stack engineer, tech lead, frontend engineer, backend engineer, blockchain engineer, TypeScript, React, Next.js, Node.js, Golang, Python, Rust, Flutter, ICP, smart contracts, download resume"
      />
      <Navbar />

      <main className="mx-auto grid w-full max-w-[1400px] flex-grow gap-12 px-4 pb-24 pt-16 md:px-8 md:pt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-text md:text-6xl">
            Resume
          </h1>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-muted">
            Senior Software Engineer across frontend, backend, blockchain and technical
            leadership. The PDF is plain, parseable text, so applicant tracking systems read
            every line.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isGenerating}
              aria-busy={isGenerating}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-on-accent transition-[background-color,transform] duration-150 hover:bg-primary-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isGenerating ? (
                <IconLoader2 size={18} stroke={2} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
              ) : (
                <IconDownload size={18} stroke={2} aria-hidden="true" />
              )}
              {isGenerating ? "Preparing PDF" : "Download PDF"}
            </button>
            <a
              href={contactHref}
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-base text-text transition-colors duration-150 hover:border-text"
            >
              {CONTACT_LABEL}
            </a>
          </div>
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          )}
        </aside>

        <div>
          <article className="rounded-md border border-border bg-white p-6 font-sans leading-relaxed text-gray-900 sm:p-12">
            <header>
              <p className="text-3xl font-bold tracking-wide uppercase">
                {resume.name}
              </p>
              <p className="text-lg font-bold text-[#1F3499]">{resume.headline}</p>
              <p className="text-sm text-gray-600">{resume.specialties}</p>
              <p className="text-sm text-gray-600 mt-2 break-words">
                {resume.contact.join("  |  ")}
              </p>
            </header>

            <section>
              <SectionHeading>Professional Summary</SectionHeading>
              <p className="text-sm">{resume.summary}</p>
            </section>

            <section>
              <SectionHeading>Technical Skills</SectionHeading>
              <ul className="space-y-1 text-sm">
                {resume.skills.map((group) => (
                  <li key={group.label}>
                    <strong className="font-bold">{group.label}:</strong>{" "}
                    {group.items.join(", ")}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionHeading>Professional Experience</SectionHeading>
              <div className="space-y-5">
                {resume.experience.map((role) => (
                  <div key={`${role.company}-${role.title}`}>
                    <div className="flex flex-wrap justify-between gap-x-4">
                      <h3 className="font-bold">{role.title}</h3>
                      <span className="text-sm text-gray-600">{role.period}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {role.company} | {role.location}
                    </p>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading>Projects</SectionHeading>
              <div className="space-y-4">
                {resume.projects.map((project) => (
                  <div key={project.name}>
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.stack}</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-sm">
                      {project.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionHeading>Awards</SectionHeading>
              <CredentialList items={resume.awards} />
            </section>

            <section>
              <SectionHeading>Certifications</SectionHeading>
              <CredentialList items={resume.certifications} />
            </section>

            <section>
              <SectionHeading>Education</SectionHeading>
              <p className="text-sm">{resume.education}</p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
