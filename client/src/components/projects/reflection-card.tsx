import { Reflection } from "@/lib/project-data";
import { Card, CardContent } from "@/components/ui/card";

interface ReflectionCardProps {
  reflection: Reflection;
}

export function ReflectionCard({ reflection }: ReflectionCardProps) {
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {reflection.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {reflection.excerpt}
        </p>
        <a 
          href={reflection.url} 
          className="mt-4 inline-block text-primary dark:text-blue-400 hover:underline"
        >
          Read more →
        </a>
      </CardContent>
    </Card>
  );
}
