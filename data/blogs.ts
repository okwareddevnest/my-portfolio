import { Blog } from '../store/store';

export const blogs: Blog[] = [
  {
    id: "6a541202-ef81-4247-93be-528545293424",
    title: "New Post from twitter",
    content: "View the full post on twitter",
    publishedAt: "2025-02-04T11:14:37Z",
    author: {
      name: "Dedan Okware",
      image: "/profile.png",
      role: "Software Engineer"
    },
    tags: ["X", "Tech", "Development"],
    readTime: "1 min read",
    source: {
      type: "twitter",
      url: "https://x.com/icphub_KE/status/1863870762173473018"
    }
  },
  // Previous blogs will be added here

];
