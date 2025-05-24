import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero section with background image */}
      <section 
        className="relative mb-12 rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat min-h-[500px] flex items-center"
        style={{
          backgroundImage: "url('/vt_fall_view.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
            Welcome to my personal blog!
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">
            This is my personal blogging site where I'm sharing projects and reflections across a wide range of topics. I'll be updating this site with new content semi-regularly as time permits, so be sure to check back often!
          </p>
          <p className="text-lg mb-8 drop-shadow-md">
            Feel free to explore the different sections or reach out via the connected links!
          </p>
          <div className="mt-8">
            <Link href="/projects">
              <div>
                <Button 
                  size="lg"
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md shadow-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
                >
                  View My Projects
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
