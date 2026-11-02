import BlogCard from "../BlogCard";
import blogImage from "@assets/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png";

export default function BlogCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <BlogCard
          title="Morning Aarti Through My Eyes"
          excerpt="Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable."
          imageUrl={blogImage}
          category="Rituals"
          publishedDate="Oct 15, 2025"
          readTime="5 min read"
          onClick={() => console.log("Blog clicked")}
        />
      </div>
    </div>
  );
}
