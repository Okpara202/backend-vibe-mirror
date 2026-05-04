"use client";

import { ChevronDown } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { CreationType } from "@/types";

const TYPE_PILLS: Array<{
  type: CreationType;
  label: string;
  dotClass: string;
}> = [
  { type: "website", label: "website", dotClass: "bg-green-500" },
  { type: "book", label: "Book", dotClass: "bg-brand" },
  { type: "game", label: "Game", dotClass: "bg-green-400" },
  { type: "art", label: "Art", dotClass: "bg-orange-400" },
];

interface TypePillSelectorProps {
  selectedType: CreationType | null;
  onToggle: (t: CreationType) => void;
}

export function TypePillSelector({
  selectedType,
  onToggle,
}: TypePillSelectorProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {TYPE_PILLS.map((pill) => {
        const isSelected = selectedType === pill.type;
        return (
          <button
            key={pill.type}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onToggle(pill.type)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1.5",
              "border border-subtle transition-colors cursor-pointer",
              isSelected
                ? "bg-subtle text-primary"
                : "bg-transparent text-secondary hover:bg-subtle/50",
            )}
          >
            <span
              className={cn(
                "inline-block w-2 h-2 rounded-full",
                pill.dotClass,
                !isSelected && "opacity-70",
              )}
            />
            <Typography variant="label-sm">{pill.label}</Typography>
            <ChevronDown className="w-3 h-3" />
          </button>
        );
      })}
    </div>
  );
}
