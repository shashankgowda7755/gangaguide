import React from "react";
import HeroSlider from "@/components/HeroSlider";
import FadeInSection from "@/components/FadeInSection";
import PackageCardFlip from "@/components/PackageCardFlip";
import PackageDetailDialog from "@/components/PackageDetailDialog";
import DestinationGuideCard from "@/components/DestinationGuideCard";
import EnhancedTestimonialCarousel from "@/components/EnhancedTestimonialCarousel";
import TeamMember from "@/components/TeamMember";
import BlogCard from "@/components/BlogCard";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";

import heroImage1 from "@assets/generated_images/Calm_Ganga_morning_sunrise_cb8f5772.png";
import heroImage2 from "@assets/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png";
import heroImage3 from "@assets/generated_images/Dev_Deepawali_festival_night_806cde54.png";
import heroImage4 from "@assets/generated_images/Varanasi_temple_architecture_detail_a35f07ab.png";
import heroImage5 from "@assets/generated_images/Boat_perspective_Ganges_view_e308dae7.png";

import package1 from "@assets/generated_images/Kashi_walking_tour_group_d0392eea.png";
import package2 from "@assets/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png";
import package3 from "@assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png";

import varanasi from "@assets/generated_images/Boat_perspective_Ganges_view_e308dae7.png";
import ayodhya from "@assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png";
import sarnath from "@assets/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png";
import prayagraj from "@assets/generated_images/Prayagraj_Triveni_Sangam_confluence_c12597e6.png";

import guide1 from "@assets/generated_images/Local_tour_guide_portrait_a60f1ce8.png";
import guide2 from "@assets/generated_images/Female_guide_portrait_professional_c50981da.png";

