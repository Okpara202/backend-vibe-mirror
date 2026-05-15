"use client";

import { Typography } from "@/components/ui/Typography";

// ── Mock data — replace with real API data when backend is ready ──────────────
const MOCK_TOOLS = [
  { key: "claude", label: "Claude", clicks: 1240, revenue: 842 },
  { key: "cursor", label: "Cursor", clicks: 680, revenue: 394 },
  { key: "chatgpt", label: "ChatGPT", clicks: 520, revenue: 286 },
  { key: "lovable", label: "Lovable", clicks: 340, revenue: 178 },
];

const MOCK_TOTAL = 1700;
const MOCK_AVG_CPC = 0.61;

// ── Component ─────────────────────────────────────────────────────────────────
interface ReferralRevenueProps {
  tools?: typeof MOCK_TOOLS;
  total?: number;
  avgPerClick?: number;
}

export function ReferralRevenue({
  tools = MOCK_TOOLS,
  total = MOCK_TOTAL,
  avgPerClick = MOCK_AVG_CPC,
}: ReferralRevenueProps) {
  return (
    <div className="bg-surface rounded-[12px] flex flex-col justify-between h-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Typography variant="heading-h4" className="text-left text-primary">
          Referral Revenue
        </Typography>
        <Typography variant="body-sm" className="text-[#4ADE80]">
          ${total.toLocaleString()} total
        </Typography>
      </div>

      {/* Tool rows */}
      <div className="flex flex-col">
        {tools.map((tool) => (
          <div key={tool.key}>
            {/* Row */}
            <div className="flex items-center justify-between py-3">
              {/* Tool name */}
              <Typography
                variant="body-sm"
                className="text-primary w-[80px] shrink-0"
              >
                {tool.label}
              </Typography>

              {/* Clicks */}
              <Typography
                variant="label-sm"
                className="text-secondary flex-1 text-center"
              >
                {tool.clicks.toLocaleString()} clicks
              </Typography>

              {/* Revenue */}
              <Typography
                variant="body-sm"
                className="w-[60px] text-right shrink-0 text-[#4ADE80]"
              >
                ${tool.revenue.toLocaleString()}
              </Typography>
            </div>

            {/* Divider — after every row, including Lovable */}
            <div className="general-border" />
          </div>
        ))}
      </div>

      {/* Average per click */}
      <Typography variant="label-md" className="text-secondary text-left">
        Avg. ${avgPerClick.toFixed(2)} per referral click
      </Typography>
    </div>
  );
}
