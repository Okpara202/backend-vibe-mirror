"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type {
  AssistantMessage as AssistantMessageType,
  ClarificationOption,
} from "@/types";

type ClarificationMessage = Extract<
  AssistantMessageType,
  { type: "clarification" }
>;

interface ClarificationFormProps {
  message: ClarificationMessage;
  onSubmit?: (selected: ClarificationOption[]) => void;
  onSkip?: () => void;
}

export function ClarificationForm({
  message,
  onSubmit,
  onSkip,
}: ClarificationFormProps) {
  const {
    leadText,
    question,
    instruction,
    questionIndex,
    questionTotal,
    options,
    submitLabel,
  } = message.content;

  const isMulti = instruction === "Select all that apply";
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) => {
    if (submitted) return;
    if (isMulti) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    } else {
      setSelectedIds((prev) => (prev[0] === id ? [] : [id]));
    }
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0 || submitted) return;
    setSubmitted(true);
    const selected = options.filter((o) => selectedIds.includes(o.id));
    onSubmit?.(selected);
  };

  const handleSkip = () => {
    if (submitted) return;
    setSubmitted(true);
    onSkip?.();
  };

  return (
    <div>
      <Typography variant="body-sm" className="text-secondary mb-4 block">
        {leadText}
      </Typography>

      <div className="bg-surface border border-subtle rounded-xl p-5 space-y-4">
        <Typography
          variant="label-sm"
          className="text-muted text-left block"
        >
          Questions · {questionIndex} of {questionTotal}
        </Typography>

        <Typography
          variant="label-md"
          className="text-left text-primary block"
        >
          {question}
        </Typography>

        <Typography
          variant="caption-default"
          className="text-muted text-left block"
        >
          {instruction}
        </Typography>

        <div
          role={isMulti ? "group" : "radiogroup"}
          aria-label={question}
          className="space-y-2"
        >
          {options.map((opt) => {
            const isSelected = selectedIds.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                role={isMulti ? "checkbox" : "radio"}
                aria-checked={isSelected}
                disabled={submitted}
                onClick={() => toggle(opt.id)}
                className={cn(
                  "w-full text-left rounded-xl p-4 flex items-start gap-3 transition-colors border",
                  submitted
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer",
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
                    {opt.label}
                  </Typography>
                  {opt.description && (
                    <Typography
                      variant="body-sm"
                      className={cn(
                        "text-left block mt-1",
                        isSelected ? "text-brand/80" : "text-muted",
                      )}
                    >
                      {opt.description}
                    </Typography>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleSkip}
            disabled={submitted}
            className={cn(
              "text-muted px-4 py-2 transition-colors",
              submitted
                ? "cursor-not-allowed opacity-50"
                : "hover:text-primary cursor-pointer",
            )}
          >
            <Typography variant="label-md">Skip</Typography>
          </button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={selectedIds.length === 0 || submitted}
          >
            {submitted ? "Sent" : submitLabel}
          </Button>
        </div>
      </div>
    </div>
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
