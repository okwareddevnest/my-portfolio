import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Modal } from '../components/Modal';
import { IconCalendar, IconMapPin, IconBuildingSkyscraper, IconDevices } from '@tabler/icons-react';
import Image from 'next/image';
import { Metadata } from '../components/Metadata';

interface Experience {
  company: string;
  logo?: string;
  title: string;
  type: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
  skills: string[];
  isRemote?: boolean;
}

// Function to calculate duration between dates
const calculateDuration = (startDate: string, endDate?: string): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let duration = '';
  if (years > 0) {
    duration += `${years} yr${years > 1 ? 's' : ''}`;
  }

  if (months > 0 || years === 0) {
    if (years > 0) duration += ' ';
    duration += `${months} mo${months > 1 ? 's' : ''}`;
  }

  return duration;
};

// Format date for display (e.g., "Apr 2025")
const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Generate the full duration string (e.g., "Apr 2025 - Present · 1 yr 2 mos")
const getDurationString = (startDate: string, endDate?: string): string => {
  const formattedStart = formatDateDisplay(startDate);
  const formattedEnd = endDate ? formatDateDisplay(endDate) : 'Present';
  const duration = calculateDuration(startDate, endDate);

  return `${formattedStart} - ${formattedEnd} · ${duration}`;
};

const experiences: Experience[] = [
  {
    company: "The Chaincademy",
    logo: "/companies/thechaincademy_logo.jpeg",
    title: "Software Engineer",
    type: "Contract",
    startDate: "2025-08-01",
    location: "United Kingdom",
    description: "Design and build user interfaces, develop backend logic, manage databases, integrate systems, implement authentication, work with Blockchain/Web3, develop APIs, ensure security and performance, test/debug, deploy to cloud, collaborate via version control, and maintain high code quality and documentation.",
    skills: ["Software Design", "Software Infrastructure", "Blockchain Development", "Web3", "API Development", "Full-Stack Development", "System Integration", "Cloud Deployment"],
    isRemote: true
  },
  {
    company: "Bonded",
    logo: "/companies/bonded.png",
    title: "Software Engineer",
    type: "Freelance",
    startDate: "2025-04-01",
    endDate: "2025-07-31",
    location: "London, United Kingdom",
    description: "As a Software Engineer specializing in Blockchain Development on the ICP protocol and AI, I focused on building and maintaining applications at Bonded.",
    skills: ["Engineering", "Software Infrastructure", "Blockchain Development", "ICP Protocol", "AI"],
    isRemote: true
  },
  {
    company: "Freelance",
    logo: "/companies/freelance.png",
    title: "Freelance Software Engineer",
    type: "Part-time",
    startDate: "2023-04-01",
    endDate: "2025-03-31",
    location: "Kenya",
    description: "Delivered full-stack web applications and blockchain solutions for diverse clients across Africa and globally. Built custom software products, APIs, and decentralized applications using modern technologies including React, TypeScript, Node.js, Python, and ICP blockchain. Specialized in creating scalable, production-ready systems with robust architecture and security best practices.",
    skills: ["Full-Stack Development", "Blockchain Development", "API Development", "Software Architecture", "React", "TypeScript", "Node.js", "Python"],
    isRemote: true
  },
  {
    company: "Open Source",
    logo: "/companies/os.png",
    title: "Open Source Developer",
    type: "Part-time",
    startDate: "2023-01-01",
    location: "Remote",
    description: "Active contributor to open-source projects and communities. Building developer tools and libraries that enhance productivity for thousands of developers worldwide. Created Gitok (2,000+ users) and U-Download (1,500+ users) among other impactful projects.",
    skills: ["Software Infrastructure", "Open-Source Software", "OSC", "Internet Software", "Engineering", "Linux", "Blockchain Developer"],
    isRemote: true
  }
];

