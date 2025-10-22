import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, ArrowLeft, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BottomNav from "@/components/BottomNav";
import type { Destination } from "@shared/schema";

export default function DestinationDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: destination, isLoading } = useQuery<Destination>({
    queryKey: ['/api/destinations', id],
    enabled: !!id,
  });

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = destination
      ? `Hi, I'm interested in visiting ${destination.name}. Can you share details about tours to this destination?`
      : "Hi, I'm interested in booking a GangaGuides tour.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareWhatsApp = () => {
    if (!destination) return;
    const url = window.location.href;
    const message = `Check out this amazing destination: ${destination.name}\n${url}`;
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

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg text-muted-foreground">Destination not found</p>
        <Button onClick={() => setLocation("/")} data-testid="button-back-home">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  const images = [
    destination.mainImage,
    destination.image2,
    destination.image3,
    destination.image4,
  ].filter((img): img is string => Boolean(img));

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/#contact")} />

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <Button
          variant="ghost"
          onClick={() => setLocation("/#destinations")}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Destinations
        </Button>

        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2" data-testid="text-destination-name">
                {destination.name}
              </h1>
              <Badge className="gap-2">
                Destination Guide
              </Badge>
            </div>
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

          {/* Main Image */}
          <Card className="overflow-hidden">
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={destination.mainImage}
                alt={destination.name}
                className="w-full h-full object-cover"
                data-testid="img-main"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </Card>

          {/* Additional Images */}
          {images.length > 1 && (
            <div className={`grid gap-4 ${images.length === 2 ? 'grid-cols-1 md:grid-cols-2' : images.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
              {images.slice(1).map((image, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={image}
                      alt={`${destination.name} ${index + 2}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      data-testid={`img-additional-${index}`}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Description */}
          <Card>
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                About {destination.name}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap" data-testid="text-description">
                {destination.description}
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6 md:p-8 text-center">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Ready to Explore {destination.name}?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Contact us to learn more about our guided tours to this sacred destination.
              </p>
              <Button
                size="lg"
                onClick={handleWhatsApp}
                className="gap-2"
                data-testid="button-contact-whatsapp"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
