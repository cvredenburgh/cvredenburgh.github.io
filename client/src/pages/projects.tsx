import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { loadProjects, ProjectContent } from "@/lib/project-loader";

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
  const [projects, setProjects] = useState<ProjectContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const projectData = await loadProjects();
        setProjects(projectData);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

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
        <div className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl space-y-4">
          <p>Below are sample projects and reflections, all subject to ongoing edits.</p>
          <p>Note that, in 2025, I have a backlog of projects from the past few years that relate to prior work and personal interests. I am in the process of completing research-style write ups in between current work and family obligations (which includes managing a curious toddler!). This year, I aim to complete 4-5 of the below write ups. Thank you for your patience and please feel encouraged to reach out if you're interested in any of the topic areas!</p>
        </div>
      </section>

      {loading && (
        <p className="text-gray-600 dark:text-gray-400">
          Loading projects...
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {displayProjects.map((project) => {
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
    </div>
  );
}
