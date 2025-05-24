import { marked } from 'marked';

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content?: string;
  encoding?: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
}

// Function to fetch repositories from GitHub
export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// Function to fetch content of a specific file from a GitHub repository
export async function fetchGitHubFileContent(username: string, repo: string, path: string): Promise<string> {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }
    
    const data: GitHubContent = await response.json();
    
    // GitHub API returns content as Base64 encoded
    if (data.content && data.encoding === 'base64') {
      const content = atob(data.content.replace(/\n/g, ''));
      
      // If it's a markdown file, convert to HTML
      if (path.endsWith('.md')) {
        return marked.parse(content);
      }
      
      return content;
    }
    
    return '';
  } catch (error) {
    console.error(`Error fetching content for ${path}:`, error);
    return '';
  }
}

// Function to fetch all markdown files in a repository's directory
export async function fetchMarkdownFiles(username: string, repo: string, path = ''): Promise<GitHubContent[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch directory content: ${response.statusText}`);
    }
    
    const contents: GitHubContent[] = await response.json();
    
    // Filter only markdown and HTML files
    return contents.filter(item => 
      item.type === 'file' && (item.name.endsWith('.md') || item.name.endsWith('.html'))
    );
  } catch (error) {
    console.error(`Error fetching markdown files from ${path}:`, error);
    return [];
  }
}

// Function to find projects with project-content.md or project-content.html
export async function findProjectsWithContent(username: string): Promise<{repo: GitHubRepo, contentFiles: GitHubContent[]}[]> {
  try {
    const repos = await fetchGitHubRepos(username);
    const projectsWithContent = [];
    
    for (const repo of repos) {
      // Skip forks if you want to show only your original projects
      if (repo.fork) continue;
      
      // Look for project content files
      const contentFiles = await fetchMarkdownFiles(username, repo.name);
      
      if (contentFiles.length > 0) {
        projectsWithContent.push({
          repo,
          contentFiles
        });
      }
    }
    
    return projectsWithContent;
  } catch (error) {
    console.error('Error finding projects with content:', error);
    return [];
  }
}