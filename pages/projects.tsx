import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePortfolioStore } from '../store/store';
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
import { AnimatedBackground } from '../components/AnimatedBackground';
import Image from 'next/image';
import { IconBrandGithub, IconExternalLink, IconArrowRight } from '@tabler/icons-react';

const Projects = () => {
  const projects = usePortfolioStore((state) => state.projects);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow flex flex-col items-center py-8">
        <h1 className="text-3xl font-bold mb-8 text-text dark:text-text-dark">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full max-w-7xl">
          {projects.map((project, index) => (
            <CardContainer key={index} className="w-full">
              <CardBody className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-xl p-4 w-full h-full relative group/card">
                <CardItem translateZ="50" className="w-full aspect-video relative rounded-lg overflow-hidden mb-4">
                  <Image
                    src={project.previewImage}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover/card:scale-105 transition-transform duration-300"
                  />
                </CardItem>
                
                <CardItem
                  translateZ="60"
                  className="w-full text-xl font-bold text-text dark:text-text-dark mb-2"
                >
                  {project.name}
                </CardItem>

                <CardItem
                  as="p"
                  translateZ="70"
                  className="text-text dark:text-text-dark text-sm mb-4 line-clamp-3"
                >
                  {project.description}
                </CardItem>

                <CardItem translateZ="80" className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </CardItem>

                <CardItem
                  translateZ="100"
                  className="flex items-center gap-4 mt-auto"
                >
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
                  >
                    <IconBrandGithub className="w-5 h-5" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
                    >
                      <IconExternalLink className="w-5 h-5" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}

          {/* View More Projects Card */}
          <CardContainer className="w-full">
            <CardBody className="bg-gradient-to-br from-primary/80 to-primary dark:from-primary-dark/80 dark:to-primary-dark border border-border dark:border-border-dark rounded-xl p-4 w-full h-full relative group/card flex flex-col items-center justify-center text-center">
              <CardItem translateZ="50" className="text-white dark:text-white mb-4">
                <IconBrandGithub className="w-16 h-16 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Explore More Projects</h3>
                <p className="text-sm text-white/80 mb-6">
                  Visit my GitHub profile to discover more projects and contributions
                </p>
              </CardItem>
              <CardItem translateZ="80">
                <a
                  href="https://github.com/okwareddevnest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <span>View GitHub Profile</span>
                  <IconArrowRight className="w-4 h-4" />
                </a>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;