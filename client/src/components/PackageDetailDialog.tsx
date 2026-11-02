import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Calendar, Star } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface PackageDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  package: {
    name: string;
    duration: string;
    shortDescription: string;
    highlights: string[];
    imageUrl: string;
  };
  onEnquireNow?: () => void;
}

export default function PackageDetailDialog({ 
  open, 
  onOpenChange, 
  package: pkg,
  onEnquireNow 
}: PackageDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
            <img
              src={pkg.imageUrl}
              alt={pkg.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <DialogTitle className="font-display text-4xl font-bold text-white mb-2">
                {pkg.name}
              </DialogTitle>
              <Badge className="bg-primary text-primary-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {pkg.duration}
              </Badge>
            </div>
          </div>
          <DialogDescription className="text-base text-foreground/80 leading-relaxed">
            {pkg.shortDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-display text-xl font-semibold">Tour Highlights</h3>
            </div>
            <ul className="space-y-3">
              {pkg.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent/30 rounded-lg p-6 space-y-4">
            <h3 className="font-display text-xl font-semibold mb-4">What's Included</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-sm">Expert Local Guide</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">Transportation</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-sm">Small Group Experience</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white border-none gap-2 text-base font-semibold shadow-lg"
              onClick={() => {
                onEnquireNow?.();
                onOpenChange(false);
              }}
              data-testid="button-whatsapp-enquire"
            >
              <FaWhatsapp className="w-5 h-5" />
              Book via WhatsApp
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-base font-semibold"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
