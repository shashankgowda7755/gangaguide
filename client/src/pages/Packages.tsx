import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Package } from "@shared/schema";
import PackageCardFlip from "@/components/PackageCardFlip";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BookingDialog from "@/components/BookingDialog";
import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

export default function Packages() {
  const [, setLocation] = useLocation();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");

  const { data: apiPackages, isLoading } = useQuery<Package[]>({
    queryKey: ['/api/packages'],
  });

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const packages = apiPackages || [];

  // Filter packages
  const filteredPackages = packages.filter(pkg => {
    const categoryMatch = categoryFilter === "all" || 
      ('category' in pkg && pkg.category === categoryFilter);
    const durationMatch = durationFilter === "all" || pkg.duration.includes(durationFilter);
    return categoryMatch && durationMatch;
  });

  // Group by category
  const popularEvents = filteredPackages.filter(pkg => 
    'category' in pkg && pkg.category === 'popular_event'
  );
  const touristicPackages = filteredPackages.filter(pkg => 
    'category' in pkg && pkg.category === 'touristic'
  );
  const poojaPackages = filteredPackages.filter(pkg => 
    'category' in pkg && pkg.category === 'pooja'
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading packages...</p>
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
                Our Spiritual Journeys
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Explore all our packages - from popular events to spiritual experiences
              </p>
            </div>
          </FadeInSection>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge
                className={`cursor-pointer ${categoryFilter === "all" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setCategoryFilter("all")}
                data-testid="filter-category-all"
              >
                All Categories
              </Badge>
              <Badge
                className={`cursor-pointer ${categoryFilter === "popular_event" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setCategoryFilter("popular_event")}
                data-testid="filter-category-events"
              >
                Popular Events
              </Badge>
              <Badge
                className={`cursor-pointer ${categoryFilter === "touristic" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setCategoryFilter("touristic")}
                data-testid="filter-category-tourist"
              >
                Tourist Packages
              </Badge>
              <Badge
                className={`cursor-pointer ${categoryFilter === "pooja" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setCategoryFilter("pooja")}
                data-testid="filter-category-pooja"
              >
                Pooja Packages
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className={`cursor-pointer ${durationFilter === "all" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setDurationFilter("all")}
                data-testid="filter-duration-all"
              >
                All Durations
              </Badge>
              <Badge
                className={`cursor-pointer ${durationFilter === "1 Day" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setDurationFilter("1 Day")}
                data-testid="filter-duration-1day"
              >
                1 Day
              </Badge>
              <Badge
                className={`cursor-pointer ${durationFilter === "2 Days" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setDurationFilter("2 Days")}
                data-testid="filter-duration-2days"
              >
                2 Days
              </Badge>
              <Badge
                className={`cursor-pointer ${durationFilter === "3 Days" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setDurationFilter("3 Days")}
                data-testid="filter-duration-3days"
              >
                3 Days
              </Badge>
            </div>
          </div>

          {/* Popular Events Section */}
          {popularEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                Popular Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularEvents.map((pkg) => (
                  <PackageCardFlip
                    key={pkg.id}
                    id={pkg.id}
                    name={pkg.name}
                    duration={pkg.duration}
                    shortDescription={pkg.shortDescription}
                    highlights={pkg.highlights}
                    imageUrl={pkg.imageUrl}
                    onViewDetails={() => setLocation(`/package/${pkg.id}`)}
                    onEnquireNow={() => handleWhatsApp(pkg.name)}
                    onBookNow={() => handleBookNow(pkg.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Touristic Packages Section */}
          {touristicPackages.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                Tourist Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {touristicPackages.map((pkg) => (
                  <PackageCardFlip
                    key={pkg.id}
                    id={pkg.id}
                    name={pkg.name}
                    duration={pkg.duration}
                    shortDescription={pkg.shortDescription}
                    highlights={pkg.highlights}
                    imageUrl={pkg.imageUrl}
                    onViewDetails={() => setLocation(`/package/${pkg.id}`)}
                    onEnquireNow={() => handleWhatsApp(pkg.name)}
                    onBookNow={() => handleBookNow(pkg.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pooja Packages Section */}
          {poojaPackages.length > 0 && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
                Pooja Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {poojaPackages.map((pkg) => (
                  <PackageCardFlip
                    key={pkg.id}
                    id={pkg.id}
                    name={pkg.name}
                    duration={pkg.duration}
                    shortDescription={pkg.shortDescription}
                    highlights={pkg.highlights}
                    imageUrl={pkg.imageUrl}
                    onViewDetails={() => setLocation(`/package/${pkg.id}`)}
                    onEnquireNow={() => handleWhatsApp(pkg.name)}
                    onBookNow={() => handleBookNow(pkg.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No packages found matching your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        packageName={selectedPackage}
      />
      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={() => handleWhatsApp()} />
    </div>
  );
}
