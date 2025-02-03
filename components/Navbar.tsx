import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Logo } from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/skills', label: 'Skills' },
    { href: '/certificates', label: 'Certificates' },
    { href: '/blogs', label: 'Blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 dark:bg-background-dark/80 border-b border-border/10 dark:border-border-dark/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <Logo className="w-32 h-8" />
          </Link>

          <div className="hidden md:flex items-center justify-end flex-1 space-x-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors
                          ${currentPath === href
                    ? 'text-primary dark:text-primary-dark bg-primary/5 dark:bg-primary-dark/5'
                    : 'text-text/80 dark:text-text-dark/80 hover:text-primary dark:hover:text-primary-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5'
                  }`}
              >
                <span className="relative">
                  {label}
                  {currentPath === href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                      initial={false}
                    />
                  )}
                </span>
              </Link>
            ))}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="p-2 rounded-md text-text dark:text-text-dark hover:bg-primary/5 dark:hover:bg-primary-dark/5 transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;