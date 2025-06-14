import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const photos = [
    {
      src: "/me_white_sands.jpeg",
      alt: "Chris at White Sands",
      caption: "Exploring White Sands National Park"
    },
    {
      src: "/trapp_family_photo.jpg", 
      alt: "Trapp Family Photo",
      caption: "Family time at Trapp Family Lodge"
    }
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Me
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            {/* Photo Gallery */}
            <div className="relative">
              <img
                src={photos[currentPhotoIndex].src}
                alt={photos[currentPhotoIndex].alt}
                className="rounded-lg shadow-md w-full h-auto"
              />
              
              {/* Navigation arrows */}
              {photos.length > 1 && (
                <>
                  <Button
                    onClick={prevPhoto}
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={nextPhoto}
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
              
              {/* Photo indicators */}
              {photos.length > 1 && (
                <div className="flex justify-center mt-3 space-x-2">
                  {photos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentPhotoIndex
                          ? "bg-primary"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Photo caption */}
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                {photos[currentPhotoIndex].caption}
              </p>
            </div>
          </div>
          <div className="md:w-2/3">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Hello! My name is Chris Vredenburgh.  I currently live in Somerville, MA with my wife, Gloria, and son, Augustine.  I work as Head of Data & AI at a startup in the product development space.  
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              My interests span cognitive science, human and machine learning, skiing, sailing, reading, and building things with others.  I created this site to share reflections, connect with like-minded individuals, and just to learn about web development! I'll be adding content semi-regularly as time permits, so be sure to check back...
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              When I'm not reading, parenting, or working on a project, you can find me skiing, sailing, trail running, or traveling. 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
