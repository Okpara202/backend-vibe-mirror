import DotTextTag from "@/components/ui/DotTextTag";
import { Typography } from "@/components/ui/Typography";

export default function LeftAuthForm() {
  return (
    <section className="hero-background pt-32 space-y-10 h-full text-center px-15">
      <DotTextTag dotColor="#F27A1A" text="Free to start. No card needed" />

      <div className="space-y-3">
        <Typography variant="display-hero" className="text-primary">
          Vibe it. Craft it. <span className="text-brand italic">Launch</span>{" "}
          it.
        </Typography>

        <Typography className="text-secondary" variant="heading-h3">
          Pick what you want to make. Choose an idea or write your own. Let Vibe
          build it or take the plan anywhere.
        </Typography>
      </div>
    </section>
  );
}
