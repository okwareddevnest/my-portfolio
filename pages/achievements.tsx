import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Modal } from '../components/Modal';
import { IconTrophy, IconCalendar, IconMedal, IconExternalLink } from '@tabler/icons-react';
import Image from 'next/image';
import { Metadata } from '../components/Metadata';

interface Achievement {
    title: string;
    organization: string;
    date: string;
    description: string;
    image: string;
    category: 'competition' | 'award' | 'recognition';
    link?: string;
    placement?: string;
}

const categoryColors = {
    competition: "from-amber-400/80 to-yellow-500/80 dark:from-amber-500/60 dark:to-yellow-600/60",
    award: "from-blue-400/80 to-indigo-500/80 dark:from-blue-500/60 dark:to-indigo-600/60",
    recognition: "from-emerald-400/80 to-green-500/80 dark:from-emerald-500/60 dark:to-green-600/60",
};

const categoryIcons = {
    competition: IconTrophy,
    award: IconMedal,
    recognition: IconMedal,
};

const achievements: Achievement[] = [
    {
        title: "WCHL Regional Round - 2nd Place",
        organization: "World Computer Hacker League (ICP Blockchain)",
        date: "September 2025",
        description: "Competed in the prestigious World Computer Hacker League (WCHL) Regional Round covering the entire African continent. Among hundreds of innovative blockchain projects, secured 2nd place with OHMS 2.0 - an autonomous AI agent platform built on the Internet Computer Protocol. This achievement qualified the project to pitch at the WCHL Global Finale among the best blockchain projects worldwide.",
        image: "/achievements/regional-round-2nd-place.png",
        category: "competition",
        placement: "2nd Place - Africa Regional",
        link: "https://internetcomputer.org/"
    },
    {
        title: "WCHL National Round - 2nd Place",
        organization: "World Computer Hacker League (ICP Blockchain)",
        date: "August 2025",
        description: "Achieved 2nd place in the WCHL National Round (Kenya) during the 4-month hackathon phase. Competed against top blockchain developers and projects across the country, demonstrating innovative application of the Internet Computer Protocol for building decentralized AI agent systems with verifiable on-chain execution.",
        image: "/achievements/national-round-2nd-place.png",
        category: "competition",
        placement: "2nd Place - National (Kenya)",
        link: "https://internetcomputer.org/"
    },
    {
        title: "Open Source Impact - Gitok",
        organization: "GitHub Community",
        date: "2023 - Present",
        description: "Created Gitok, a developer productivity tool that has been adopted by over 2,000 developers worldwide. This Git workflow optimization tool provides 35+ custom commands and functions that streamline daily development tasks, demonstrating significant impact in the open-source community.",
        image: "/gitok-preview.png",
        category: "recognition",
        placement: "2,000+ Users Worldwide",
        link: "https://github.com/okwareddevnest/gitok"
    },
    {
        title: "Open Source Impact - U-Download",
        organization: "GitHub Community",
        date: "2024 - Present",
        description: "Built U-Download, a cross-platform YouTube downloader trusted by over 1,500 users worldwide. This Rust-based application bundles all required dependencies and provides a seamless, zero-configuration experience for users across Linux, Windows, and macOS.",
        image: "/udownload-preview.png",
        category: "recognition",
        placement: "1,500+ Users Worldwide",
        link: "https://github.com/okwareddevnest/U-Download"
    }
];

const AchievementCard = ({ achievement, onClick }: { achievement: Achievement; onClick: () => void }) => {
    const color = categoryColors[achievement.category];
    const Icon = categoryIcons[achievement.category];

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className={`bg-gradient-to-br ${color} 
                 bg-opacity-10 backdrop-blur-sm
                 border border-white/10 dark:border-white/5
                 rounded-2xl shadow-lg overflow-hidden
                 hover:shadow-2xl transition-all cursor-pointer
                 dark:bg-black/20`}
            onClick={onClick}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={achievement.image}
                    alt={achievement.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {achievement.placement && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500/90 text-white text-sm font-bold flex items-center gap-1 shadow-lg">
                        <IconTrophy className="w-4 h-4" />
                        {achievement.placement}
                    </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">{achievement.title}</h3>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5 text-text/70 dark:text-text-dark/70" />
                    <span className="text-text/70 dark:text-text-dark/70 font-medium">{achievement.organization}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-text/60 dark:text-text-dark/60 mb-4">
                    <IconCalendar className="w-4 h-4" />
                    <span>{achievement.date}</span>
                </div>

                <p className="text-text/80 dark:text-text-dark/80 text-sm line-clamp-3">
                    {achievement.description}
                </p>
            </div>
        </motion.div>
    );
};

const Achievements = () => {
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark">
            <Metadata
                title="Achievements & Awards"
                description="Explore Dedan Okware's achievements and awards, including WCHL Regional Championship (Africa), Global Finale participation, and open-source project recognition."
                keywords="wchl winner, blockchain competition, hackathon winner, icp developer, software engineer awards, open source recognition"
            />
            <AnimatedBackground />
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <IconTrophy className="w-10 h-10 text-amber-500" />
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">
                            Achievements & Awards
                        </h1>
                        <IconMedal className="w-10 h-10 text-amber-500" />
                    </div>
                    <p className="text-lg text-text/70 dark:text-text-dark/70 max-w-2xl mx-auto">
                        Recognition and milestones from competitions, hackathons, and open-source contributions
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={`${achievement.title}-${index}`}
                            variants={itemVariants}
                        >
                            <AchievementCard
                                achievement={achievement}
                                onClick={() => setSelectedAchievement(achievement)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </main>
            <Footer />

            <Modal
                isOpen={!!selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
                title={selectedAchievement?.title}
            >
                {selectedAchievement && (
                    <div className="space-y-6">
                        <div className="relative w-full h-64 rounded-xl overflow-hidden">
                            <Image
                                src={selectedAchievement.image}
                                alt={selectedAchievement.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                            {selectedAchievement.placement && (
                                <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-amber-500 text-white font-bold flex items-center gap-2 shadow-lg">
                                    <IconTrophy className="w-5 h-5" />
                                    {selectedAchievement.placement}
                                </div>
                            )}
                        </div>

                        <div className={`-mx-6 p-6 bg-gradient-to-br ${categoryColors[selectedAchievement.category]} bg-opacity-20`}>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <IconTrophy className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-text/90 dark:text-text-dark/90">
                                        {selectedAchievement.organization}
                                    </h3>
                                    <div className="flex items-center gap-2 text-text/60 dark:text-text-dark/60">
                                        <IconCalendar className="w-4 h-4" />
                                        <span>{selectedAchievement.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-text/80 dark:text-text-dark/80 leading-relaxed">
                                {selectedAchievement.description}
                            </p>
                        </div>

                        {selectedAchievement.link && (
                            <a
                                href={selectedAchievement.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg
                         bg-gradient-to-r from-amber-500 to-yellow-500 
                         text-white font-medium
                         hover:from-amber-600 hover:to-yellow-600
                         transition-all shadow-lg hover:shadow-xl"
                            >
                                <IconExternalLink className="w-5 h-5" />
                                Learn More
                            </a>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Achievements;
