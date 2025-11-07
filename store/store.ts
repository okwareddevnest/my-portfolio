import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { blogs as initialBlogs } from '../data/blogs';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

interface Project {
  name: string;
  description: string;
  longDescription: string;
  previewImage: string;
  technologies: string[];
  githubLink: string;
  demoLink?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  tags: string[];
  readTime: string;
  thumbnail?: string;
  source: {
    type: 'linkedin' | 'twitter';
    url: string;
    preview?: string;
  };
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

interface PortfolioState {
  skills: SkillCategory[];
  projects: Project[];
  blogs: Blog[];
  certificates: Certificate[];
  addSkill: (category: string, skill: Skill) => void;
  addProject: (project: Project) => void;
  addBlog: (blog: Blog) => void;
  addCertificate: (cert: Certificate) => void;
  removeBlog: (id: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      skills: [
        {
          category: "Programming Languages",
          items: [
            { name: "Python", level: 95 },
            { name: "JavaScript", level: 90 },
            { name: "TypeScript", level: 90 },
            { name: "Rust", level: 85 },
            { name: "Motoko", level: 85 },
            { name: "Solidity", level: 85 },
            { name: "HTML5", level: 95 },
            { name: "CSS3", level: 90 },
            { name: "SQL", level: 85 }
          ]
        },
        {
          category: "Frontend Frameworks & Libraries",
          items: [
            { name: "React", level: 95 },
            { name: "Next.js", level: 90 },
            { name: "Vue.js", level: 85 },
            { name: "TailwindCSS", level: 90 },
            { name: "Material-UI", level: 85 },
            { name: "Framer Motion", level: 80 }
          ]
        },
        {
          category: "Backend Technologies",
          items: [
            { name: "Node.js", level: 90 },
            { name: "Express.js", level: 90 },
            { name: "Django", level: 95 },
            { name: "FastAPI", level: 85 },
            { name: "Rust", level: 90 },
            { name: "MongoDB", level: 85 },
            { name: "PostgreSQL", level: 85 }
          ]
        },
        {
          category: "Blockchain Development",
          items: [
            { name: "Internet Computer (ICP)", level: 90 },
            { name: "Ethereum", level: 85 },
            { name: "Motoko", level: 85 },
            { name: "Solidity", level: 85 },
            { name: "Web3.js", level: 85 },
            { name: "Ethers.js", level: 80 },
            { name: "Hardhat", level: 80 },
            { name: "IPFS", level: 80 }
          ]
        },
        {
          category: "AI & Machine Learning",
          items: [
            { name: "TensorFlow", level: 85 },
            { name: "PyTorch", level: 80 },
            { name: "Scikit-learn", level: 85 },
            { name: "LangChain", level: 80 },
            { name: "Pandas", level: 90 },
            { name: "NumPy", level: 90 }
          ]
        },
        {
          category: "DevOps & Tools",
          items: [
            { name: "Git", level: 90 },
            { name: "Docker", level: 85 },
            { name: "Linux", level: 85 },
            { name: "CI/CD", level: 85 },
            { name: "AWS", level: 80 },
            { name: "Azure", level: 80 }
          ]
        }
      ],
      projects: [
        {
          name: "U-Download",
          description: "Fast, beautiful YouTube downloader with zero dependencies trusted by 1,500+ users worldwide - download videos and audio instantly with built-in tools for transcoding, trimming, and multi-connection acceleration.",
          longDescription: "U-Download is a cross-platform desktop application built in Rust that revolutionizes YouTube downloading by bundling all required tools (yt-dlp, aria2c, ffmpeg) directly into the app. Trusted by over 1,500 users worldwide, U-Download has proven its reliability and performance in real-world usage. No external dependencies needed - just install and go! Features lightning-fast multi-connection downloads with aria2c acceleration, a beautiful modern UI with smooth animations, flexible format options (MP4 video or MP3 audio), precise per-second video trimming, and real-time progress tracking with live speed and ETA displays. Works seamlessly on Linux, Windows, and macOS with native packaging for each platform. The app's zero-dependency approach and exceptional performance have made it a favorite tool among content creators, developers, and everyday users seeking a reliable YouTube downloading solution.",
          previewImage: "/udownload-preview.png",
          technologies: ["Rust", "Tauri", "React", "TypeScript", "yt-dlp", "aria2c", "ffmpeg", "Cross-Platform"],
          githubLink: "https://github.com/okwareddevnest/U-Download",
          demoLink: "https://u-download.vercel.app/"
        },
        {
          name: "Gitok",
          description: "Productivity boost for developers with 35+ custom Git commands adopted by 2,000+ developers worldwide - streamline your Git workflow with auto-updates, interactive cheatsheets, and safety confirmations.",
          longDescription: "Gitok transforms your Git experience with an extensive collection of 35+ carefully crafted Git aliases and functions designed to accelerate developer workflows. Currently used by over 2,000 developers worldwide, Gitok has become an essential tool for teams and individual developers seeking to optimize their Git workflows. Built as a cross-platform shell script with native Fish Shell support, Gitok provides powerful commands like commit shortcuts, pushall, unpush, and an interactive gitcheatsheet. Features include an intelligent auto-update system with semantic versioning, safety confirmations for destructive operations, a fully automated CI/CD pipeline with GitHub Actions, and zero-configuration setup that works out of the box on Linux, macOS, Windows WSL, and Git Bash. The project demonstrates advanced shell scripting techniques with comprehensive error handling and user-friendly prompts. Its growing community of users and 53+ stars on GitHub testament to its impact on developer productivity across the globe.",
          previewImage: "/gitok-preview.png",
          technologies: ["Shell Script", "Bash", "Fish Shell", "Git", "GitHub Actions", "CI/CD", "Cross-Platform"],
          githubLink: "https://github.com/okwareddevnest/gitok"
        },
        {
          name: "OHMS 2.0 - Autonomous Agent Platform",
          description: "Award-winning AI agent platform on the Internet Computer - Winner of WCHL (World Computer Hacker League) Regional Round (Africa) and Global Finalist, transforming natural language instructions into autonomous agents with verifiable on-chain execution.",
          longDescription: "OHMS 2.0 (Onchain Hosting for Multi-Agent Systems) is an award-winning autonomous agent platform built entirely on the Internet Computer Protocol over 4 months (July-October 2025). Competing in the prestigious World Computer Hacker League (WCHL) by ICP Blockchain, OHMS 2.0 won both the Qualifications and Regional (African-Wide) rounds, earning a spot to pitch at the Global Finale Round among the best projects in the world. This cutting-edge platform enables anyone to compose powerful AI agents from plain-language goals, delivering verifiable on-chain execution with transparent economics. The platform bridges decentralized coordination with best-in-class hosted LLMs via secure HTTPS outcalls, supporting multi-agent collaborations that can plan, act, and report autonomously. Built with a sophisticated architecture featuring an Agent Factory, Coordinator, Model & Tool Registry, and Subscription Economics system, all running as ICP canisters. The platform integrates with OpenAI-compatible APIs and custom enterprise LLM providers while maintaining full decentralization and transparency. OHMS 2.0 represents the future of autonomous AI systems with blockchain-verified execution and agent orchestration, validated through international competition success and recognition from the global ICP community.",
          previewImage: "/ohms-preview.png",
          technologies: ["Rust", "TypeScript", "React 19", "Internet Computer", "ICP", "AI Agents", "LLM Integration", "WebAssembly", "Motoko"],
          githubLink: "https://github.com/OHMS-DeAI",
          demoLink: "https://weamn-piaaa-aaaah-arlca-cai.icp0.io/"
        },
        {
          name: "RSON - Rust Serialized Object Notation",
          description: "Next-generation data serialization format that evolves JSON with comments, rich types, and developer-friendly syntax while maintaining full backward compatibility.",
          longDescription: "RSON (Rust Serialized Object Notation) is a revolutionary data serialization format designed to replace JSON with modern features while maintaining full backward compatibility. Every JSON file is valid RSON, but RSON offers so much more: native support for comments and documentation, a rich type system including structs, enums, optionals, and tuples, developer-friendly features like trailing commas and cleaner syntax, high-performance parsing with optional binary mode, and universal language support with libraries for all major programming languages. The project includes implementations in Rust (serde_rson), JavaScript/TypeScript (rson-js), Python (rson), and more. RSON solves the long-standing pain points of JSON configuration files by allowing inline documentation, better type safety, and more expressive data structures without sacrificing the simplicity and readability that made JSON popular. The format is production-ready and actively used in modern development workflows.",
          previewImage: "/rson-preview.png",
          technologies: ["Rust", "Serde", "TypeScript", "Python", "JavaScript", "Data Serialization", "Parser", "Compiler Design"],
          githubLink: "https://github.com/RSON-Rust-Serialized-Object-Notation"
        },
        {
          name: "IThreeM - Decentralized Gaming Engine",
          description: "A revolutionary decentralized 2D and 3D gaming engine built on the Internet Computer Protocol (ICP), enabling seamless game development and deployment on the blockchain.",
          longDescription: "IThreeM is a groundbreaking decentralized gaming engine that leverages the power of the Internet Computer Protocol to revolutionize game development. Built with Rust and Motoko, it provides a robust platform for creating both 2D and 3D games that run entirely on the blockchain. The engine features advanced rendering capabilities, physics simulation, asset management, and blockchain integration for in-game assets and transactions.",
          previewImage: "/ithreem-preview.png",
          technologies: ["Rust", "Motoko", "Internet Computer", "WebGL", "WebAssembly", "Three.js", "Blockchain"],
          githubLink: "https://github.com/okwareddevnest",
          demoLink: "https://ithreem.com"
        },
        {
          name: "$FRYS - Fries Coin",
          description: "The world's first meme coin dedicated to fries enthusiasts, built on the Internet Computer Protocol with an integrated NFT marketplace.",
          longDescription: "Fries Coin ($FRYS) is a community-driven meme token built on the Internet Computer Protocol, celebrating the universal love for fries. As a core developer, I helped create not just a token, but a complete ecosystem including an NFT marketplace for fries-themed digital collectibles. The project leverages ICP's advanced features for high-performance token transactions and NFT trading, while fostering a fun and engaging community.",
          previewImage: "/fries-preview.png",
          technologies: ["Motoko", "Internet Computer", "DeFi", "NFT", "ICRC-1", "ICP", "Web3"],
          githubLink: "https://github.com/okwareddevnest",
          demoLink: "https://friescoin.xyz"
        },
        {
          name: "Tech Charity Platform",
          description: "A modern web platform that enables charitable donations through M-Pesa integration, featuring a responsive dashboard for tracking donations and impact metrics.",
          longDescription: "Tech Charity is a platform designed to bridge the digital divide by facilitating technology education and resources for underserved communities. The platform enables seamless donations through M-Pesa integration and provides real-time tracking of impact metrics.",
          previewImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop",
          technologies: ["Next.js", "TypeScript", "MongoDB", "M-Pesa API", "TailwindCSS"],
          githubLink: "https://github.com/okwareddevnest/tech-donations",
          demoLink: "https://tech-donations.vercel.app"
        },
        {
          name: "VerifAI",
          description: "An AI-powered media bias and fake news detection system that uses advanced NLP techniques to analyze and verify news content credibility.",
          longDescription: "VerifAI leverages state-of-the-art language models and machine learning techniques to detect media bias and verify news authenticity. It provides detailed analysis of content credibility and bias detection.",
          previewImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
          technologies: ["Python", "LangChain", "TruLens", "Streamlit", "Machine Learning"],
          githubLink: "https://github.com/okwareddevnest/VerifAI",
          demoLink: "https://verifai-demo.streamlit.app"
        },
        {
          name: "Noether",
          description: "A decentralized application (dApp) for secure and transparent academic credential verification on the blockchain.",
          longDescription: "Noether is a blockchain-based platform that enables educational institutions to issue and verify academic credentials. It ensures the authenticity of certificates while providing a transparent and immutable record system.",
          previewImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2032&auto=format&fit=crop",
          technologies: ["Solidity", "Ethereum", "React", "Web3.js", "IPFS"],
          githubLink: "https://github.com/okwareddevnest/noether",
          demoLink: "https://noether.vercel.app"
        },
        {
          name: "Backlight",
          description: "A Linux utility for controlling keyboard backlight brightness with an intuitive interface and hotkey support.",
          longDescription: "Backlight is a Linux system utility that provides easy control over keyboard backlight settings. It features a simple CLI interface, hotkey support, and smooth brightness transitions. The tool interfaces directly with the Linux system's backlight controls for reliable performance.",
          previewImage: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop",
          technologies: ["Python", "Linux", "System Utils", "DBus", "Keyboard Control"],
          githubLink: "https://github.com/okwareddevnest/Backlight"
        },
        {
          name: "DirCreator",
          description: "A command-line tool for automatically generating project directory structures based on templates and configuration files.",
          longDescription: "DirCreator simplifies project setup by automatically creating directory structures and files based on predefined templates. It supports custom configurations and is extensible for different project types.",
          previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
          technologies: ["Python", "CLI", "File System", "YAML", "Template Engine"],
          githubLink: "https://github.com/okwareddevnest/DirCreator"
        },
        {
          name: "AppTray",
          description: "A Linux utility that converts AppImage applications into native Debian packages with full desktop integration and system menu entries.",
          longDescription: "AppTray simplifies the process of integrating AppImage applications into Debian-based systems by converting them into native .deb packages. It automatically handles desktop entries, icons, and system integration while maintaining the original AppImage functionality.",
          previewImage: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2074&auto=format&fit=crop",
          technologies: ["Python", "AppImage", "Debian Packaging", "Linux", "Desktop Integration"],
          githubLink: "https://github.com/okwareddevnest/AppTray"
        }
      ],
      blogs: initialBlogs,
      certificates: [
        {
          name: "ICP TypeScript Smart Contract 101",
          issuer: "Dacade.org",
          date: "2024",
          link: "https://dacade.org/achievements/d18c8404-7900-4dfa-96e9-79a0bab5a439"
        },
        {
          name: "ICP Rust Smart Contract 101",
          issuer: "Dacade.org",
          date: "2024",
          link: "https://dacade.org/achievements/46a69cb6-5ffa-408b-8d65-5f3cfe0d2eba"
        }
      ],
      addSkill: (category: string, skill: Skill) => 
        set((state) => ({
          skills: state.skills.map(cat => 
            cat.category === category
              ? { ...cat, items: [...cat.items, skill] }
              : cat
          )
        })),
      addProject: (project: Project) => 
        set((state) => ({ 
          projects: [...state.projects, project] 
        })),
      addBlog: (blog: Blog) => 
        set((state) => ({ 
          blogs: [blog, ...state.blogs] 
        })),
      addCertificate: (cert: Certificate) => 
        set((state) => ({ 
          certificates: [...state.certificates, cert] 
        })),
      removeBlog: (id: string) => set((state) => ({ 
        blogs: state.blogs.filter(b => b.id !== id) 
      })),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ blogs: state.blogs }),
    }
  )
);