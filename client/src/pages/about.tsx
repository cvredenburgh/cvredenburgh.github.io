import { useState, useEffect } from "react";
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

  // Auto-cycle through photos every 4 seconds
  useEffect(() => {
    if (photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [photos.length]);

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Me
        </h1>
        {/* Photo Gallery */}
        <div className="mb-8 flex justify-center">
          <div className="relative max-w-md">
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

        {/* Content */}
        <div className="max-w-4xl">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Hello! My name is Chris Vredenburgh. I currently live in Somerville, MA with my wife, Gloria, and son, Augustine. I work as VP of Artificial Intelligence & Product at a startup in the product development space.  Prior, I worked in e-commerce and the pharmaceutical industry building data ecosystems and algorithms to optimize customer engagement and operations.
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            My intellectual interests are wide but interconnected, including:
          </p>
          <ul className="text-lg text-gray-600 dark:text-gray-400 mb-4 ml-6 space-y-1">
              <li>• Causal statistics</li>
              <li>• Cognitive science</li>
              <li>• Machine learning</li>
              <li>• Personalization systems</li>
              <li>• Neuroscience</li>
              <li>• Developmental processes</li>
              <li>• Distributed systems & production</li>
              <li>• Blockchain</li>
              <li>• Meaning making</li>
            <li>• How people can be productive together (collaboration)</li>
          </ul>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Outside of looking at computer screens, I enjoy skiing, sailing, running, reading, and biking.  And I generally prefer doing those things in places with seasons.
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            A few personal artifacts:
          </p>
          <ul className="text-lg text-gray-600 dark:text-gray-400 mb-4 ml-6 space-y-2">
              <li>• My interdisciplinary dissertation identified biological, cognitive, and environmental predictors of free-flowing human collaboration via wearables and time series modeling. (At some point, I may add a summary and additional outputs!)</li>
              <li>• I grew up in a southern Vermont town that, in my lifetime, went from a population of 20k to ~6.5k. So I know a bit about what it's like to live through economic decline and how immenseley impactful it is to people's lives.</li>
              <li>• I lived and worked in Montpelier, France for a year before grad school. On my time off, I biked around France and northern Spain.</li>
              <li>• After reading the Bitcoin white paper, I began purchasing Bitcoin and crypto assets following the crash in 2017. I have largely held since and remain intrigued by blockchain applications.</li>
            <li>• I believe in human agency and systems with strong skin-in-the-game; I am skeptical of systems that lack skin-in-the-game for relevant participants.</li>
            <li>• I am a lifelong lover of skiing - a former freestyle skier who now enjoys skiing the glades and backcountry!</li>
          </ul>
          
          <p className="text-lg text-gray-600 dark:text-gray-400">
            As time permits, I will be adding thoughts and projects of interest on this site.
          </p>
        </div>
      </section>
    </div>
  );
}
