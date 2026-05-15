interface TooltipEntry {
  value: number;
  name: string;
  color: string;
}

interface RevenueChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

export function RevenueChartTooltip({
  active,
  payload,
  label,
}: RevenueChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="bg-surface border border-subtle rounded-xl px-3 py-2 shadow-sm"
      style={{ minWidth: 140 }}
    >
      <p className="font-sans font-medium text-[0.75rem] leading-4 text-muted mb-1">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-sans font-normal text-[0.75rem] leading-4 text-secondary">
            {entry.name === "revenue" ? "Revenue" : "AI Cost"}
          </span>
          <span className="font-sans font-medium text-[0.75rem] leading-4 text-primary ml-auto pl-3">
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
