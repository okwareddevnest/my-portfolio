import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-background dark:bg-background-dark overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-background/50 to-transparent dark:from-background-dark/90 dark:via-background-dark/50 dark:to-transparent" />

      {/* Tech Background Images */}
      <div className="absolute inset-0 opacity-10 dark:opacity-[0.05]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
          }}
        />
      </div>

      {/* Code Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5 dark:opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
        }}
      />

      {/* Animated Circles */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/30 dark:bg-primary-dark/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute right-0 top-1/3 h-64 w-64 rounded-full bg-accent/20 dark:bg-accent-dark/20 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/3 h-96 w-96 rounded-full bg-secondary/20 dark:bg-secondary-dark/20 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Tech Icons Pattern */}
      <div 
        className="absolute inset-0 bg-repeat opacity-[0.03] dark:opacity-[0.01] mix-blend-overlay"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}; 