const ExperienceCard = ({ experience, index, onClick }: { experience: Experience; index: number; onClick: () => void }) => {
  const isEven = index % 2 === 0;
  const [durationString, setDurationString] = useState('');

  useEffect(() => {
    setDurationString(getDurationString(experience.startDate, experience.endDate));

    // Update duration every day at midnight
    const timer = setInterval(() => {
      setDurationString(getDurationString(experience.startDate, experience.endDate));
    }, 86400000); // 24 hours

    return () => clearInterval(timer);
  }, [experience.startDate, experience.endDate]);

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className={`relative flex items-center ${isEven ? 'justify-end' : ''} cursor-pointer group`}
    >
      <div className={`w-full md:w-5/12 ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card dark:bg-card-dark p-6 rounded-xl shadow-lg
                     border border-border/10 dark:border-border-dark/10
                     hover:shadow-xl transition-all relative overflow-hidden"
        >
          {experience.logo && (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="absolute opacity-[0.12] dark:opacity-[0.15]">
                <Image
                  src={experience.logo}
                  alt=""
                  width={200}
                  height={200}
                  style={{ objectFit: 'contain' }}
                  className="w-64 h-64 max-w-none"
                />
              </div>
            </div>
          )}
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              {experience.logo ? (
                <div className="relative w-12 h-12">
                  <Image
                    src={experience.logo}
                    alt={experience.company}
                    className="rounded-full"
                    fill
                    sizes="48px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center">
                  <IconBuildingSkyscraper className="w-6 h-6 text-primary dark:text-primary-dark" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-text dark:text-text-dark">{experience.title}</h3>
                <p className="text-text/60 dark:text-text-dark/60">{experience.company}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text/60 dark:text-text-dark/60">
                <IconCalendar className="w-4 h-4" />
                <span>{durationString}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text/60 dark:text-text-dark/60">
                <IconMapPin className="w-4 h-4" />
                <span>{experience.location}</span>
                {experience.isRemote && (
                  <span className="flex items-center gap-1">
                    <IconDevices className="w-4 h-4" />
                    Remote
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {experience.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs rounded-full
                           bg-primary/10 dark:bg-primary-dark/10
                           text-primary dark:text-primary-dark"
                >
                  {skill}
                </span>
              ))}
              {experience.skills.length > 3 && (
                <span className="px-2 py-1 text-xs rounded-full
                             bg-primary/10 dark:bg-primary-dark/10
                             text-primary dark:text-primary-dark">
                  +{experience.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [durationStrings, setDurationStrings] = useState<Record<string, string>>({});

  useEffect(() => {
    // Initialize duration strings for all experiences
    const initialDurations: Record<string, string> = {};
    experiences.forEach(exp => {
      const key = `${exp.company}-${exp.title}`;
      initialDurations[key] = getDurationString(exp.startDate, exp.endDate);
    });
    setDurationStrings(initialDurations);

    // Update durations every day
    const timer = setInterval(() => {
      const updatedDurations: Record<string, string> = {};
      experiences.forEach(exp => {
        const key = `${exp.company}-${exp.title}`;
        updatedDurations[key] = getDurationString(exp.startDate, exp.endDate);
      });
      setDurationStrings(updatedDurations);
    }, 86400000); // 24 hours

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Metadata
        title="Professional Experience"
        description="Explore Dedan Okware's professional journey as a Software Engineer, including roles at The Chaincademy, OHMS, Bonded, IThreeM, and various full-stack development positions."
        keywords="software engineer experience, blockchain developer, ICP developer, rust developer, typescript developer, web development experience, decentralized gaming, IThreeM founder"
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
                key={`${experience.company}-${experience.title}`}
                experience={experience}
                index={index}
                onClick={() => setSelectedExperience(experience)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />

      <Modal
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
        title={selectedExperience?.title}
      >
        {selectedExperience && (
          <div className="space-y-6 relative">
            {selectedExperience.logo && (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="absolute opacity-[0.12] dark:opacity-[0.15] pointer-events-none">
                  <Image
                    src={selectedExperience.logo}
                    alt=""
                    width={300}
                    height={300}
                    style={{ objectFit: 'contain' }}
                    className="w-96 h-96 max-w-none"
                  />
                </div>
              </div>
            )}
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                {selectedExperience.logo ? (
                  <div className="relative w-16 h-16">
                    <Image
                      src={selectedExperience.logo}
                      alt={selectedExperience.company}
                      className="rounded-full"
                      fill
                      sizes="64px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary-dark/10 flex items-center justify-center">
                    <IconBuildingSkyscraper className="w-8 h-8 text-primary dark:text-primary-dark" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-text dark:text-text-dark">
                    {selectedExperience.company}
                  </h3>
                  <div className="flex items-center gap-2 text-text/60 dark:text-text-dark/60">
                    <IconCalendar className="w-5 h-5" />
                    <span>{selectedExperience && durationStrings[`${selectedExperience.company}-${selectedExperience.title}`]}</span>
                  </div>
                </div>
              </div>

              {selectedExperience.description && (
                <div className="prose dark:prose-invert max-w-none mt-4">
                  <p>{selectedExperience.description}</p>
                </div>
              )}

              {selectedExperience.skills && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold mb-3 text-text dark:text-text-dark">
                    Skills & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.skills.map((skill) => (
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