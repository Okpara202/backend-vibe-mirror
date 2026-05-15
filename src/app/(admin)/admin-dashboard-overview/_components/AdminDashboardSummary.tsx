import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { AdminMetric, AdminStats } from "@/types/admin";

function Icon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z"
        fill="#FFF7F0"
      />
      <path
        d="M20.0833 21.25V20.0833C20.0833 19.4645 19.8375 18.871 19.3999 18.4334C18.9623 17.9958 18.3688 17.75 17.75 17.75H14.25C13.6312 17.75 13.0377 17.9958 12.6001 18.4334C12.1625 18.871 11.9167 19.4645 11.9167 20.0833V21.25"
        stroke="#F27A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15.4167C17.2887 15.4167 18.3333 14.372 18.3333 13.0833C18.3333 11.7947 17.2887 10.75 16 10.75C14.7113 10.75 13.6667 11.7947 13.6667 13.0833C13.6667 14.372 14.7113 15.4167 16 15.4167Z"
        stroke="#F27A1A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpArrow({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.66666 3.50001L6.99999 1.16667L9.33332 3.50001"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 1.16667V12.8333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MOCK_STATS: AdminStats = {
  totalUsers: { current: 2847, previous: 2535 },
  mrr: { current: 18420, previous: 17040 },
  projects: { current: 1203, previous: 974 },
  referralRev: { current: 1700, previous: 1742 },
  aiCostPerUser: { current: 0.42, previous: 0.434 },
};

type StatKey = keyof AdminStats;

interface CardConfig {
  key: StatKey;
  title: string;
  monetary: boolean;
  inverted: boolean;
}

// inverted=true → lower is better (e.g. aiCostPerUser)
const CARDS: CardConfig[] = [
  { key: "totalUsers", title: "Total Users", monetary: false, inverted: false },
  { key: "mrr", title: "MRR", monetary: true, inverted: false },
  { key: "projects", title: "Projects", monetary: false, inverted: false },
  { key: "referralRev", title: "Referral rev", monetary: true, inverted: false },
  { key: "aiCostPerUser", title: "AI Cost/user", monetary: true, inverted: true },
];

function formatValue(monetary: boolean, raw: number) {
  const formatted = raw.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
  return monetary ? `$${formatted}` : formatted;
}

function deriveTrend({ current, previous }: AdminMetric, inverted: boolean) {
  const numericUp = current >= previous;
  const isGood = inverted ? !numericUp : numericUp;
  const pct =
    previous === 0 ? 0 : Math.abs(((current - previous) / previous) * 100);
  return { isGood, pct: pct.toFixed(1) };
}

interface AdminDashboardSummaryProps {
  stats?: AdminStats;
}

export default function AdminDashboardSummary({
  stats = MOCK_STATS,
}: AdminDashboardSummaryProps) {
  return (
    <section className="px-4 lg:px-8 mt-6 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
      {CARDS.map((card) => {
        const metric = stats[card.key];
        const { isGood, pct } = deriveTrend(metric, card.inverted);
        return (
          <div key={card.key} className="bg-surface space-y-3 rounded-[12px] p-4">
            <aside className="flex items-center gap-2">
              <Icon />
              <Typography variant="label-md" className="text-secondary">
                {card.title}
              </Typography>
            </aside>

            <Typography variant="heading-h3" className="text-primary text-left">
              {formatValue(card.monetary, metric.current)}
            </Typography>

            <Typography
              variant="label-md"
              className={cn(
                "flex items-center",
                isGood ? "text-[#4ADE80]" : "text-destructive",
              )}
            >
              <span>
                <UpArrow className={isGood ? "" : "rotate-180"} />
              </span>
              {pct}% vs prev
            </Typography>
          </div>
        );
      })}
    </section>
  );
}
