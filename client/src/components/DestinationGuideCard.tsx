import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, BookOpen } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface DestinationGuideCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
  onBookNow?: () => void;
}

export default function DestinationGuideCard({ 
  name, 
  description, 
  imageUrl, 
  onClick,
  onBookNow 
}: DestinationGuideCardProps) {
  return (
    <Card
      className="group overflow-hidden hover-elevate transition-all duration-500 border-2 border-card-border hover:border-primary/30"
      data-testid={`card-destination-${name.toLowerCase()}`}
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent md:bg-gradient-to-t md:from-transparent md:to-transparent" />
          <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-lg">
            <MapPin className="w-3 h-3 mr-1" />
            Destination Guide
          </Badge>
        </div>
        
        <CardContent className="p-6 md:p-8 flex flex-col justify-between bg-gradient-to-br from-card to-accent/20">
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors" data-testid="text-destination-name">
              {name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Travel Information</h4>
                  <p className="text-xs text-muted-foreground">Complete guide with history, culture, and local insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm mb-1">Optional Booking</h4>
                  <p className="text-xs text-muted-foreground">Read the guide first, book when ready</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClick}
              data-testid="button-read-guide"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read Guide
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground gap-2"
              onClick={onBookNow}
              data-testid="button-book-destination"
            >
              <FaWhatsapp className="w-4 h-4" />
              Book Tour
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
