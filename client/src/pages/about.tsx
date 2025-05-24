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
              src="/me_white_sands.jpeg"
              alt="Profile"
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div className="md:w-2/3">
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              Hello! My name is Chris Vredenburgh.  I currently live in Somerville, MA and work as Head of Data & AI at a startup in the product development space.  
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              My interests span cognitive science, learning (various subdisciplines), skiing, sailing, and building things with others.  I created this site to share reflections with others and algorithms, and connect with like-minded individuals!  I'll be adding more content over time, so be sure to check back...
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              When I'm not reading, parenting, or building a project, you can find me skiing, sailing, or trail running! 
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
