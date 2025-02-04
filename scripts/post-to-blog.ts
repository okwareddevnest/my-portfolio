#!/usr/bin/env node
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import puppeteer from 'puppeteer';
import readline from 'readline';
import { Blog } from '../store/store';

const execAsync = promisify(exec);

// Create readline interface for prompts
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
};

// Loading spinner animation
class Spinner {
  private frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  private interval: NodeJS.Timeout | null = null;
  private currentFrame = 0;
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  start() {
    this.interval = setInterval(() => {
      process.stdout.write(`\r${this.frames[this.currentFrame]} ${this.text}`);
      this.currentFrame = (this.currentFrame + 1) % this.frames.length;
    }, 80);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      process.stdout.write('\r');
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }
  }
}

interface PostData {
  content: string;
  title: string;
  preview: string;
  tags: string[];
}

async function extractLinkedInPost(url: string, spinner: Spinner): Promise<PostData> {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
      const article = document.querySelector('article');
      const content = article?.textContent?.trim() || '';
      const image = article?.querySelector('img')?.getAttribute('src') || '';
      const hashtags = Array.from(article?.querySelectorAll('[href*="hashtag"]') || [])
        .map(tag => (tag as HTMLElement).innerText.replace('#', ''));

      return {
        content,
        image,
        hashtags,
      };
    });

    await browser.close();

    const title = data.content.split('\n')[0];
    const preview = data.content.substring(0, 200) + '...';

    return {
      content: data.content,
      title,
      preview: data.image || '',
      tags: data.hashtags.length > 0 ? data.hashtags : ['LinkedIn', 'Professional'],
    };
  } catch (error) {
    spinner.stop();
    console.error('\n❌ Error extracting LinkedIn post:', error);
    throw error;
  }
}

async function extractTwitterPost(url: string, spinner: Spinner): Promise<PostData> {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
      const tweet = document.querySelector('[data-testid="tweet"]');
      const content = tweet?.textContent?.trim() || '';
      const imageElement = tweet?.querySelector('img[src*="media"]');
      const image = imageElement?.getAttribute('src') || '';
      const hashtags = Array.from(tweet?.querySelectorAll('[href*="hashtag"]') || [])
        .map(tag => (tag as HTMLElement).innerText.replace('#', ''));

      return {
        content,
        image,
        hashtags,
      };
    });

    await browser.close();

    return {
      content: data.content,
      title: data.content.split('\n')[0],
      preview: data.image || '',
      tags: data.hashtags.length > 0 ? data.hashtags : ['X', 'Tech', 'Development'],
    };
  } catch (error) {
    spinner.stop();
    console.error('\n❌ Error extracting X post:', error);
    throw error;
  }
}

async function createBlogPost(url: string, spinner: Spinner): Promise<Blog> {
  const isLinkedIn = url.includes('linkedin.com');
  const isTwitter = url.includes('twitter.com') || url.includes('x.com');

  if (!isLinkedIn && !isTwitter) {
    throw new Error('Unsupported social media platform. Please use LinkedIn or Twitter/X URLs.');
  }

  const postData = isLinkedIn 
    ? await extractLinkedInPost(url, spinner)
    : await extractTwitterPost(url, spinner);

  const blog: Blog = {
    id: uuidv4(),
    title: postData.title,
    content: postData.content,
    publishedAt: new Date().toISOString(),
    author: {
      name: "Dedan Okware",
      image: "/profile.png",
      role: "Software Engineer"
    },
    tags: postData.tags,
    readTime: `${Math.ceil(postData.content.split(' ').length / 200)} min read`,
    thumbnail: postData.preview,
    source: {
      type: isLinkedIn ? 'linkedin' : 'twitter',
      url: url,
      preview: postData.preview
    }
  };

  return blog;
}

async function updateBlogStore(blog: Blog, spinner: Spinner): Promise<void> {
  try {
    const storePath = path.join(process.cwd(), 'store', 'blogs.json');
    let blogs: Blog[] = [];
    
    try {
      const content = await fs.readFile(storePath, 'utf-8');
      blogs = JSON.parse(content);
    } catch {
      // File doesn't exist or is empty, start with empty array
    }

    blogs.push(blog);
    await fs.writeFile(storePath, JSON.stringify(blogs, null, 2));
  } catch (error) {
    spinner.stop();
    console.error('\n❌ Error updating blog store:', error);
    throw error;
  }
}

async function deployToVercel(spinner: Spinner): Promise<void> {
  try {
    // Add changes to git
    await execAsync('git add .');
    await execAsync('git commit -m "Add new blog post"');
    await execAsync('git push origin main');

    // Deploy to Vercel
    await execAsync('vercel --prod');
  } catch (error) {
    spinner.stop();
    console.error('\n❌ Error deploying to Vercel:', error);
    throw error;
  }
}

async function main() {
  console.log('\n🌟 Welcome to the Blog Post Automation Workflow!\n');

  try {
    // Get the URL from user input
    const url = await question('📎 Please paste your LinkedIn or Twitter/X post URL: ');
    
    if (!url) {
      console.error('\n❌ No URL provided. Please try again.');
      process.exit(1);
    }

    // Confirm with user
    console.log('\n📝 Post Details:');
    console.log(`URL: ${url}`);
    console.log(`Platform: ${url.includes('linkedin.com') ? 'LinkedIn' : 'Twitter/X'}`);
    
    const confirm = await question('\n✨ Would you like to proceed? (y/n): ');
    
    if (confirm.toLowerCase() !== 'y') {
      console.log('\n🚫 Operation cancelled by user.');
      process.exit(0);
    }

    // Start the process with loading indicators
    console.log('\n🚀 Starting the automation process...\n');

    const fetchSpinner = new Spinner('Fetching post data...');
    fetchSpinner.start();
    const blog = await createBlogPost(url, fetchSpinner);
    fetchSpinner.stop();
    console.log('✅ Post data fetched successfully!\n');

    const storeSpinner = new Spinner('Updating blog store...');
    storeSpinner.start();
    await updateBlogStore(blog, storeSpinner);
    storeSpinner.stop();
    console.log('✅ Blog store updated successfully!\n');

    const deploySpinner = new Spinner('Deploying to Vercel...');
    deploySpinner.start();
    await deployToVercel(deploySpinner);
    deploySpinner.stop();
    console.log('✅ Deployed to Vercel successfully!\n');

    console.log('🎉 Success! Your post has been added to your portfolio.');
    console.log(`🔗 View it at: https://my-portfolio-crypt.vercel.app/blogs\n`);
  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main(); 