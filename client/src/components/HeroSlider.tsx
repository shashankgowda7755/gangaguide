import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  id: number;
  heading: string;
  subheading: string;
  imageUrl: string;
  ctaPrimary: string;
  ctaSecondary?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  onExploreClick?: () => void;
  onWhatsAppClick?: () => void;
}

export default function HeroSlider({ slides, onExploreClick, onWhatsAppClick }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" data-testid="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
          
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="text-center max-w-4xl">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg" data-testid="hero-heading">
                {slide.heading}
              </h1>
              <p className="font-body text-lg md:text-xl lg:text-2xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow-md" data-testid="hero-subheading">
                {slide.subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover-elevate active-elevate-2 min-w-[200px]"
                  onClick={onExploreClick}
                  data-testid="button-explore-tours"
                >
                  {slide.ctaPrimary}
                </Button>
                {slide.ctaSecondary && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover-elevate active-elevate-2 min-w-[200px]"
                    onClick={onWhatsAppClick}
                    data-testid="button-whatsapp-hero"
                  >
                    {slide.ctaSecondary}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover-elevate active-elevate-2 transition-all"
        aria-label="Previous slide"
        data-testid="button-prev-slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover-elevate active-elevate-2 transition-all"
        aria-label="Next slide"
        data-testid="button-next-slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`dot-slide-${index}`}
          />
        ))}
      </div>
    </div>
  );
}
