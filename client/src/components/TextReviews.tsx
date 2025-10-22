import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { SiGoogle, SiTripadvisor } from "react-icons/si";

interface TextReview {
  id: number;
  name: string;
  platform: "google" | "tripadvisor" | "google_maps";
  text: string;
  rating: number;
  date: string;
}

interface TextReviewsProps {
  reviews: TextReview[];
}

export default function TextReviews({ reviews }: TextReviewsProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "google":
      case "google_maps":
        return <SiGoogle className="w-4 h-4 text-[#4285F4]" />;
      case "tripadvisor":
        return <SiTripadvisor className="w-4 h-4 text-[#00AF87]" />;
      default:
        return null;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "google":
        return "Google Reviews";
      case "google_maps":
        return "Google Maps";
      case "tripadvisor":
        return "TripAdvisor";
      default:
        return platform;
    }
  };

  const featuredReview = reviews[featuredIndex];
  const otherReviews = reviews.filter((_, index) => index !== featuredIndex);

  return (
    <div className="space-y-8" data-testid="text-reviews">
      {/* Featured Review - Large */}
      <Card 
        className="border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 shadow-2xl overflow-hidden transition-all duration-700"
        data-testid="featured-review"
      >
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="gap-2">
                  {getPlatformIcon(featuredReview.platform)}
                  <span>{getPlatformName(featuredReview.platform)}</span>
                </Badge>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < featuredReview.rating 
                          ? "text-yellow-500 fill-yellow-500" 
                          : "text-muted stroke-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-relaxed italic">
                "{featuredReview.text}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg text-foreground">
                    {featuredReview.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {featuredReview.date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid of Other Reviews - Smaller */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherReviews.map((review) => (
          <Card 
            key={review.id}
            className="hover-elevate transition-all duration-300 group cursor-pointer overflow-hidden"
            data-testid={`review-card-${review.id}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="gap-1.5">
                  {getPlatformIcon(review.platform)}
                  <span className="text-xs">{getPlatformName(review.platform)}</span>
                </Badge>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < review.rating 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-foreground/90 line-clamp-4 mb-4 leading-relaxed group-hover:text-foreground transition-colors">
                "{review.text}"
              </p>
              
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {review.date}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setFeaturedIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === featuredIndex
                ? "bg-primary w-8 h-3"
                : "bg-muted hover:bg-primary/50 w-3 h-3"
            }`}
            aria-label={`Go to review ${index + 1}`}
            data-testid={`dot-review-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
