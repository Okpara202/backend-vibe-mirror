const TYPE_LABELS = {
  website: "Website",
  book: "Book",
  game: "Game",
  art: "Art",
} as const;

interface TooltipEntry {
  value: number;
  dataKey: string;
  fill: string;
}

interface AiGenerationChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

export function AiGenerationChartTooltip({
  active,
  payload,
  label,
}: AiGenerationChartTooltipProps) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce((sum, p) => sum + (p.value ?? 0), 0);

  return (
    <div
      className="bg-surface border border-subtle rounded-xl px-3 py-2 shadow-sm"
      style={{ minWidth: 150 }}
    >
      <p className="font-sans font-medium text-[0.75rem] leading-4 text-muted mb-1.5">
        {label}
      </p>
      {[...payload].reverse().map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-0.5">
          <span
            className="inline-block w-2 h-2 rounded-sm shrink-0"
            style={{ backgroundColor: entry.fill }}
          />
          <span className="font-sans font-normal text-[0.75rem] leading-4 text-secondary">
            {TYPE_LABELS[entry.dataKey as keyof typeof TYPE_LABELS]}
          </span>
          <span className="font-sans font-medium text-[0.75rem] leading-4 text-primary ml-auto pl-3">
            ${entry.value}
          </span>
        </div>
      ))}
      <div className="border-t border-subtle mt-1.5 pt-1.5 flex items-center justify-between">
        <span className="font-sans font-medium text-[0.75rem] text-muted">
          Total
        </span>
        <span className="font-sans font-medium text-[0.75rem] text-primary">
          ${total}
        </span>
      </div>
    </div>
  );
}
