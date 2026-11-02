import { useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Privacy() {
  const [, setLocation] = useLocation();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/booking")} />

      <section className="pt-32 pb-16 md:pt-36 md:pb-24 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-center mb-12">Last updated: 2 November 2026</p>

          <div className="space-y-8 text-lg leading-relaxed text-foreground/90">
            <div>
              <h2 className="font-display text-2xl font-bold mb-3">What we collect</h2>
              <p>
                When you plan a trip, our forms ask for your name, email, phone number, travel date, number of
                travellers and any requests. Pressing Submit opens WhatsApp with these details filled in. Nothing
                is sent until you press send in WhatsApp, and this website does not store your form details on a
                server.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-3">How we use it</h2>
              <p>
                We use the details you send us only to reply to you, plan your trip and arrange the guides and
                services you book. We do not sell or rent your details to anyone.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-3">Cookies and other services</h2>
              <p>
                This website does not use advertising or analytics cookies. The home page shows posts from our
                Instagram account; those posts are loaded from Instagram (Meta), which may set its own cookies
                under its own privacy policy. Messages you send us travel through WhatsApp under WhatsApp's
                terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-3">Children</h2>
              <p>
                Trips for anyone under 18 should be planned by a parent or guardian.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold mb-3">Your choices</h2>
              <p>
                You can ask us at any time to see, correct or delete the details you have shared with us. Message
                us on WhatsApp at{" "}
                <a href={`https://wa.me/${whatsappNumber}`} className="underline" target="_blank" rel="noopener noreferrer">
                  +91 84680 03094
                </a>{" "}
                and we will act on it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
