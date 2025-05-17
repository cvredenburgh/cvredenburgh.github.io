import { Check } from "lucide-react";

export default function About() {
  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Me
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600" 
              alt="Alex Smith" 
              className="rounded-lg shadow-md w-full" 
            />
          </div>
          <div className="md:w-2/3">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Hi, I'm Alex Smith, a full-stack web developer with a passion for building accessible, user-friendly web applications. I specialize in JavaScript, React, and Node.js, and I'm always exploring new technologies and approaches.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              I started my journey as a developer in 2018 after transitioning from a career in marketing. The problem-solving aspect of coding immediately captivated me, and I've been honing my skills ever since.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              When I'm not coding, you can find me hiking, reading science fiction, or experimenting with new cooking recipes. I believe in continuous learning and sharing knowledge with the community.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Skills & Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Frontend Development
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  JavaScript (ES6+) / TypeScript
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  React.js / Next.js
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  HTML5 / CSS3 / Tailwind CSS
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Redux / Context API
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Responsive Design / Accessibility
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Backend Development
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Node.js / Express
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  RESTful API Design
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  MongoDB / Mongoose
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  SQL / PostgreSQL
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Authentication / Authorization
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Tools & Practices
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Git / GitHub
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  CI/CD (GitHub Actions)
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Jest / React Testing Library
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Agile / Scrum Methodologies
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  VS Code / Development Environment
                </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Other Skills
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  UI/UX Design Fundamentals
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Figma / Adobe XD
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  SEO Basics / Web Performance
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Technical Writing / Documentation
                </span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">
                  Teaching / Mentoring
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
