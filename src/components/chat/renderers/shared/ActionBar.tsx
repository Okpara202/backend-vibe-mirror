"use client";

import {
  Copy,
  MoreHorizontal,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

interface ActionBarProps {
  messageId: string;
  textToCopy?: string;
  onUndo?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  onCopy?: () => void;
}

export function ActionBar({
  messageId,
  textToCopy,
  onUndo,
  onLike,
  onDislike,
  onCopy,
}: ActionBarProps) {
  const stub = (action: string) => () =>
    console.log(`[ActionBar:${messageId}] ${action}`);

  const defaultCopy =
    textToCopy && typeof navigator !== "undefined" && navigator.clipboard
      ? () => {
          navigator.clipboard.writeText(textToCopy).catch(() => {
            /* clipboard access denied — fail silently */
          });
        }
      : stub("copy");

  return (
    <div className="flex items-center gap-1 pt-3 border-t border-subtle">
      <IconButton
        onClick={onUndo ?? stub("undo")}
        aria-label="Undo this response"
      >
        <RotateCcw className="w-4 h-4" />
      </IconButton>
      <IconButton
        onClick={onLike ?? stub("like")}
        aria-label="Mark as helpful"
      >
        <ThumbsUp className="w-4 h-4" />
      </IconButton>
      <IconButton
        onClick={onDislike ?? stub("dislike")}
        aria-label="Mark as unhelpful"
      >
        <ThumbsDown className="w-4 h-4" />
      </IconButton>
      <IconButton
        onClick={onCopy ?? defaultCopy}
        aria-label="Copy response"
      >
        <Copy className="w-4 h-4" />
      </IconButton>
      <IconButton onClick={stub("more")} aria-label="More options">
        <MoreHorizontal className="w-4 h-4" />
      </IconButton>
    </div>
  );
}

function IconButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="text-muted hover:text-primary p-1.5 rounded cursor-pointer transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
