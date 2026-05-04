"use client";

import { X } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { UserAttachment } from "@/types";

interface AttachmentChipsProps {
  attachments: UserAttachment[];
  onRemove: (id: string) => void;
  className?: string;
}

export function AttachmentChips({
  attachments,
  onRemove,
  className,
}: AttachmentChipsProps) {
  if (attachments.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {attachments.map((file) => {
        const isImage = file.mimeType.startsWith("image/");
        return (
          <div
            key={file.id}
            className="inline-flex items-center gap-2 rounded-lg border border-subtle bg-canvas px-2 py-1 max-w-[220px]"
          >
            {isImage && file.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={file.previewUrl}
                alt={file.name}
                className="w-6 h-6 rounded object-cover shrink-0"
              />
            ) : (
              <span className="w-6 h-6 rounded bg-subtle inline-flex items-center justify-center shrink-0">
                <Typography variant="caption-default" className="text-muted">
                  {file.name.split(".").pop()?.slice(0, 3) ?? "file"}
                </Typography>
              </span>
            )}
            <Typography
              variant="caption-default"
              className="text-secondary truncate"
            >
              {file.name}
            </Typography>
            <button
              type="button"
              aria-label={`Remove ${file.name}`}
              onClick={() => onRemove(file.id)}
              className="text-muted hover:text-primary shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
