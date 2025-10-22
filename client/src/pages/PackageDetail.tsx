import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Users, Calendar, Star, CheckCircle, ArrowLeft, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";

import pkg1 from "@assets/generated_images/Kashi_walking_tour_group_d0392eea.png";
import pkg2 from "@assets/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png";
import pkg3 from "@assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png";

const packageData = {
  1: {
    id: 1,
    name: "1-Day Kashi Darshan",
    duration: "8-10 Hours",
    shortDescription: "Immerse yourself in the sacred atmosphere of Varanasi with visits to key temples, morning boat ride, and evening Ganga Aarti.",
    fullDescription: "Experience the spiritual essence of Varanasi in a comprehensive one-day journey through the ancient city of Kashi. This carefully curated tour takes you through the most sacred and historically significant sites, offering a deep dive into the rich cultural and religious heritage of one of the world's oldest continuously inhabited cities.",
    highlights: [
      "Morning boat ride on the holy Ganges at sunrise",
      "Visit to Kashi Vishwanath Temple (Golden Temple)",
      "Explore Sankat Mochan Hanuman Temple",
      "Traditional lunch at a local restaurant",
      "Walk through the ancient lanes of old Varanasi",
      "Evening Ganga Aarti ceremony at Dashashwamedh Ghat",
      "Photography opportunities at scenic ghats"
    ],
    imageUrl: pkg1,
    detailedItinerary: [
      {
        time: "5:30 AM",
        title: "Hotel Pickup & Sunrise Boat Ride",
        description: "Begin your spiritual journey with a serene boat ride on the Ganges as the sun rises, witnessing the morning rituals and prayers along the ghats."
      },
      {
        time: "7:00 AM",
        title: "Kashi Vishwanath Temple",
        description: "Visit the most revered Shiva temple in Varanasi, one of the twelve Jyotirlingas. Experience the divine energy and architectural beauty."
      },
      {
        time: "9:00 AM",
        title: "Breakfast at Traditional Cafe",
        description: "Enjoy authentic Banarasi breakfast including kachori, jalebi, and lassi at a renowned local eatery."
      },
      {
        time: "10:30 AM",
        title: "Sankat Mochan & BHU Temple",
        description: "Visit the famous Hanuman temple and the modern Birla Temple within Banaras Hindu University campus."
      },
      {
        time: "1:00 PM",
        title: "Traditional Lunch",
        description: "Savor authentic Banarasi cuisine at a carefully selected restaurant."
      },
      {
        time: "3:00 PM",
        title: "Old City Walking Tour",
        description: "Explore the narrow lanes, visit local artisan workshops, and experience the vibrant market culture."
      },
      {
        time: "6:00 PM",
        title: "Ganga Aarti Ceremony",
        description: "Conclude your day with the mesmerizing Ganga Aarti at Dashashwamedh Ghat, a spectacular spiritual ceremony."
      },
      {
        time: "7:30 PM",
        title: "Return to Hotel",
        description: "Drop-off at your hotel with memories of a spiritually enriching day."
      }
    ],
    inclusions: [
      "Experienced local guide",
      "All transportation in AC vehicle",
      "Morning boat ride",
      "Breakfast and lunch",
      "Temple entry fees",
      "Bottled water throughout the tour",
      "Ganga Aarti seating arrangement"
    ],
    exclusions: [
      "Accommodation",
      "Dinner",
      "Personal expenses",
      "Camera fees at certain locations",
      "Tips and gratuities"
    ],
    price: "₹2,500 per person",
    groupSize: "2-8 people"
  },
  2: {
    id: 2,
    name: "2-Day Kashi + Sarnath",
    duration: "2 Days, 1 Night",
    shortDescription: "A comprehensive spiritual journey covering Varanasi and Sarnath, where Buddha gave his first sermon, with comfortable overnight stay.",
    fullDescription: "Embark on a profound two-day spiritual expedition that connects the ancient traditions of Hinduism and Buddhism. This immersive experience combines the sacred ghats and temples of Varanasi with the historic Buddhist sites of Sarnath, offering a unique perspective on India's rich spiritual heritage.",
    highlights: [
      "Two sunrise boat rides on the Ganges",
      "Kashi Vishwanath Temple and major Varanasi temples",
      "Full day exploration of Sarnath Buddhist sites",
      "Dhamek Stupa and Chaukhandi Stupa",
      "Archaeological Museum visit",
      "Two Ganga Aarti ceremonies",
      "Traditional silk weaving demonstration",
      "Authentic local cuisine experiences"
    ],
    imageUrl: pkg2,
    detailedItinerary: [
      {
        time: "Day 1 - Morning",
        title: "Varanasi Temple Circuit",
        description: "Begin with sunrise boat ride, visit Kashi Vishwanath, Annapurna Temple, and other sacred sites. Explore the old city lanes."
      },
      {
        time: "Day 1 - Afternoon",
        title: "Cultural Immersion",
        description: "Visit silk weaving center, enjoy traditional lunch, and explore local markets and artisan workshops."
      },
      {
        time: "Day 1 - Evening",
        title: "Ganga Aarti & Hotel Check-in",
        description: "Attend the evening Ganga Aarti ceremony, followed by check-in at your hotel and dinner."
      },
      {
        time: "Day 2 - Morning",
        title: "Sarnath Exploration",
        description: "Full morning dedicated to Sarnath - visit Dhamek Stupa, Mulagandha Kuti Vihar, Archaeological Museum, and meditation garden."
      },
      {
        time: "Day 2 - Afternoon",
        title: "Return to Varanasi",
        description: "Lunch at Sarnath, return to Varanasi for final shopping or relaxation."
      },
      {
        time: "Day 2 - Evening",
        title: "Sunset Boat Ride & Departure",
        description: "Final boat ride at sunset, witness evening prayers, and departure."
      }
    ],
    inclusions: [
      "1 night accommodation (3-star hotel)",
      "All meals (2 breakfasts, 2 lunches, 1 dinner)",
      "Experienced guide for both days",
      "All transportation in AC vehicle",
      "Two boat rides",
      "All entry fees and permits",
      "Bottled water"
    ],
    exclusions: [
      "Personal expenses",
      "Additional meals",
      "Camera fees",
      "Tips and gratuities",
      "Travel insurance"
    ],
    price: "₹6,500 per person",
    groupSize: "2-6 people"
  },
  3: {
    id: 3,
    name: "3-Day Ayodhya + Kashi Spiritual Trail",
    duration: "3 Days, 2 Nights",
    shortDescription: "A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.",
    fullDescription: "Undertake a transformative three-day pilgrimage that weaves together two of India's most sacred cities. Journey from the birthplace of Lord Rama in Ayodhya to the eternal city of Kashi, experiencing the profound spiritual energy that has drawn seekers for millennia. This carefully designed itinerary balances temple visits, cultural experiences, and moments of personal reflection.",
    highlights: [
      "Ram Janmabhoomi Temple in Ayodhya",
      "Hanuman Garhi and Kanak Bhawan visits",
      "Saryu River Aarti ceremony",
      "Travel between Ayodhya and Varanasi",
      "Complete Varanasi temple circuit",
      "Multiple Ganga boat rides",
      "Two Ganga Aarti ceremonies",
      "Cultural performances and local cuisine",
      "Photography and shopping opportunities"
    ],
    imageUrl: pkg3,
    detailedItinerary: [
      {
        time: "Day 1",
        title: "Ayodhya - City of Lord Rama",
        description: "Arrive in Ayodhya, visit Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan, and other sacred sites. Evening Saryu Aarti, overnight in Ayodhya."
      },
      {
        time: "Day 2 - Morning",
        title: "Travel to Varanasi",
        description: "Morning visit to remaining Ayodhya sites, then scenic drive to Varanasi (approx. 4 hours). Check-in at hotel."
      },
      {
        time: "Day 2 - Evening",
        title: "Introduction to Varanasi",
        description: "Evening boat ride, visit Dashashwamedh Ghat for Ganga Aarti, explore nearby ghats and temples."
      },
      {
        time: "Day 3 - Full Day",
        title: "Varanasi Deep Dive",
        description: "Sunrise boat ride, Kashi Vishwanath Temple, old city walking tour, silk weaving demo, temple circuit, final Ganga Aarti, and departure."
      }
    ],
    inclusions: [
      "2 nights accommodation (3-star hotels)",
      "All meals (3 breakfasts, 3 lunches, 2 dinners)",
      "Ayodhya to Varanasi transfer",
      "Experienced guides in both cities",
      "All transportation in AC vehicle",
      "Boat rides in both cities",
      "All entry fees and permits",
      "Cultural performance tickets",
      "Bottled water throughout"
    ],
    exclusions: [
      "Travel to/from Ayodhya",
      "Personal expenses",
      "Additional meals and beverages",
      "Camera fees",
      "Tips and gratuities",
      "Travel insurance"
    ],
    price: "₹12,500 per person",
    groupSize: "2-8 people"
  }
};

