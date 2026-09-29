// Single source for both the on-page resume and the downloadable PDF, so the
// two can never drift apart. Kept as plain strings: ATS parsers read text, so
// anything visual (logos, icons, columns) is deliberately absent.

export interface ResumeRole {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface ResumeProject {
  name: string;
  stack: string;
  bullets: string[];
}

export interface ResumeCredential {
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  name: string;
  headline: string;
  specialties: string;
  contact: string[];
  summary: string;
  skills: ResumeSkillGroup[];
  experience: ResumeRole[];
  projects: ResumeProject[];
  awards: ResumeCredential[];
  certifications: ResumeCredential[];
  education: string;
}

export const RESUME_FILE_NAME = "Dedan_Okware_Senior_Software_Engineer_Resume.pdf";

export const resume: ResumeData = {
  name: "Dedan Okware",
  headline: "Senior Software Engineer",
  specialties:
    "Full-Stack | Frontend | Backend | Mobile | Blockchain | Technical Leadership",
  contact: [
    "softengdedan@gmail.com",
    "Nairobi, Kenya",
    "linkedin.com/in/softcysec-dedan-okware",
    "github.com/okwareddevnest",
    "okwaretech.com",
  ],
  summary:
    "Senior Software Engineer who has held Tech Lead, Frontend, Backend and Blockchain engineering roles, shipping production systems across fintech, stablecoin payments, edtech and developer tooling. Currently Lead Front End Engineer at Fingo Africa, owning architecture for stablecoin wallets, cross-border transfers and KYC onboarding across Next.js web and Flutter mobile. Previously Technical Lead Software Engineer at Power Learn Project Africa, leading the revamp of core systems, building Golang backend services and automating operations; and Blockchain Software Engineer at Bonded, delivering ICP smart contracts for tamper-proof evidence storage. Strong in system architecture, API design, TypeScript, React, Node.js, Python, Golang and Rust, CI/CD and engineering standards. WCHL 2nd Place (Kenya and Africa) and creator of open-source tools used by 3,500+ developers.",
  skills: [
    {
      label: "Languages",
      items: [
        "TypeScript",
        "JavaScript (ES6+)",
        "Python",
        "Go (Golang)",
        "Rust",
        "Dart",
        "Solidity",
        "Motoko",
        "SQL",
        "HTML5",
        "CSS3",
      ],
    },
    {
      label: "Frontend",
      items: [
        "React",
        "Next.js",
        "Vue.js",
        "Redux",
        "Tailwind CSS",
        "Material UI",
        "Responsive Design",
        "Accessibility (WCAG)",
        "Web Performance",
        "Design Systems",
      ],
    },
    {
      label: "Backend & APIs",
      items: [
        "Node.js",
        "Express.js",
        "Django",
        "FastAPI",
        "Rust Services",
        "Golang Services",
        "REST APIs",
        "GraphQL",
        "gRPC",
        "WebSockets",
        "Microservices",
        "Strapi CMS",
      ],
    },
    {
      label: "Mobile & Desktop",
      items: ["Flutter", "Dart", "Tauri", "Android", "Windows, macOS & Linux Desktop Apps"],
    },
    {
      label: "Databases",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    },
    {
      label: "Blockchain & Web3",
      items: [
        "Internet Computer (ICP)",
        "Ethereum",
        "Smart Contracts",
        "Hardhat",
        "Ethers.js",
        "Web3.js",
        "IPFS",
        "Stablecoins",
      ],
    },
    {
      label: "Cloud & DevOps",
      items: [
        "Docker",
        "Kubernetes",
        "CI/CD",
        "GitHub Actions",
        "AWS",
        "Azure",
        "Vercel",
        "Nginx",
        "Terraform",
        "Linux",
        "n8n",
      ],
    },
    {
      label: "AI & Data",
      items: [
        "LLM Integration",
        "AI Agents",
        "LangChain",
        "TensorFlow",
        "PyTorch",
        "Pandas",
      ],
    },
    {
      label: "Leadership & Practice",
      items: [
        "Technical Leadership",
        "System Architecture",
        "Code Review",
        "Mentoring",
        "Agile/Scrum",
        "Automated Testing",
        "Release Management",
        "Stakeholder Management",
      ],
    },
  ],
  experience: [
    {
      title: "Lead Front End Engineer",
      company: "Fingo Africa",
      location: "Nairobi, Kenya (Hybrid)",
      period: "Feb 2026 - Present",
      bullets: [
        "Lead front-end architecture for Fingo Global, a stablecoin and cross-border payments platform, covering stablecoin wallets, on/off-ramp, cross-border transfer and KYC/onboarding flows.",
        "Ship production Next.js (TypeScript) web applications and Flutter mobile applications for regulated financial transactions.",
        "Define and enforce engineering standards, code review practice and automated testing frameworks across the engineering team.",
        "Own the CI/CD pipeline, deployment and release management for web and mobile applications.",
        "Partner with the Stablecoin Product Lead and Engineering Lead to turn product specifications into accessible, performant interfaces.",
      ],
    },
    {
      title: "Technical Lead Software Engineer",
      company: "Power Learn Project Africa",
      location: "Nairobi, Kenya (Consultancy)",
      period: "Jan 2026 - May 2026",
      bullets: [
        "Led the engineering function through the organisation's pivot to a new operating model, owning architecture decisions across backend services, frontend platforms and automation infrastructure.",
        "Led the setup and revamp of core internal systems, consolidating fragmented platforms and defining the migration path off legacy workflows.",
        "Set technical direction and engineering standards for the team, reviewing system designs and implementations end to end.",
        "Delivered on a compressed timeline while coordinating programme, operations and external stakeholders.",
      ],
    },
    {
      title: "Full Stack Software Engineer & Instructor",
      company: "Power Learn Project Africa",
      location: "Nairobi, Kenya (Consultancy)",
      period: "Oct 2024 - May 2026",
      bullets: [
        "Built Golang backend services and Next.js/React features for the organisation's Learning Management System (LMS), with Strapi CMS as the content layer.",
        "Deployed a self-hosted n8n automation server and built 15+ webhook integrations that automated standard operating procedures and LMS workflows, reducing manual operations by 60%.",
        "Containerised services and deployment pipelines with Docker on Scaleway cloud infrastructure, improving release velocity and reliability.",
        "Performed 500+ code reviews and led 100+ live coding sessions, lifting the project completion rate to 95%.",
        "Trained 9,000+ developers in full-stack development (MongoDB, Express.js, React, Node.js) across 3 cohorts in 2025 and authored 15+ capstone projects adopted as the academy standard.",
      ],
    },
    {
      title: "Blockchain Software Engineer",
      company: "Bonded",
      location: "London, United Kingdom (Remote, Contract)",
      period: "Apr 2025 - Jul 2025",
      bullets: [
        "Designed and implemented Internet Computer (ICP) smart contracts for tamper-proof storage of UK visa application evidence and partner verification records.",
        "Built AI-powered evidence-matching algorithms to align and validate relationship documentation submitted by partners in different countries.",
        "Built internal Flutter mobile applications to streamline document verification and partner communication.",
        "Collaborated with a cross-functional team across 3 time zones to deliver secure immigration technology on schedule.",
      ],
    },
    {
      title: "Freelance Software Engineer (Backend & Full-Stack)",
      company: "Self-employed",
      location: "Kenya (Remote)",
      period: "Apr 2023 - Mar 2025",
      bullets: [
        "Designed and built production REST APIs and microservices in Node.js, Python and Golang, serving 50,000+ monthly users.",
        "Delivered 20+ web and mobile applications for international clients using React, TypeScript, Next.js and Flutter, plus decentralised applications on the Internet Computer.",
        "Owned delivery end to end, from architecture and API design through deployment, earning a 100% client satisfaction rate and 70% repeat business.",
      ],
    },
    {
      title: "Open Source Creator & Maintainer",
      company: "Independent",
      location: "Remote",
      period: "Jan 2023 - Present",
      bullets: [
        "Created Gitok, a Git productivity CLI with 35+ commands and an automated CI/CD release pipeline, adopted by 2,000+ developers in 40+ countries.",
        "Built U-Download, a cross-platform desktop media downloader with a Rust/Tauri core and React + TypeScript interface, used by 1,500+ people.",
        "Maintain 10+ repositories, triaging and merging 500+ issues and pull requests.",
      ],
    },
  ],
  projects: [
    {
      name: "OHMS 2.0 - Autonomous AI Agent Platform",
      stack: "Rust, Motoko, TypeScript, React 19, Internet Computer, WebAssembly, LLMs",
      bullets: [
        "Architected an on-chain multi-agent platform where users compose AI agents from plain-language goals, with an Agent Factory, Coordinator, Model & Tool Registry and subscription economics running as ICP canisters.",
        "Integrated hosted LLMs through secure HTTPS outcalls for verifiable on-chain execution; placed 2nd in the WCHL National (Kenya) and Regional (Africa) rounds and reached the Global Finale.",
      ],
    },
    {
      name: "RSON - Data Serialization Format",
      stack: "Rust, Serde, TypeScript, Python, Parser Design",
      bullets: [
        "Designed a JSON-compatible serialization format with comments and a rich type system, and built parser libraries for Rust, TypeScript and Python.",
      ],
    },
  ],
  awards: [
    {
      name: "WCHL Regional Round (Africa) - 2nd Place",
      issuer: "World Computer Hacker League, Internet Computer",
      date: "Sep 2025",
    },
    {
      name: "WCHL National Round (Kenya) - 2nd Place",
      issuer: "World Computer Hacker League, Internet Computer",
      date: "Aug 2025",
    },
  ],
  certifications: [
    {
      name: "Google Cybersecurity Professional Certificate",
      issuer: "Coursera",
      date: "2023",
    },
    {
      name: "ICP TypeScript Smart Contract 101",
      issuer: "Dacade",
      date: "2024",
    },
    {
      name: "ICP Rust Smart Contract 101",
      issuer: "Dacade",
      date: "2024",
    },
  ],
  education:
    "Software Engineering & Computer Science - continuous professional development through certification and applied project work in full-stack, distributed systems and blockchain engineering.",
};
