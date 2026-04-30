import { Typography } from "@/components/ui/Typography";

const trustees = ["Product Hunt", "Indie Hackers", "Hacker News", "TechCrunch"];

export default function TrustedByMakers() {
  return (
    <section className="bg-canvas flex flex-wrap w-full items-center justify-center gap-x-6 gap-y-3 px-4 py-10 lg:py-16 general-border">
      <Typography variant="code-md" className="text-secondary">
        TRUSTED BY MAKERS
      </Typography>

      {trustees.map((trustee) => (
        <Typography variant="body-sm" key={trustee} className="text-secondary">
          {trustee}
        </Typography>
      ))}
    </section>
  );
}
