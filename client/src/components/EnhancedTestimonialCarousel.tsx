import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

interface EnhancedTestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function EnhancedTestimonialCarousel({ testimonials }: EnhancedTestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="relative max-w-5xl mx-auto" data-testid="testimonial-carousel">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="border-2 border-card-border bg-gradient-to-br from-card via-card to-accent/20 shadow-2xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0">
                      <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-primary/20 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground text-2xl font-bold">
                          {getInitials(testimonial.name)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <Quote className="w-12 h-12 md:w-16 md:h-16 text-primary/20" />
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${
                                i < testimonial.rating 
                                  ? "fill-secondary text-secondary" 
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="font-accent text-xl md:text-2xl italic text-foreground mb-6 leading-relaxed" data-testid="text-testimonial">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="border-l-4 border-primary pl-4">
                        <p className="font-semibold text-lg text-foreground" data-testid="text-testimonial-name">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-card/95 backdrop-blur-sm border-2 border-primary/30 shadow-xl w-12 h-12 hover:scale-110 transition-transform"
        aria-label="Previous testimonial"
        data-testid="button-prev-testimonial"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </Button>

      <Button
        size="icon"
        variant="outline"
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-card/95 backdrop-blur-sm border-2 border-primary/30 shadow-xl w-12 h-12 hover:scale-110 transition-transform"
        aria-label="Next testimonial"
        data-testid="button-next-testimonial"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </Button>

      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all rounded-full ${
              index === current 
                ? "bg-primary w-8 h-3" 
                : "bg-muted hover:bg-primary/50 w-3 h-3"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            data-testid={`dot-testimonial-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
