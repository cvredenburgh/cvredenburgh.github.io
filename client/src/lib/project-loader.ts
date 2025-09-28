// Simple frontmatter parser (avoiding gray-matter due to Buffer issues in browser)
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: content };
  }
  
  const [, frontmatter, markdown] = match;
  const data: any = {};
  
  // Parse frontmatter line by line
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Handle arrays (basic parsing for tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      } else {
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        data[key] = value;
      }
    }
  });
  
  return { data, content: markdown };
}

export interface ProjectContent {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  date: string;
  content: string;
  slug: string;
}

interface RawProjectData {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  date: string;
  content: string;
  slug: string;
}

// For now, let's include projects directly
// In a production app, you would load this from the filesystem
const EXAMPLE_PROJECT = `---
title: Example Project
description: This is an example project to demonstrate how to add projects using markdown files.
tags: ["Example", "Markdown", "Documentation"]
githubUrl: https://github.com/cvredenburgh/example-project
demoUrl: https://example-project.demo.com
date: 2023-05-15
---

# Example Project

This is an example project that demonstrates how to add new projects to your website by simply creating markdown files in the content/projects directory.

## Features

- Easy to add new projects
- Full Markdown support
- Automatic display on your projects page
- Control over project metadata

## How It Works

When you add a new markdown file to the content/projects directory, the website automatically detects it and displays it on your projects page. The metadata at the top (between the --- markers) provides information like the title, description, and tags.

\`\`\`javascript
// Example code can be included too
function hello() {
  console.log("Hello, world!");
}
\`\`\`

## Images

You can also include images in your project descriptions:

![Example Image](https://via.placeholder.com/800x400)

## Next Steps

To add a new project, simply create a new .md file in the content/projects directory with similar metadata at the top.`;

const FINE_GRAINED_PROJECT = `---
title: Creating Relevant Fine-grained Representations with Regional Contrastive Learning
description: . 
tags: ["AI", "VLM", "multimodal AI", "CLiP", "regional contrastive learning", "vision language models", "visual fashion representations"]
githubUrl: https://github.com/cvredenburgh/multimodal-concept-evaluation
date: 2025-07-25
---

# Building a Multimodal Product Concept Evaluation Model

This project built upon prior AI research leveraging specialized tag tokens to effectively drive contrastive learning to develop rich, detailed visual representations relevant to fashion consumers.  Here, I will summarize enhancements to that work, including:

- Testing model architecture enhancements to improve performance
  - Organic token pruning methodologies
  - Relaxing tag entity-to-image region constraints
  - Wavelet-based transformers to better detect relevant patterns
- Techniques to assess the quality of the visual model's representations
- Leveraging the model to evaluate product concepts

🚧 *In progress – coming soon.*`;

const processMarkdownProject = async (filename: string, content?: string): Promise<ProjectContent | null> => {
  try {
    let rawContent = content;
    
    if (!rawContent) {
      // Try to fetch from server first
      try {
        const response = await fetch(`/api/content/projects/${filename}`);
        if (response.ok) {
          rawContent = await response.text();
        } else {
          // If file doesn't exist, use embedded content for known projects
          if (filename === 'example-project.md') {
            rawContent = EXAMPLE_PROJECT;
          } else if (filename === 'fine-grained-representations.md') {
            rawContent = FINE_GRAINED_PROJECT;
          } else {
            console.warn(`Project file ${filename} not found`);
            return null;
          }
        }
      } catch (fetchError) {
        // If fetch fails, use embedded content for known projects
        if (filename === 'example-project.md') {
          rawContent = EXAMPLE_PROJECT;
        } else if (filename === 'fine-grained-representations.md') {
          rawContent = FINE_GRAINED_PROJECT;
        } else {
          console.warn(`Failed to fetch project file ${filename}`);
          return null;
        }
      }
    }
    
    // Generate URL-friendly slug from filename
    const slug = filename
      .replace(/\.md$/, '')  // Remove .md extension
      .toLowerCase()          // Convert to lowercase
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-')   // Replace spaces with hyphens
      .replace(/-+/g, '-')    // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
    
    // Use custom frontmatter parser (gray-matter has Buffer issues in browser)
    const { data, content: markdownContent } = parseFrontmatter(rawContent);
    
    // Enhanced markdown to HTML conversion with media support
    const htmlContent = markdownContent
      .replace(/### (.+)/g, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/## (.+)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/# (.+)/g, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      // Enhanced image support with better styling
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
        // Check if it's a video file
        if (src.match(/\.(mp4|webm|ogg|mov)$/i)) {
          return `<video controls class="w-full max-w-full h-auto rounded-lg shadow-md my-4">
                    <source src="${src}" type="video/${src.split('.').pop()}">
                    Your browser does not support the video tag.
                  </video>`;
        }
        // Regular image
        return `<img alt="${alt}" src="${src}" class="w-full max-w-full h-auto rounded-lg shadow-md my-4" loading="lazy" />`;
      })
      // YouTube embed support
      .replace(/\[youtube\]\(([^)]+)\)/g, '<iframe src="$1" frameborder="0" allowfullscreen class="w-full aspect-video rounded-lg my-4"></iframe>')
      // Regular links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono">$2</code></pre>')
      // Lists
      .replace(/^\* (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
    
    const wrappedHtml = `<div class="prose max-w-none"><p>${htmlContent}</p></div>`;
    
    // Extract metadata with defaults
    const projectData: RawProjectData = {
      title: data.title || 'Untitled Project',
      description: data.description || 'No description provided',
      tags: data.tags || [],
      githubUrl: data.githubUrl || '#',
      demoUrl: data.demoUrl,
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      content: wrappedHtml,
      slug
    };
    
    // Generate a unique ID based on the slug
    const id = slug;
    
    return {
      id,
      ...projectData
    };
  } catch (error) {
    console.error(`Error processing project file ${filename}:`, error);
    return null;
  }
};

export async function loadProjects(): Promise<ProjectContent[]> {
  try {
    // Try to load from pre-built JSON first (for production)
    try {
      const response = await fetch('/projects.json');
      if (response.ok) {
        const projects = await response.json();
        console.log('Loaded projects from pre-built JSON');
        return projects;
      }
    } catch (fetchError) {
      console.log('Pre-built projects.json not found, falling back to API');
    }
    
    // Fallback to API loading (for development)
    const listResponse = await fetch('/api/content/projects/');
    if (!listResponse.ok) {
      throw new Error('Failed to fetch project list');
    }
    const { files } = await listResponse.json();
    
    const projectPromises = files.map((file: string) => processMarkdownProject(file));
    const projects = await Promise.all(projectPromises);
    
    // Filter out any null results and sort by date (newest first)
    return projects
      .filter((project): project is ProjectContent => project !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectContent | null> {
  try {
    // In production, load from projects.json first
    try {
      const response = await fetch('/projects.json');
      if (response.ok) {
        const projects = await response.json();
        const project = projects.find((p: ProjectContent) => p.slug === slug);
        if (project) {
          console.log(`Found project ${slug} from projects.json`);
          return project;
        }
      }
    } catch (fetchError) {
      console.log('Could not load from projects.json, trying API fallback');
    }
    
    // Fallback to API for development
    return await processMarkdownProject(`${slug}.md`);
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}