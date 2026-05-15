"use client";

import { Typography } from "@/components/ui/Typography";

// ── Mock data — replace with real API data when backend is ready ──────────────
const MOCK_FUNNEL = [
  { label: "Visitors", value: 14280, percentage: 100, color: "bg-[#A3A29A]" },
  { label: "Signed Up", value: 2847, percentage: 19.9, color: "bg-brand" },
  { label: "Created", value: 1203, percentage: 8.4, color: "bg-[#7C5CBF]" },
  { label: "Paid", value: 542, percentage: 3.8, color: "bg-[#2D9E6B]" },
];

const MOCK_TIERS = {
  free: { label: "Free", value: 2305, color: "text-primary" },
  beginner: { label: "Beginner", value: 412, color: "text-brand" },
  pro: { label: "Pro", value: 130, color: "text-[#7C5CBF]" },
};

// ── Component ─────────────────────────────────────────────────────────────────
interface ConversionFunnelProps {
  funnel?: typeof MOCK_FUNNEL;
  tiers?: typeof MOCK_TIERS;
}

export function ConversionFunnel({
  funnel = MOCK_FUNNEL,
  tiers = MOCK_TIERS,
}: ConversionFunnelProps) {
  // Max value is always the first row (Visitors = 100%)
  const maxValue = funnel[0]?.value ?? 1;

  return (
    <div className="bg-surface rounded-[12px] flex flex-col justify-between h-full p-4">
      {/* Title */}
      <Typography
        variant="heading-h4"
        as="h3"
        className="text-left text-primary"
      >
        Conversion funnel
      </Typography>

      {/* Funnel rows */}
      <div className="flex flex-col gap-4">
        {funnel.map((row) => (
          <div key={row.label} className="flex items-center gap-3">
            {/* Label */}
            <Typography
              variant="body-sm"
              className="text-primary w-[68px] shrink-0"
            >
              {row.label}
            </Typography>

            {/* Progress bar */}
            <div className="flex-1 h-1.5 bg-subtle rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${row.color}`}
                style={{ width: `${(row.value / maxValue) * 100}%` }}
              />
            </div>

            {/* Value */}
            <Typography
              variant="caption-default"
              className="text-primary w-[48px] text-right shrink-0"
            >
              {row.value.toLocaleString()}
            </Typography>

            {/* Percentage */}
            <Typography
              variant="caption-default"
              className="text-muted w-[40px] text-right shrink-0"
            >
              {row.percentage}%
            </Typography>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="general-border-top" />

      {/* Tier breakdown */}
      <div className="flex items-start justify-between">
        {Object.values(tiers).map((tier) => (
          <div key={tier.label} className="flex flex-col gap-0.5">
            <Typography variant="caption-default" className="text-muted">
              {tier.label}
            </Typography>
            <Typography
              variant="heading-h4"
              className={`text-left font-medium ${tier.color}`}
            >
              {tier.value.toLocaleString()}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
