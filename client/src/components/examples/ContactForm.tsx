import ContactForm from "../ContactForm";

export default function ContactFormExample() {
  return (
    <div className="p-8 bg-background">
      <ContactForm
        onSubmit={(data) => console.log("Form submitted:", data)}
        onWhatsAppClick={() => console.log("WhatsApp clicked")}
      />
    </div>
  );
}
