import { ProjectCard } from "@/components/projects/project-card";

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  language: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
}

// Function to fetch repositories from GitHub
export async function fetchGithubRepos(username: string): Promise<ProjectItem[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    
    const repos: GithubRepo[] = await response.json();
    
    // Transform GitHub repos to project format
    return repos
      .filter(repo => !repo.description?.includes('[ignore]')) // optional filter mechanism
      .map(repo => ({
        id: repo.id.toString(),
        title: formatRepoName(repo.name),
        description: repo.description || 'No description provided',
        githubUrl: repo.html_url,
        demoUrl: repo.homepage || undefined,
        tags: [...(repo.topics || []), repo.language].filter(Boolean) as string[]
      }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// Helper function to format repository names
function formatRepoName(name: string): string {
  return name
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}