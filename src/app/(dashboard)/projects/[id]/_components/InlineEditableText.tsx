"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InlineEditableTextProps {
  value: string;
  placeholder?: string;
  multiline?: boolean;
  editing: boolean;
  onSave: (next: string) => void;
  onEditingChange: (editing: boolean) => void;
  // Classes applied to BOTH the display element and the editor — keep them
  // visually identical (font, size, weight, colour) so the swap is seamless.
  displayClassName?: string;
  emptyDisplay?: React.ReactNode;
}

export default function InlineEditableText({
  value,
  placeholder,
  multiline = false,
  editing,
  onSave,
  onEditingChange,
  displayClassName,
  emptyDisplay,
}: InlineEditableTextProps) {
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editing) {
      setDraft(value);
      // Defer focus so the freshly-rendered input is in the DOM.
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [editing, value]);

  const commit = () => {
    const next = draft.trim();
    if (next && next !== value) onSave(next);
    onEditingChange(false);
  };

  const cancel = () => {
    setDraft(value);
    onEditingChange(false);
  };

  if (!editing) {
    const isEmpty = !value;
    return (
      <button
        type="button"
        onClick={() => onEditingChange(true)}
        className={cn(
          "block w-full text-left rounded px-2 -mx-2 hover:bg-hover/40 cursor-text",
          displayClassName,
        )}
      >
        {isEmpty ? emptyDisplay ?? placeholder : value}
      </button>
    );
  }

  const sharedProps = {
    value: draft,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setDraft(e.target.value),
    onBlur: commit,
    placeholder,
    className: cn(
      "block w-full bg-transparent rounded px-2 -mx-2 outline-none border border-brand/40 focus:border-brand",
      displayClassName,
    ),
  };

  if (multiline) {
    return (
      <textarea
        ref={(el) => {
          inputRef.current = el;
        }}
        rows={3}
        {...sharedProps}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            cancel();
          }
        }}
      />
    );
  }

  return (
    <input
      ref={(el) => {
        inputRef.current = el;
      }}
      type="text"
      {...sharedProps}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        } else if (e.key === "Escape") {
          e.preventDefault();
          cancel();
        }
      }}
    />
  );
}
