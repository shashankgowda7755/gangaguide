import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface PackageCardProps {
  id: number;
  name: string;
  duration: string;
  shortDescription: string;
  highlights: string[];
  imageUrl: string;
  onViewDetails?: () => void;
  onEnquireNow?: () => void;
}

export default function PackageCard({
  name,
  duration,
  shortDescription,
  highlights,
  imageUrl,
  onViewDetails,
  onEnquireNow,
}: PackageCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-package-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="relative aspect-video overflow-hidden group">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
          <Clock className="w-3 h-3 mr-1" />
          {duration}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-display text-2xl font-semibold mb-3" data-testid="text-package-name">
          {name}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {shortDescription}
        </p>
        <div className="mb-6 space-y-2">
          <p className="text-sm font-semibold text-foreground/70 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Highlights:
          </p>
          <ul className="space-y-1">
            {highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="flex-1 hover-elevate active-elevate-2"
            onClick={onViewDetails}
            data-testid="button-view-details"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            className="flex-1 hover-elevate active-elevate-2 gap-2"
            onClick={onEnquireNow}
            data-testid="button-enquire-now"
          >
            <FaWhatsapp className="w-4 h-4" />
            Enquire Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
