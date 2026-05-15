import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/types/admin";

type Tier = AdminUser["tier"];

const PLAN_STYLES: Record<
  Tier,
  { bg: string; textColor: string; label: string }
> = {
  free: { bg: "bg-subtle", textColor: "text-secondary", label: "Free" },
  beginner: { bg: "bg-[#FFF8EB]", textColor: "text-brand", label: "Beginner" },
  pro: { bg: "bg-accent", textColor: "text-[#7E3FF2]", label: "Pro" },
};

export function RecentUsersPlanBadge({ tier }: { tier: Tier }) {
  const { bg, textColor, label } = PLAN_STYLES[tier];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[120px] px-4 py-2",
        bg,
      )}
    >
      <Typography variant="body-sm" className={cn("text-left", textColor)}>
        {label}
      </Typography>
    </span>
  );
}
