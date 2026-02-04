import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { motion } from "framer-motion";
import { usePortfolioStore } from "../store/store";
import { Modal } from "../components/Modal";
import { useState } from "react";
import { Metadata } from "../components/Metadata";
import {
  IconCode,
  IconBrandReact,
  IconServer,
  IconCurrency,
  IconBrain,
  IconSettings,
  IconChevronRight,
  IconTrendingUp,
} from "@tabler/icons-react";

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <motion.div
      className="w-full group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-text dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
          {name}
        </span>
        <span className="text-xs font-medium text-text/50 dark:text-text-dark/50 bg-primary/10 dark:bg-primary-dark/10 px-2 py-0.5 rounded-full">
          {level}%
        </span>
      </div>
      <div className="w-full bg-gray-100/50 dark:bg-gray-800/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent dark:from-primary-dark dark:to-accent-dark"
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

const categoryColors: Record<
  CategoryKey,
  { bg: string; border: string; icon: string }
> = {
  "Programming Languages": {
    bg: "from-blue-500/10 via-purple-500/5 to-indigo-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-500",
  },
  "Frontend Frameworks & Libraries": {
    bg: "from-pink-500/10 via-rose-500/5 to-orange-500/10",
    border: "border-pink-500/20",
    icon: "text-pink-500",
  },
  "Backend Technologies": {
    bg: "from-emerald-500/10 via-teal-500/5 to-cyan-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-500",
  },
  "Blockchain Development": {
    bg: "from-indigo-500/10 via-blue-500/5 to-cyan-500/10",
    border: "border-indigo-500/20",
    icon: "text-indigo-500",
  },
  "AI & Machine Learning": {
    bg: "from-violet-500/10 via-purple-500/5 to-fuchsia-500/10",
    border: "border-violet-500/20",
    icon: "text-violet-500",
  },
  "DevOps & Tools": {
    bg: "from-amber-500/10 via-orange-500/5 to-yellow-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-500",
  },
};

const categoryIcons: Record<CategoryKey, React.ReactNode> = {
  "Programming Languages": <IconCode className="w-6 h-6" />,
  "Frontend Frameworks & Libraries": <IconBrandReact className="w-6 h-6" />,
  "Backend Technologies": <IconServer className="w-6 h-6" />,
  "Blockchain Development": <IconCurrency className="w-6 h-6" />,
  "AI & Machine Learning": <IconBrain className="w-6 h-6" />,
  "DevOps & Tools": <IconSettings className="w-6 h-6" />,
};

const Skills = () => {
  const skills = usePortfolioStore((state) => state.skills);
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof skills)[0] | null
  >(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  // Calculate average skill level for each category
  const getAverageLevel = (items: { level: number }[]) => {
    const sum = items.reduce((acc, item) => acc + item.level, 0);
    return Math.round(sum / items.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <Metadata
        title="Skills & Expertise"
        description="Discover my comprehensive skill set in software engineering, blockchain development, AI/ML, and cloud technologies. Expertise in Golang, Rust, TypeScript, Python, and more."
        keywords="software engineering, mobile development, flutter, blockchain development, rust programming, golang, typescript, python, AI/ML, cloud computing, ICP, web3, n8n automation"
      />
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text dark:text-text-dark">
            Skills & Expertise
          </h1>
          <p className="text-text/60 dark:text-text-dark/60 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency
            levels across different domains of software engineering.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skills.map((category) => {
            const colors = categoryColors[category.category as CategoryKey];
            const icon = categoryIcons[category.category as CategoryKey];
            const avgLevel = getAverageLevel(category.items);

            return (
              <motion.div
                key={category.category}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className={`relative bg-gradient-to-br ${colors.bg} 
                           backdrop-blur-xl border ${colors.border}
                           rounded-2xl p-6 cursor-pointer group
                           shadow-lg hover:shadow-xl transition-all duration-300
                           dark:bg-black/20`}
                onClick={() => setSelectedCategory(category)}
              >
                {/* Floating orb decoration */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`p-3 rounded-xl bg-white/50 dark:bg-white/10 backdrop-blur-sm ${colors.icon}`}
                    >
                      {icon}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text/50 dark:text-text-dark/50">
                      <IconTrendingUp className="w-4 h-4" />
                      <span className="font-medium">{avgLevel}% avg</span>
                    </div>
                  </div>

                  {/* Title and count */}
                  <h2 className="text-lg font-bold text-text dark:text-text-dark mb-2 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors">
                    {category.category}
                  </h2>
                  <p className="text-sm text-text/50 dark:text-text-dark/50 mb-5">
                    {category.items.length} technologies
                  </p>

                  {/* Skill preview tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.items.slice(0, 4).map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 bg-white/60 dark:bg-white/10 backdrop-blur-sm rounded-lg
                                 text-xs font-medium text-text/70 dark:text-text-dark/70
                                 border border-white/20 dark:border-white/5"
                      >
                        {skill.name}
                      </span>
                    ))}
                    {category.items.length > 4 && (
                      <span
                        className="px-3 py-1.5 bg-primary/10 dark:bg-primary-dark/10 backdrop-blur-sm rounded-lg
                                     text-xs font-medium text-primary dark:text-primary-dark"
                      >
                        +{category.items.length - 4}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm text-primary dark:text-primary-dark font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View all skills</span>
                    <IconChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
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
            {/* Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-border/10 dark:border-border-dark/10">
              <div
                className={`p-3 rounded-xl bg-primary/10 dark:bg-primary-dark/10 ${categoryColors[selectedCategory.category as CategoryKey]?.icon}`}
              >
                {categoryIcons[selectedCategory.category as CategoryKey]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-text dark:text-text-dark">
                  {selectedCategory.category}
                </h3>
                <p className="text-text/50 dark:text-text-dark/50 text-sm">
                  {selectedCategory.items.length} technologies •{" "}
                  {getAverageLevel(selectedCategory.items)}% average proficiency
                </p>
              </div>
            </div>

            {/* Skills list */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {selectedCategory.items
                .sort((a, b) => b.level - a.level)
                .map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Skills;
