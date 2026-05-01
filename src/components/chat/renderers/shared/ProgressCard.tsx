import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";
import type { BuildingContent } from "@/types";

interface ProgressCardProps {
  buildingContent: BuildingContent;
}

export function ProgressCard({ buildingContent }: ProgressCardProps) {
  const { label, stages, currentStageIndex, substep } = buildingContent;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-brand animate-pulse motion-reduce:animate-none shrink-0" />
        <Typography
          variant="label-md"
          className="text-left text-primary"
        >
          {label}
        </Typography>
      </div>

      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
        }}
      >
        {stages.map((stage, i) => {
          const isComplete = i < currentStageIndex;
          const isCurrent = i === currentStageIndex;
          return (
            <div key={stage} className="space-y-1.5">
              <Typography
                variant="label-sm"
                className={cn(
                  "text-left block",
                  isComplete || isCurrent ? "text-primary" : "text-muted",
                )}
              >
                {stage}
              </Typography>
              <div className="h-1 rounded-full bg-subtle overflow-hidden">
                <div
                  className={cn(
                    "h-full bg-brand transition-all duration-500",
                    isComplete ? "w-full" : isCurrent ? "w-[60%]" : "w-0",
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>

      {substep && (
        <div className="space-y-2 pt-2">
          <Typography
            variant="label-md"
            className="text-left text-primary block"
          >
            {substep.label}
          </Typography>
          <Typography
            variant="body-sm"
            className="text-muted text-left block"
          >
            {substep.description}
          </Typography>
          {substep.previewItems && substep.previewItems.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-3">
              {substep.previewItems.map((item, i) => (
                <div
                  key={i}
                  className="aspect-3/4 bg-[#1e2a4a] rounded-lg flex flex-col items-center justify-center gap-2 p-3"
                >
                  <PlaceholderPlus />
                  <Typography
                    variant="caption-default"
                    className="text-white text-center block"
                  >
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PlaceholderPlus() {
  return (
    <div className="w-7 h-7 border-2 border-dashed border-white/40 rounded flex items-center justify-center">
      <span className="text-white/60 text-xl leading-none">+</span>
    </div>
  );
}
