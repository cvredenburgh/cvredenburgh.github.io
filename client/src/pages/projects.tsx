import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ReflectionCard } from "@/components/projects/reflection-card";
import { findProjectsWithContent, fetchGitHubFileContent } from "@/lib/github-content-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Projects() {
  // Your GitHub username
  const githubUsername = "cvredenburgh";
  
  // State for GitHub content
  const [githubProjects, setGithubProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProjectContent, setSelectedProjectContent] = useState("");
  const [selectedContentPath, setSelectedContentPath] = useState("");
  
  // Fetch projects from GitHub
  useEffect(() => {
    async function loadGitHubProjects() {
      try {
        setLoading(true);
        const projectsWithContent = await findProjectsWithContent(githubUsername);
        
        // Transform to our project format
        const transformedProjects = projectsWithContent.map(item => ({
          id: item.repo.id.toString(),
          title: item.repo.name.replace(/-/g, ' ').replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          description: item.repo.description || "No description available",
          githubUrl: item.repo.html_url,
          demoUrl: item.repo.homepage || undefined,
          tags: [item.repo.language].filter(Boolean) as string[],
          contentFiles: item.contentFiles
        }));
        
        setGithubProjects(transformedProjects);
      } catch (err) {
        console.error("Error loading GitHub projects:", err);
        setError("Failed to load projects from GitHub");
      } finally {
        setLoading(false);
      }
    }
    
    loadGitHubProjects();
  }, [githubUsername]);
  
  // Load content when a file is selected
  const loadProjectContent = async (repoName: string, filePath: string) => {
    try {
      setLoading(true);
      const content = await fetchGitHubFileContent(githubUsername, repoName, filePath);
      setSelectedProjectContent(content);
      setSelectedContentPath(filePath);
    } catch (err) {
      console.error("Error loading project content:", err);
      setError("Failed to load content from GitHub");
    } finally {
      setLoading(false);
    }
  };
  
  // Fallback projects to show when GitHub API fails or while loading
  const fallbackProjects = [
    {
      id: "1",
      title: "Personal Blog Website",
      description: "A personal blogging website built with React and Tailwind CSS that features a dark mode toggle, project showcase, and contact form.",
      githubUrl: "https://github.com/cvredenburgh/personal-blog",
      tags: ["React", "Tailwind CSS", "TypeScript"]
    }
  ];
  
  // Sample reflections
  const myReflections = [
    {
      id: "1",
      title: "My Web Development Journey",
      excerpt: "Reflections on my experiences learning web development and building my first projects.",
      url: "#"
    }
  ];

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects & Reflections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Here are my projects from GitHub. I create markdown or HTML files in my repositories 
          to showcase my work directly from GitHub.
        </p>
      </section>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-md mb-6">
          <p>{error}</p>
          <p className="text-sm mt-2">Showing fallback projects until GitHub connection is restored.</p>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          GitHub Projects
        </h2>
        
        {loading && <p className="text-gray-600 dark:text-gray-400">Loading projects...</p>}
        
        <div className="grid gap-8 md:grid-cols-2">
          {(githubProjects.length > 0 ? githubProjects : fallbackProjects).map(project => (
            <div key={project.id}>
              <ProjectCard project={project} />
              
              {/* Show content files if available */}
              {project.contentFiles && project.contentFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project Content:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.contentFiles.map((file: any) => (
                      <Button
                        key={file.sha}
                        variant="outline"
                        size="sm"
                        onClick={() => loadProjectContent(project.title.replace(/\s+/g, '-').toLowerCase(), file.path)}
                        className={selectedContentPath === file.path ? "bg-primary/20" : ""}
                      >
                        {file.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Show selected content */}
        {selectedProjectContent && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedProjectContent }}
              />
            </CardContent>
          </Card>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Reflections
          </h2>
          
          <div className="space-y-6">
            {myReflections.map(reflection => (
              <ReflectionCard key={reflection.id} reflection={reflection} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
