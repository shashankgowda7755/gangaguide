import PackageCard from "../PackageCard";
import packageImage from "@assets/generated_images/Kashi_walking_tour_group_d0392eea.png";

export default function PackageCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-md">
        <PackageCard
          id={1}
          name="1-Day Kashi Darshan"
          duration="1 Day"
          shortDescription="Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples."
          highlights={[
            "Sunrise boat ride on the Ganges",
            "Visit to Kashi Vishwanath Temple",
            "Explore hidden alleys of old Varanasi",
            "Witness evening Ganga Aarti ceremony",
          ]}
          imageUrl={packageImage}
          onViewDetails={() => console.log("View details clicked")}
          onEnquireNow={() => console.log("Enquire now clicked")}
        />
      </div>
    </div>
  );
}
