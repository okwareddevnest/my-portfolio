import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { Modal } from "../components/Modal";
import {
  IconCalendar,
  IconBuildingSkyscraper,
  IconDevices,
} from "@tabler/icons-react";
import Image from "next/image";
import { Metadata } from "../components/Metadata";

interface Role {
  title: string;
  type: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
}

interface Experience {
  company: string;
  logo?: string;
  location: string;
  workMode?: "remote" | "on-site" | "hybrid";
  roles: Role[];
}

// Function to calculate duration between dates
const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration = "";
  if (years > 0) {
    duration += `${years} yr${years > 1 ? "s" : ""}`;
  }

  if (months > 0 || years === 0) {
    if (years > 0) duration += " ";
    duration += `${months} mo${months > 1 ? "s" : ""}`;
  }

  return duration;
};

// Format date for display (e.g., "Apr 2025")
const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Generate the full duration string (e.g., "Apr 2025 - Present · 1 yr 2 mos")
const getDurationString = (startDate: string, endDate?: string): string => {
  const formattedStart = formatDateDisplay(startDate);
  const formattedEnd = endDate ? formatDateDisplay(endDate) : "Present";
  const duration = calculateDuration(startDate, endDate);

  return `${formattedStart} - ${formattedEnd} · ${duration}`;
};

// Get the total duration for a company with multiple roles
const getCompanyTotalDuration = (roles: Role[]): string => {
  const startDates = roles.map((r) => new Date(r.startDate));
  const endDates = roles.map((r) =>
    r.endDate ? new Date(r.endDate) : new Date(),
  );

  const earliestStart = new Date(
    Math.min(...startDates.map((d) => d.getTime())),
  );
  const latestEnd = new Date(Math.max(...endDates.map((d) => d.getTime())));

  const hasOngoing = roles.some((r) => !r.endDate);

  return calculateDuration(
    earliestStart.toISOString(),
    hasOngoing ? undefined : latestEnd.toISOString(),
  );
};