export default function PackageDetail() {
  const [, params] = useRoute("/package/:id");
  const packageId = params?.id ? parseInt(params.id) : 1;
  const pkg = packageData[packageId as keyof typeof packageData] || packageData[1];

  const handleWhatsApp = () => {
    const phoneNumber = "919876543210";
    const message = `Hi! I'm interested in the ${pkg.name} package. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={scrollToTop} />
      
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <Badge className="bg-primary text-primary-foreground mb-4 text-base px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              {pkg.duration}
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              {pkg.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {pkg.shortDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => window.history.back()}
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">About This Journey</h2>
              <p className="text-foreground/90 leading-relaxed text-lg">
                {pkg.fullDescription}
              </p>
            </section>

            <section>
              <h2 className="font-display text-3xl font-bold mb-6">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pkg.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-accent/30 rounded-lg">
                    <Star className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-foreground/90">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display text-3xl font-bold mb-6">Detailed Itinerary</h2>
              <div className="space-y-4">
                {pkg.detailedItinerary.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-24">
                          <Badge variant="secondary" className="text-xs">
                            {item.time}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  Inclusions
                </h2>
                <ul className="space-y-3">
                  {pkg.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-destructive" />
                  Exclusions
                </h2>
                <ul className="space-y-3">
                  {pkg.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-destructive">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-primary/20 shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-4">Booking Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Group Size</p>
                        <p className="font-semibold">{pkg.groupSize}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{pkg.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border-2 border-primary/30">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                        <p className="font-display text-3xl font-bold text-primary">{pkg.price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full h-12 bg-[#25D366] hover:bg-[#20BD5A] text-white border-none text-base font-semibold gap-2"
                    onClick={handleWhatsApp}
                    data-testid="button-whatsapp-enquire"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    Book via WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-semibold gap-2"
                    data-testid="button-call"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    💯 100% Customizable • 🛡️ Safe & Secure • ⭐ 500+ Happy Travelers
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
