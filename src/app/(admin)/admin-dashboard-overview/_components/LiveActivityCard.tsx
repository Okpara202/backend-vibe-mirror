"use client";

import { Typography } from "@/components/ui/Typography";

// ── Mock data — replace with real API data when backend is ready ──────────────
const MOCK_ACTIVITY = [
  {
    id: "1",
    name: "David O",
    action: 'published website "David\'s Bakery"',
    time: "2m",
  },
  {
    id: "2",
    name: "Elizabeth K.",
    action: 'downloaded "Pip and the Lost Stars"',
    time: "8m",
  },
  {
    id: "3",
    name: "Maya A.",
    action: 'created game "World Capitals Quiz"',
    time: "14m",
  },
  { id: "4", name: "Chidi N.", action: "upgraded to Beginner", time: "22m" },
  { id: "5", name: "Amara T.", action: "exported to Claude", time: "31m" },
];

// ── Component ─────────────────────────────────────────────────────────────────
interface LiveActivityProps {
  activity?: typeof MOCK_ACTIVITY;
}

export function LiveActivityCard({
  activity = MOCK_ACTIVITY,
}: LiveActivityProps) {
  return (
    <div
      className="bg-surface rounded-[12px] flex flex-col"
      style={{ padding: 24, gap: 20 }}
    >
      {/* Title */}
      <Typography variant="heading-h4" className="text-left text-primary">
        Live Activity
      </Typography>

      {/* Activity rows */}
      <div className="flex flex-col">
        {activity.map((event, index) => (
          <div key={event.id}>
            {/* Row */}
            <div className="flex items-center gap-2 py-3">
              {/* Name */}
              <Typography
                variant="body-sm"
                className="text-primary shrink-0 w-[90px]"
              >
                {event.name}
              </Typography>

              {/* Action + time */}
              <Typography variant="label-sm" className="text-secondary flex-1">
                {event.action}
              </Typography>

              <Typography
                variant="label-sm"
                className="text-secondary shrink-0"
              >
                {event.time}
              </Typography>
            </div>

            {/* Divider — between rows only */}
            {index < activity.length - 1 && <div className="general-border" />}
          </div>
        ))}
      </div>
    </div>
  );
}
