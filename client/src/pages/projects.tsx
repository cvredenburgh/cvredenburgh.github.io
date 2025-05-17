import { ProjectCard } from "@/components/projects/project-card";
import { ReflectionCard } from "@/components/projects/reflection-card";

export default function Projects() {
  // Add your GitHub projects here
  const myGithubProjects = [
    {
      id: "1",
      title: "Personal Blog Website",
      description: "A personal blogging website built with React and Tailwind CSS that features a dark mode toggle, project showcase, and contact form.",
      githubUrl: "https://github.com/cvredenburgh/personal-blog",
      tags: ["React", "Tailwind CSS", "TypeScript"]
    },
    // You can add more projects by copying this template:
    /*
    {
      id: "2",
      title: "Project Title",
      description: "Description of your project here.",
      githubUrl: "https://github.com/yourusername/repository-name",
      demoUrl: "https://demo-link.com", // Optional
      tags: ["Technology1", "Technology2"]
    },
    */
  ];

  // Add your reflections here
  const myReflections = [
    {
      id: "1",
      title: "My Web Development Journey",
      excerpt: "Reflections on my experiences learning web development and building my first projects.",
      url: "#"
    },
    // You can add more reflections by copying this template:
    /*
    {
      id: "2",
      title: "Reflection Title",
      excerpt: "Your reflection text here.",
      url: "#"
    },
    */
  ];

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects & Reflections
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Here are some of my projects and reflections. I hand-pick these from my GitHub repositories
          to showcase my best work.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Projects
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          {myGithubProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Uncomment this for a blank template example */}
          {/*
          <ProjectCard 
            project={{
              id: "template",
              title: "Project Title",
              description: "This is where you can add your project description. Describe what you built, the technologies used, and what you learned.",
              githubUrl: "#",
              tags: ["Tag1", "Tag2", "Tag3"]
            }} 
          />
          */}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Reflections
          </h2>
          
          <div className="space-y-6">
            {myReflections.map(reflection => (
              <ReflectionCard key={reflection.id} reflection={reflection} />
            ))}
            
            {/* Uncomment this for a blank template example */}
            {/*
            <ReflectionCard 
              reflection={{
                id: "template",
                title: "Reflection Title",
                excerpt: "This is where you can add your thoughts and reflections about your work, learning experiences, or insights.",
                url: "#"
              }} 
            />
            */}
          </div>
        </div>
      </section>
    </div>
  );
}
