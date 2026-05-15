"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import type { ProjectMeta } from "@/types";
import DeleteProjectModal from "./DeleteProjectModal";

interface ProjectSettingsMenuProps {
  project: ProjectMeta;
  onRename: () => void;
  onArchive: () => void;
  onDelete: () => void;
}

export default function ProjectSettingsMenu({
  project,
  onRename,
  onArchive,
  onDelete,
}: ProjectSettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <>
      <div className="relative" ref={wrapperRef}>
        <button
          type="button"
          aria-label="Project settings"
          onClick={() => setOpen((v) => !v)}
          className="p-2 rounded-lg text-icon-secondary hover:text-primary hover:bg-hover/40"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-44 bg-surface border border-subtle rounded-xl shadow-lg z-20 overflow-hidden">
            <MenuItem
              label="Rename"
              onClick={() => {
                setOpen(false);
                onRename();
              }}
            />
            <MenuItem
              label={project.status === "archived" ? "Unarchive" : "Archive"}
              onClick={() => {
                setOpen(false);
                onArchive();
              }}
            />
            <MenuItem
              label="Delete"
              destructive
              onClick={() => {
                setOpen(false);
                setConfirmingDelete(true);
              }}
            />
          </div>
        )}
      </div>

      {confirmingDelete && (
        <DeleteProjectModal
          project={project}
          onCancel={() => setConfirmingDelete(false)}
          onConfirm={() => {
            setConfirmingDelete(false);
            onDelete();
          }}
        />
      )}
    </>
  );
}

function MenuItem({
  label,
  onClick,
  destructive,
}: {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`block w-full text-left px-4 py-2 text-sm hover:bg-hover/60 ${
        destructive ? "text-destructive" : "text-primary"
      }`}
    >
      {label}
    </button>
  );
}
