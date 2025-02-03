import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MacbookScroll } from '../components/ui/macbook-scroll';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { usePortfolioStore } from '../store/store';
import { IconBrandGithub, IconExternalLink, IconBrandX, IconBrandLinkedin } from '@tabler/icons-react';

export default function Home() {
  const projects = usePortfolioStore((state) => state.projects);
  const featuredProjects = projects.slice(0, 2); // Get IThreeM and Fries Coin

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 flex flex-col items-center text-center py-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 md:mb-8"
          >
            <Image
              src="/profile.png"
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              priority
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-text dark:text-text-dark px-4"
          >
            Hi, I&apos;m Dedan Okware
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg text-text dark:text-text-dark max-w-2xl mb-6 md:mb-8 px-4"
          >
            A passionate Full Stack Developer and founder of IThreeM - a decentralized Gaming Engine for 2D and 3D games built on ICP Blockchain. I specialize in building exceptional digital experiences and innovative blockchain solutions. With expertise in web development and blockchain technology, I&apos;m dedicated to pushing the boundaries of what&apos;s possible in decentralized gaming and web applications.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-4"
          >
            <Link
              href="/projects"
              className="btn-primary px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
            </Link>
            <Link
              href="/skills"
              className="btn-accent px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Skills
            </Link>
          </motion.div>
        </div>

        <div className="w-full relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/50 to-gray-100 dark:via-gray-900/50 dark:to-gray-900 pointer-events-none" />
          <div className="h-[500px] md:h-[800px] relative">
            <MacbookScroll
              src="/projects-preview.png"
              title={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center space-y-2 md:space-y-4 px-4"
                >
                  <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    Crafting Digital Experiences
                  </h2>
                  <p className="text-lg md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-400">
                    with Modern Technologies
                  </p>
                </motion.div>
              }
              showGradient
            />
          </div>
        </div>

        {/* Featured Projects Section */}
        <section className="relative z-10 py-12 md:py-20 px-4 bg-background dark:bg-background-dark">
          <div className="container mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            >
              Featured Projects
            </motion.h2>

            <div className="space-y-8 md:space-y-16">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="bg-card dark:bg-card-dark rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl border border-border/10 dark:border-border-dark/10"
                >
                  <div className={`grid md:grid-cols-2 gap-4 md:gap-8 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={`relative h-[200px] md:h-full ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <Image
                        src={project.previewImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="p-4 md:p-8 flex flex-col justify-center">
                      <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-text dark:text-text-dark">
                        {project.name}
                      </h3>
                      <p className="text-sm md:text-base text-text/80 dark:text-text-dark/80 mb-4 md:mb-6">
                        {project.longDescription}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 text-xs md:text-sm rounded-full bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3 md:gap-4">
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                        >
                          <IconExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                          Visit Website
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 md:px-4 py-2 text-sm md:text-base rounded-lg border border-border dark:border-border-dark hover:bg-card dark:hover:bg-card-dark transition-colors"
                        >
                          <IconBrandGithub className="w-4 h-4 md:w-5 md:h-5" />
                          View Source
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}