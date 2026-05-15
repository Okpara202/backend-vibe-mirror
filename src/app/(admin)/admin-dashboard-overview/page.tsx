"use client";

import { useEffect } from "react";
import { Typography } from "@/components/ui/Typography";
import { useAdminStore } from "@/store/admin-store";
import AdminCharts from "./_components/AdminCharts";
import AdminDashboardOverviewHeader from "./_components/AdminDashboardOverviewHeader";
import AdminDashboardSummary from "./_components/AdminDashboardSummary";
import AdminDetailedSummary from "./_components/AdminDetailedSummary";
import { AiGenerationChart } from "./_components/AiGenerationChart";
import { RecentUserCard } from "./_components/RecentUserCard";

export default function AdminDashboardOverviewPage() {
  const overview = useAdminStore((s) => s.overview);
  const isLoading = useAdminStore((s) => s.isLoading);
  const error = useAdminStore((s) => s.error);
  const fetchOverview = useAdminStore((s) => s.fetchOverview);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  if (error) {
    return (
      <div className="p-6">
        <Typography variant="body-sm" className="text-destructive">
          {error}
        </Typography>
      </div>
    );
  }

  if (isLoading && !overview) {
    return (
      <div className="p-6 animate-pulse space-y-4">
        <div className="h-8 bg-subtle rounded w-1/3" />
        <div className="h-48 bg-subtle rounded" />
      </div>
    );
  }

  return (
    <div className="bg-canvas pb-10">
      <AdminDashboardOverviewHeader />
      <AdminDashboardSummary stats={overview?.stats} />
      <AdminCharts
        chartData={overview?.chartData}
        funnel={overview?.funnel}
      />
      <AdminDetailedSummary
        projectsByType={overview?.projectsByType}
        referralTools={overview?.referralTools}
        avgPerClick={overview?.avgPerClick}
        totalReferralRevenue={overview?.totalReferralRevenue}
        recentActivity={overview?.recentActivity}
      />
      <AiGenerationChart data={overview?.chartData} />
      <RecentUserCard users={overview?.recentUsers} />
    </div>
  );
}
