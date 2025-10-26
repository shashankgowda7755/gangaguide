import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { BlogPost } from "@shared/schema";
import BlogCard from "@/components/BlogCard";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

export default function Blog() {
  const [, setLocation] = useLocation();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const { data: apiBlogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const blogPosts = apiBlogPosts || [];

  // Filter blog posts
  const filteredPosts = blogPosts.filter(post => 
    categoryFilter === "all" || post.category === categoryFilter
  );

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => scrollToSection("contact")} />
      
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Travel Stories & Insights
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Discover the rich culture, heritage, and spiritual wisdom of Varanasi
              </p>
            </div>
          </FadeInSection>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Categories:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge
                className={`cursor-pointer ${categoryFilter === "all" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setCategoryFilter("all")}
                data-testid="filter-category-all"
              >
                All Categories
              </Badge>
              {categories.map(category => (
                <Badge
                  key={category}
                  className={`cursor-pointer ${categoryFilter === category ? "bg-primary" : "bg-muted hover-elevate"}`}
                  onClick={() => setCategoryFilter(category)}
                  data-testid={`filter-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <FadeInSection key={post.id} delay={index * 0.1}>
                <BlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={post.mainImage}
                  category={post.category}
                  publishedDate={post.publishedDate}
                  readTime={post.readTime}
                  onClick={() => setLocation(`/blog/${post.id}`)}
                />
              </FadeInSection>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No blog posts found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