import blog1 from "@assets/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png";
import blog2 from "@assets/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png";
import blog3 from "@assets/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = React.useState<number | null>(null);

  const heroSlides = [
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
    {
      id: 4,
      heading: "Discover Ancient Temples and Timeless Traditions",
      subheading: "Experience the spiritual richness of Kashi with guides who understand its sacred history.",
      imageUrl: heroImage4,
      ctaPrimary: "Explore Tours",
      ctaSecondary: "Chat on WhatsApp",
    },
    {
      id: 5,
      heading: "Journey Along the Holy Ganges",
      subheading: "Experience sunrise boat rides, sacred rituals, and the eternal flow of spirituality.",
      imageUrl: heroImage5,
      ctaPrimary: "Explore Tours",
      ctaSecondary: "Chat on WhatsApp",
    },
  ];

  const packages = [
    {
      id: 1,
      name: "1-Day Kashi Darshan",
      duration: "1 Day",
      shortDescription: "Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.",
      highlights: [
        "Sunrise boat ride on the Ganges",
        "Visit to Kashi Vishwanath Temple",
        "Explore hidden alleys of old Varanasi",
        "Witness evening Ganga Aarti ceremony",
      ],
      imageUrl: package1,
    },
    {
      id: 2,
      name: "2-Day Kashi + Sarnath",
      duration: "2 Days",
      shortDescription: "Combine the spiritual energy of Varanasi with the peaceful Buddhist heritage of Sarnath on this immersive journey.",
      highlights: [
        "Complete Varanasi tour with boat ride",
        "Explore Sarnath where Buddha gave first sermon",
        "Visit Dhamek Stupa and museums",
        "Morning meditation session by the Ganges",
      ],
      imageUrl: package2,
    },
    {
      id: 3,
      name: "3-Day Ayodhya + Kashi Spiritual Trail",
      duration: "3 Days",
      shortDescription: "A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.",
      highlights: [
        "Ram Janmabhoomi and major Ayodhya temples",
        "Hanuman Garhi and Kanak Bhawan",
        "Complete Varanasi heritage experience",
        "Sacred rituals participation opportunity",
      ],
      imageUrl: package3,
    },
  ];

  const destinations = [
    {
      name: "Varanasi",
      description: "Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.",
      imageUrl: varanasi,
    },
    {
      name: "Ayodhya",
      description: "Dive into the legends of Lord Ram and experience age-old traditions firsthand.",
      imageUrl: ayodhya,
    },
    {
      name: "Sarnath",
      description: "Visit the site where Buddha gave his first sermon, enriched with history and tranquility.",
      imageUrl: sarnath,
    },
    {
      name: "Prayagraj",
      description: "Experience the sacred confluence of three holy rivers at Triveni Sangam.",
      imageUrl: prayagraj,
    },
  ];

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

  const blogPosts = [
    {
      title: "Morning Aarti Through My Eyes",
      excerpt: "Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.",
      imageUrl: blog1,
      category: "Rituals",
      publishedDate: "Oct 15, 2025",
      readTime: "5 min read",
    },
    {
      title: "Top 5 Hidden Temples in Varanasi",
      excerpt: "Beyond the famous shrines lie secret temples with incredible stories. Here are our favorite hidden spiritual gems.",
      imageUrl: blog2,
      category: "Heritage",
      publishedDate: "Oct 10, 2025",
      readTime: "7 min read",
    },
    {
      title: "Ayodhya Spiritual Trail: What You Need to Know",
      excerpt: "Planning a pilgrimage to Ayodhya? Our comprehensive guide covers everything from temples to local customs.",
      imageUrl: blog3,
      category: "Travel Tips",
      publishedDate: "Oct 5, 2025",
      readTime: "10 min read",
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const phoneNumber = "919876543210";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => scrollToSection("contact")} />
      
      <section id="home">
        <HeroSlider
          slides={heroSlides}
          onExploreClick={() => scrollToSection("packages")}
          onWhatsAppClick={handleWhatsApp}
        />
      </section>

      <section id="packages" className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Our Spiritual Journeys
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Choose your perfect tour and let us guide you through the heart of Varanasi and nearby sacred destinations.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCardFlip
                key={pkg.id}
                {...pkg}
                onViewDetails={() => setSelectedPackage(pkg.id)}
                onEnquireNow={handleWhatsApp}
              />
            ))}
          </div>
          
          {selectedPackage !== null && (
            <PackageDetailDialog
              open={selectedPackage !== null}
              onOpenChange={(open) => !open && setSelectedPackage(null)}
              package={packages[selectedPackage - 1]}
              onEnquireNow={handleWhatsApp}
            />
          )}
        </div>
      </section>

      <section id="destinations" className="py-16 md:py-24 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Discover Sacred Destinations
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Explore Varanasi, Sarnath, Ayodhya, and other spiritual gems through our curated guides.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destinations.map((destination, index) => (
              <FadeInSection key={destination.name} delay={index * 0.1}>
                <DestinationGuideCard
                  {...destination}
                  onClick={() => console.log(`Read guide for ${destination.name}`)}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Meet GangaGuides
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
                Local insight, authentic experiences, and a passion for sharing the soul of Kashi.
              </p>
            </div>
          </FadeInSection>
          
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-center text-lg leading-relaxed text-foreground/90">
              GangaGuides was born to connect travelers with the living heritage of Varanasi and nearby sacred cities. 
              Our guides are locals who have walked these streets, participated in rituals, and understand the stories 
              behind every temple, ghat, and festival. We believe in small groups, authentic experiences, and creating 
              memories that stay with you forever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 md:py-24 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Stories from Our Travelers
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Hear from those who experienced Varanasi through our eyes.
              </p>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <EnhancedTestimonialCarousel testimonials={testimonials} />
          </FadeInSection>
        </div>
      </section>

      <section id="blog" className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                From the Ghats: Stories & Travel Tips
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Read about the rituals, hidden gems, and experiences that make Varanasi unforgettable.
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.title}
                {...post}
                onClick={() => console.log(`Read ${post.title}`)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 md:py-24 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
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
