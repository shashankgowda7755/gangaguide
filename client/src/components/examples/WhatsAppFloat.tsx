import WhatsAppFloat from "../WhatsAppFloat";

export default function WhatsAppFloatExample() {
  return (
    <div className="relative h-96 bg-background">
      <p className="p-8 text-center text-muted-foreground">
        Scroll to see the floating WhatsApp button in the bottom-right corner
      </p>
      <WhatsAppFloat />
    </div>
  );
}
