"use client";

import { useRef, useState } from "react";
import { ChevronDown, Mic, Plus, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { useChatStore } from "@/store/chat-store";
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

export default function InputBar() {
  const messages = useChatStore((s) => s.messages);
  const status = useChatStore((s) => s.status);
  const selectedType = useChatStore((s) => s.selectedType);
  const setSelectedType = useChatStore((s) => s.setSelectedType);
  const addMessage = useChatStore((s) => s.addMessage);

  const mode = messages.length === 0 ? "new" : "conversation";

  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isBusy = status === "building" || status === "streaming";
  const canSend = value.trim().length > 0 && !isBusy;

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    ta.style.height = "auto";
    const lineHeight = parseInt(getComputedStyle(ta).lineHeight, 10) || 20;
    const minHeight = lineHeight * 5;
    const maxHeight = lineHeight * 10;
    ta.style.height = `${Math.max(minHeight, Math.min(ta.scrollHeight, maxHeight))}px`;
  };

  const handleSend = () => {
    const text = value.trim();
    if (!text || isBusy) return;
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: { text },
      timestamp: new Date(),
    });
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    // TODO: trigger AI call here when backend is ready
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCancel = () => {
    // TODO: wire to abort controller / store cancel action when backend ready
    console.log("[InputBar] cancel requested");
  };

  const togglePill = (t: CreationType) => {
    setSelectedType(selectedType === t ? null : t);
  };

  const ctaLabel = mode === "new" ? "Build with Vibe" : "Ask to edit";

  const inputCard = (
    <div
      className={cn(
        "bg-surface rounded-[20px] px-5 py-3 border transition-all",
        isFocused ? "border-brand" : "border-transparent hero-textarea-shadow",
        mode === "new"
          ? "w-full max-w-[580px]"
          : "w-[90%] md:w-[80%] lg:w-[60%]",
      )}
    >
      <textarea
        ref={textareaRef}
        aria-label="Message input"
        rows={3}
        placeholder="comeboard may we vibe"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "general-border w-full resize-none bg-transparent outline-none",
          "pb-3 overflow-y-auto",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "font-sans font-medium text-sm leading-5 text-primary placeholder:text-muted",
        )}
      />

      <div className="flex items-center justify-between pt-3">
        <button
          type="button"
          aria-label="Add attachment"
          className="text-muted hover:text-primary shrink-0 p-1.5 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Voice input"
            className="text-muted hover:text-primary shrink-0 p-1.5 cursor-pointer"
          >
            <Mic className="w-5 h-5" />
          </button>

          {mode === "conversation" && isBusy && (
            <button
              type="button"
              aria-label="Stop generating"
              onClick={handleCancel}
              className="text-muted hover:text-primary shrink-0 p-1.5 cursor-pointer"
            >
              <Square className="w-5 h-5 fill-current" />
            </button>
          )}

          <Button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            aria-disabled={!canSend}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );

  if (mode === "new") {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        {inputCard}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {TYPE_PILLS.map((pill) => {
            const isSelected = selectedType === pill.type;
            return (
              <button
                key={pill.type}
                type="button"
                aria-pressed={isSelected}
                onClick={() => togglePill(pill.type)}
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
      </div>
    );
  }

  // conversation mode — pinned bottom bar
  return (
    <div className="bg-canvas px-4 py-3">
      <div className="flex justify-center">{inputCard}</div>
    </div>
  );
}
