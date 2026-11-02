import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import seoRoutes from "./seo-routes.json";

// Home loads first; every other page is fetched when visited
const PackagesLanding = lazy(() => import("@/pages/PackagesLanding"));
const PackageCategory = lazy(() => import("@/pages/PackageCategory"));
const Destinations = lazy(() => import("@/pages/Destinations"));
const Blog = lazy(() => import("@/pages/Blog"));
const About = lazy(() => import("@/pages/About"));
const Booking = lazy(() => import("@/pages/Booking"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const PackageDetail = lazy(() => import("@/pages/PackageDetail"));
const DestinationDetail = lazy(() => import("@/pages/DestinationDetail"));
const BlogDetail = lazy(() => import("@/pages/BlogDetail"));
const NotFound = lazy(() => import("@/pages/not-found"));

type Meta = { title: string; description: string };
const routes = seoRoutes as Record<string, Meta>;

// Keep the tab title and meta description in step with client-side navigation
function usePageMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = routes[location] ?? routes["/"];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    window.scrollTo(0, 0);
  }, [location]);
}

function Router() {
  usePageMeta();
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/packages" component={PackagesLanding} />
      <Route path="/packages/:category" component={PackageCategory} />
      <Route path="/destinations" component={Destinations} />
      <Route path="/blog" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/booking" component={Booking} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/package/:id" component={PackageDetail} />
      <Route path="/destination/:id" component={DestinationDetail} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
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
