"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { useAuthStore } from "@/store/auth-store";
import { useChatStore } from "@/store/chat-store";
import { useProjectStore } from "@/store/project-store";
import { useUIStore } from "@/store/ui-store";
import CreationGrid from "./CreationGrid";
import ProjectHeader from "./ProjectHeader";

export default function ProjectHome({ projectId }: { projectId: string }) {
  const project = useProjectStore((s) =>
    s.projects.find((p) => p.id === projectId),
  );
  const tier = useAuthStore((s) => s.tier);
  const setProjectId = useChatStore((s) => s.setProjectId);

  // Mirror activeProjectId into chat-store so any chat call originating from
  // the project home (e.g. "New chat") includes the projectId in its payload.
  useEffect(() => {
    setProjectId(projectId);
    return () => setProjectId(null);
  }, [projectId, setProjectId]);

  if (!project) {
    return (
      <section className="pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-3xl space-y-5 text-center">
        <Typography variant="display-section" className="text-primary">
          Project not found
        </Typography>
        <Typography variant="body-sm" className="text-secondary">
          It may have been deleted, or you may be following a stale link.
        </Typography>
        <Button asChild variant="outline">
          <Link href="/projects">Back to projects</Link>
        </Button>
      </section>
    );
  }

  return (
    <section className="pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-3xl space-y-5">
      <ProjectHeader project={project} />
      {tier === "free" && <FreeTierContextNudge />}
      <CreationGrid projectId={project.id} />
    </section>
  );
}

function FreeTierContextNudge() {
  const setUpgradeModalOpen = useUIStore((s) => s.setUpgradeModalOpen);
  return (
    <div className="bg-hover border border-subtle rounded-xl px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Typography variant="body-sm" className="text-brand">
        Upgrade to Beginner — Vibe will remember your brand across all chats in
        this project.
      </Typography>
      <Button
        variant="default"
        onClick={() => setUpgradeModalOpen(true)}
        className="shrink-0"
      >
        Upgrade
      </Button>
    </div>
  );
}
