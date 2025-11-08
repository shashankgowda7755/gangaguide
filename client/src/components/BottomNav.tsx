import { Home, Package, Map, BookOpen, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface BottomNavProps {
  onWhatsAppClick?: () => void;
}

export default function BottomNav({ onWhatsAppClick }: BottomNavProps) {
  const [, setLocation] = useLocation();

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Packages", icon: Package, href: "/packages" },
    { label: "Destination", icon: Map, href: "/destinations" },
    { label: "Blog", icon: BookOpen, href: "/blog" },
    { label: "About", icon: Users, href: "/about" },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-card-border shadow-2xl"
      data-testid="bottom-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => setLocation(item.href)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover-elevate active-elevate-2 transition-all group"
                data-testid={`link-bottom-nav-${item.label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </button>
            );
          })}
          <Button
            onClick={onWhatsAppClick}
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-none flex flex-col items-center gap-1 px-3 py-2 h-auto min-h-0"
            data-testid="button-whatsapp-nav"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium">Book Now</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
