import { Blog } from '../store/store';

export const blogs: Blog[] = [
  {
    id: "f71a5398-ae00-4a06-96be-4a94a025e875",
    title: "New Post from linkedin",
    content: "View the full post on linkedin",
    publishedAt: "2025-02-04T11:12:39Z",
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
  // Previous blogs will be added here

];
