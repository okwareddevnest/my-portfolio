import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MacbookScroll } from '../components/ui/macbook-scroll';
import { AnimatedBackground } from '../components/AnimatedBackground';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto px-4 flex flex-col items-center text-center py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-48 h-48 rounded-full overflow-hidden mb-8"
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
            className="text-4xl font-bold mb-4 text-text dark:text-text-dark"
          >
            Hi, I&apos;m Dedan Okware
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-text dark:text-text-dark max-w-2xl mb-8 px-4"
          >
            A passionate Full Stack Developer and founder of IThreeM - a decentralized Gaming Engine for 2D and 3D games built on ICP Blockchain. I specialize in building exceptional digital experiences and innovative blockchain solutions. With expertise in web development and blockchain technology, I&apos;m dedicated to pushing the boundaries of what&apos;s possible in decentralized gaming and web applications.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Link
              href="/projects"
              className="btn-primary px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Projects
            </Link>
            <Link
              href="/skills"
              className="btn-accent px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              View Skills
            </Link>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900">
          <div className="absolute inset-0 bg-grid-white/10 dark:bg-grid-black/10" />
          <div className="relative max-w-7xl mx-auto">
            <MacbookScroll
              src="/projects-preview.png"
              title={
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center space-y-4"
                >
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                    Crafting Digital Experiences
                  </h2>
                  <p className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-400">
                    with Modern Technologies
                  </p>
                </motion.div>
              }
              showGradient
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}