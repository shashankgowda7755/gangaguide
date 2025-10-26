import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";
import TeamMember from "@/components/TeamMember";

import guide1 from "@assets/generated_images/Local_tour_guide_portrait_a60f1ce8.png";
import guide2 from "@assets/generated_images/Female_guide_portrait_professional_c50981da.png";

export default function About() {
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

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Senior Guide",
      quote: "Sharing the soul of Kashi with travelers is my life's passion",
      photoUrl: guide1,
    },
    {
      name: "Priya Sharma",
      role: "Cultural Expert",
      quote: "Every ghat has a story, and I love bringing them alive",
      photoUrl: guide2,
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => scrollToSection("contact")} />
      
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Meet GangaGuides
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
                Local insight, authentic experiences, and a passion for sharing the soul of Kashi
              </p>
            </div>
          </FadeInSection>
          
          <div className="max-w-4xl mx-auto mb-16">
            <FadeInSection>
              <p className="text-center text-lg leading-relaxed text-foreground/90 mb-8">
                GangaGuides was born to connect travelers with the living heritage of Varanasi and nearby sacred cities. 
                Our guides are locals who have walked these streets, participated in rituals, and understand the stories 
                behind every temple, ghat, and festival. We believe in small groups, authentic experiences, and creating 
                memories that stay with you forever.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="bg-accent/30 rounded-lg p-8 mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-foreground/90 leading-relaxed">
                  To preserve and share the authentic spiritual and cultural heritage of Kashi through meaningful, 
                  personalized experiences that connect travelers with the soul of this ancient city.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="bg-accent/30 rounded-lg p-8">
                <h2 className="font-display text-2xl font-bold mb-4">What Sets Us Apart</h2>
                <ul className="space-y-3 text-foreground/90">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Local guides born and raised in Varanasi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Small group tours for personalized attention</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Access to hidden gems and authentic experiences</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Deep understanding of rituals and traditions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Flexible itineraries tailored to your interests</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>

          <FadeInSection delay={0.4}>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
              Meet Our Team
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <FadeInSection key={member.name} delay={0.5 + index * 0.1}>
                <TeamMember {...member} />
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
