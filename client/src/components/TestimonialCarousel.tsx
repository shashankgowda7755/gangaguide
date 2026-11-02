import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-4xl mx-auto" data-testid="testimonial-carousel">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <Card className="bg-card border-card-border">
                <CardContent className="p-8 md:p-12">
                  <Quote className="w-12 h-12 text-primary mb-6" />
                  <p className="font-accent text-lg md:text-xl italic text-foreground mb-6 leading-relaxed" data-testid="text-testimonial">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < testimonial.rating ? "text-primary" : "text-muted"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="font-semibold text-foreground" data-testid="text-testimonial-name">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-card border border-border hover-elevate active-elevate-2 transition-all"
        aria-label="Previous testimonial"
        data-testid="button-prev-testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-card border border-border hover-elevate active-elevate-2 transition-all"
        aria-label="Next testimonial"
        data-testid="button-next-testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-primary w-6" : "bg-muted"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            data-testid={`dot-testimonial-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
