import { Check } from "lucide-react";
import { Typography } from "@/components/ui/Typography";

interface QualityCheckCardProps {
  checks: string[];
}

export function QualityCheckCard({ checks }: QualityCheckCardProps) {
  if (checks.length === 0) return null;

  return (
    <div className="bg-success rounded-xl p-5">
      <Typography
        variant="label-md"
        className="text-left text-green-700 block"
      >
        Quality check passed
      </Typography>
      <ul className="mt-3 space-y-2">
        {checks.map((check, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-green-700 mt-0.5 shrink-0" />
            <Typography variant="body-sm" className="text-primary">
              {check}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
