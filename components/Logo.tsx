import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "w-32 h-8" }: LogoProps) => {
  return (
    <motion.div
      className={`${className} flex flex-col items-start`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-2xl font-bold tracking-wider"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          DEDAN
        </span>
      </motion.div>
      <motion.div
        className="text-lg font-medium tracking-wide"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="text-text dark:text-text-dark">
          OKWARE
        </span>
      </motion.div>
      <motion.div
        className="h-0.5 w-full bg-gradient-to-r from-primary to-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      />
    </motion.div>
  );
};

export default Logo; 