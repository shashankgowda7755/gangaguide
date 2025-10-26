import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Destination } from "@shared/schema";
import DestinationGuideCard from "@/components/DestinationGuideCard";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";

export default function Destinations() {
  const [, setLocation] = useLocation();

  const { data: apiDestinations, isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
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

  const destinations = apiDestinations || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading destinations...</p>
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
                Discover Sacred Destinations
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Explore Varanasi, Sarnath, Ayodhya, and other spiritual gems through our curated guides
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((destination, index) => (
              <FadeInSection key={destination.id} delay={index * 0.1}>
                <DestinationGuideCard
                  name={destination.name}
                  shortDescription={destination.shortDescription}
                  imageUrl={destination.mainImage}
                  onClick={() => setLocation(`/destination/${destination.id}`)}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
