import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to my personal blog!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          This is my personal blogging site where I'm sharing projects and reflections across a wide range of topics.  I'll be updating this site with new content semi-regularly as time permits, so be sure to check back often!
          Feel free to explore the different sections or reach out via the connected links!
        </p>
        <div className="mt-8">
          <Link href="/projects">
            <div>
              <Button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View My Projects
              </Button>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
