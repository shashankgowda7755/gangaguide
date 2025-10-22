import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Star, CheckCircle, ArrowLeft, Phone, Share2, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import type { Package } from "@shared/schema";

export default function PackageDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: pkg, isLoading } = useQuery<Package>({
    queryKey: ['/api/packages', id],
    enabled: !!id,
  });

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = pkg
      ? `Hi! I'm interested in the ${pkg.name} package. Can you provide more details?`
      : "Hi, I'm interested in booking a GangaGuides tour.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareWhatsApp = () => {
    if (!pkg) return;
    const url = window.location.href;
    const message = `Check out this amazing tour package: ${pkg.name}\n${url}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareInstagram = () => {
    alert("To share on Instagram, please take a screenshot and post it to your story or feed.");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Package not found</p>
        <Button onClick={() => setLocation("/")} data-testid="button-back-home">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/#contact")} />
      
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={pkg.imageUrl}
          alt={pkg.name}
          className="w-full h-full object-cover"
          data-testid="img-package-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl">
            <Badge className="bg-primary text-primary-foreground mb-4 text-base px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              {pkg.duration}
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6" data-testid="text-package-name">
              {pkg.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              {pkg.shortDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => setLocation("/#packages")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleShareWhatsApp}
              data-testid="button-share-whatsapp"
              title="Share on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5 text-green-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShareInstagram}
              data-testid="button-share-instagram"
              title="Share on Instagram"
            >
              <Instagram className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              data-testid="button-copy-link"
              title="Copy Link"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="font-display text-3xl font-bold mb-4">About This Journey</h2>
              <p className="text-foreground/90 leading-relaxed text-lg whitespace-pre-wrap" data-testid="text-package-description">
                {pkg.detailedDescription}
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
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-primary/20 shadow-xl">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold mb-4">Booking Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{pkg.duration}</p>
                      </div>
                    </div>
                    {pkg.price && (
                      <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border-2 border-primary/30">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                          <p className="font-display text-3xl font-bold text-primary" data-testid="text-package-price">
                            ₹{pkg.price}
                          </p>
                        </div>
                      </div>
                    )}
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
                    onClick={handleWhatsApp}
                    data-testid="button-call"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    100% Customizable • Safe & Secure • 500+ Happy Travelers
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
