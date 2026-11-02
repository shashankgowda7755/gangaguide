import { useState } from "react";
import { useLocation, useParams } from "wouter";
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
import { Filter, ArrowLeft } from "lucide-react";

const categoryInfo: Record<string, { title: string; description: string; category: string }> = {
  "popular-events": {
    title: "Popular Events",
    description: "Experience the spiritual glory of Varanasi's sacred festivals",
    category: "popular_event"
  },
  "tourist": {
    title: "Tourist Packages",
    description: "Explore the cultural and spiritual routes of Varanasi",
    category: "touristic"
  },
  "pooja": {
    title: "Pooja Packages",
    description: "Sacred rituals and temple offerings for spiritual blessings",
    category: "pooja"
  }
};

export default function PackageCategory() {
  const params = useParams() as { category: string };
  const categorySlug = params.category;
  const [, setLocation] = useLocation();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [durationFilter, setDurationFilter] = useState<string>("all");

  const categoryData = categoryInfo[categorySlug];

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

  const packages = apiPackages || [];

  const categoryPackages = packages.filter(pkg => 
    pkg.category === categoryData?.category
  );

  const filteredPackages = categoryPackages.filter(pkg => 
    durationFilter === "all" || pkg.duration.includes(durationFilter)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading packages...</p>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/booking")} />
      
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <Button
              variant="ghost"
              className="mb-8"
              onClick={() => setLocation("/packages")}
              data-testid="button-back-to-categories"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>

            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {categoryData.title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                {categoryData.description}
              </p>
            </div>
          </FadeInSection>

          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Duration:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge
                className={`cursor-pointer ${durationFilter === "all" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setDurationFilter("all")}
                data-testid="filter-duration-all"
              >
                All
              </Badge>
              <Badge
                className={`cursor-pointer ${durationFilter === "Day" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setDurationFilter("Day")}
                data-testid="filter-duration-day"
              >
                Day Trips
              </Badge>
              <Badge
                className={`cursor-pointer ${durationFilter === "Night" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setDurationFilter("Night")}
                data-testid="filter-duration-night"
              >
                Multi-Day
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
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

          {filteredPackages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No packages found in this category.
              </p>
            </div>
          )}
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
