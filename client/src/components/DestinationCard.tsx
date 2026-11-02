import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface DestinationCardProps {
  name: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

export default function DestinationCard({ name, description, imageUrl, onClick }: DestinationCardProps) {
  return (
    <Card
      className="relative overflow-hidden group cursor-pointer hover-elevate transition-all aspect-[4/3]"
      onClick={onClick}
      data-testid={`card-destination-${name.toLowerCase()}`}
    >
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-2" data-testid="text-destination-name">
          {name}
        </h3>
        <p className="text-white/90 text-sm md:text-base mb-3 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
          <span>Explore Destination</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
}
