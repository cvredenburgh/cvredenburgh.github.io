import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Linkedin, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";

export default function LinkedinTest() {
  const [, navigate] = useLocation();

  // Static test URL as requested in instructions
  const testUrl = "https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.google.com";

  const testLinkedInShare = () => {
    console.log('Testing LinkedIn share with static URL:', testUrl);
    const newWindow = window.open(testUrl, '_blank', 'noopener,noreferrer');
    
    if (!newWindow) {
      console.log('LinkedIn test popup blocked');
      alert('Popup blocked! URL: ' + testUrl);
    } else {
      console.log('LinkedIn test popup opened successfully');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Back button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Button>

      {/* Test page content */}
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            LinkedIn Share Test Page
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Testing LinkedIn sharing functionality with static URLs
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5" />
              LinkedIn Sharing Tests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Test 1: Static anchor link */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Test 1: Static Anchor Link</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Direct anchor link to LinkedIn composer with Google URL (as requested in instructions):
              </p>
              <a 
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                Share Google.com on LinkedIn (Static Link)
                <ExternalLink className="h-3 w-3" />
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Should open LinkedIn composer with google.com pre-filled
              </p>
            </div>

            {/* Test 2: JavaScript button */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Test 2: JavaScript Button</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Button using window.open (same URL):
              </p>
              <Button 
                onClick={testLinkedInShare}
                className="flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" />
                Share Google.com on LinkedIn (JS Button)
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Check browser console for debug output
              </p>
            </div>

            {/* Test URL display */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Test URL</h3>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded border font-mono text-sm break-all">
                {testUrl}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                You can copy this URL and paste it directly into your browser to test
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold mb-2">Testing Instructions</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Try both buttons above in Replit preview</li>
                <li>Try both buttons in an external browser</li>
                <li>Verify LinkedIn composer opens with google.com URL pre-filled</li>
                <li>Check browser console for debug logs</li>
                <li>Document results in commit message</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}