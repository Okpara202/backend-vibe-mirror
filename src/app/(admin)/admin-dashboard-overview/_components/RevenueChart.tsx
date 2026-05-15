"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@/components/ui/Typography";
import { RevenueChartTooltip } from "./RevenueChartTooltip";

const MOCK_DATA = [
  { day: "Mon", revenue: 3500, aiCost: 2200 },
  { day: "Tue", revenue: 4500, aiCost: 2250 },
  { day: "Wed", revenue: 5100, aiCost: 2300 },
  { day: "Thur", revenue: 4800, aiCost: 2280 },
  { day: "Fri", revenue: 5600, aiCost: 2350 },
  { day: "Sat", revenue: 6600, aiCost: 2420 },
  { day: "Sun", revenue: 7100, aiCost: 2460 },
];

const formatYAxis = (value: number) => `$${(value / 1000).toFixed(0)}k`;

const axisTick = {
  fontFamily: "var(--font-sans)",
  fontSize: 12,
  fill: "var(--muted)",
};

interface RevenueChartPoint {
  day: string;
  revenue: number;
  aiCost: number;
}

interface RevenueChartProps {
  data?: RevenueChartPoint[];
}

export function RevenueChart({ data = MOCK_DATA }: RevenueChartProps) {
  return (
    <div className="bg-surface p-4 rounded-[12px]">
      <div className="flex items-center justify-between mb-4">
        <Typography
          variant="heading-h4"
          as="h3"
          className="text-left text-primary"
        >
          Revenue vs AI cost
        </Typography>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "var(--brand)" }}
            />
            <Typography variant="caption-default" className="text-secondary">
              Revenue
            </Typography>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: "var(--muted)" }}
            />
            <Typography variant="caption-default" className="text-secondary">
              AI Cost
            </Typography>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(242,122,26,0.1)" />
            </linearGradient>
          </defs>

          <CartesianGrid
            horizontal
            vertical={false}
            stroke="var(--subtle)"
            syncWithTicks
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            dy={10}
          />

          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
            tick={axisTick}
            domain={[0, 14000]}
            ticks={[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000]}
            interval={0}
            width={40}
            dx={-4}
          />

          <Tooltip
            content={<RevenueChartTooltip />}
            cursor={{
              stroke: "var(--subtle)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--brand)"
            strokeWidth={2}
            fill="url(#revenueAreaFill)"
            dot={{ fill: "var(--brand)", stroke: "var(--brand)", r: 4, strokeWidth: 0 }}
            activeDot={{ fill: "var(--brand)", stroke: "var(--surface)", r: 5, strokeWidth: 2 }}
          />

          <Line
            type="monotone"
            dataKey="aiCost"
            stroke="var(--muted)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            dot={false}
            activeDot={{ fill: "var(--muted)", stroke: "var(--surface)", r: 4, strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
