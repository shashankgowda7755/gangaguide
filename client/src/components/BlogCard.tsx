import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  publishedDate: string;
  readTime: string;
  onClick?: () => void;
}

export default function BlogCard({
  title,
  excerpt,
  imageUrl,
  category,
  publishedDate,
  readTime,
  onClick,
}: BlogCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 transition-all group cursor-pointer"
      onClick={onClick}
      data-testid={`card-blog-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors" data-testid="text-blog-title">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}
