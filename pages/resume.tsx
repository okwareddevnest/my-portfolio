import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { usePortfolioStore } from "../store/store";
import { motion } from "framer-motion";
import { Metadata } from "../components/Metadata";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  IconDownload,
  IconFileTypePdf,
  IconSparkles,
  IconRocket,
} from "@tabler/icons-react";

const Resume = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeRef = useRef<HTMLDivElement>(null);

  const { skills, certificates } = usePortfolioStore();

  const experiences = [
    {
      company: "Power Learn Project Africa",
      title: "Full Stack Software Engineer",
      duration: "Jan 2026 - Present",
      location: "Nairobi, Kenya · Consultancy",
      achievements: [
        "Automated PLP Standard Operating Procedures (SOPs) and LMS workflows by deploying self-hosted n8n server, building 15+ webhook integrations that reduced manual operations by 60%",
        "Enhanced and extended the existing LMS tech ecosystem with new features using Golang, Next.js, React.js, and Strapi CMS",
        "Engineered RESTful backend services processing 10,000+ API requests daily with 99.9% uptime across Scaleway cloud infrastructure",
        "Containerized deployment pipelines with Docker, improving release velocity and system reliability across the platform",
      ],
    },
    {
      company: "Power Learn Project Africa",
      title: "Software Development Instructor",
      duration: "Oct 2024 - Present",
      location: "Nairobi, Kenya · Consultancy",
      achievements: [
        "Trained and graduated 9,000+ students in Full Stack Development using MERN Stack (MongoDB, Express.js, React.js, Node.js) across 3 cohorts in 2025",
        "Conducted 100+ live coding sessions and performed 500+ code reviews, achieving 95% student project completion rate",
        "Developed comprehensive curriculum materials and 15+ hands-on capstone projects adopted as standard across the academy",
        "Mentored aspiring developers through group and 1-on-1 sessions, with 80%+ of graduates securing technical roles",
      ],
    },
    {
      company: "DevTrader",
      title: "Software Engineer",
      duration: "Aug 2025 - Present",
      location: "Dubai, UAE · Remote · Contract",
      achievements: [
        "Delivered 5+ full-stack applications for international clients through DevTrader's global subcontracting platform",
        "Developed blockchain/Web3 solutions using Ethereum, Solidity, and Internet Computer Protocol (ICP) for DeFi applications",
        "Designed and implemented secure RESTful and GraphQL APIs, reducing response latency by 35%",
        "Deployed production applications to AWS and Vercel, maintaining 99.5% uptime with CI/CD pipelines using GitHub Actions",
      ],
    },
    {
      company: "Bonded",
      title: "Blockchain Software Engineer",
      duration: "Apr 2025 - Jul 2025",
      location: "London, United Kingdom · Remote · Contract",
      achievements: [
        "Developed blockchain solutions for UK visa application platform, enabling secure document storage and verification for international couples",
        "Built AI-powered evidence matching algorithms to align and validate relationship documentation between partners across borders",
        "Implemented ICP blockchain smart contracts for tamper-proof storage of visa application evidence and partner verification records",
        "Collaborated with cross-functional teams across 3 time zones, delivering secure immigration tech solutions on schedule",
      ],
    },
    {
      company: "Freelance",
      title: "Freelance Software Engineer",
      duration: "Apr 2023 - Mar 2025",
      location: "Kenya · Remote",
      achievements: [
        "Delivered 20+ full-stack web applications and blockchain solutions for clients across Africa, Europe, and North America",
        "Built production-ready APIs and microservices using Node.js, Python, and Golang, serving 50,000+ monthly users",
        "Specialized in React, TypeScript, and Next.js for frontend, with ICP blockchain for decentralized applications",
        "Achieved 100% client satisfaction rate with repeat business from 70% of clients",
      ],
    },
    {
      company: "Open Source",
      title: "Open Source Developer & Maintainer",
      duration: "Jan 2023 - Present",
      location: "Remote · Global",
      achievements: [
        "Created Gitok: Git productivity CLI tool with 35+ commands, adopted by 2,000+ developers across 40+ countries",
        "Built U-Download: Cross-platform YouTube downloader in Rust/Tauri, trusted by 1,500+ users with zero-dependency setup",
        "Maintained 10+ open-source repositories with 150+ GitHub stars combined, processing 500+ issues and pull requests",
        "Published technical articles and documentation, generating 10,000+ page views on developer tools and best practices",
      ],
    },
  ];

  const highlightedProjects = [
    {
      name: "OHMS 2.0 - Autonomous AI Agent Platform",
      description:
        "Award-winning decentralized AI agent platform - WCHL 2nd Place (Africa) & Global Finalist. Enables natural language agent composition with verifiable on-chain execution.",
      tech: [
        "Rust",
        "TypeScript",
        "React 19",
        "Internet Computer (ICP)",
        "AI Agents",
        "LLM Integration",
        "WebAssembly",
      ],
    },
    {
      name: "U-Download - Cross-Platform Media Downloader",
      description:
        "High-performance YouTube downloader built in Rust, trusted by 1,500+ users globally. Features multi-connection acceleration, video trimming, and zero external dependencies.",
      tech: ["Rust", "Tauri", "React", "TypeScript", "FFmpeg", "aria2c"],
    },
    {
      name: "Gitok - Developer Productivity CLI",
      description:
        "Git productivity toolkit with 35+ custom commands, adopted by 2,000+ developers worldwide. Features auto-updates, interactive cheatsheets, and cross-platform support.",
      tech: ["Shell Script", "Bash", "Fish Shell", "Git", "GitHub Actions", "CI/CD"],
    },
    {
      name: "RSON - Next-Generation Data Serialization",
      description:
        "Modern data serialization format evolving JSON with comments, rich types, and developer-friendly syntax. Full backward compatibility with JSON.",
      tech: ["Rust", "Serde", "TypeScript", "Python", "Parser Design", "Language Specification"],
    },
  ];

  const generatePDF = async () => {
    if (!resumeRef.current) return;

    setIsGenerating(true);
    setProgress(10);

    try {
      // Capture the resume content with optimized settings
      setProgress(30);
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2, // Reduced from 3 to 2 for smaller file size
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1200,
        windowHeight: resumeRef.current.scrollHeight,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        imageTimeout: 0,
        removeContainer: false,
      });

      setProgress(60);

      // Create PDF with compression
      const imgData = canvas.toDataURL("image/jpeg", 0.85); // JPEG with 85% quality instead of PNG
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true, // Enable PDF compression
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const margin = 10; // 10mm margins on all sides
      const contentWidth = pdfWidth - margin * 2; // 190mm usable width

      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin; // Start with top margin

      // Add first page
      pdf.addImage(
        imgData,
        "JPEG",
        margin,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      ); // JPEG compression
      heightLeft -= pdfHeight - margin * 2;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft) + margin;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "JPEG",
          margin,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );
        heightLeft -= pdfHeight - margin * 2;
      }

      setProgress(90);

      // Download the PDF
      pdf.save("Dedan_Okware_Resume.pdf");

      setProgress(100);

      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 1000);
    } catch {
      setIsGenerating(false);
      setProgress(0);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <Metadata
        title="Resume"
        description="Download Dedan Okware's professional resume - Software Engineer at Power Learn Project Africa and DevTrader, with WCHL 2nd Place finishes (National & Regional), and creator of developer tools trusted by thousands."
        keywords="resume, CV, software engineer, LMS developer, golang developer, WCHL, hackathon, full-stack developer, n8n automation, TypeScript developer, download resume, professional resume"
      />
      <AnimatedBackground />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* Hero Section */}
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
            Download my comprehensive resume showcasing award-winning projects,
            international achievements, and open-source tools trusted by
            thousands of developers
          </p>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF... {progress}%
                </>
              ) : (
                <>
                  <IconDownload className="w-6 h-6" />
                  Download Resume PDF
                  <IconFileTypePdf className="w-6 h-6" />
                </>
              )}
            </span>

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Progress bar */}
            {isGenerating && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-white/50 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            )}
          </button>
        </motion.div>

        {/* Resume Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-border/20 dark:border-border-dark/20">
            <div
              ref={resumeRef}
              className="p-12 bg-white"
              style={{
                fontFamily: "Arial, sans-serif",
                color: "#333",
                lineHeight: "1.6",
                padding: "48px",
                maxWidth: "1000px",
                margin: "0 auto",
                boxSizing: "border-box",
              }}
            >
              {/* Header */}
              <div
                className="text-center mb-8 pb-6 border-b-2 border-gray-300"
                style={{
                  textAlign: "center",
                  borderBottom: "2px solid #999",
                  marginBottom: "24px",
                  paddingBottom: "20px",
                }}
              >
                <h1
                  className="text-4xl font-bold text-gray-900 mb-2"
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#000",
                    textAlign: "center",
                  }}
                >
                  DEDAN OKWARE
                </h1>
                <p
                  className="text-xl text-gray-700 mb-3"
                  style={{
                    fontSize: "18px",
                    marginBottom: "12px",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  Full Stack Software Engineer | Blockchain Developer | Open Source Contributor
                </p>
                <div
                  className="flex flex-wrap justify-center gap-4 text-sm text-gray-600"
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "16px",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <span style={{ color: "#444" }}>
                    soft.eng.dedan@gmail.com
                  </span>
                  <span style={{ color: "#666" }}>|</span>
                  <span style={{ color: "#444" }}>Nairobi, Kenya</span>
                  <span style={{ color: "#666" }}>|</span>
                  <span style={{ color: "#444" }}>
                    github.com/okwareddevnest
                  </span>
                  <span style={{ color: "#666" }}>|</span>
                  <span style={{ color: "#444" }}>
                    linkedin.com/in/softcysec-dedan-okware
                  </span>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-8" style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  PROFESSIONAL SUMMARY
                </h2>
                <p
                  className="text-gray-700 leading-relaxed"
                  style={{ color: "#444", lineHeight: "1.8", fontSize: "14px" }}
                >
                  Results-driven Full Stack Software Engineer with 3+ years of experience delivering high-performance web applications, blockchain solutions, and enterprise automation systems. Currently enhancing the LMS tech ecosystem and automating Standard Operating Procedures at Power Learn Project Africa, while training and graduating 9,000+ students in Full Stack Development. Proven expertise from architecture design through production deployment, serving 50,000+ monthly users across 40+ countries. Award-winning blockchain developer with WCHL 2nd Place finishes at National (Kenya) and Regional (Africa) rounds. Core competencies: Golang, TypeScript, React, Next.js, Node.js, Python, Docker, n8n Automation, AWS, Internet Computer Protocol (ICP), and CI/CD pipelines. Creator of open-source tools trusted by 3,500+ developers globally.
                </p>
              </div>

              {/* Core Competencies - ATS Keyword Section */}
              <div className="mb-8" style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  CORE COMPETENCIES
                </h2>
                <div
                  className="grid grid-cols-3 gap-2 text-sm"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "#444" }}>• Full Stack Development</span>
                  <span style={{ color: "#444" }}>• Blockchain/Web3</span>
                  <span style={{ color: "#444" }}>• API Development</span>
                  <span style={{ color: "#444" }}>• Cloud Architecture</span>
                  <span style={{ color: "#444" }}>• System Design</span>
                  <span style={{ color: "#444" }}>• CI/CD Pipelines</span>
                  <span style={{ color: "#444" }}>• DevOps & Docker</span>
                  <span style={{ color: "#444" }}>• Agile/Scrum</span>
                  <span style={{ color: "#444" }}>• Technical Leadership</span>
                  <span style={{ color: "#444" }}>• Database Design</span>
                  <span style={{ color: "#444" }}>• Microservices</span>
                  <span style={{ color: "#444" }}>• Process Automation</span>
                </div>
              </div>

              {/* Key Achievements */}
              <div className="mb-8" style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "12px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  KEY ACHIEVEMENTS
                </h2>
                <ul
                  className="space-y-2 text-gray-700"
                  style={{ color: "#444", fontSize: "14px" }}
                >
                  <li
                    className="flex items-start"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      className="mr-2 text-blue-600 font-bold"
                      style={{
                        marginRight: "8px",
                        color: "#3b82f6",
                        fontWeight: "bold",
                      }}
                    >
                      ★
                    </span>
                    <span style={{ color: "#444" }}>
                      <strong>WCHL Blockchain Championship:</strong> Secured 2nd Place at both National (Kenya) and Regional (Africa) rounds with OHMS 2.0 AI agent platform
                    </span>
                  </li>
                  <li
                    className="flex items-start"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      className="mr-2 text-blue-600 font-bold"
                      style={{
                        marginRight: "8px",
                        color: "#3b82f6",
                        fontWeight: "bold",
                      }}
                    >
                      ★
                    </span>
                    <span style={{ color: "#444" }}>
                      <strong>Open Source Impact:</strong> Created developer tools adopted by 3,500+ users globally (Gitok: 2,000+ | U-Download: 1,500+)
                    </span>
                  </li>
                  <li
                    className="flex items-start"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      className="mr-2 text-blue-600 font-bold"
                      style={{
                        marginRight: "8px",
                        color: "#3b82f6",
                        fontWeight: "bold",
                      }}
                    >
                      ★
                    </span>
                    <span style={{ color: "#444" }}>
                      <strong>LMS Automation:</strong> Deployed n8n automation server, building 15+ webhook integrations that automated PLP SOPs and reduced manual operations by 60%
                    </span>
                  </li>
                  <li
                    className="flex items-start"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      className="mr-2 text-blue-600 font-bold"
                      style={{
                        marginRight: "8px",
                        color: "#3b82f6",
                        fontWeight: "bold",
                      }}
                    >
                      ★
                    </span>
                    <span style={{ color: "#444" }}>
                      <strong>Developer Training:</strong> Trained and graduated 9,000+ students across 3 cohorts in 2025 with 80%+ placement rate in technical roles
                    </span>
                  </li>
                </ul>
              </div>

              {/* Professional Experience */}
              <div className="mb-8" style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "16px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  PROFESSIONAL EXPERIENCE
                </h2>
                {experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    className="mb-6"
                    style={{ marginBottom: "20px", pageBreakInside: "avoid" }}
                  >
                    <div
                      className="flex justify-between items-start mb-2"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <div>
                        <h3
                          className="text-lg font-bold text-gray-900"
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: "#000",
                          }}
                        >
                          {exp.title}
                        </h3>
                        <p
                          className="text-gray-700 font-semibold"
                          style={{
                            color: "#333",
                            fontWeight: "600",
                            fontSize: "14px",
                          }}
                        >
                          {exp.company}
                        </p>
                      </div>
                      <div
                        className="text-right text-sm text-gray-600"
                        style={{
                          textAlign: "right",
                          fontSize: "13px",
                          color: "#666",
                        }}
                      >
                        <p style={{ color: "#666" }}>{exp.duration}</p>
                        <p style={{ color: "#666" }}>{exp.location}</p>
                      </div>
                    </div>
                    <ul
                      className="space-y-1 ml-4"
                      style={{ marginLeft: "16px" }}
                    >
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-gray-700 text-sm flex items-start"
                          style={{
                            color: "#444",
                            fontSize: "13px",
                            display: "flex",
                            alignItems: "flex-start",
                            marginBottom: "4px",
                          }}
                        >
                          <span className="mr-2" style={{ marginRight: "8px" }}>
                            •
                          </span>
                          <span style={{ color: "#444" }}>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Projects */}
              <div className="mb-8" style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "16px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  FEATURED PROJECTS
                </h2>
                {highlightedProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className="mb-4"
                    style={{ marginBottom: "16px" }}
                  >
                    <h3
                      className="text-lg font-bold text-gray-900"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#000",
                      }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="text-gray-700 text-sm mb-1"
                      style={{
                        color: "#444",
                        fontSize: "13px",
                        marginBottom: "4px",
                      }}
                    >
                      {project.description}
                    </p>
                    <p
                      className="text-gray-600 text-sm"
                      style={{ color: "#666", fontSize: "13px" }}
                    >
                      <span
                        className="font-semibold"
                        style={{ fontWeight: "600" }}
                      >
                        Technologies:
                      </span>{" "}
                      {project.tech.join(", ")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technical Skills */}
              <div className="mb-8" style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "16px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  TECHNICAL SKILLS
                </h2>
                {skills.map((category, idx) => (
                  <div
                    key={idx}
                    className="mb-3"
                    style={{ marginBottom: "12px" }}
                  >
                    <p
                      className="text-gray-900 font-bold mb-1"
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        marginBottom: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {category.category}:
                    </p>
                    <p
                      className="text-gray-700 text-sm"
                      style={{ color: "#444", fontSize: "13px" }}
                    >
                      {category.items.map((skill) => skill.name).join(" • ")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="mb-8" style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "16px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  CERTIFICATIONS & ACHIEVEMENTS
                </h2>
                <div
                  className="mb-2 flex justify-between items-start"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <p
                      className="text-gray-900 font-bold text-sm"
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      WCHL Regional Round (Africa) - 2nd Place
                    </p>
                    <p
                      className="text-gray-700 text-sm"
                      style={{ color: "#444", fontSize: "13px" }}
                    >
                      Internet Computer Protocol (ICP) Blockchain
                    </p>
                  </div>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ color: "#666", fontSize: "13px" }}
                  >
                    Sep 2025
                  </p>
                </div>
                <div
                  className="mb-2 flex justify-between items-start"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <p
                      className="text-gray-900 font-bold text-sm"
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      WCHL National Round (Kenya) - 2nd Place
                    </p>
                    <p
                      className="text-gray-700 text-sm"
                      style={{ color: "#444", fontSize: "13px" }}
                    >
                      Internet Computer Protocol (ICP) Blockchain
                    </p>
                  </div>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ color: "#666", fontSize: "13px" }}
                  >
                    Aug 2025
                  </p>
                </div>
                {certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="mb-2 flex justify-between items-start"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      <p
                        className="text-gray-900 font-bold text-sm"
                        style={{
                          color: "#000",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {cert.name}
                      </p>
                      <p
                        className="text-gray-700 text-sm"
                        style={{ color: "#444", fontSize: "13px" }}
                      >
                        {cert.issuer}
                      </p>
                    </div>
                    <p
                      className="text-gray-600 text-sm"
                      style={{ color: "#666", fontSize: "13px" }}
                    >
                      {cert.date}
                    </p>
                  </div>
                ))}
                <div
                  className="mb-2 flex justify-between items-start"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <p
                      className="text-gray-900 font-bold text-sm"
                      style={{
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Open Source Developer Tools
                    </p>
                    <p
                      className="text-gray-700 text-sm"
                      style={{ color: "#444", fontSize: "13px" }}
                    >
                      Creator of Gitok (2K+ users) & U-Download (1.5K+ users)
                    </p>
                  </div>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ color: "#666", fontSize: "13px" }}
                  >
                    2023-Present
                  </p>
                </div>
              </div>

              {/* Education */}
              <div style={{ marginBottom: "24px" }}>
                <h2
                  className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500"
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#000",
                    marginBottom: "16px",
                    paddingBottom: "8px",
                    borderBottom: "2px solid #3b82f6",
                  }}
                >
                  EDUCATION & TRAINING
                </h2>
                <div className="mb-3" style={{ marginBottom: "12px" }}>
                  <p
                    className="text-gray-900 font-bold"
                    style={{
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Software Engineering & Computer Science
                  </p>
                  <p
                    className="text-gray-700 text-sm"
                    style={{ color: "#444", fontSize: "13px" }}
                  >
                    Continuous learning and professional development
                  </p>
                  <p
                    className="text-gray-600 text-sm"
                    style={{ color: "#666", fontSize: "13px" }}
                  >
                    Specialized in Blockchain, AI, and Full-Stack Development
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
