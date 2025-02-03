import { create } from 'zustand';

interface PortfolioState {
  skills: { category: string; items: { name: string; level: number }[] }[];
  projects: {
    name: string;
    description: string;
    longDescription: string;
    previewImage: string;
    technologies: string[];
    githubLink: string;
    demoLink?: string;
  }[];
  blogs: { title: string; content: string; link: string }[];
  certificates: { name: string; issuer: string; date: string; link: string }[];
  addSkill: (skill: { name: string; description: string }) => void;
  addProject: (project: { name: string; description: string; link: string }) => void;
  addBlog: (blog: { title: string; content: string; link: string }) => void;
  addCertificate: (cert: { name: string; issuer: string; date: string; link: string }) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
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
  blogs: [],
  certificates: [],
  addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  addBlog: (blog) => set((state) => ({ blogs: [...state.blogs, blog] })),
  addCertificate: (cert) => set((state) => ({ certificates: [...state.certificates, cert] })),
}));