const experiences: Experience[] = [
  {
    company: "Fingo Africa",
    logo: "/companies/fingo_logo.webp",
    location: "Nairobi, Kenya",
    workMode: "hybrid",
    roles: [
      {
        title: "Lead Front End Engineer",
        type: "Full-time",
        startDate: "2026-02-01",
        description:
          "Owning front-end development and user experience across Fingo Global, a stablecoin and cross-border payments platform. Leading front-end architecture and development for stablecoin wallets, on/off ramp interfaces, cross-border transfer flows, and KYC/onboarding screens. Building and shipping production Flutter mobile applications and Next.js web experiences. Defining and enforcing front-end engineering standards, code review practices, and testing frameworks across the team. Collaborating closely with the Stablecoin Product Lead and Engineering Lead to translate product specs into robust, performant UI. Owning the front-end deployment pipeline, CI/CD, and release management for mobile and web. Driving user experience quality—working with design to ensure pixel-perfect, accessible, and fast interfaces.",
        skills: [
          "Flutter",
          "Next.js",
          "Front-End Architecture",
          "Stablecoin Wallets",
          "Cross-Border Payments",
          "KYC/Onboarding",
          "CI/CD",
          "Release Management",
          "Code Review",
          "Testing Frameworks",
          "UI/UX",
          "Team Leadership",
        ],
      },
    ],
  },
  {
    company: "Power Learn Project Africa",
    logo: "/companies/plp.jpeg",
    location: "Nairobi, Kenya",
    workMode: "hybrid",
    roles: [
      {
        title: "Technical Lead Software Engineer",
        type: "Consultancy",
        startDate: "2026-01-01",
        endDate: "2026-05-31",
        description:
          "Technical lead for Power Learn Project Africa's engineering function during the organisation's pivot into a new operating model. Led the setup and revamp of core internal systems, taking senior ownership of architecture decisions, platform consolidation and the migration path off legacy workflows. Set technical direction across backend services, front-end platforms and automation infrastructure, and led the engineering team through delivery against a compressed timeline while the organisational strategy was itself changing.",
        skills: [
          "Technical Leadership",
          "Software Architecture",
          "Systems Migration",
          "Platform Modernisation",
          "Next.js",
          "React.js",
          "Golang",
          "Docker",
          "n8n Automation",
          "Stakeholder Management",
          "Team Leadership",
        ],
      },
      {
        title: "Full Stack Software Engineer & Instructor",
        type: "Consultancy",
        startDate: "2024-10-01",
        endDate: "2026-05-31",
        description:
          "Dual role combining software engineering and developer education. Engineering: Enhanced the LMS tech ecosystem with new features and automated PLP Standard Operating Procedures. Deployed self-hosted n8n automation server, building 15+ webhook integrations that reduced manual operations by 60%. Worked across the full stack using Golang for backend services, Next.js and React.js for frontend, Strapi for CMS, Docker for containerization, and Scaleway servers for cloud infrastructure. Instruction: Trained and graduated 9,000+ students in Full Stack Development using the MERN Stack (MongoDB, Express.js, React.js, Node.js) across 3 cohorts in 2025. Conducted 100+ live sessions, 500+ code reviews, and mentored aspiring developers through the PLP Academy. Contributed to curriculum development and created 15+ hands-on capstone projects.",
        skills: [
          "Golang",
          "Next.js",
          "React.js",
          "Strapi",
          "Docker",
          "n8n Automation",
          "MERN Stack",
          "MongoDB",
          "Teaching",
          "Mentorship",
          "LMS Development",
          "Curriculum Development",
        ],
      },
    ],
  },
  {
    company: "Bonded",
    logo: "/companies/bonded.png",
    location: "London, United Kingdom",
    workMode: "remote",
    roles: [
      {
        title: "Blockchain Software Engineer",
        type: "Contract",
        startDate: "2025-04-01",
        endDate: "2025-07-31",
        description:
          "Built blockchain and AI solutions for a UK startup helping international couples with UK visa applications. Developed AI-powered evidence matching algorithms and built internal mobile systems using Flutter to streamline document verification and partner communication. Implemented ICP blockchain for secure, tamper-proof storage of visa application evidence.",
        skills: [
          "Flutter",
          "Blockchain Development",
          "ICP Protocol",
          "AI/Machine Learning",
          "Evidence Matching",
          "Secure Storage",
          "Smart Contracts",
        ],
      },
    ],
  },
  {
    company: "Freelance",
    logo: "/companies/freelance.png",
    location: "Kenya",
    workMode: "remote",
    roles: [
      {
        title: "Freelance Software Engineer",
        type: "Part-time",
        startDate: "2023-04-01",
        endDate: "2025-03-31",
        description:
          "Delivered full-stack web applications, cross-platform mobile apps, and blockchain solutions for diverse clients across Africa and globally. Built custom software products, mobile applications with Flutter, APIs, and decentralized applications using modern technologies including React, TypeScript, Node.js, Python, and ICP blockchain. Specialized in creating scalable, production-ready systems with robust architecture and security best practices.",
        skills: [
          "Flutter",
          "Full-Stack Development",
          "Blockchain Development",
          "API Development",
          "Software Architecture",
          "React",
          "TypeScript",
          "Node.js",
          "Python",
        ],
      },
    ],
  },
  {
    company: "Open Source",
    logo: "/companies/os.png",
    location: "Remote",
    workMode: "remote",
    roles: [
      {
        title: "Open Source Developer",
        type: "Part-time",
        startDate: "2023-01-01",
        description:
          "Active contributor to open-source projects and communities. Building developer tools and libraries that enhance productivity for thousands of developers worldwide. Created Gitok (2,000+ users) and U-Download (1,500+ users) among other impactful projects.",
        skills: [
          "Software Infrastructure",
          "Open-Source Software",
          "OSC",
          "Internet Software",
          "Engineering",
          "Linux",
          "Blockchain Developer",
        ],
      },
    ],
  },
];

