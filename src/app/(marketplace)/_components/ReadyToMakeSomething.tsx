import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";

export default function ReadyToMakeSomething() {
  return (
    <section className="bg-canvas general-border">
      <div className="w-[90%] py-24 flex items-center justify-center gap-10 mx-auto flex-col">
        <aside className="space-y-5">
          <Typography variant="display-section" className="text-primary">
            Ready to <span className="text-brand">make</span> something?
          </Typography>

          <Typography variant="heading-h4" className="text-secondary">
            Free to start. No credit card. No code.
          </Typography>
        </aside>
        <aside className="">
          <Button>Start Making</Button>
        </aside>
      </div>
    </section>
  );
}
