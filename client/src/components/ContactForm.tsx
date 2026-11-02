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
import { Send } from "lucide-react";

interface ContactFormProps {
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

export default function ContactForm({ onSubmit, onWhatsAppClick }: ContactFormProps) {
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
    <Card className="max-w-2xl mx-auto" data-testid="form-contact">
      <CardHeader className="text-center">
        <CardTitle className="font-display text-3xl">Plan Your Spiritual Journey</CardTitle>
        <p className="text-muted-foreground mt-2">Fill in your details and we'll get back to you with a personalized itinerary</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Your name"
                required
                data-testid="input-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your@email.com"
                required
                data-testid="input-email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
                data-testid="input-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="package">Select Package</Label>
              <Select value={formData.package} onValueChange={(value) => handleChange("package", value)}>
                <SelectTrigger id="package" data-testid="select-package">
                  <SelectValue placeholder="Choose a tour" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-day">1-Day Kashi Darshan</SelectItem>
                  <SelectItem value="2-day">2-Day Kashi + Sarnath</SelectItem>
                  <SelectItem value="3-day">3-Day Ayodhya + Kashi Spiritual Trail</SelectItem>
                  <SelectItem value="custom">Custom Tour</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="travelDate">Preferred Travel Date</Label>
              <Input
                id="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={(e) => handleChange("travelDate", e.target.value)}
                data-testid="input-travel-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numTravelers">Number of Travelers</Label>
              <Input
                id="numTravelers"
                type="number"
                min="1"
                value={formData.numTravelers}
                onChange={(e) => handleChange("numTravelers", e.target.value)}
                data-testid="input-num-travelers"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests or Notes</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
              placeholder="Any specific requirements or questions..."
              rows={4}
              data-testid="input-special-requests"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" className="flex-1 gap-2 hover-elevate active-elevate-2" data-testid="button-submit-enquiry">
              <Send className="w-4 h-4" />
              Submit Enquiry
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 gap-2 hover-elevate active-elevate-2"
              onClick={onWhatsAppClick}
              data-testid="button-whatsapp-direct"
            >
              <FaWhatsapp className="w-4 h-4" />
              Chat Directly
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
