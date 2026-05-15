"use client";

import { Typography } from "@/components/ui/Typography";

// ── Mock data — replace with real API data when backend is ready ──────────────
const MOCK_TYPES = [
  {
    key: "website",
    label: "Website",
    count: 512,
    percentage: 43,
    color: "#F27A1A",
  },
  { key: "book", label: "Book", count: 324, percentage: 27, color: "#7C5CBF" },
  { key: "game", label: "Game", count: 228, percentage: 19, color: "#2D9E6B" },
  { key: "art", label: "Art", count: 139, percentage: 11, color: "#E8A020" },
];

const MOCK_STATUS = {
  published: 847,
  draft: 312,
  exported: 44,
};

// ── Component ─────────────────────────────────────────────────────────────────
interface ProjectsByTypeProps {
  types?: typeof MOCK_TYPES;
  status?: typeof MOCK_STATUS;
}

export function ProjectsByType({
  types = MOCK_TYPES,
  status = MOCK_STATUS,
}: ProjectsByTypeProps) {
  return (
    <div
      className="bg-surface rounded-[12px] flex flex-col"
      style={{ padding: 24, gap: 20 }}
    >
      {/* Title */}
      <Typography variant="heading-h4" className="text-left text-primary">
        Projects by type
      </Typography>

      {/* Type rows */}
      <div className="flex flex-col" style={{ gap: 16 }}>
        {types.map((type) => (
          <div key={type.key} className="flex items-center gap-3">
            {/* Left — name + count stacked */}
            <div className="flex flex-col w-[100px] shrink-0">
              <Typography variant="body-sm" className="text-primary">
                {type.label}
              </Typography>
              <Typography variant="label-sm" className="text-secondary">
                {type.count.toLocaleString()} Projects
              </Typography>
            </div>

            {/* Progress bar */}
            <div className="flex-1 h-1.5 bg-subtle rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${type.percentage}%`,
                  backgroundColor: type.color,
                }}
              />
            </div>

            {/* Percentage */}
            <Typography
              variant="body-sm"
              className="text-primary w-[40px] text-right shrink-0"
            >
              {type.percentage}%
            </Typography>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="general-border-top" />

      {/* Published / Draft / Exported */}
      <div className="flex items-start justify-between">
        {[
          { label: "Published", value: status.published },
          { label: "Draft", value: status.draft },
          { label: "Exported", value: status.exported },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <Typography variant="label-sm" className="text-secondary">
              {item.label}
            </Typography>
            <Typography variant="heading-h4" className="text-left text-primary">
              {item.value.toLocaleString()}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}
