import { useLocation } from "wouter";
import { MapPin, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";

export default function PackagesLanding() {
  const [, setLocation] = useLocation();

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const categories = [
    {
      id: "popular-events",
      title: "Popular Events",
      description: "Experience festivals like Dev Diwali, Holi, Dussehra, and Navratri in their spiritual glory",
      icon: Flame,
      route: "/packages/popular-events"
    },
    {
      id: "tourist",
      title: "Tourist Packages",
      description: "Explore the spiritual and cultural routes of Varanasi and nearby destinations",
      icon: MapPin,
      route: "/packages/tourist"
    },
    {
      id: "pooja",
      title: "Pooja Packages",
      description: "Perform sacred rituals like Ganga Aarti, Rudrabhishek, or special temple offerings",
      icon: Flame,
      route: "/packages/pooja"
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/booking")} />
      
      <section className="py-16 md:py-24 px-4 bg-background min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <FadeInSection>
            <div className="text-center mb-16">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Ganga Guides
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose your spiritual journey
              </p>
            </div>
          </FadeInSection>

          <div className="space-y-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <FadeInSection key={category.id} delay={index * 0.1}>
                  <Card
                    className="group cursor-pointer hover-elevate active-elevate-2 transition-all border-2 border-card-border hover:border-primary/30"
                    onClick={() => setLocation(category.route)}
                    data-testid={`card-category-${category.id}`}
                  >
                    <CardContent className="p-8 flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
