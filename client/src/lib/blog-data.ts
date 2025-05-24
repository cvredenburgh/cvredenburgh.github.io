export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes without writing custom CSS.",
    content: "Full content will go here...",
    date: "2023-05-15",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
  },
  {
    id: "2",
    title: "Understanding Next.js App Router",
    excerpt: "Explore the new App Router in Next.js 13 and learn how it improves developer experience and application performance.",
    content: "Full content will go here...",
    date: "2023-04-28",
    category: "JavaScript",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
  },
  {
    id: "3",
    title: "Principles of Minimalist UI Design",
    excerpt: "Discover how to create elegant, functional user interfaces by embracing minimalist design principles and focusing on user experience.",
    content: "Full content will go here...",
    date: "2023-04-10",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450"
  }
];
