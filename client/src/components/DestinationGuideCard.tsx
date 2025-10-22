import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, BookOpen } from "lucide-react";

interface DestinationGuideCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

export default function DestinationGuideCard({ 
  name, 
  description, 
  imageUrl, 
  onClick
}: DestinationGuideCardProps) {
  return (
    <Card
      className="group overflow-hidden hover-elevate transition-all duration-500 border-2 border-card-border hover:border-primary/30"
      data-testid={`card-destination-${name.toLowerCase()}`}
    >
      <div className="flex flex-col md:flex-row gap-0">
        <div className="relative h-48 md:h-56 md:w-64 flex-shrink-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-lg">
            <MapPin className="w-3 h-3 mr-1" />
            Guide
          </Badge>
        </div>
        
        <CardContent className="p-6 flex flex-col justify-between bg-gradient-to-br from-card to-accent/20 flex-1">
          <div>
            <h3 className="font-display text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors" data-testid="text-destination-name">
              {name}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              {description}
            </p>
          </div>

          <div>
            <Button
              variant="outline"
              className="w-full"
              onClick={onClick}
              data-testid="button-read-guide"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read Full Guide
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
