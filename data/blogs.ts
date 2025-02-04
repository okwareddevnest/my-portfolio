import { Blog } from '../store/store';

export const blogs: Blog[] = [
  {
    id: "7a7adf5e-9b58-4a95-a471-2a5b193b5220",
    title: "New Post from twitter",
    content: "View the full post on twitter",
    publishedAt: "2025-02-04T11:03:51Z",
    author: {
      name: "Dedan Okware",
      image: "/profile.png",
      role: "Software Engineer"
    },
    tags: ["X", "Tech", "Development"],
    readTime: "1 min read",
    source: {
      type: "twitter",
      url: "https://x.com/okware_o/status/1884886199170449459"
    }
  },
  // Previous blogs will be added here

];
