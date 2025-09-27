import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { loadProjects, ProjectContent } from "@/lib/project-loader";
import { Card, CardContent } from "@/components/ui/card";

// Update this interface to match the expected props in ProjectCard
interface DisplayProject {
  id: string;
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  tags: string[];
}

export default function Projects() {
  const [, navigate] = useLocation();
  // State for markdown projects
  const [projects, setProjects] = useState<ProjectContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load projects from markdown files
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const projectData = await loadProjects();
        setProjects(projectData);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects from content directory");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Fallback projects to show when loading fails
  const fallbackProjects: DisplayProject[] = [
    {
      id: "1",
      title: "Personal Blog Website",
      description:
        "My personal blogging website built with React and Tailwind CSS that features a dark mode toggle, project showcase, and contact form.",
      githubUrl: "https://github.com/cvredenburgh/cvredenburgh.github.io",
      demoUrl: "https://github.com/cvredenburgh/cvredenburgh.github.io",
      tags: ["React", "Tailwind CSS", "TypeScript"],
    },
  ];



  // Convert projects to display format
  const displayProjects: DisplayProject[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    githubUrl: p.githubUrl,
    demoUrl: p.demoUrl,
    tags: p.tags,
  }));

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Below are sample projects and reflections, all subject to continuous edits.
        </p>
      </section>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-md mb-6">
          <p>{error}</p>
          <p className="text-sm mt-2">
            Showing fallback projects until content can be loaded.
          </p>
        </div>
      )}

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Projects
        </h2>

        {loading && (
          <p className="text-gray-600 dark:text-gray-400">
            Loading projects...
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {(displayProjects.length > 0
            ? displayProjects
            : fallbackProjects
          ).map((project) => {
            // Find the full project to get the slug
            const fullProject = projects.find((p) => p.id === project.id);
            const slug = fullProject?.slug || project.id;
            
            return (
              <div key={project.id} className="group">
                <div 
                  onClick={() => navigate(`/projects/${slug}`)}
                  className="cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                >
                  <ProjectCard project={project} />
                </div>
                <div className="mt-4 flex justify-center">
                  <Button 
                    onClick={() => navigate(`/projects/${slug}`)}
                    variant="outline"
                    className="w-full max-w-xs"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            );
          })}
        </div>



      </section>
    </div>
  );
}
