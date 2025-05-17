import { ProjectCard } from "@/components/projects/project-card";
import { ReflectionCard } from "@/components/projects/reflection-card";

export default function Projects() {
  // Blank project template
  const blankProject = {
    id: "template",
    title: "Project Title",
    description: "This is where you can add your project description. Describe what you built, the technologies used, and what you learned.",
    githubUrl: "#",
    tags: ["Tag1", "Tag2", "Tag3"]
  };

  // Blank reflection template
  const blankReflection = {
    id: "template",
    title: "Reflection Title",
    excerpt: "This is where you can add your thoughts and reflections about your work, learning experiences, or insights.",
    url: "#"
  };

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects & Reflections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Here are some of my projects and reflections. This section will be updated with my work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Projects
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          <ProjectCard project={blankProject} />
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Reflections
          </h2>
          
          <div className="space-y-6">
            <ReflectionCard reflection={blankReflection} />
          </div>
        </div>
      </section>
    </div>
  );
}
