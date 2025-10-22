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
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % reviews.length);
        setFadeState('in');
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "google":
      case "google_maps":
        return <SiGoogle className="w-3.5 h-3.5 text-[#4285F4]" />;
      case "tripadvisor":
        return <SiTripadvisor className="w-3.5 h-3.5 text-[#00AF87]" />;
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
      {/* Featured Review - Gentle fade transition */}
      <Card 
        className={`border border-card-border bg-card shadow-sm overflow-hidden transition-all duration-500 ease-in-out ${
          fadeState === 'in' ? 'opacity-100' : 'opacity-0'
        }`}
        data-testid="featured-review"
      >
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="gap-2">
                {getPlatformIcon(featuredReview.platform)}
                <span className="text-xs">{getPlatformName(featuredReview.platform)}</span>
              </Badge>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < featuredReview.rating 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <blockquote className="text-base md:text-lg font-medium text-foreground leading-relaxed italic">
              "{featuredReview.text}"
            </blockquote>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-semibold text-foreground">
                  {featuredReview.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {featuredReview.date}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid of Other Reviews - Smaller */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {otherReviews.map((review) => (
          <Card 
            key={review.id}
            className="hover-elevate transition-all duration-300 group cursor-pointer border border-card-border"
            data-testid={`review-card-${review.id}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="gap-1.5">
                  {getPlatformIcon(review.platform)}
                  <span className="text-xs">{getPlatformName(review.platform)}</span>
                </Badge>
              </div>
              
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${
                      i < review.rating 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-muted stroke-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-sm text-foreground/90 line-clamp-3 mb-3 leading-relaxed">
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
            onClick={() => {
              setFadeState('out');
              setTimeout(() => {
                setFeaturedIndex(index);
                setFadeState('in');
              }, 500);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === featuredIndex
                ? "bg-primary w-6 h-2"
                : "bg-muted hover:bg-primary/50 w-2 h-2"
            }`}
            aria-label={`Go to review ${index + 1}`}
            data-testid={`dot-review-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
