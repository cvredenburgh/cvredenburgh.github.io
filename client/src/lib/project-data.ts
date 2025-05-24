export interface Project {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
}

export interface Reflection {
  id: string;
  title: string;
  excerpt: string;
  url: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Personal Portfolio Site",
    description: "A responsive personal portfolio website built with Next.js and Tailwind CSS, featuring dark mode support and optimized performance.",
    githubUrl: "https://github.com/alexsmith/portfolio",
    demoUrl: "https://portfolio.alexsmith.dev",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"]
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A full-stack task management application featuring drag-and-drop functionality, user authentication, and real-time updates.",
    githubUrl: "https://github.com/alexsmith/task-manager",
    demoUrl: "https://tasks.alexsmith.dev",
    tags: ["React", "Node.js", "MongoDB", "Express"]
  },
  {
    id: "3",
    title: "E-commerce API",
    description: "A RESTful API for e-commerce applications with features like product management, user authentication, and order processing.",
    githubUrl: "https://github.com/alexsmith/ecommerce-api",
    tags: ["Node.js", "Express", "MongoDB", "JWT"]
  },
  {
    id: "4",
    title: "Weather Dashboard",
    description: "An interactive weather dashboard that provides current and forecasted weather information for any location using the OpenWeather API.",
    githubUrl: "https://github.com/alexsmith/weather-app",
    demoUrl: "https://weather.alexsmith.dev",
    tags: ["React", "Tailwind CSS", "API Integration"]
  }
];

export const reflections: Reflection[] = [
  {
    id: "1",
    title: "Learning TypeScript: 6 Month Journey",
    excerpt: "Reflecting on my six-month journey learning TypeScript, the challenges I faced, and how it improved my development workflow.",
    url: "/blog/typescript-journey"
  },
  {
    id: "2",
    title: "Moving from Create React App to Next.js",
    excerpt: "My experience transitioning from Create React App to Next.js, including the benefits, challenges, and lessons learned.",
    url: "/blog/cra-to-nextjs"
  }
];
