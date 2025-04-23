import { useState } from 'react';
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
  duration: string;
  location: string;
  description: string;
  skills: string[];
  isRemote?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Bonded",
    logo: "/companies/bonded.png",
    title: "Software Engineer",
    type: "Freelance",
    duration: "Apr 2025 - Present · 1 mo",
    location: "Kenya",
    description: "As a Software Engineer specializing in Blockchain Development on the ICP protocol and AI, I focused on building and maintaining applications at Bonded.",
    skills: ["Engineering", "Software Infrastructure", "Blockchain Development", "ICP Protocol", "AI"],
    isRemote: true
  },
  {
    company: "Power Learn Project",
    logo: "/companies/plp.jpeg",
    title: "Assistant Instructor",
    type: "Contract",
    duration: "Oct 2024 - Present · 5 mos",
    location: "Kenya",
    description: "Currently serving as an Assistant Instructor, focusing on instructor development and coaching.",
    skills: ["Instructor Development", "Instructional Coaching"],
    isRemote: true
  },
  {
    company: "IThreeM - I3M",
    logo: "/companies/i3m.png",
    title: "Founder",
    type: "Full-time",
    duration: "Jan 2024 - Present · 1 yr 2 mos",
    location: "Kenya",
    description: "Leading as the founder of IThreeM, focusing on innovative software solutions and business development.",
    skills: ["Business Ownership", "Start-up Ventures", "Start-up Leadership", "Start-ups Management", "Early Stage Ventures", "Software Development"],
    isRemote: true
  },
  {
    company: "Freelance",
    logo: "/companies/freelance.png",
    title: "Software Developer",
    type: "Part-time",
    duration: "Jul 2023 - Present · 1 yr 8 mos",
    location: "Kenya",
    description: "Building software products revamping innovations in Africa at large",
    skills: ["Software Development", "Self-employment", "Gigs", "Commission Work", "Software Infrastructure"],
    isRemote: true
  },
  {
    company: "Open Source",
    logo: "/companies/os.png",
    title: "Open Source Developer",
    type: "Part-time",
    duration: "Jan 2023 - Present · 2 yrs 2 mos",
    location: "Remote",
    description: "Building for experience",
    skills: ["Software Infrastructure", "Open-Source Software", "OSC", "Internet Software", "Engineering", "Linux", "Blockchain Developer"],
    isRemote: true
  },
  {
    company: "Kabarak University",
    logo: "/companies/kabarak.webp",
    title: "Data Science & Machine Learning Instructor",
    type: "Contract",
    duration: "Jan 2024 - Feb 2024 · 2 mos",
    location: "Nakuru, Kenya",
    description: "Training in a Data Science & Artificial Intelligence Bootcamp that runs for two months where we train students from scratch all the way to project deployment and business ready by challenging them in a hackathon.",
    skills: ["Data Science", "API Testing", "Data Analysis", "Python (Programming Language)", "Computer Vision", "SQL", "FastAPI"]
  },
  {
    company: "Power Learn Project",
    logo: "/companies/plp.jpeg",
    title: "Assistant Instructor || Data Engineering & Analysis",
    type: "Internship",
    duration: "Oct 2022 - Jul 2023 · 10 mos",
    location: "Nairobi, Kenya",
    description: "I have been training learners in different cohorts on Python and all aspects of Web Development which would be version control(Git), Backend Development with Python etc. Data Analytics in the organization has been my suit, using Business Intelligence libraries and tools like Atoti, Apache Superset, Plotly Dash, Excel, ChartJS, Pivot tables, and Tableau among others.",
    skills: ["JavaScript", "Git", "Project Management", "Data Analysis", "Django REST Framework", "HTML5", "GitHub", "CSS", "Django", "LMS Support", "Python", "Data Analytics"]
  }
];

const ExperienceCard = ({ experience, index, onClick }: { experience: Experience; index: number; onClick: () => void }) => {
  const isEven = index % 2 === 0;

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
                <span>{experience.duration}</span>
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

  return (
    <div className="min-h-screen flex flex-col">
      <Metadata 
        title="Professional Experience"
        description="Explore Dedan Okware's professional journey, including roles at Power Learn Project, IThreeM, and various software development positions."
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
                    <span>{selectedExperience.duration}</span>
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