"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { ClarificationOptionCard } from "./clarification/ClarificationOptionCard";
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
    onSubmit?.(options.filter((o) => selectedIds.includes(o.id)));
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
        <Typography variant="label-sm" className="text-muted text-left block">
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
          {options.map((opt) => (
            <ClarificationOptionCard
              key={opt.id}
              option={opt}
              isSelected={selectedIds.includes(opt.id)}
              isMulti={isMulti}
              disabled={submitted}
              onClick={() => toggle(opt.id)}
            />
          ))}
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
