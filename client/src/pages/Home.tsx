import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Destination, BlogPost, Package } from "@shared/schema";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/HeroSlider";
import FadeInSection from "@/components/FadeInSection";
import PackageCardFlip from "@/components/PackageCardFlip";
import DestinationGuideCard from "@/components/DestinationGuideCard";
import VideoTestimonials from "@/components/VideoTestimonials";
import TextReviews from "@/components/TextReviews";
import TeamMember from "@/components/TeamMember";
import BlogCard from "@/components/BlogCard";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BookingDialog from "@/components/BookingDialog";
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
  const [, setLocation] = useLocation();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");

  // Fetch data from APIs
  const { data: apiDestinations } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const { data: apiBlogPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const { data: apiPackages } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
  });

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
      shortDescription: "Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.",
      imageUrl: varanasi,
    },
    {
      name: "Ayodhya",
      shortDescription: "Dive into the legends of Lord Ram and experience age-old traditions firsthand.",
      imageUrl: ayodhya,
    },
    {
      name: "Sarnath",
      shortDescription: "Visit the site where Buddha gave his first sermon, enriched with history and tranquility.",
      imageUrl: sarnath,
    },
    {
      name: "Prayagraj",
      shortDescription: "Experience the sacred confluence of three holy rivers at Triveni Sangam.",
      imageUrl: prayagraj,
    },
  ];

  const videoTestimonials = [
    {
      id: 1,
      platform: "instagram" as const,
      url: "https://www.instagram.com/gangaguide/p/DPiuY01E1EE/",
      embedUrl: "https://www.instagram.com/p/DPiuY01E1EE/embed",
      caption: "Amazing experience with GangaGuides! Highly recommend their tours.",
      author: "Travel Enthusiast"
    },
    {
      id: 2,
      platform: "youtube" as const,
      url: "https://www.youtube.com/watch?v=example2",
      embedUrl: "https://www.youtube.com/embed/example2",
      caption: "Absolutely magical experience! The sunrise boat tour was breathtaking.",
      author: "Sarah Johnson"
    },
    {
      id: 3,
      platform: "instagram" as const,
      url: "https://www.instagram.com/p/example3/",
      embedUrl: "https://www.instagram.com/p/example3/embed",
      caption: "Spiritual journey of a lifetime! The guides were incredibly knowledgeable.",
      author: "Priya Sharma"
    },
  ];

  const textReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      platform: "google_maps" as const,
      text: "Absolutely magical experience! The sunrise boat tour was breathtaking. The traditional breakfast on the boat was delicious and the hospitality was outstanding.",
      rating: 5,
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      platform: "tripadvisor" as const,
      text: "Best boating experience in Kerala! The family adventure package was perfect for our group. Kids loved the fishing experience and the traditional lunch was amazing.",
      rating: 5,
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Chen",
      platform: "google" as const,
      text: "The romantic sunset cruise exceeded all expectations! The candlelight dinner on the boat was incredibly romantic. Perfect for our anniversary celebration.",
      rating: 5,
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Wilson",
      platform: "tripadvisor" as const,
      text: "Authentic Kerala experience! The homestay was comfortable and the hosts were incredibly welcoming. The canal boating through the backwaters was serene.",
      rating: 5,
      date: "2 months ago"
    },
    {
      id: 5,
      name: "Priya Sharma",
      platform: "google_maps" as const,
      text: "Heaven of Munroe truly lives up to its name! The full-day explorer package was incredible. Every moment was well-planned and the guide was knowledgeable.",
      rating: 5,
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Michael Brown",
      platform: "tripadvisor" as const,
      text: "Outstanding service and unforgettable memories! The canal boating through the backwaters was peaceful and the bird watching opportunities were fantastic.",
      rating: 5,
      date: "3 months ago"
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

  const handleWhatsApp = (packageName?: string) => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = packageName 
      ? `Hi, I'm interested in the ${packageName} package. Can you share details?`
      : "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleBookNow = (packageName: string) => {
    setSelectedPackage(packageName);
    setBookingDialogOpen(true);
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
                Featured Packages
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Explore our most popular spiritual journeys and experiences
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {(apiPackages || packages).slice(0, 3).map((pkg) => {
              const pkgId = 'id' in pkg && typeof pkg.id === 'string' ? pkg.id : ('id' in pkg ? pkg.id : 1);
              return (
                <PackageCardFlip
                  key={pkgId}
                  id={pkgId}
                  name={pkg.name}
                  duration={pkg.duration}
                  shortDescription={pkg.shortDescription}
                  highlights={pkg.highlights}
                  imageUrl={pkg.imageUrl}
                  onViewDetails={() => setLocation(`/package/${pkgId}`)}
                  onEnquireNow={() => handleWhatsApp(pkg.name)}
                  onBookNow={() => handleBookNow(pkg.name)}
                />
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setLocation("/packages")}
              className="bg-primary text-primary-foreground border border-primary-border"
              data-testid="button-view-all-packages"
            >
              View All Packages
            </Button>
          </div>
        </div>
      </section>

      <section id="destinations" className="py-16 md:py-24 px-4 bg-accent/30">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Sacred Destinations
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Explore Varanasi, Sarnath, Ayodhya, and other spiritual gems
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {(apiDestinations || destinations).slice(0, 2).map((destination, index) => {
              const imageUrl = 'mainImage' in destination ? destination.mainImage : destination.imageUrl;
              const destId = 'id' in destination && typeof destination.id === 'string' 
                ? destination.id 
                : destination.name.toLowerCase();
              return (
                <FadeInSection key={destination.name} delay={index * 0.1}>
                  <DestinationGuideCard
                    name={destination.name}
                    shortDescription={destination.shortDescription}
                    imageUrl={imageUrl}
                    onClick={() => setLocation(`/destination/${destId}`)}
                  />
                </FadeInSection>
              );
            })}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setLocation("/destinations")}
              className="bg-primary text-primary-foreground border border-primary-border"
              data-testid="button-view-all-destinations"
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                About GangaGuides
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
                Local insight, authentic experiences, and a passion for sharing the soul of Kashi
              </p>
            </div>
          </FadeInSection>
          
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-center text-lg leading-relaxed text-foreground/90">
              GangaGuides was born to connect travelers with the living heritage of Varanasi and nearby sacred cities. 
              Our guides are locals who have walked these streets, participated in rituals, and understand the stories 
              behind every temple, ghat, and festival.
            </p>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setLocation("/about")}
              className="bg-primary text-primary-foreground border border-primary-border"
              data-testid="button-learn-more-about"
            >
              Learn More About Us
            </Button>
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
          
          {/* Video Testimonials Section */}
          <FadeInSection delay={0.2}>
            <div className="mb-16">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
                Watch Their Experiences
              </h3>
              <VideoTestimonials testimonials={videoTestimonials} />
            </div>
          </FadeInSection>

          {/* Text Reviews Section */}
          <FadeInSection delay={0.4}>
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
                What They're Saying
              </h3>
              <TextReviews reviews={textReviews} />
            </div>
          </FadeInSection>
        </div>
      </section>

      <section id="blog" className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Latest Stories & Travel Tips
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Discover the rituals, hidden gems, and experiences that make Varanasi unforgettable
              </p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {(apiBlogPosts || blogPosts).slice(0, 3).map((post, index) => {
              const imageUrl = 'mainImage' in post ? post.mainImage : post.imageUrl;
              const postId = 'id' in post && typeof post.id === 'string' ? post.id : String(index + 1);
              return (
                <BlogCard
                  key={post.title}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageUrl={imageUrl}
                  category={post.category}
                  publishedDate={post.publishedDate}
                  readTime={post.readTime}
                  onClick={() => setLocation(`/blog/${postId}`)}
                />
              );
            })}
          </div>
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setLocation("/blog")}
              className="bg-primary text-primary-foreground border border-primary-border"
              data-testid="button-view-all-blog"
            >
              View All Blog Posts
            </Button>
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
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        packageName={selectedPackage}
      />
    </div>
  );
}
