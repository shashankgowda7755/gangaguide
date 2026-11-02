import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  quote: string;
  photoUrl: string;
}

export default function TeamMember({ name, role, quote, photoUrl }: TeamMemberProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all group" data-testid={`card-team-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6 text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-display text-xl font-semibold mb-1" data-testid="text-team-name">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{role}</p>
        <p className="font-accent italic text-sm text-foreground/80 leading-relaxed">
          "{quote}"
        </p>
      </CardContent>
    </Card>
  );
}
