import Image from "next/image";
import { useMemo } from "react";
import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Metadata } from "../components/Metadata";
import { Reveal } from "../components/home/Reveal";
import { usePortfolioStore, type Project, type ProjectCategory } from "../store/store";
import { site } from "../lib/site";

// Projects with a real screenshot get a plate; the rest are listed by
// category rather than dressed up with stock photography.
const hasScreenshot = (project: Project) => project.previewImage.startsWith("/");

const INDEX_ORDER: ProjectCategory[] = ["Web and AI", "Blockchain", "Linux tools", "Automation"];

const shortName = (name: string) => name.split(" - ")[0];

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-5 text-sm font-semibold">
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
  );
}

function Plate({ project, lead }: { project: Project; lead: boolean }) {
  return (
    <Reveal
      as="li"
      className={`group list-none ${lead ? "md:col-span-2 md:grid md:grid-cols-[1.35fr_1fr] md:items-center md:gap-12" : ""}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-border bg-card">
        <Image
          src={project.previewImage}
          alt={`${shortName(project.name)} screenshot`}
          fill
          sizes={lead ? "(min-width: 768px) 60vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className={lead ? "mt-6 md:mt-0" : "mt-6"}>
        <p className="text-sm text-muted">{project.category}</p>
        <h2
          className={`mt-2 font-semibold tracking-[-0.025em] text-text ${lead ? "text-3xl md:text-4xl" : "text-2xl"}`}
        >
          {shortName(project.name)}
        </h2>
        <p className="mt-3 line-clamp-3 max-w-[56ch] text-base leading-relaxed text-muted">
          {project.description}
        </p>
        {project.credit && (
          <p className="mt-4 flex items-center gap-3 text-base text-text">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            {project.credit}
          </p>
        )}
        <p className="mt-4 text-sm text-muted">{project.technologies.slice(0, 6).join(", ")}</p>
        <div className="mt-5">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Reveal>
  );
}

const Projects = () => {
  const projects = usePortfolioStore((state) => state.projects);

  const { plates, index } = useMemo(() => {
    const withShots = projects.filter(hasScreenshot);
    const rest = projects.filter((project) => !hasScreenshot(project));
    const groups = INDEX_ORDER.map((category) => ({
      category,
      items: rest.filter((project) => project.category === category),
    })).filter((group) => group.items.length > 0);
    return { plates: withShots, index: groups };
  }, [projects]);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Metadata
        title="Work"
        description="Client systems, products, open-source tools and blockchain platforms built by Dedan Okware through okwaretech, including Rasko Sweet Scent, OHMS 2.0, U-Download and Gitok."
        keywords="okwaretech projects, Dedan Okware portfolio, Rasko Sweet Scent, OHMS, U-Download, Gitok, RSON, IThreeM, Tauri, Rust, Internet Computer"
      />
      <Navbar />
      <main className="flex-grow">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <header className="max-w-3xl pb-14 pt-16 md:pb-20 md:pt-24">
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-text md:text-6xl">
              Work
            </h1>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
              {projects.length} things I have built and run: client systems, products, open-source
              tools and on-chain platforms.
            </p>
          </header>

          {plates.length === 0 ? (
            <p className="border-t border-border py-16 text-base text-muted">
              No projects are listed yet.
            </p>
          ) : (
            <ul className="grid gap-x-10 gap-y-20 border-t border-border pt-14 md:grid-cols-2 md:pt-20">
              {plates.map((project, position) => (
                <Plate key={project.name} project={project} lead={position === 0} />
              ))}
            </ul>
          )}

          {index.length > 0 && (
            <section aria-labelledby="index-title" className="mt-28 border-t border-border py-16 md:mt-36 md:py-24">
              <h2
                id="index-title"
                className="text-3xl font-semibold tracking-[-0.03em] text-text md:text-4xl"
              >
                More projects
              </h2>
              <div className="mt-12 grid gap-x-12 gap-y-14 md:grid-cols-2">
                {index.map((group) => (
                  <Reveal key={group.category}>
                    <h3 className="text-sm text-muted">{group.category}</h3>
                    <ul className="mt-4 divide-y divide-border border-y border-border">
                      {group.items.map((project) => (
                        <li key={project.name} className="py-5">
                          <p className="text-lg font-semibold tracking-[-0.015em] text-text">
                            {project.name}
                          </p>
                          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                            {project.description}
                          </p>
                          <div className="mt-3">
                            <ProjectLinks project={project} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <p className="border-t border-border py-12 text-base text-muted">
            Everything else lives on{" "}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-text underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
