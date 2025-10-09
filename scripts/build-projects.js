import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

// Configure marked for better rendering
marked.setOptions({
  breaks: false,
  gfm: true
});

// Simple frontmatter parser
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content: content };
  }
  
  const [, frontmatter, markdown] = match;
  const data = {};
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      if (value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      } else {
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

// Read all project files and generate a JSON file
function buildProjectsJson() {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  const outputDir = path.join(process.cwd(), 'client', 'public');
  
  if (!fs.existsSync(projectsDir)) {
    console.log('Projects directory not found');
    return;
  }
  
  const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'));
  const projects = [];
  
  files.forEach(filename => {
    try {
      const filePath = path.join(projectsDir, filename);
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const { data, content: markdownContent } = parseFrontmatter(rawContent);
      
      const slug = filename.replace(/\.md$/, '');
      
      // Convert markdown to HTML using marked library
      const htmlContent = marked(markdownContent);
      
      // Wrap in prose container for Tailwind Typography
      const wrappedHtml = `<div class="prose prose-lg max-w-none dark:prose-invert">${htmlContent}</div>`;
      
      const project = {
        id: slug,
        title: data.title || 'Untitled Project',
        description: data.description || 'No description provided',
        tags: data.tags || [],
        githubUrl: data.githubUrl || '#',
        demoUrl: data.demoUrl,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        content: wrappedHtml,
        slug
      };
      
      projects.push(project);
    } catch (error) {
      console.error(`Error processing ${filename}:`, error);
    }
  });
  
  // Sort by date (newest first)
  projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Write to public directory
  fs.writeFileSync(
    path.join(outputDir, 'projects.json'),
    JSON.stringify(projects, null, 2)
  );
  
  console.log(`Built ${projects.length} projects to projects.json`);
}

buildProjectsJson();