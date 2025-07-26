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
    
    const slug = filename.replace(/\.md$/, '');
    
    // Use custom frontmatter parser (gray-matter has Buffer issues in browser)
    const { data, content: markdownContent } = parseFrontmatter(rawContent);
    
    // Simple markdown to HTML conversion
    const htmlContent = markdownContent
      .replace(/### (.+)/g, '<h3>$1</h3>')
      .replace(/## (.+)/g, '<h2>$1</h2>')
      .replace(/# (.+)/g, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" class="max-w-full h-auto" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      .replace(/\n\n/g, '</p><p>')
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
    // In a real app, you would fetch the list of files from the server
    // For now, we'll use a hardcoded list that includes our example
    const projectFiles = ['example-project.md', 'fine-grained-representations.md'];
    
    const projectPromises = projectFiles.map(file => processMarkdownProject(file));
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
    return await processMarkdownProject(`${slug}.md`);
  } catch (error) {
    console.error(`Error loading project ${slug}:`, error);
    return null;
  }
}