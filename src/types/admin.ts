export type AdminPeriod = "24h" | "7d" | "30d" | "90d";
export type AdminUserStatus = "active" | "idle" | "churned";

export interface AdminMetric {
  current: number;
  previous: number;
}

export interface AdminStats {
  totalUsers: AdminMetric;
  mrr: AdminMetric;
  projects: AdminMetric;
  referralRev: AdminMetric;
  aiCostPerUser: AdminMetric;
}

export interface AdminFunnel {
  visitors: number;
  signedUp: number;
  created: number;
  paid: number;
  tiers: { free: number; beginner: number; pro: number };
}

export interface AdminProjectsByType {
  website: { count: number; percentage: number };
  book: { count: number; percentage: number };
  game: { count: number; percentage: number };
  art: { count: number; percentage: number };
  published: number;
  draft: number;
  exported: number;
}

export interface AdminReferralTool {
  tool: "claude" | "cursor" | "chatgpt" | "lovable";
  clicks: number;
  revenue: number;
}

export interface AdminActivityEvent {
  id: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  tier: "free" | "beginner" | "pro";
  projects: number;
  lastActive: string;
  revenue: string;
  status: AdminUserStatus;
}

export interface AdminChartPoint {
  day: string;
  revenue: number;
  aiCost: number;
  website: number;
  book: number;
  game: number;
  art: number;
}

export interface AdminOverviewData {
  stats: AdminStats;
  funnel: AdminFunnel;
  projectsByType: AdminProjectsByType;
  referralTools: AdminReferralTool[];
  avgPerClick: number;
  totalReferralRevenue: number;
  recentActivity: AdminActivityEvent[];
  recentUsers: AdminUser[];
  chartData: AdminChartPoint[];
}
