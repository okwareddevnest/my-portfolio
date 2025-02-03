import Logo from './Logo';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="footer-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo className="w-32 h-8 text-text dark:text-text-dark" />
            <p className="text-sm text-text/80 dark:text-text-dark/80">
              Software Engineer | Blockchain Developer | AI Enthusiast
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/okwareddevnest"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              <IconBrandGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/dedan-okware"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              <IconBrandLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com/okware_dedan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              <IconBrandTwitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border dark:border-border-dark">
          <p className="text-center text-sm text-text/60 dark:text-text-dark/60">
            © {new Date().getFullYear()} Dedan Okware. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;