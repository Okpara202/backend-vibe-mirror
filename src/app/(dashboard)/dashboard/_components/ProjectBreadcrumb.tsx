"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useProjectStore } from "@/store/project-store";
import BreadcrumbDropdown from "./BreadcrumbDropdown";

interface ProjectBreadcrumbProps {
  projectId: string;
}

export default function ProjectBreadcrumb({
  projectId,
}: ProjectBreadcrumbProps) {
  const project = useProjectStore((s) =>
    s.projects.find((p) => p.id === projectId),
  );

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!project) return null;

  return (
    <div className="flex items-center gap-1 min-w-0" ref={wrapperRef}>
      <Link
        href={`/projects/${projectId}`}
        className="text-primary hover:text-brand truncate"
      >
        <Typography variant="body-sm" className="font-medium truncate">
          {project.name}
        </Typography>
      </Link>

      <div className="relative shrink-0">
        <button
          type="button"
          aria-label="Open project menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "p-1 rounded text-icon-secondary hover:text-primary",
            open && "text-primary",
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        {open && (
          <BreadcrumbDropdown
            projectId={projectId}
            onClose={() => setOpen(false)}
          />
        )}
      </div>

      <ChevronRight className="w-4 h-4 text-icon-secondary shrink-0" />
    </div>
  );
}
