import type {
  AdminActivityEvent,
  AdminProjectsByType,
  AdminReferralTool,
} from "@/types/admin";
import { LiveActivityCard } from "./LiveActivityCard";
import { ProjectsByType } from "./ProjectsByTypeCard";
import { ReferralRevenue } from "./ReferralRevenueCard";

interface AdminDetailedSummaryProps {
  projectsByType?: AdminProjectsByType;
  referralTools?: AdminReferralTool[];
  avgPerClick?: number;
  totalReferralRevenue?: number;
  recentActivity?: AdminActivityEvent[];
}

const TYPE_LABEL = {
  website: "Website",
  book: "Book",
  game: "Game",
  art: "Art",
} as const;

const TYPE_COLOR = {
  website: "#F27A1A",
  book: "#7C5CBF",
  game: "#2D9E6B",
  art: "#E8A020",
} as const;

const TOOL_LABEL = {
  claude: "Claude",
  cursor: "Cursor",
  chatgpt: "ChatGPT",
  lovable: "Lovable",
} as const;

const TYPE_KEYS = ["website", "book", "game", "art"] as const;

function adaptProjectTypes(p: AdminProjectsByType) {
  return TYPE_KEYS.map((key) => ({
    key,
    label: TYPE_LABEL[key],
    count: p[key].count,
    percentage: p[key].percentage,
    color: TYPE_COLOR[key],
  }));
}

function adaptStatus(p: AdminProjectsByType) {
  return { published: p.published, draft: p.draft, exported: p.exported };
}

function adaptReferralTools(tools: AdminReferralTool[]) {
  return tools.map((t) => ({
    key: t.tool,
    label: TOOL_LABEL[t.tool],
    clicks: t.clicks,
    revenue: t.revenue,
  }));
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.max(0, Math.floor(diff / 60000));
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}

function adaptActivity(events: AdminActivityEvent[]) {
  return events.map((e) => ({
    id: e.id,
    name: e.userName,
    action: `${e.action} "${e.target}"`,
    time: formatRelative(e.timestamp),
  }));
}

export default function AdminDetailedSummary({
  projectsByType,
  referralTools,
  avgPerClick,
  totalReferralRevenue,
  recentActivity,
}: AdminDetailedSummaryProps) {
  return (
    <section className="px-4 lg:px-8 mt-3 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <ProjectsByType
        types={projectsByType ? adaptProjectTypes(projectsByType) : undefined}
        status={projectsByType ? adaptStatus(projectsByType) : undefined}
      />
      <ReferralRevenue
        tools={referralTools ? adaptReferralTools(referralTools) : undefined}
        total={totalReferralRevenue}
        avgPerClick={avgPerClick}
      />
      <LiveActivityCard
        activity={recentActivity ? adaptActivity(recentActivity) : undefined}
      />
    </section>
  );
}
