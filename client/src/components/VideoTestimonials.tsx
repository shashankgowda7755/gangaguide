import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiInstagram, SiYoutube } from "react-icons/si";
import { Play } from "lucide-react";

interface VideoTestimonial {
  id: number;
  platform: "instagram" | "youtube";
  url: string;
  embedUrl: string;
  caption: string;
  author: string;
}

interface VideoTestimonialsProps {
  testimonials: VideoTestimonial[];
}

export default function VideoTestimonials({ testimonials }: VideoTestimonialsProps) {
  // Instagram/YouTube players load only after a tap: no third-party cookies or weight on page load
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="video-testimonials">
      {testimonials.map((testimonial) => (
        <Card 
          key={testimonial.id} 
          className="overflow-hidden hover-elevate transition-all group"
          data-testid={`video-card-${testimonial.id}`}
        >
          <div className="relative aspect-video bg-muted">
            {loaded[testimonial.id] ? (
              <iframe
                src={testimonial.embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Instagram post from ${testimonial.author}`}
              />
            ) : (
              <button
                type="button"
                onClick={() => setLoaded((l) => ({ ...l, [testimonial.id]: true }))}
                className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#833AB4]/15 via-[#E1306C]/15 to-[#F77737]/20 text-foreground"
                aria-label={`Play Instagram post: ${testimonial.caption}`}
              >
                <span className="w-14 h-14 rounded-full bg-background/90 shadow-lg flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary ml-1" />
                </span>
                <span className="text-sm font-medium">Tap to watch</span>
              </button>
            )}
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-background/90 backdrop-blur-sm border border-border">
                {testimonial.platform === "instagram" ? (
                  <SiInstagram className="w-4 h-4 mr-1 text-[#E4405F]" />
                ) : (
                  <SiYoutube className="w-4 h-4 mr-1 text-[#FF0000]" />
                )}
                <span className="capitalize">{testimonial.platform}</span>
              </Badge>
            </div>
          </div>
          <div className="p-4 bg-card">
            <p className="text-sm text-foreground/90 line-clamp-2 mb-2">
              {testimonial.caption}
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              - {testimonial.author}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
