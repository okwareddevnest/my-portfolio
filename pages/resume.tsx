import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { usePortfolioStore } from '../store/store';
import { motion } from 'framer-motion';
import { Metadata } from '../components/Metadata';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IconDownload, IconFileTypePdf, IconSparkles, IconRocket } from '@tabler/icons-react';

const Resume = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const resumeRef = useRef<HTMLDivElement>(null);
  
  const { skills, certificates } = usePortfolioStore();

  const experiences = [
    {
      company: "OHMS - Onchain Hosting for Multi-Agent Systems",
      title: "Founder & Lead Engineer",
      duration: "Jul 2025 - Present",
      location: "Remote",
      achievements: [
        "Founded and currently leading development of autonomous AI agent platform",
        "Won WCHL (World Computer Hacker League) Qualifications & Regional Round (Africa) - 4-month hackathon phase",
        "Pitched at WCHL Global Finale among best projects worldwide",
        "Building sophisticated multi-agent AI architecture on Internet Computer",
        "Integrating LLM providers via secure HTTPS outcalls with ongoing platform scaling"
      ]
    },
    {
      company: "Bonded",
      title: "Software Engineer",
      duration: "Apr 2025 - Jun 2025",
      location: "Kenya",
      achievements: [
        "Specialized in Blockchain Development on ICP protocol",
        "Developed and maintained AI-powered applications",
        "Delivered enterprise-grade software solutions"
      ]
    },
    {
      company: "Power Learn Project",
      title: "Module Lead Instructor",
      duration: "Oct 2024 - Present",
      location: "Kenya",
      achievements: [
        "Leading curriculum development and instruction across multiple cohorts",
        "Part of team that trained over 10,000 developers across Africa",
        "Responsible for module design, content delivery, and mentoring instructors",
        "Empowering next generation of software engineers"
      ]
    },
    {
      company: "IThreeM - I3M",
      title: "Founder",
      duration: "Jan 2024 - Present",
      location: "Kenya",
      achievements: [
        "Founded decentralized gaming engine on ICP Blockchain",
        "Leading innovative software solutions and business development",
        "Building platform for 2D and 3D blockchain games"
      ]
    },
    {
      company: "Freelance",
      title: "Software Developer",
      duration: "Jul 2023 - Present",
      location: "Kenya",
      achievements: [
        "Building software products revamping innovations in Africa",
        "Delivering custom software solutions for diverse clients",
        "Full-stack development and software architecture"
      ]
    },
    {
      company: "Open Source",
      title: "Open Source Developer",
      duration: "Jan 2023 - Present",
      location: "Remote",
      achievements: [
        "Contributing to open-source projects and communities",
        "Building tools and libraries for developer productivity",
        "Blockchain and Linux systems development"
      ]
    },
    {
      company: "Kabarak University",
      title: "Data Science & Machine Learning Instructor",
      duration: "Jan 2024 - Feb 2024",
      location: "Nakuru, Kenya",
      achievements: [
        "Trained students in Data Science & AI Bootcamp (2 months intensive)",
        "Covered full stack from basics to project deployment",
        "Mentored students through hackathon challenges",
        "Technologies: Python, Computer Vision, SQL, FastAPI"
      ]
    },
    {
      company: "Power Learn Project",
      title: "Assistant Instructor - Data Engineering & Analysis",
      duration: "Oct 2022 - Jul 2023",
      location: "Nairobi, Kenya",
      achievements: [
        "Trained thousands of learners across multiple cohorts in Python and Web Development",
        "Specialized in Data Analytics using BI tools: Atoti, Apache Superset, Plotly Dash, Tableau",
        "Taught version control (Git), Backend Development, Django, and data analysis",
        "Contributed to training 10,000+ developers across Africa"
      ]
    }
  ];

  const highlightedProjects = [
    {
      name: "OHMS 2.0",
      description: "Award-winning autonomous AI agent platform - WCHL Regional Champion (Africa) & Global Finalist",
      tech: ["Rust", "TypeScript", "React 19", "ICP", "AI Agents", "LLM Integration"]
    },
    {
      name: "U-Download",
      description: "Cross-platform YouTube downloader trusted by 1,500+ users worldwide",
      tech: ["Rust", "Tauri", "React", "TypeScript"]
    },
    {
      name: "Gitok",
      description: "Git productivity tool adopted by 2,000+ developers worldwide",
      tech: ["Shell Script", "Bash", "Fish Shell", "Git", "CI/CD"]
    },
    {
      name: "RSON",
      description: "Next-generation data serialization format evolving JSON",
      tech: ["Rust", "Serde", "TypeScript", "Python", "Parser"]
    }
  ];

  const generatePDF = async () => {
    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    setProgress(10);

    try {
      // Capture the resume content with optimized settings
      setProgress(30);
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,  // Reduced from 3 to 2 for smaller file size
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200,
        windowHeight: resumeRef.current.scrollHeight,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        imageTimeout: 0,
        removeContainer: false
      });
      
      setProgress(60);
      
      // Create PDF with compression
      const imgData = canvas.toDataURL('image/jpeg', 0.85); // JPEG with 85% quality instead of PNG
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true  // Enable PDF compression
      });

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const margin = 10; // 10mm margins on all sides
      const contentWidth = pdfWidth - (margin * 2); // 190mm usable width
      
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = margin; // Start with top margin

      // Add first page
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight, undefined, 'FAST'); // JPEG compression
      heightLeft -= (pdfHeight - margin * 2);

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = -(imgHeight - heightLeft) + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= (pdfHeight - margin * 2);
      }

      setProgress(90);

      // Download the PDF
      pdf.save('Dedan_Okware_Resume.pdf');
      
      setProgress(100);
      
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 1000);
    } catch {
      setIsGenerating(false);
      setProgress(0);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <Metadata 
        title="Resume"
        description="Download Dedan Okware's professional resume - Founder & Lead Engineer of OHMS 2.0, WCHL Regional Champion, and technical instructor training 10,000+ developers across Africa."
        keywords="resume, CV, software engineer, blockchain developer, AI engineer, OHMS, WCHL winner, download resume, professional resume"
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
            Download my comprehensive resume showcasing award-winning projects, international achievements, and impact training 10,000+ developers
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
            <div ref={resumeRef} className="p-12 bg-white" style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: '1.6', padding: '48px', maxWidth: '1000px', margin: '0 auto', boxSizing: 'border-box' }}>
              {/* Header */}
              <div className="text-center mb-8 pb-6 border-b-2 border-gray-300" style={{ textAlign: 'center', borderBottom: '2px solid #999', marginBottom: '24px', paddingBottom: '20px' }}>
                <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px', color: '#000', textAlign: 'center' }}>DEDAN OKWARE</h1>
                <p className="text-xl text-gray-700 mb-3" style={{ fontSize: '18px', marginBottom: '12px', color: '#333', textAlign: 'center' }}>Software Engineer | AI & Blockchain Specialist | Technical Educator</p>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600" style={{ fontSize: '14px', color: '#666', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', textAlign: 'center', width: '100%' }}>
                  <span style={{ color: '#666' }}>📧 soft.eng.dedan@gmail.com</span>
                  <span style={{ color: '#666' }}>📍 Kenya</span>
                  <span style={{ color: '#666' }}>🌐 github.com/okwareddevnest</span>
                  <span style={{ color: '#666' }}>🔗 linkedin.com/in/softcysec-dedan-okware</span>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="mb-8" style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500" style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>PROFESSIONAL SUMMARY</h2>
                <p className="text-gray-700 leading-relaxed" style={{ color: '#444', lineHeight: '1.8', fontSize: '14px' }}>
                  Award-winning Software Engineer and Founder of OHMS 2.0 (Onchain Hosting for Multi-Agent Systems), currently leading ongoing development after winning WCHL Regional Championship (Africa) during the 4-month hackathon phase and competing at the Global Finals. Also founder of IThreeM, a decentralized gaming engine on ICP Blockchain. Technical educator with proven impact training over 10,000 developers across Africa through Power Learn Project. Expertise in Rust, blockchain development, AI agent systems, full-stack web development, and developer education.
                </p>
              </div>

              {/* Key Achievements */}
              <div className="mb-8" style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500" style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>KEY ACHIEVEMENTS</h2>
                <ul className="space-y-2 text-gray-700" style={{ color: '#444', fontSize: '14px' }}>
                  <li className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span className="mr-2 text-blue-600 font-bold" style={{ marginRight: '8px', color: '#3b82f6', fontWeight: 'bold' }}>🏆</span>
                    <span style={{ color: '#444' }}>Winner of WCHL (World Computer Hacker League) Qualifications & Regional Round (Africa)</span>
                  </li>
                  <li className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span className="mr-2 text-blue-600 font-bold" style={{ marginRight: '8px', color: '#3b82f6', fontWeight: 'bold' }}>🌍</span>
                    <span style={{ color: '#444' }}>WCHL Global Finale Participant - Pitched among best projects worldwide</span>
                  </li>
                  <li className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span className="mr-2 text-blue-600 font-bold" style={{ marginRight: '8px', color: '#3b82f6', fontWeight: 'bold' }}>👥</span>
                    <span style={{ color: '#444' }}>Trained over 10,000 developers across Africa through Power Learn Project</span>
                  </li>
                  <li className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span className="mr-2 text-blue-600 font-bold" style={{ marginRight: '8px', color: '#3b82f6', fontWeight: 'bold' }}>📱</span>
                    <span style={{ color: '#444' }}>U-Download: Trusted by 1,500+ users worldwide</span>
                  </li>
                  <li className="flex items-start" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <span className="mr-2 text-blue-600 font-bold" style={{ marginRight: '8px', color: '#3b82f6', fontWeight: 'bold' }}>💻</span>
                    <span style={{ color: '#444' }}>Gitok: Adopted by 2,000+ developers globally</span>
                  </li>
                </ul>
              </div>

              {/* Professional Experience */}
              <div className="mb-8" style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500" style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>PROFESSIONAL EXPERIENCE</h2>
                {experiences.map((exp, idx) => (
                  <div key={idx} className="mb-6" style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
                    <div className="flex justify-between items-start mb-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900" style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>{exp.title}</h3>
                        <p className="text-gray-700 font-semibold" style={{ color: '#333', fontWeight: '600', fontSize: '14px' }}>{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600" style={{ textAlign: 'right', fontSize: '13px', color: '#666' }}>
                        <p style={{ color: '#666' }}>{exp.duration}</p>
                        <p style={{ color: '#666' }}>{exp.location}</p>
                      </div>
                    </div>
                    <ul className="space-y-1 ml-4" style={{ marginLeft: '16px' }}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-700 text-sm flex items-start" style={{ color: '#444', fontSize: '13px', display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <span className="mr-2" style={{ marginRight: '8px' }}>•</span>
                          <span style={{ color: '#444' }}>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Projects */}
              <div className="mb-8" style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500" style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>FEATURED PROJECTS</h2>
                {highlightedProjects.map((project, idx) => (
                  <div key={idx} className="mb-4" style={{ marginBottom: '16px' }}>
                    <h3 className="text-lg font-bold text-gray-900" style={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>{project.name}</h3>
                    <p className="text-gray-700 text-sm mb-1" style={{ color: '#444', fontSize: '13px', marginBottom: '4px' }}>{project.description}</p>
                    <p className="text-gray-600 text-sm" style={{ color: '#666', fontSize: '13px' }}>
                      <span className="font-semibold" style={{ fontWeight: '600' }}>Technologies:</span> {project.tech.join(', ')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technical Skills */}
              <div className="mb-8" style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500" style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>TECHNICAL SKILLS</h2>
                {skills.map((category, idx) => (
                  <div key={idx} className="mb-3" style={{ marginBottom: '12px' }}>
                    <p className="text-gray-900 font-bold mb-1" style={{ color: '#000', fontWeight: 'bold', marginBottom: '4px', fontSize: '14px' }}>{category.category}:</p>
                    <p className="text-gray-700 text-sm" style={{ color: '#444', fontSize: '13px' }}>
                      {category.items.map(skill => skill.name).join(' • ')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div className="mb-8" style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500" style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>CERTIFICATIONS & ACHIEVEMENTS</h2>
                <div className="mb-2 flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <p className="text-gray-900 font-bold text-sm" style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>WCHL (World Computer Hacker League) - Regional Champion</p>
                    <p className="text-gray-700 text-sm" style={{ color: '#444', fontSize: '13px' }}>Internet Computer Protocol (ICP) Blockchain</p>
                  </div>
                  <p className="text-gray-600 text-sm" style={{ color: '#666', fontSize: '13px' }}>2025</p>
                </div>
                <div className="mb-2 flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <p className="text-gray-900 font-bold text-sm" style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>WCHL Global Finale Participant</p>
                    <p className="text-gray-700 text-sm" style={{ color: '#444', fontSize: '13px' }}>Internet Computer Protocol (ICP) Blockchain</p>
                  </div>
                  <p className="text-gray-600 text-sm" style={{ color: '#666', fontSize: '13px' }}>2025</p>
                </div>
                {certificates.map((cert, idx) => (
                  <div key={idx} className="mb-2 flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <p className="text-gray-900 font-bold text-sm" style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>{cert.name}</p>
                      <p className="text-gray-700 text-sm" style={{ color: '#444', fontSize: '13px' }}>{cert.issuer}</p>
                    </div>
                    <p className="text-gray-600 text-sm" style={{ color: '#666', fontSize: '13px' }}>{cert.date}</p>
                  </div>
                ))}
                <div className="mb-2 flex justify-between items-start" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <p className="text-gray-900 font-bold text-sm" style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Power Learn Project - Trained 10,000+ Developers</p>
                    <p className="text-gray-700 text-sm" style={{ color: '#444', fontSize: '13px' }}>Module Lead Instructor</p>
                  </div>
                  <p className="text-gray-600 text-sm" style={{ color: '#666', fontSize: '13px' }}>2024-Present</p>
                </div>
              </div>

              {/* Education */}
              <div style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500" style={{ fontSize: '24px', fontWeight: 'bold', color: '#000', marginBottom: '16px', paddingBottom: '8px', borderBottom: '2px solid #3b82f6' }}>EDUCATION & TRAINING</h2>
                <div className="mb-3" style={{ marginBottom: '12px' }}>
                  <p className="text-gray-900 font-bold" style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Software Engineering & Computer Science</p>
                  <p className="text-gray-700 text-sm" style={{ color: '#444', fontSize: '13px' }}>Continuous learning and professional development</p>
                  <p className="text-gray-600 text-sm" style={{ color: '#666', fontSize: '13px' }}>Specialized in Blockchain, AI, and Full-Stack Development</p>
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

