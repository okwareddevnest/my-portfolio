import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { IconPencil } from '@tabler/icons-react';
import { Metadata } from '../components/Metadata';

const Blogs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
      <Metadata 
        title="Blog"
        description="Read my latest thoughts and insights on blockchain development, web3 technologies, and software engineering best practices."
        keywords="blockchain blog, web3 development, software engineering, technical writing, ICP development, rust programming"
      />
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-center">
              <IconPencil className="w-16 h-16 text-primary dark:text-primary-dark" />
            </div>
            <h1 className="text-4xl font-bold text-text dark:text-text-dark">
              Blog Coming Soon
            </h1>
            <p className="text-lg text-text/60 dark:text-text-dark/60 max-w-2xl">
              We&apos;re working on bringing you insightful blog posts about technology, development, and software engineering. Stay tuned!
            </p>
            <div className="flex justify-center gap-2">
              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="w-2 h-2 bg-primary dark:bg-primary-dark rounded-full"
              />
              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 0.2,
                }}
                className="w-2 h-2 bg-primary dark:bg-primary-dark rounded-full"
              />
              <motion.span
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 0.4,
                }}
                className="w-2 h-2 bg-primary dark:bg-primary-dark rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;