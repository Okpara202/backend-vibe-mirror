"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import type { ProjectMeta } from "@/types";

interface DeleteProjectModalProps {
  project: ProjectMeta;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteProjectModal({
  project,
  onCancel,
  onConfirm,
}: DeleteProjectModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const count = project.creationCount;
  const chatLabel = count === 1 ? "chat" : "chats";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Delete project"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative z-10 bg-canvas rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-4 right-4 text-muted hover:text-primary"
        >
          <X size={20} />
        </button>
        <Typography variant="heading-h1" className="text-primary mb-2">
          Delete this project?
        </Typography>
        <Typography variant="body-sm" className="text-secondary mb-6">
          {`This will permanently delete ${project.name} and all ${count} ${chatLabel} inside it. Published sites will be unpublished. This cannot be undone.`}
        </Typography>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Delete project
          </Button>
        </div>
      </div>
    </div>
  );
}
