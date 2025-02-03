import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Modal } from '../components/Modal';
import { IconCertificate, IconCalendar, IconExternalLink } from '@tabler/icons-react';
import Image from 'next/image';

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  credentialId?: string;
  skills: string[];
  link: string;
  description?: string;
  logo?: string;
}

const categoryColors = {
  "Microsoft": "from-blue-500 to-blue-600",
  "LinkedIn": "from-cyan-500 to-cyan-600",
  "Coursera": "from-purple-500 to-purple-600",
  "IBM": "from-red-500 to-red-600",
  "Google": "from-green-500 to-green-600",
  "Dacade.org": "from-orange-500 to-orange-600",
  "Others": "from-yellow-500 to-yellow-600",
};

const certificates: Certificate[] = [
  {
    name: "Microsoft Learn Student Ambassadors Cloud Skills Challenge Event Host",
    issuer: "Microsoft",
    date: "Apr 2024",
    link: "https://example.com/microsoft1",
    description: "Hosted and managed cloud skills challenge events for student developers.",
    skills: ["Cloud Computing", "Event Management", "Azure"],
    logo: "/companies/microsoft.png"
  },
  {
    name: "Microsoft Azure for Data Engineering",
    issuer: "Microsoft",
    date: "Jul 2023",
    credentialId: "PXBS5253A4EX",
    link: "https://example.com/microsoft2",
    description: "Advanced certification in Azure Data Engineering, covering data warehousing and security.",
    skills: ["Data Warehousing", "Data Security", "Microsoft Azure"],
    logo: "/companies/microsoft.png"
  },
  {
    name: "Microsoft Learn Student Ambassador",
    issuer: "Microsoft",
    date: "Apr 2023",
    link: "https://example.com/microsoft3",
    description: "Selected as Microsoft Learn Student Ambassador to promote technology learning.",
    skills: ["Technology Advocacy", "Community Building", "Microsoft Technologies"],
    logo: "/companies/microsoft.png"
  },
  {
    name: "Create Machine Learning Models in Microsoft Azure",
    issuer: "Microsoft",
    date: "Aug 2022",
    credentialId: "MBHYP3RKJCRW",
    link: "https://example.com/microsoft4",
    description: "Certification in creating and deploying ML models using Azure ML services.",
    skills: ["Machine Learning", "Azure ML", "Model Deployment"],
    logo: "/companies/microsoft.png"
  },
  {
    name: "Microsoft Azure Machine Learning for Data Scientists",
    issuer: "Microsoft",
    date: "Aug 2022",
    credentialId: "AL2TUAXMXRLB",
    link: "https://example.com/microsoft5",
    description: "Specialized certification in Azure ML for data science applications.",
    skills: ["Machine Learning", "Data Science", "Azure ML"],
    logo: "/companies/microsoft.png"
  },
  {
    name: "Project Management Foundations",
    issuer: "LinkedIn",
    date: "Jan 2024",
    expires: "Jan 2034",
    credentialId: "45bce816be0642781d94f0407675b622c4c1595efff4431beb41c9b04cfd1fc7",
    link: "https://example.com/linkedin1",
    description: "Comprehensive training in project management methodologies.",
    skills: ["Agile Project Management", "Agile & Waterfall Methodologies"],
    logo: "/companies/linkedin.png"
  },
  {
    name: "gRPC in Python",
    issuer: "LinkedIn",
    date: "Jan 2024",
    link: "https://example.com/linkedin2",
    description: "Advanced course on implementing gRPC services in Python.",
    skills: ["Python", "gRPC", "Microservices"],
    logo: "/companies/linkedin.png"
  },
  {
    name: "Deploying Scalable Machine Learning for Data Science",
    issuer: "LinkedIn",
    date: "Jun 2023",
    link: "https://example.com/linkedin3",
    description: "Training in deploying scalable ML solutions.",
    skills: ["Data Science", "Machine Learning", "MLOps"],
    logo: "/companies/linkedin.png"
  },
  {
    name: "Assets, Threats, and Vulnerabilities",
    issuer: "Coursera",
    date: "Jun 2023",
    credentialId: "CUMBZBBEDS63",
    link: "https://example.com/coursera1",
    description: "Comprehensive study of cybersecurity fundamentals.",
    skills: ["Cryptography", "Security", "Threat Analysis"],
    logo: "/companies/coursera.png"
  },
  {
    name: "Tools of the Trade: Linux and SQL",
    issuer: "Coursera",
    date: "Jun 2023",
    credentialId: "YUDTHK4KY628",
    link: "https://example.com/coursera2",
    description: "Advanced training in Linux system administration and SQL.",
    skills: ["Linux", "SQL", "System Administration"],
    logo: "/companies/coursera.png"
  },
  {
    name: "Automate Cybersecurity Tasks with Python",
    issuer: "Coursera",
    date: "Jun 2023",
    credentialId: "BSJR729Q3KDZ",
    link: "https://example.com/coursera3",
    description: "Training in Python automation for cybersecurity tasks.",
    skills: ["Python", "Cybersecurity", "Automation"],
    logo: "/companies/coursera.png"
  },
  {
    name: "Google Cybersecurity Specialization",
    issuer: "Coursera",
    date: "Jun 2023",
    credentialId: "BRMLY2QPFRN3",
    link: "https://example.com/coursera4",
    description: "Comprehensive specialization in cybersecurity fundamentals and practices.",
    skills: ["Cybersecurity", "Network Security", "Security Operations"],
    logo: "/companies/coursera.png"
  },
  {
    name: "Foundations of Cybersecurity",
    issuer: "Coursera",
    date: "Jun 2023",
    credentialId: "24YSCWCZKPCR",
    link: "https://example.com/coursera5",
    description: "Fundamental principles of cybersecurity.",
    skills: ["Linux", "Cybersecurity Fundamentals", "Security Basics"],
    logo: "/companies/coursera.png"
  },
  {
    name: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
    date: "Jan 2023",
    credentialId: "DFNT9RETEHMF",
    link: "https://example.com/ibm1",
    description: "Advanced techniques in exploratory data analysis for ML applications.",
    skills: ["Data Analysis", "Machine Learning", "Statistics"],
    logo: "/companies/ibm.png"
  },
  {
    name: "Introduction to Cybersecurity Tools & Cyber Attacks",
    issuer: "IBM",
    date: "Jan 2023",
    credentialId: "QSNFLBJP9AWC",
    link: "https://example.com/ibm2",
    description: "Overview of cybersecurity tools and common attack vectors.",
    skills: ["Cybersecurity", "Security Tools", "Threat Detection"],
    logo: "/companies/ibm.png"
  },
  {
    name: "Introduction to Cloud Computing",
    issuer: "IBM",
    date: "Nov 2022",
    credentialId: "MVUZP36ZXTW7",
    link: "https://example.com/ibm3",
    description: "Fundamentals of cloud computing and architecture.",
    skills: ["Cloud Computing", "Software Engineering", "IBM Cloud"],
    logo: "/companies/ibm.png"
  },
  {
    name: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    date: "May 2023",
    link: "https://example.com/postman",
    description: "Expert-level certification in API testing and development using Postman.",
    skills: ["API Testing", "Back-End Development", "REST APIs", "Postman API"],
    logo: "/companies/postman.png"
  },
  {
    name: "Software Development",
    issuer: "Power Learn Project",
    date: "Jan 2023",
    credentialId: "35320215603C122",
    link: "https://example.com/plp",
    description: "Comprehensive software development training program.",
    skills: ["Test Automation", "Back-End Development", "Software Engineering"],
    logo: "/companies/plp.png"
  },
  {
    name: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    date: "Nov 2022",
    credentialId: "UVXXCHKWUW7S",
    link: "https://example.com/google",
    description: "Fundamentals of UX design principles and practices.",
    skills: ["UX Design", "User Research", "Design Thinking"],
    logo: "/companies/google.png"
  },
  {
    name: "Data Science & Machine Learning",
    issuer: "Kabarak University",
    date: "February 2024",
    link: "https://example.com/kabarak1",
    description: "Advanced training in Data Science and Machine Learning, covering Python, Data Analysis, Computer Vision, and Deep Learning.",
    skills: ["Python", "Data Science", "Machine Learning", "Computer Vision", "Deep Learning"],
    logo: "/companies/kabarak.png"
  },
  {
    name: "AI & Machine Learning Bootcamp",
    issuer: "Kabarak University",
    date: "February 2023",
    link: "https://example.com/kabarak2",
    description: "Intensive 5-week bootcamp covering AI fundamentals, NumPy, Pandas, Computer Vision, Deep Learning, and FastAPI deployment.",
    skills: ["AI", "NumPy", "Pandas", "Computer Vision", "Deep Learning", "FastAPI"],
    logo: "/companies/kabarak.png"
  },
  {
    name: "ICP TypeScript Smart Contract 101",
    issuer: "Dacade.org",
    date: "2023",
    link: "https://dacade.org/achievements/d18c8404-7900-4dfa-96e9-79a0bab5a439",
    description: "Advanced certification in Internet Computer Protocol (ICP) smart contract development using TypeScript, covering blockchain fundamentals and dApp development.",
    skills: ["TypeScript", "Smart Contracts", "ICP", "Blockchain", "DApp Development"],
    logo: "/companies/dacade.png"
  },
  {
    name: "ICP Rust Smart Contract 101",
    issuer: "Dacade.org",
    date: "2024",
    link: "https://dacade.org/achievements/46a69cb6-5ffa-408b-8d65-5f3cfe0d2eba",
    description: "Comprehensive training in developing smart contracts on the Internet Computer Protocol using Rust, focusing on performance and security.",
    skills: ["Rust", "Smart Contracts", "ICP", "Blockchain", "Systems Programming"],
    logo: "/companies/dacade.png"
  }
];

