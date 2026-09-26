import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { motion } from "framer-motion";
import { Metadata } from "../components/Metadata";
import { RESUME_FILE_NAME, resume } from "../data/resume";
import type { ResumeCredential } from "../data/resume";
import {
  IconDownload,
  IconFileTypePdf,
  IconSparkles,
  IconRocket,
} from "@tabler/icons-react";

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
  <h2 className="text-sm font-bold uppercase tracking-wider text-blue-900 border-b border-blue-900 pb-1 mb-3 mt-6">
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
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <Metadata
        title="Resume"
        description="Resume of Dedan Okware, Senior Software Engineer across frontend, backend, blockchain and technical leadership. Lead Front End Engineer at Fingo Africa, former Technical Lead at Power Learn Project Africa, Blockchain Software Engineer at Bonded, WCHL 2nd Place (Kenya and Africa)."
        keywords="resume, CV, senior software engineer, full stack engineer, tech lead, frontend engineer, backend engineer, blockchain engineer, TypeScript, React, Next.js, Node.js, Golang, Python, Rust, Flutter, ICP, smart contracts, download resume"
      />
      <AnimatedBackground />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <IconSparkles className="w-8 h-8 text-primary dark:text-primary-dark" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary dark:from-primary-dark dark:via-accent dark:to-primary-dark">
              Professional Resume
            </h1>
            <IconRocket className="w-8 h-8 text-accent" />
          </div>
          <p className="text-lg text-text/80 dark:text-text-dark/80 max-w-2xl mx-auto">
            Senior Software Engineer across frontend, backend, blockchain and
            technical leadership. The PDF is plain, parseable text built for
            applicant tracking systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-3 mb-12"
        >
          <button
            type="button"
            onClick={handleDownload}
            disabled={isGenerating}
            aria-busy={isGenerating}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="relative z-10 flex items-center gap-3">
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <IconDownload className="w-6 h-6" />
                  Download Resume PDF
                  <IconFileTypePdf className="w-6 h-6" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          {error && (
            <p role="alert" className="text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <article className="bg-white text-gray-900 rounded-2xl shadow-2xl border border-border/20 dark:border-border-dark/20 p-6 sm:p-12 leading-relaxed font-sans">
            <header>
              <p className="text-3xl font-bold tracking-wide uppercase">
                {resume.name}
              </p>
              <p className="text-lg font-bold text-blue-900">{resume.headline}</p>
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
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
