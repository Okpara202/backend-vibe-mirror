"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConversationsStore } from "@/store/conversations-store";
import { useProjectStore } from "@/store/project-store";
import type { ProjectMeta } from "@/types";
import InlineEditableText from "./InlineEditableText";
import ProjectSettingsMenu from "./ProjectSettingsMenu";

export default function ProjectHeader({ project }: { project: ProjectMeta }) {
  const router = useRouter();
  const updateProject = useProjectStore((s) => s.updateProject);
  const removeProject = useProjectStore((s) => s.removeProject);
  const addToList = useConversationsStore((s) => s.addToList);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);

  const touch = (patch: Partial<ProjectMeta>) =>
    updateProject(project.id, { ...patch, updatedAt: new Date() });

  const handleNewChat = () => {
    const chatId = crypto.randomUUID();
    addToList({
      id: chatId,
      title: "New chat",
      updatedAt: new Date(),
      projectId: project.id,
    });
    router.push(`/projects/${project.id}/chat/${chatId}`);
  };

  const handleArchive = () =>
    touch({ status: project.status === "archived" ? "active" : "archived" });

  const handleDelete = () => {
    removeProject(project.id);
    router.push("/projects");
  };

  return (
    <div className="space-y-4">
      <InlineEditableText
        value={project.name}
        placeholder="Untitled project"
        editing={editingTitle}
        onEditingChange={setEditingTitle}
        onSave={(name) => touch({ name })}
        displayClassName="font-serif italic text-3xl md:text-4xl text-primary leading-tight"
      />

      <InlineEditableText
        value={project.description ?? ""}
        placeholder="Add a short description for this project"
        multiline
        editing={editingDesc}
        onEditingChange={setEditingDesc}
        onSave={(description) => touch({ description })}
        displayClassName="font-sans text-sm leading-5 text-secondary"
        emptyDisplay={
          <span className="text-muted">
            Add a short description for this project
          </span>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <Button
          onClick={handleNewChat}
          className="flex items-center gap-3 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          New chat
        </Button>
        <ProjectSettingsMenu
          project={project}
          onRename={() => setEditingTitle(true)}
          onArchive={handleArchive}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
