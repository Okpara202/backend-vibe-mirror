"use client";

import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { ClarificationOption } from "@/types";

interface ClarificationOptionCardProps {
  option: ClarificationOption;
  isSelected: boolean;
  isMulti: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function ClarificationOptionCard({
  option,
  isSelected,
  isMulti,
  disabled,
  onClick,
}: ClarificationOptionCardProps) {
  return (
    <button
      type="button"
      role={isMulti ? "checkbox" : "radio"}
      aria-checked={isSelected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl p-4 flex items-start gap-3 transition-colors border",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
        isSelected
          ? "bg-hover border-brand"
          : "bg-surface border-subtle hover:bg-hover/40",
      )}
    >
      <SelectionDot selected={isSelected} multi={isMulti} />
      <div className="flex-1 min-w-0">
        <Typography
          variant="label-md"
          className={cn(
            "text-left block",
            isSelected ? "text-brand" : "text-primary",
          )}
        >
          {option.label}
        </Typography>
        {option.description && (
          <Typography
            variant="body-sm"
            className={cn(
              "text-left block mt-1",
              isSelected ? "text-brand/80" : "text-muted",
            )}
          >
            {option.description}
          </Typography>
        )}
      </div>
    </button>
  );
}

function SelectionDot({
  selected,
  multi,
}: {
  selected: boolean;
  multi: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "shrink-0 mt-0.5 w-5 h-5 border-2 border-brand flex items-center justify-center",
        multi ? "rounded-md" : "rounded-full",
      )}
    >
      {selected && (
        <span
          className={cn(
            "bg-brand",
            multi ? "w-3 h-3 rounded-sm" : "w-2.5 h-2.5 rounded-full",
          )}
        />
      )}
    </span>
  );
}
