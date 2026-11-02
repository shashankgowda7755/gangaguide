import HeroSlider from "../HeroSlider";
import heroImage1 from "@assets/generated_images/Calm_Ganga_morning_sunrise_cb8f5772.png";
import heroImage2 from "@assets/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png";
import heroImage3 from "@assets/generated_images/Dev_Deepawali_festival_night_806cde54.png";

export default function HeroSliderExample() {
  const slides = [
    {
      id: 1,
      heading: "Experience the Soul of Kashi — Guided by Locals Who Live Its Stories",
      subheading: "Join us for authentic tours along the Ganga, from sacred temples to hidden corners of Varanasi and beyond.",
      imageUrl: heroImage1,
      ctaPrimary: "Explore Tours",
      ctaSecondary: "Chat on WhatsApp",
    },
    {
      id: 2,
      heading: "Celebrate the Festivals of Kashi with a Local Touch",
      subheading: "Witness the magic of Varanasi's ghats, rituals, and stories with our curated tours.",
      imageUrl: heroImage2,
      ctaPrimary: "Explore Tours",
      ctaSecondary: "Chat on WhatsApp",
    },
    {
      id: 3,
      heading: "Walk Through Centuries of Sacred Heritage",
      subheading: "Discover the timeless traditions and spiritual essence of India's holiest cities.",
      imageUrl: heroImage3,
      ctaPrimary: "Explore Tours",
      ctaSecondary: "Chat on WhatsApp",
    },
  ];

  return (
    <HeroSlider
      slides={slides}
      onExploreClick={() => console.log("Explore tours clicked")}
      onWhatsAppClick={() => console.log("WhatsApp clicked")}
    />
  );
}
