"use client";

import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import { useProjectStore } from "@/store/project-store";
import type { ProjectMeta } from "@/types";

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - date.getTime();
  const seconds = Math.max(1, Math.floor(diff / 1000));
  if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="rounded-[12px] border border-subtle p-5 flex flex-col justify-between min-h-52 hover:cursor-pointer hover:bg-surface transition-all duration-300"
    >
      <aside>
        <Typography variant="label-md" className="text-primary line-clamp-1">
          {project.name}
        </Typography>
        {project.description && (
          <Typography
            variant="body-sm"
            className="text-input-helper line-clamp-3"
          >
            {project.description}
          </Typography>
        )}
      </aside>

      <aside>
        <Typography variant="body-sm" className="text-input-helper">
          Updated {formatRelativeTime(new Date(project.updatedAt))}
        </Typography>
      </aside>
    </Link>
  );
}

export default function ProjectHistory() {
  const projects = useProjectStore((s) => s.projects);
  const active = projects.filter((p) => p.status === "active");

  if (active.length === 0) {
    return (
      <section className="mt-8 rounded-[12px] border border-subtle p-10 text-center bg-surface">
        <Typography variant="label-md" className="text-primary">
          No projects yet
        </Typography>
        <Typography
          variant="body-sm"
          className="text-input-helper mt-2"
        >
          Create your first project to group related chats and creations.
        </Typography>
      </section>
    );
  }

  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {active.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </section>
  );
}
