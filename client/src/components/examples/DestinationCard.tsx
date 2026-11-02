import DestinationCard from "../DestinationCard";
import varanasi from "@assets/generated_images/Boat_perspective_Ganges_view_e308dae7.png";

export default function DestinationCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-md">
        <DestinationCard
          name="Varanasi"
          description="Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city."
          imageUrl={varanasi}
          onClick={() => console.log("Destination clicked")}
        />
      </div>
    </div>
  );
}
