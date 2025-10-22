import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, ArrowLeft, Calendar, Clock, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BottomNav from "@/components/BottomNav";
import type { BlogPost } from "@shared/schema";

export default function BlogDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: blogPost, isLoading } = useQuery<BlogPost>({
    queryKey: ['/api/blog-posts', id],
    enabled: !!id,
  });

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareWhatsApp = () => {
    if (!blogPost) return;
    const url = window.location.href;
    const message = `Check out this article: ${blogPost.title}\n${url}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareInstagram = () => {
    alert("To share on Instagram, please take a screenshot and post it to your story or feed.");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Blog post not found</p>
        <Button onClick={() => setLocation("/")} data-testid="button-back-home">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  const images = [
    blogPost.mainImage,
    blogPost.image2,
    blogPost.image3,
    blogPost.image4,
  ].filter((img): img is string => Boolean(img));

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/#contact")} />

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => setLocation("/#blog")}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>

        <article className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Badge>{blogPost.category}</Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" data-testid="text-blog-title">
              {blogPost.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blogPost.publishedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleShareWhatsApp}
                data-testid="button-share-whatsapp"
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5 text-green-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShareInstagram}
                data-testid="button-share-instagram"
                title="Share on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                data-testid="button-copy-link"
                title="Copy Link"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Main Image */}
          <Card className="overflow-hidden">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={blogPost.mainImage}
                alt={blogPost.title}
                className="w-full h-full object-cover"
                data-testid="img-main"
              />
            </div>
          </Card>

          {/* Content */}
          <Card>
            <CardContent className="p-6 md:p-8 prose prose-lg max-w-none">
              <p className="text-xl font-medium text-foreground/90 mb-6" data-testid="text-excerpt">
                {blogPost.excerpt}
              </p>
              <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap" data-testid="text-content">
                {blogPost.content}
              </div>
            </CardContent>
          </Card>

          {/* Additional Images */}
          {images.length > 1 && (
            <div className={`grid gap-4 ${images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : images.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
              {images.slice(1).map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={image}
                      alt={`${blogPost.title} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      data-testid={`img-additional-${index}`}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* CTA */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6 md:p-8 text-center">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to Experience Varanasi?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join us for an unforgettable spiritual journey through the sacred city of Kashi.
              </p>
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="gap-2"
                data-testid="button-contact-whatsapp"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </article>
      </div>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
