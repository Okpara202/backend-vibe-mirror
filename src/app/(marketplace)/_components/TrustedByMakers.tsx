import { Typography } from "@/components/ui/Typography";

const trustees = ["Product Hunt", "Indie Hackers", "Hacker News", "TechCrunch"];

export default function TrustedByMakers() {
  return (
    <section className="bg-canvas flex w-full items-center justify-center gap-6 py-16 general-border">
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
