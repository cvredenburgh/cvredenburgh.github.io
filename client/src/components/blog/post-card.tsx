import { BlogPost } from "@/lib/blog-data";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <img 
        src={post.imageUrl} 
        alt={post.title} 
        className="w-full h-48 object-cover" 
      />
      <CardContent className="p-6">
        <span className="text-xs font-medium text-primary dark:text-blue-400">
          {post.category}
        </span>
        <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">
          {post.title}
        </h3>
        <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.date)}
          </span>
          <a 
            href={`/blog/${post.id}`} 
            className="text-primary dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Read more →
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
