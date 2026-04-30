import { Typography } from "@/components/ui/Typography";
import DotTextTag from "../../../components/ui/DotTextTag";
import HeroTextArea from "./HeroTextArea";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Hero() {
  return (
    <section className="general-border hero-background py-16 lg:py-32">
      <div className="flex items-center flex-col justify-center gap-8 max-w-lg mx-auto w-[90%]">
        <div className="space-y-10 text-center">
          <DotTextTag
            dotColor="#F27A1A"
            text="Free to start. No card needed."
          />
          <aside className="space-y-3">
            <Typography variant="display-hero" className="text-primary">
              {" "}
              Vibe it. Craft it.{" "}
              <span className="text-brand italic">Launch</span> it.
            </Typography>
            <Typography variant="heading-h3" className="text-secondary">
              Pick what you want to make. Choose an idea or write your own. Let
              Vibe build it or take the plan anywhere.
            </Typography>
          </aside>

          <HeroTextArea />
        </div>
      </div>

      <ThemeToggle />
    </section>
  );
}
