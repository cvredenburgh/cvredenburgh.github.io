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
              Welcome to my personal blog! This is where I share my thoughts,
              experiences, and interests with the world.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              I'm passionate about [your interests], and I've created this space
              to document my journey and connect with like-minded individuals.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              When I'm not [your activity], you can find me [your other
              activities]. Feel free to browse through my projects and get in
              touch if you'd like to connect!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
