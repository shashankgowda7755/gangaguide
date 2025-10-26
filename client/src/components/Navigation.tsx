import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onBookNowClick?: () => void;
}

export default function Navigation({ onBookNowClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent text-white"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <button 
              className="flex items-center gap-3 hover-elevate active-elevate-2 px-3 py-2 rounded-lg transition-all group"
              data-testid="button-logo"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors`}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                  <path d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" />
                </svg>
              </div>
              <span className={`font-display text-2xl md:text-3xl font-bold transition-colors ${
                isScrolled ? "text-foreground" : "text-white"
              }`}>
                Ganga Gates
              </span>
            </button>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-home"
                >
                  Home
                </button>
              </Link>
              <Link href="/packages">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/packages")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-packages"
                >
                  Packages
                </button>
              </Link>
              <Link href="/destinations">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/destinations")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-destinations"
                >
                  Destinations
                </button>
              </Link>
              <Link href="/blog">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/blog")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-blog"
                >
                  Blog
                </button>
              </Link>
              <Link href="/about">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/about")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-about"
                >
                  About
                </button>
              </Link>
            </div>

            <Button
              onClick={onBookNowClick}
              size="lg"
              className="bg-primary text-primary-foreground border border-primary-border font-semibold shadow-lg hover:shadow-xl transition-all"
              data-testid="button-plan-journey"
            >
              Plan Your Journey
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
