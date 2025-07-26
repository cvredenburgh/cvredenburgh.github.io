import fs from 'fs';
import path from 'path';

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