import { Project } from "@/lib/project-data";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <div className="flex space-x-2">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400" 
              aria-label="View on GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            {project.demoUrl && (
              <a 
                href={project.demoUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400" 
                aria-label="View Live Demo"
              >
                <FaExternalLinkAlt className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
        
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => {
            let bgColor = "";
            let textColor = "";
            
            switch (tag) {
              case "React":
              case "Next.js":
                bgColor = "bg-blue-100 dark:bg-blue-900";
                textColor = "text-blue-800 dark:text-blue-200";
                break;
              case "Node.js":
                bgColor = "bg-green-100 dark:bg-green-900";
                textColor = "text-green-800 dark:text-green-200";
                break;
              case "MongoDB":
                bgColor = "bg-purple-100 dark:bg-purple-900";
                textColor = "text-purple-800 dark:text-purple-200";
                break;
              case "Express":
                bgColor = "bg-red-100 dark:bg-red-900";
                textColor = "text-red-800 dark:text-red-200";
                break;
              case "Tailwind CSS":
                bgColor = "bg-cyan-100 dark:bg-cyan-900";
                textColor = "text-cyan-800 dark:text-cyan-200";
                break;
              case "JavaScript":
                bgColor = "bg-yellow-100 dark:bg-yellow-900";
                textColor = "text-yellow-800 dark:text-yellow-200";
                break;
              case "JWT":
                bgColor = "bg-gray-100 dark:bg-gray-700";
                textColor = "text-gray-800 dark:text-gray-300";
                break;
              case "API Integration":
                bgColor = "bg-yellow-100 dark:bg-yellow-900";
                textColor = "text-yellow-800 dark:text-yellow-200";
                break;
              default:
                bgColor = "bg-gray-100 dark:bg-gray-700";
                textColor = "text-gray-800 dark:text-gray-300";
            }
            
            return (
              <span 
                key={index} 
                className={`px-2 py-1 text-xs font-medium ${bgColor} ${textColor} rounded`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
