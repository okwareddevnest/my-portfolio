import { Blog } from '../store/store';

export const blogs: Blog[] = [
  {
    id: "5e78226f-aed9-4a0f-96e0-3e372ac5f838",
    title: "New Post from linkedin",
    content: "View the full post on linkedin",
    publishedAt: "2025-02-04T11:26:47Z",
    author: {
      name: "Dedan Okware",
      image: "/profile.png",
      role: "Software Engineer"
    },
    tags: ["LinkedIn", "Professional", "Tech"],
    readTime: "1 min read",
    source: {
      type: "linkedin",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7290958776021454848/"
    }
  },
  {
    id: "d8298ca8-8d0a-462a-a746-18f28f82b5de",
    title: "New Post from twitter",
    content: "View the full post on twitter",
    publishedAt: "2025-02-04T11:23:47Z",
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
