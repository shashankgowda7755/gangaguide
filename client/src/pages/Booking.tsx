import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import FadeInSection from "@/components/FadeInSection";

export default function Booking() {
  const [, setLocation] = useLocation();

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/booking")} />
      
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Plan Your Journey
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Let us help you create an unforgettable spiritual experience
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <EnhancedContactForm
              onSubmit={(data) => console.log("Form submitted:", data)}
              onWhatsAppClick={handleWhatsApp}
            />
          </FadeInSection>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
