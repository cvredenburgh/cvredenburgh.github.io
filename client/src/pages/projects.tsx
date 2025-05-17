import { projects, reflections } from "@/lib/project-data";
import { ProjectCard } from "@/components/projects/project-card";
import { ReflectionCard } from "@/components/projects/reflection-card";

export default function Projects() {
  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects & Reflections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Here are some of my recent projects and reflections on my development journey. 
          I regularly update this from my GitHub repositories.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Projects
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Reflections
          </h2>
          
          <div className="space-y-6">
            {reflections.map((reflection) => (
              <ReflectionCard key={reflection.id} reflection={reflection} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
