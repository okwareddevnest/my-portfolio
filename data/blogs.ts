import { Blog } from '../store/store';

export const blogs: Blog[] = [];

export const addBlog = (blog: Blog) => {
  blogs.unshift(blog); // Add new blog at the start
}; 