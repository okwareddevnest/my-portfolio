import { IconClock, IconCalendar, IconBrandLinkedin, IconBrandX, IconArticle, IconPencil } from '@tabler/icons-react';
import Image from 'next/image';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { usePortfolioStore, Blog } from '../store/store';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-200">
    {blog.thumbnail && (
      <div className="relative w-full h-48">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )}
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-10 h-10">
            <Image
              src={blog.author.image}
              alt={blog.author.name}
              fill
              className="rounded-full object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <h3 className="font-medium text-text dark:text-text-dark">{blog.author.name}</h3>
            <p className="text-sm text-text/60 dark:text-text-dark/60">{blog.author.role}</p>
          </div>
        </div>
        {blog.source && (
          <a
            href={blog.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-text/60 dark:text-text-dark/60 hover:text-primary dark:hover:text-primary-dark"
          >
            {blog.source.type === 'linkedin' ? (
              <IconBrandLinkedin size={24} />
            ) : (
              <IconBrandX size={24} />
            )}
            <span className="text-sm">View on {blog.source.type === 'linkedin' ? 'LinkedIn' : 'X'}</span>
          </a>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-2 text-text dark:text-text-dark">{blog.title}</h2>
      <p className="text-text/80 dark:text-text-dark/80 mb-4 line-clamp-3">{blog.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-sm rounded-full bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center space-x-4 text-sm text-text/60 dark:text-text-dark/60">
        <span className="flex items-center">
          <IconClock size={16} className="mr-1" />
          {blog.readTime}
        </span>
        <span className="flex items-center">
          <IconCalendar size={16} className="mr-1" />
          {new Date(blog.publishedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
);

export default function Blogs() {
  const blogs = usePortfolioStore((state) => state.blogs);

  return (
    <>
      <Head>
        <title>Blog | Dedan Okware - Software Engineer</title>
        <meta
          name="description"
          content="Explore articles about software engineering, blockchain development, web3, and tech insights from Dedan Okware. Stay updated with the latest in technology and development."
        />
        <meta
          name="keywords"
          content="Dedan Okware, Software Engineering, Blockchain Development, Web3, Technical Blog, Programming, Technology Insights"
        />
        {/* Open Graph */}
        <meta property="og:title" content="Blog | Dedan Okware - Software Engineer" />
        <meta
          property="og:description"
          content="Explore articles about software engineering, blockchain development, web3, and tech insights from Dedan Okware."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dedan-okware.vercel.app/blogs" />
        <meta property="og:image" content="https://dedan-okware.vercel.app/og-image.jpg" />

        {/* Twitter/X Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@okware_o" />
        <meta name="twitter:creator" content="@okware_o" />
        <meta name="twitter:title" content="Blog | Dedan Okware - Software Engineer" />
        <meta
          name="twitter:description"
          content="Explore articles about software engineering, blockchain development, web3, and tech insights from Dedan Okware."
        />
        <meta name="twitter:image" content="https://dedan-okware.vercel.app/og-image.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://dedan-okware.vercel.app/blogs" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        <AnimatedBackground />
        <Navbar />

        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-text dark:text-text-dark">Blog Posts</h1>
            <div className="text-sm text-text/60 dark:text-text-dark/60 flex items-center gap-2">
              <IconPencil size={16} />
              Insights & Updates
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-primary-dark opacity-75 blur"></div>
                <div className="relative bg-background dark:bg-background-dark rounded-full p-6">
                  <IconArticle size={48} className="text-primary dark:text-primary-dark" />
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-text dark:text-text-dark mt-8 mb-3">
                Crafting New Content
              </h2>
              <p className="text-text/60 dark:text-text-dark/60 text-center max-w-md mb-8">
                I&apos;m working on exciting articles about software engineering, blockchain development, and tech insights. Follow me on social media to stay updated.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://www.linkedin.com/in/softcysec-dedan-okware/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#0A66C2] to-[#0077B5] text-white hover:opacity-90 transition-opacity group"
                >
                  <IconBrandLinkedin size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Connect on LinkedIn</span>
                </a>
                <a
                  href="https://x.com/okware_o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#1DA1F2] to-[#1A8CD8] text-white hover:opacity-90 transition-opacity group"
                >
                  <IconBrandX size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Follow on X</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}