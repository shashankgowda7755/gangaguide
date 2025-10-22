import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { FaWhatsapp } from "react-icons/fa";
import { Send, User, Mail, Phone, Calendar, Users, MessageSquare, Package } from "lucide-react";

interface EnhancedContactFormProps {
  onSubmit?: (data: FormData) => void;
  onWhatsAppClick?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  package: string;
  travelDate: string;
  numTravelers: string;
  specialRequests: string;
}

export default function EnhancedContactForm({ onSubmit, onWhatsAppClick }: EnhancedContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    package: "",
    travelDate: "",
    numTravelers: "1",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onSubmit?.(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden" data-testid="form-contact">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <CardHeader className="text-center relative z-10 pb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
          <Package className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          Plan Your Spiritual Journey
        </CardTitle>
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Share your travel details and we'll craft a personalized itinerary for your sacred experience
        </p>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter your full name"
                required
                className="h-12 border-2 focus:border-primary transition-all"
                data-testid="input-name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your.email@example.com"
                required
                className="h-12 border-2 focus:border-primary transition-all"
                data-testid="input-email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
                className="h-12 border-2 focus:border-primary transition-all"
                data-testid="input-phone"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="package" className="text-base font-semibold flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                Select Package
              </Label>
              <Select value={formData.package} onValueChange={(value) => handleChange("package", value)}>
                <SelectTrigger className="h-12 border-2 focus:border-primary transition-all" data-testid="select-package">
                  <SelectValue placeholder="Choose a tour package" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-day-kashi">1-Day Kashi Darshan</SelectItem>
                  <SelectItem value="2-day-sarnath">2-Day Kashi + Sarnath</SelectItem>
                  <SelectItem value="3-day-ayodhya">3-Day Ayodhya + Kashi</SelectItem>
                  <SelectItem value="custom">Custom Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="travelDate" className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Preferred Travel Date
              </Label>
              <Input
                id="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={(e) => handleChange("travelDate", e.target.value)}
                className="h-12 border-2 focus:border-primary transition-all"
                data-testid="input-date"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numTravelers" className="text-base font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Number of Travelers
              </Label>
              <Select value={formData.numTravelers} onValueChange={(value) => handleChange("numTravelers", value)}>
                <SelectTrigger className="h-12 border-2 focus:border-primary transition-all" data-testid="select-travelers">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Person' : 'People'}
                    </SelectItem>
                  ))}
                  <SelectItem value="10+">10+ People</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Special Requests or Questions
            </Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
              placeholder="Tell us about dietary preferences, accessibility needs, or any questions you have..."
              rows={4}
              className="border-2 focus:border-primary transition-all resize-none"
              data-testid="textarea-requests"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 h-14 bg-primary text-primary-foreground text-lg font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
              data-testid="button-submit"
            >
              <Send className="w-5 h-5" />
              Submit Inquiry
            </Button>
            <Button
              type="button"
              onClick={onWhatsAppClick}
              className="flex-1 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white border-none text-lg font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
              data-testid="button-whatsapp-direct"
            >
              <FaWhatsapp className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
