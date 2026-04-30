import { Typography } from "@/components/ui/Typography";

const steps = [
  {
    step: 1,
    title1: "Vibe",
    title2: "it",
    desc: "Pick a type, choose a suggestion, or type your own idea. A sentence is enough.",
    footNote: "Pick → choose → done. No blank page.",
  },
  {
    step: 2,
    title1: "Craft",
    title2: "it",
    desc: 'Vibe builds your idea. Shape it through conversation — "make the header bigger," "change the colour." No code.',
    footNote: "Or copy the plan and build with Claude, Cursor, or ChatGPT.",
  },
  {
    step: 3,
    title1: "Launch",
    title2: "it",
    desc: "One tap to publish. Share the link. Download the book. Play the game. It's yours.",
    footNote: '"You made it. Nicely done."',
  },
];

export default function ThreeStepsThatsIt() {
  const stepCard = steps.map((step) => (
    <div
      className="bg-surface rounded-[12px] px-5 flex flex-col justify-between hover:scale-105  transition-all duration-300"
      key={step.step}
    >
      <aside className="py-8 flex flex-col gap-3 items-start ">
        <Typography
          variant="display-page"
          className={`${step.step === 1 ? "text-brand" : "text-primary"}`}
        >
          {step.step}
        </Typography>

        <Typography variant="display-section">
          <span className="text-brand italic">{step.title1} </span>{" "}
          <span className="text-primary">{step.title2}</span>
        </Typography>

        <Typography variant="body-sm" className="text-secondary">
          {" "}
          {step.desc}
        </Typography>
      </aside>
      <aside className="py-8 general-border-top">
        <Typography variant="caption-mono" className="text-muted">
          {step.footNote}
        </Typography>
      </aside>
    </div>
  ));
  return (
    <section id="how-it-works" className="bg-canvas general-border">
      <div className="w-[90%] py-24 space-y-10 mx-auto">
        <Typography variant="display-section">
          <span className="text-primary">Three steps.</span>{" "}
          <span className="text-brand">That&apos;s it.</span>
        </Typography>

        <Typography variant="heading-h4" className="text-secondary">
          Three simple steps and your product is ready.
        </Typography>
        <div className="grid grid-cols-3 gap-6">{stepCard}</div>
      </div>
    </section>
  );
}
