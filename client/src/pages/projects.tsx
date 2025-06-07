import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ReflectionCard } from "@/components/projects/reflection-card";
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
  // State for markdown projects
  const [projects, setProjects] = useState<ProjectContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState<ProjectContent | null>(
    null,
  );

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
        "A personal blogging website built with React and Tailwind CSS that features a dark mode toggle, project showcase, and contact form.",
      githubUrl: "https://github.com/cvredenburgh/cvredenburgh.github.io",
      demoUrl: "https://github.com/cvredenburgh/cvredenburgh.github.io",
      tags: ["React", "Tailwind CSS", "TypeScript"],
    },
  ];

  // Sample reflections
  const myReflections = [
    {
      id: "1",
      title: "[Placeholder - will be adding content here soon!",
      excerpt: "[Placeholder for excepts!]",
      url: "#",
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
          Projects & Reflections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          I'll be adding projects here!
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
          ).map((project) => (
            <div
              key={project.id}
              onClick={() => {
                // Find the full project with content
                const fullProject = projects.find((p) => p.id === project.id);
                setSelectedProject(fullProject || null);
              }}
              className="cursor-pointer"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Show selected project content */}
        {selectedProject && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedProject.title}
              </h2>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedProject.content }}
              />
            </CardContent>
          </Card>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Reflections
          </h2>

          <div className="space-y-6">
            {myReflections.map((reflection) => (
              <ReflectionCard key={reflection.id} reflection={reflection} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