const ExperienceCard = ({
  experience,
  index,
  onClick,
}: {
  experience: Experience;
  index: number;
  onClick: (role: Role) => void;
}) => {
  const isEven = index % 2 === 0;
  const hasMultipleRoles = experience.roles.length > 1;
  const totalDuration = getCompanyTotalDuration(experience.roles);

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-start ${isEven ? "justify-end" : ""}`}
    >
      <div className={`w-full md:w-5/12 ${isEven ? "md:mr-8" : "md:ml-8"}`}>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-card dark:bg-card-dark p-6 rounded-xl shadow-lg
                     border border-border/10 dark:border-border-dark/10
                     hover:shadow-xl transition-all relative overflow-hidden"
        >
          {experience.logo && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="absolute opacity-[0.08] dark:opacity-[0.10]">
                <Image
                  src={experience.logo}
                  alt=""
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                  className="w-64 h-64 max-w-none"
                />
              </div>
            </div>
          )}
          <div className="relative z-10">
            {/* Company Header */}
            <div className="flex items-center gap-4 mb-4">
              {experience.logo ? (
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src={experience.logo}
                    alt={experience.company}
                    className="rounded-full"
                    fill
                    sizes="48px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center flex-shrink-0">
                  <IconBuildingSkyscraper className="w-6 h-6 text-primary dark:text-primary-dark" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-text dark:text-text-dark">
                  {experience.company}
                </h3>
                <div className="flex items-center gap-2 text-sm text-text/60 dark:text-text-dark/60">
                  <span>{totalDuration}</span>
                  <span>·</span>
                  <span>{experience.location}</span>
                  {experience.workMode && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <IconDevices className="w-3 h-3" />
                        {experience.workMode === "remote"
                          ? "Remote"
                          : experience.workMode === "on-site"
                          ? "On-site"
                          : "Hybrid"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Stacked Roles */}
            <div
              className={`${hasMultipleRoles ? "border-l-2 border-primary/30 dark:border-primary-dark/30 ml-6 pl-4" : ""}`}
            >
              {experience.roles.map((role, roleIndex) => (
                <div
                  key={`${role.title}-${roleIndex}`}
                  className={`${roleIndex > 0 ? "mt-6 pt-4 border-t border-border/10 dark:border-border-dark/10" : ""} cursor-pointer group`}
                  onClick={() => onClick(role)}
                >
                  {/* Role indicator dot for stacked roles */}
                  {hasMultipleRoles && (
                    <div className="absolute -ml-[22px] mt-1.5 w-3 h-3 rounded-full bg-primary dark:bg-primary-dark border-2 border-card dark:border-card-dark" />
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                        {role.title}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent dark:bg-accent/30 font-medium">
                        {role.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text/60 dark:text-text-dark/60 mb-3">
                    <IconCalendar className="w-4 h-4" />
                    <span>
                      {getDurationString(role.startDate, role.endDate)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {role.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs rounded-full
                                 bg-primary/10 dark:bg-primary-dark/10
                                 text-primary dark:text-primary-dark"
                      >
                        {skill}
                      </span>
                    ))}
                    {role.skills.length > 3 && (
                      <span
                        className="px-2 py-1 text-xs rounded-full
                                   bg-primary/10 dark:bg-primary-dark/10
                                   text-primary dark:text-primary-dark"
                      >
                        +{role.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface SelectedRoleInfo {
  role: Role;
  company: string;
  logo?: string;
  location: string;
}

const Experience = () => {
  const [selectedRole, setSelectedRole] = useState<SelectedRoleInfo | null>(
    null,
  );

  const handleRoleClick = (experience: Experience, role: Role) => {
    setSelectedRole({
      role,
      company: experience.company,
      logo: experience.logo,
      location: experience.location,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Metadata
        title="Professional Experience"
        description="Explore Dedan Okware's professional journey as a Software Engineer, including roles at Power Learn Project Africa, Bonded, and various full-stack development positions."
        keywords="software engineer experience, mobile development, flutter developer, blockchain developer, ICP developer, golang developer, typescript developer, web development experience, LMS development, n8n automation"
      />
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1
          className="text-5xl font-bold mb-16 text-center text-text dark:text-text-dark"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </motion.h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent opacity-20" />

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
                onClick={(role) => handleRoleClick(experience, role)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <Modal
        isOpen={!!selectedRole}
        onClose={() => setSelectedRole(null)}
        title={selectedRole?.role.title}
      >
        {selectedRole && (
          <div className="space-y-6 relative">
            {selectedRole.logo && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute opacity-[0.12] dark:opacity-[0.15] pointer-events-none">
                  <Image
                    src={selectedRole.logo}
                    alt=""
                    width={300}
                    height={300}
                    style={{ objectFit: "contain" }}
                    className="w-96 h-96 max-w-none"
                  />
                </div>
              </div>
            )}
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                {selectedRole.logo ? (
                  <div className="relative w-16 h-16">
                    <Image
                      src={selectedRole.logo}
                      alt={selectedRole.company}
                      className="rounded-full"
                      fill
                      sizes="64px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center">
                    <IconBuildingSkyscraper className="w-8 h-8 text-primary dark:text-primary-dark" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-text dark:text-text-dark">
                    {selectedRole.company}
                  </h3>
                  <p className="text-lg text-text/80 dark:text-text-dark/80">
                    {selectedRole.role.title}
                  </p>
                  <div className="flex items-center gap-2 text-text/60 dark:text-text-dark/60 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent dark:bg-accent/30 font-medium">
                      {selectedRole.role.type}
                    </span>
                    <span>·</span>
                    <IconCalendar className="w-4 h-4" />
                    <span className="text-sm">
                      {getDurationString(
                        selectedRole.role.startDate,
                        selectedRole.role.endDate,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {selectedRole.role.description && (
                <div className="prose dark:prose-invert max-w-none mt-4">
                  <p>{selectedRole.role.description}</p>
                </div>
              )}

              {selectedRole.role.skills && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-3 text-text dark:text-text-dark">
                    Skills & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedRole.role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full
                                 bg-primary/10 dark:bg-primary-dark/10
                                 text-primary dark:text-primary-dark"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Experience;
