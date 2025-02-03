import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../store/store';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import { Metadata } from '../components/Metadata';

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <motion.div 
      className="w-full group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">{name}</span>
        <span className="text-sm font-medium text-text/60 dark:text-text-dark/60">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-primary to-accent dark:from-primary-dark dark:to-accent h-2.5"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: `${level}%`, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

type CategoryKey = 
  | "Programming Languages"
  | "Frontend Frameworks & Libraries"
  | "Backend Technologies"
  | "Blockchain Development"
  | "AI & Machine Learning"
  | "DevOps & Tools";

const categoryColors: Record<CategoryKey, string> = {
  "Programming Languages": "from-blue-500 to-purple-500",
  "Frontend Frameworks & Libraries": "from-pink-500 to-orange-500",
  "Backend Technologies": "from-green-500 to-teal-500",
  "Blockchain Development": "from-indigo-500 to-blue-500",
  "AI & Machine Learning": "from-purple-500 to-pink-500",
  "DevOps & Tools": "from-orange-500 to-yellow-500"
};

const categoryIcons: Record<CategoryKey, string> = {
  "Programming Languages": "💻",
  "Frontend Frameworks & Libraries": "🎨",
  "Backend Technologies": "⚙️",
  "Blockchain Development": "⛓️",
  "AI & Machine Learning": "🤖",
  "DevOps & Tools": "🛠️"
};

const Skills = () => {
  const skills = usePortfolioStore((state) => state.skills);
  const [selectedCategory, setSelectedCategory] = useState<typeof skills[0] | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <Metadata 
        title="Skills & Expertise"
        description="Discover my comprehensive skill set in software engineering, blockchain development, AI/ML, and cloud technologies. Expertise in Rust, TypeScript, Python, and more."
        keywords="software engineering, blockchain development, rust programming, typescript, python, AI/ML, cloud computing, ICP, web3"
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
          Skills & Expertise
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skills.map((category) => (
            <motion.div
              key={category.category}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className={`bg-gradient-to-br ${categoryColors[category.category as CategoryKey]} bg-opacity-5 backdrop-blur-sm
                         border border-border/10 dark:border-border-dark/10 rounded-xl p-6
                         shadow-lg hover:shadow-xl transition-all cursor-pointer
                         dark:bg-card-dark/30`}
              onClick={() => setSelectedCategory(category)}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{categoryIcons[category.category as CategoryKey]}</span>
                <h2 className="text-2xl font-bold text-text dark:text-text-dark
                             bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {category.category}
                </h2>
              </div>
              <p className="text-text/60 dark:text-text-dark/60 mb-4">
                {category.items.length} Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {category.items.slice(0, 3).map((skill) => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 bg-primary/10 dark:bg-primary-dark/10 rounded-full
                             text-sm text-primary dark:text-primary-dark"
                  >
                    {skill.name}
                  </span>
                ))}
                {category.items.length > 3 && (
                  <span className="px-3 py-1 bg-primary/10 dark:bg-primary-dark/10 rounded-full
                                 text-sm text-primary dark:text-primary-dark">
                    +{category.items.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />

      <Modal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.category}
      >
        {selectedCategory && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">{categoryIcons[selectedCategory.category as CategoryKey]}</span>
              <div>
                <h3 className="text-xl font-bold text-text dark:text-text-dark">
                  {selectedCategory.category}
                </h3>
                <p className="text-text/60 dark:text-text-dark/60">
                  {selectedCategory.items.length} Skills
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {selectedCategory.items.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Skills;