import type { AdminChartPoint, AdminFunnel } from "@/types/admin";
import { ConversionFunnel } from "./ConversionFunnel";
import { RevenueChart } from "./RevenueChart";

interface AdminChartsProps {
  chartData?: AdminChartPoint[];
  funnel?: AdminFunnel;
}

const FUNNEL_COLORS = [
  "bg-[#A3A29A]",
  "bg-brand",
  "bg-[#7C5CBF]",
  "bg-[#2D9E6B]",
];

function adaptFunnel(f: AdminFunnel) {
  const max = f.visitors || 1;
  const pct = (v: number) => +((v / max) * 100).toFixed(1);
  return [
    { label: "Visitors", value: f.visitors, percentage: 100, color: FUNNEL_COLORS[0] },
    { label: "Signed Up", value: f.signedUp, percentage: pct(f.signedUp), color: FUNNEL_COLORS[1] },
    { label: "Created", value: f.created, percentage: pct(f.created), color: FUNNEL_COLORS[2] },
    { label: "Paid", value: f.paid, percentage: pct(f.paid), color: FUNNEL_COLORS[3] },
  ];
}

function adaptTiers(t: AdminFunnel["tiers"]) {
  return {
    free: { label: "Free", value: t.free, color: "text-primary" },
    beginner: { label: "Beginner", value: t.beginner, color: "text-brand" },
    pro: { label: "Pro", value: t.pro, color: "text-[#7C5CBF]" },
  };
}

export default function AdminCharts({ chartData, funnel }: AdminChartsProps) {
  return (
    <section className="px-4 lg:px-8 mt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
      <RevenueChart data={chartData} />
      <ConversionFunnel
        funnel={funnel ? adaptFunnel(funnel) : undefined}
        tiers={funnel ? adaptTiers(funnel.tiers) : undefined}
      />
    </section>
  );
}
