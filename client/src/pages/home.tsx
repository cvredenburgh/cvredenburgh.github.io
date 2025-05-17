import { Link } from "wouter";
import { blogPosts } from "@/lib/blog-data";
import { PostCard } from "@/components/blog/post-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          I write about web development, design, and my journey as a software engineer. 
          Browse my latest articles below.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Latest Posts
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            View all posts
          </Button>
        </div>
      </section>
    </div>
  );
}
