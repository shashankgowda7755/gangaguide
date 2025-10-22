import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, User, Mail, Phone, Users, MessageSquare, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName?: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  numTravelers: string;
  specialRequests: string;
}

export default function BookingDialog({ 
  open, 
  onOpenChange,
  packageName = ""
}: BookingDialogProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    numTravelers: "1",
    specialRequests: "",
  });

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppBooking = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = `Hi! I want to book ${packageName || 'a tour package'}.\n\nMy details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTravel Date: ${formData.travelDate}\nNumber of Travelers: ${formData.numTravelers}\nSpecial Requests: ${formData.specialRequests || 'None'}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="font-display text-3xl text-center">
            Quick Booking
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {packageName ? `Book your ${packageName} experience` : 'Book your spiritual journey with us'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name *
              </Label>
              <Input
                id="booking-name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your name"
                required
                data-testid="input-booking-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email *
              </Label>
              <Input
                id="booking-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your@email.com"
                required
                data-testid="input-booking-email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number *
              </Label>
              <Input
                id="booking-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
                data-testid="input-booking-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-date" className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Preferred Date *
              </Label>
              <Input
                id="booking-date"
                type="date"
                value={formData.travelDate}
                onChange={(e) => handleChange("travelDate", e.target.value)}
                required
                data-testid="input-booking-date"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-travelers" className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              Number of Travelers *
            </Label>
            <Select
              value={formData.numTravelers}
              onValueChange={(value) => handleChange("numTravelers", value)}
            >
              <SelectTrigger id="booking-travelers" data-testid="select-booking-travelers">
                <SelectValue placeholder="Select number of travelers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Person</SelectItem>
                <SelectItem value="2">2 People</SelectItem>
                <SelectItem value="3">3 People</SelectItem>
                <SelectItem value="4">4 People</SelectItem>
                <SelectItem value="5">5 People</SelectItem>
                <SelectItem value="6+">6+ People</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-requests" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Special Requests
            </Label>
            <Textarea
              id="booking-requests"
              value={formData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
              placeholder="Any dietary restrictions, accessibility needs, or special preferences..."
              className="resize-none min-h-24"
              data-testid="textarea-booking-requests"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              onClick={handleWhatsAppBooking}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold gap-2 py-6 text-lg"
              disabled={!formData.name || !formData.email || !formData.phone || !formData.travelDate}
              data-testid="button-booking-whatsapp"
            >
              <FaWhatsapp className="w-5 h-5" />
              Complete Booking via WhatsApp
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              We'll connect with you on WhatsApp to finalize your booking
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
