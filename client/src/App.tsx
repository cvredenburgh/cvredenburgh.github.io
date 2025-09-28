import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout/layout";

// Pages
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import ProjectArticle from "@/pages/project-article";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import LinkedinTest from "@/pages/linkedin-test";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={Projects} />
        <Route path="/projects/:slug" component={ProjectArticle} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/linkedin-test" component={LinkedinTest} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
