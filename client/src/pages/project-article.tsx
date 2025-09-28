import { useParams, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Twitter, Linkedin, Mail, ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug, ProjectContent } from "@/lib/project-loader";

export default function ProjectArticle() {
  const { slug } = useParams();
  const [, navigate] = useLocation();
  const [project, setProject] = useState<ProjectContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      if (!slug) {
        setError("No project slug provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const projectData = await getProjectBySlug(slug);
        
        if (projectData) {
          setProject(projectData);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        console.error("Error loading project:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [slug]);

  const handleShare = async (method: 'copy' | 'twitter' | 'linkedin' | 'email') => {
    if (!project) return;

    const currentUrl = window.location.href;
    const title = project.title;
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(project.description);

    switch (method) {
      case 'copy':
        try {
          await navigator.clipboard.writeText(currentUrl);
          // Optional: Show a toast notification that link was copied
          console.log('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
          // Fallback: select text in a temporary input
          const tempInput = document.createElement('input');
          tempInput.value = currentUrl;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodedTitle}&body=Check out this article: ${currentUrl}`);
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error || "The requested article could not be found."}</p>
          <Button onClick={() => navigate("/projects")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  // Extract first image from content for Open Graph
  const firstImageMatch = project.content.match(/<img[^>]+src="([^"]+)"/);
  const firstImage = firstImageMatch ? firstImageMatch[1] : null;

  return (
    <>
      <Helmet>
        <title>{project.title} | Chris Vredenburgh's Portfolio</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.tags.join(', ')} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="article" />
        {firstImage && <meta property="og:image" content={firstImage} />}
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project.title} />
        <meta name="twitter:description" content={project.description} />
        {firstImage && <meta name="twitter:image" content={firstImage} />}
        
        {/* Structured data for AI search */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": project.title,
            "description": project.description,
            "author": {
              "@type": "Person",
              "name": "Chris Vredenburgh"
            },
            "datePublished": project.date,
            "url": window.location.href,
            "keywords": project.tags.join(', ')
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Back button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate("/projects")}
          className="mb-8 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Button>

        {/* Article header - minimal */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            
            {/* Project links */}
            <div className="flex flex-wrap gap-2">
              {project.githubUrl && project.githubUrl !== '#' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              )}
              {project.demoUrl && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(project.demoUrl, '_blank')}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article content - main focus */}
        <article className="mb-8">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-code:text-pink-600 dark:prose-code:text-pink-400
              prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
              prose-img:rounded-lg prose-img:shadow-md
              leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </article>

        {/* Share section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Share this article</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Help others discover this project
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {/* Copy link button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  Copy Link
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  Share on X
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleShare('email')}
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}