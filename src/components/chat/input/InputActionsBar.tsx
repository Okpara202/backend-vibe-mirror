"use client";

import { Mic, Plus, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InputActionsBarProps {
  ctaLabel: string;
  canSend: boolean;
  showStop: boolean;
  onAttach: () => void;
  onSend: () => void;
  onCancel: () => void;
  voice: {
    isSupported: boolean;
    isRecording: boolean;
    start: () => void | Promise<void>;
    stop: () => void;
  };
}

export function InputActionsBar({
  ctaLabel,
  canSend,
  showStop,
  onAttach,
  onSend,
  onCancel,
  voice,
}: InputActionsBarProps) {
  return (
    <div className="flex items-center justify-between pt-3">
      <button
        type="button"
        aria-label="Add attachment"
        onClick={onAttach}
        className="text-muted hover:text-primary shrink-0 p-1.5 cursor-pointer"
      >
        <Plus className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {voice.isSupported && (
          <span className="relative inline-flex shrink-0">
            {voice.isRecording && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand/40 animate-ping motion-reduce:animate-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-brand/25 animate-ping motion-reduce:animate-none [animation-delay:0.6s]"
                />
              </>
            )}
            <button
              type="button"
              aria-label={
                voice.isRecording ? "Stop voice input" : "Start voice input"
              }
              aria-pressed={voice.isRecording}
              onClick={voice.isRecording ? voice.stop : voice.start}
              className={cn(
                "relative shrink-0 p-1.5 rounded-full cursor-pointer transition-colors",
                voice.isRecording
                  ? "bg-brand text-white shadow-md"
                  : "text-muted hover:text-primary",
              )}
            >
              <Mic className="w-5 h-5" />
            </button>
          </span>
        )}

        {showStop && (
          <button
            type="button"
            aria-label="Stop generating"
            onClick={onCancel}
            className="text-muted hover:text-primary shrink-0 p-1.5 cursor-pointer"
          >
            <Square className="w-5 h-5 fill-current" />
          </button>
        )}

        <Button
          type="button"
          onClick={onSend}
          disabled={!canSend}
          aria-label="Send message"
          aria-disabled={!canSend}
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
