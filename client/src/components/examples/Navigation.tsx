import Navigation from "../Navigation";

export default function NavigationExample() {
  return (
    <div className="h-screen bg-background">
      <Navigation onBookNowClick={() => console.log("Book now clicked")} />
      <div className="pt-24 px-8">
        <p className="text-muted-foreground">Scroll down to see the navigation change background</p>
        <div className="h-[200vh]" />
      </div>
    </div>
  );
}
