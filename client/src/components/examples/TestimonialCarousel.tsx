import TestimonialCarousel from "../TestimonialCarousel";

export default function TestimonialCarouselExample() {
  const testimonials = [
    {
      id: 1,
      name: "Ananya R.",
      location: "Mumbai, India",
      text: "The sunrise boat ride was magical. Our guide made every moment unforgettable with stories that brought Varanasi to life.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rohit M.",
      location: "Delhi, India",
      text: "GangaGuides helped me explore hidden temples I never would have found alone. Truly authentic local experience.",
      rating: 5,
    },
    {
      id: 3,
      name: "Sarah K.",
      location: "London, UK",
      text: "Spiritual, peaceful, and beautifully organized. A must for first-time visitors to Varanasi. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <div className="p-8 bg-background">
      <TestimonialCarousel testimonials={testimonials} />
    </div>
  );
}
