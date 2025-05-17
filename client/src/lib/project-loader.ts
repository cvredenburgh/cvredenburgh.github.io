import matter from 'gray-matter';

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

// For now, let's include the example project directly
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

const processMarkdownProject = async (filename: string, content?: string): Promise<ProjectContent | null> => {
  try {
    let rawContent = content;
    
    if (!rawContent) {
      // This would be used in production to fetch from server
      // const response = await fetch(`/content/projects/${filename}`);
      // if (!response.ok) return null;
      // rawContent = await response.text();
      
      // For the example, we'll just use our embedded content
      rawContent = EXAMPLE_PROJECT;
    }
    
    const slug = filename.replace(/\.md$/, '');
    
    // Use gray-matter to parse the project metadata
    const { data, content: markdownContent } = matter(rawContent);
    
    // For this demo, we'll use a simple HTML conversion
    // In production, you'd use marked.parse() to convert markdown to HTML
    const htmlContent = markdownContent
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.+)$/gm, '$1')
      .replace(/# (.+)/g, '<h1>$1</h1>')
      .replace(/## (.+)/g, '<h2>$1</h2>')
      .replace(/\*\*(.+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+)\*/g, '<em>$1</em>')
      .replace(/`(.+)`/g, '<code>$1</code>')
      .replace(/!\[(.*)\]\((.*)\)/g, '<img alt="$1" src="$2" />')
      .replace(/\[(.*)\]\((.*)\)/g, '<a href="$2">$1</a>');
    
    const wrappedHtml = `<p>${htmlContent}</p>`;
    
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
    const projectFiles = ['example-project.md'];
    
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