import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info, BookOpen } from "lucide-react";

interface DestinationGuideCardProps {
  name: string;
  shortDescription: string;
  imageUrl: string;
  onClick?: () => void;
}

export default function DestinationGuideCard({ 
  name, 
  shortDescription, 
  imageUrl, 
  onClick
}: DestinationGuideCardProps) {
  return (
    <Card
      className="group overflow-hidden hover-elevate transition-all duration-500 border-2 border-card-border hover:border-primary/30 flex flex-col cursor-pointer"
      onClick={onClick}
      data-testid={`card-destination-${name.toLowerCase()}`}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-lg">
          <MapPin className="w-3 h-3 mr-1" />
          Guide
        </Badge>
        <h3 className="absolute bottom-4 left-4 right-4 font-display text-2xl md:text-3xl font-bold text-white" data-testid="text-destination-name">
          {name}
        </h3>
      </div>
      
      <CardContent className="p-6 bg-gradient-to-br from-card to-accent/20 flex-1 flex flex-col justify-between">
        <p className="text-muted-foreground leading-relaxed mb-6">
          {shortDescription}
        </p>

        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          data-testid="button-read-guide"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Read Full Guide
        </Button>
      </CardContent>
    </Card>
  );
}
