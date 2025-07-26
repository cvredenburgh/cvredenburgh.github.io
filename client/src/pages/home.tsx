import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentAttributeIndex, setCurrentAttributeIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-100");
  
  const attributes = [
    "applied scientist",
    "francophone",
    "builder", 
    "husband",
    "father",
    "trail runner",
    "skier",
    "sailor (kind of)",
    "family cook",
    "reader & thinker",
    "dog & cat appreciator"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass("opacity-0");
      
      setTimeout(() => {
        setCurrentAttributeIndex((prev) => (prev + 1) % attributes.length);
        setFadeClass("opacity-100");
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [attributes.length]);
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
          <div className="mb-8">
            <p className="text-xl md:text-2xl mb-4 drop-shadow-md max-w-3xl mx-auto">
              Hi, I'm Chris Vredenburgh, welcome to my personal site!
            </p>
            <p className="text-xl md:text-2xl mb-6 drop-shadow-md max-w-3xl mx-auto">
              I'm a(n){" "}
              <span 
                className={`inline-block transition-opacity duration-300 ${fadeClass}`}
                style={{ minWidth: "200px", textAlign: "left" }}
              >
                {attributes[currentAttributeIndex]}
              </span>
            </p>
            <p className="text-lg md:text-xl drop-shadow-md max-w-3xl mx-auto">
              As you are inclined, please check out my multidisciplinary projects and essays, About section, or connect with me on social media.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/projects">
              <div>
                <Button 
                  size="lg"
                  className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-md shadow-lg text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-105 transition-all duration-200"
                >
                  View My Projects & Writings
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
