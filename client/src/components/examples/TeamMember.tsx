import TeamMember from "../TeamMember";
import guidePhoto from "@assets/generated_images/Local_tour_guide_portrait_a60f1ce8.png";

export default function TeamMemberExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-xs mx-auto">
        <TeamMember
          name="Rajesh Kumar"
          role="Senior Guide"
          quote="Sharing the soul of Kashi with travelers is my life's passion"
          photoUrl={guidePhoto}
        />
      </div>
    </div>
  );
}
