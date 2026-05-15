"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@/components/ui/Typography";
import { AiGenerationChartTooltip } from "./AiGenerationChartTooltip";

const COLORS = {
  website: "#F27A1A",
  book: "#7E3FF2",
  game: "#4ADE80",
  art: "#D4860A",
};

const MOCK_DATA = [
  { day: "Mon", website: 180, book: 120, game: 110, art: 90 },
  { day: "Tue", website: 150, book: 100, game: 95, art: 75 },
  { day: "Wed", website: 200, book: 140, game: 130, art: 110 },
  { day: "Thur", website: 175, book: 115, game: 105, art: 85 },
  { day: "Fri", website: 170, book: 115, game: 105, art: 80 },
  { day: "Sat", website: 140, book: 95, game: 88, art: 65 },
  { day: "Sun", website: 160, book: 110, game: 100, art: 80 },
];

const MOCK_TOTAL = 1196;

const axisTick = {
  fontFamily: "var(--font-sans)",
  fontWeight: 500,
  fontSize: 12,
  fill: "var(--secondary)",
};

const STACK_ORDER: { key: keyof typeof COLORS; roundTop: boolean }[] = [
  { key: "website", roundTop: false },
  { key: "book", roundTop: false },
  { key: "game", roundTop: false },
  { key: "art", roundTop: true },
];

interface AIGenerationChartPoint {
  day: string;
  website: number;
  book: number;
  game: number;
  art: number;
}

interface AIGenerationChartProps {
  data?: AIGenerationChartPoint[];
  totalThisWeek?: number;
}

export function AiGenerationChart({
  data = MOCK_DATA,
  totalThisWeek = MOCK_TOTAL,
}: AIGenerationChartProps) {
  return (
    <section className="px-4 lg:px-8">
      <div className="bg-surface rounded-[12px] mt-3 p-4 lg:p-6 w-full">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Typography variant="heading-h4" className="text-left text-primary">
            AI Generation Cost by Type
          </Typography>
          <Typography variant="body-sm" className="text-secondary">
            ${totalThisWeek.toLocaleString()} total this week
          </Typography>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            barSize={52}
          >
            <CartesianGrid horizontal vertical={false} stroke="var(--subtle)" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={axisTick}
              dy={10}
            />

            <YAxis
              tickFormatter={(v) => `$${v}`}
              axisLine={false}
              tickLine={false}
              tick={axisTick}
              domain={[0, 700]}
              ticks={[0, 100, 200, 300, 400, 500, 600, 700]}
              width={44}
              dx={-4}
            />

            <Tooltip
              content={<AiGenerationChartTooltip />}
              cursor={{ fill: "var(--subtle)", opacity: 0.4 }}
            />

            {STACK_ORDER.map(({ key, roundTop }) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="cost"
                fill={COLORS[key]}
                radius={roundTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