const CertificateCard = ({ certificate, onClick }: { certificate: Certificate; onClick: () => void }) => {
  const color = categoryColors[certificate.issuer as keyof typeof categoryColors] || categoryColors["Others"];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${color} bg-opacity-5 backdrop-blur-sm
                 border border-border/10 dark:border-border-dark/10
                 p-6 rounded-xl shadow-lg
                 hover:shadow-xl transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4 mb-4">
        {certificate.logo ? (
          <div className="relative w-12 h-12">
            <Image
              src={certificate.logo}
              alt={certificate.issuer}
              className="rounded-full"
              fill
              sizes="48px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center">
            <IconCertificate className="w-6 h-6 text-primary dark:text-primary-dark" />
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-text dark:text-text-dark">{certificate.name}</h3>
          <p className="text-text/60 dark:text-text-dark/60">{certificate.issuer}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-text/60 dark:text-text-dark/60 mb-4">
        <IconCalendar className="w-4 h-4" />
        <span>{certificate.date}</span>
      </div>

      {certificate.skills && (
        <div className="flex flex-wrap gap-2">
          {certificate.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className={`px-2 py-1 text-xs rounded-full
                       bg-white/10 dark:bg-white/5
                       text-text dark:text-text-dark`}
            >
              {skill}
            </span>
          ))}
          {certificate.skills.length > 3 && (
            <span className={`px-2 py-1 text-xs rounded-full
                         bg-white/10 dark:bg-white/5
                         text-text dark:text-text-dark`}>
              +{certificate.skills.length - 3} more
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1
          className="text-5xl font-bold mb-16 text-center text-text dark:text-text-dark"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Certificates & Achievements
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certificates.map((certificate) => (
            <motion.div
              key={`${certificate.name}-${certificate.date}`}
              variants={itemVariants}
            >
              <CertificateCard
                certificate={certificate}
                onClick={() => setSelectedCertificate(certificate)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />

      <Modal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        title={selectedCertificate?.name}
      >
        {selectedCertificate && (
          <div className="space-y-6">
            <div className={`-mx-6 -mt-6 p-6 bg-gradient-to-br ${categoryColors[selectedCertificate.issuer as keyof typeof categoryColors] || categoryColors["Others"]} mb-6`}>
              <div className="flex items-center gap-4">
                {selectedCertificate.logo ? (
                  <div className="relative w-16 h-16">
                    <Image
                      src={selectedCertificate.logo}
                      alt={selectedCertificate.issuer}
                      className="rounded-full"
                      fill
                      sizes="64px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <IconCertificate className="w-8 h-8 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedCertificate.issuer}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80">
                    <IconCalendar className="w-5 h-5" />
                    <span>{selectedCertificate.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedCertificate.credentialId && (
              <div className="text-sm text-text/60 dark:text-text-dark/60">
                <span className="font-medium">Credential ID:</span> {selectedCertificate.credentialId}
              </div>
            )}

            {selectedCertificate.description && (
              <div className="prose dark:prose-invert max-w-none">
                <p>{selectedCertificate.description}</p>
              </div>
            )}

            {selectedCertificate.skills && (
              <div>
                <h4 className="text-lg font-semibold mb-3 text-text dark:text-text-dark">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCertificate.skills.map((skill) => (
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

            <a
              href={selectedCertificate.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md
                       bg-primary text-white hover:bg-primary/90
                       dark:bg-primary-dark dark:hover:bg-primary-dark/90
                       transition-colors"
            >
              <IconExternalLink className="w-5 h-5" />
              View Certificate
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Certificates;