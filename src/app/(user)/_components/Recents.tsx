"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { useConversationsStore } from "@/store/conversations-store";
import { useUIStore } from "@/store/ui-store";

export default function Recents() {
  const router = useRouter();
  const list = useConversationsStore((s) => s.list);
  const fetchAll = useConversationsStore((s) => s.fetchAll);
  const loadConversation = useChatStore((s) => s.loadConversation);
  const activeId = useChatStore((s) => s.activeConversationId);
  const sidebarMode = useUIStore((s) => s.sidebarMode);
  const activeProjectId = useUIStore((s) => s.activeProjectId);
  const setSidebarMode = useUIStore((s) => s.setSidebarMode);
  const setActiveProjectId = useUIStore((s) => s.setActiveProjectId);
  const setMobileSidebarOpen = useUIStore((s) => s.setMobileSidebarOpen);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const isProject = sidebarMode === "project" && activeProjectId !== null;
  const filtered = isProject
    ? list.filter((c) => c.projectId === activeProjectId)
    : list;

  const handleBackToAll = () => {
    setSidebarMode("global");
    setActiveProjectId(null);
    setMobileSidebarOpen(false);
    router.push("/projects");
  };

  const handleClick = (convId: string, projectId: string | undefined) => {
    setMobileSidebarOpen(false);
    if (isProject && activeProjectId) {
      router.push(`/projects/${activeProjectId}/chat/${convId}`);
      return;
    }
    if (projectId) {
      router.push(`/projects/${projectId}/chat/${convId}`);
      return;
    }
    loadConversation(convId);
  };

  if (!isProject && filtered.length === 0) return null;

  return (
    <div>
      {isProject && (
        <button
          type="button"
          onClick={handleBackToAll}
          className="flex items-center gap-1.5 px-4 py-2 mb-2 w-full text-left rounded-[8px] text-sidebar-link-text hover:bg-sidebar-fill-active hover:text-sidebar-active-link"
        >
          <ChevronLeft className="w-4 h-4" />
          <Typography variant="body-sm">Back to all projects</Typography>
        </button>
      )}

      <Typography variant="body-sm" className="text-secondary py-2 px-4">
        {isProject ? "THIS PROJECT" : "RECENTS"}
      </Typography>

      {filtered.length === 0 && isProject && (
        <Typography
          variant="body-sm"
          className="text-input-helper py-2 px-4"
        >
          No chats in this project yet.
        </Typography>
      )}

      {filtered.map((conv) => {
        const isActive = activeId === conv.id;
        return (
          <button
            key={conv.id}
            type="button"
            onClick={() => handleClick(conv.id, conv.projectId)}
            className={cn(
              "px-4 py-2 block w-full text-left rounded-[8px] cursor-pointer",
              isActive
                ? "bg-sidebar-fill-active text-sidebar-active-link"
                : "text-sidebar-link-text hover:bg-sidebar-fill-active hover:text-sidebar-active-link",
            )}
          >
            <Typography variant="body-sm" className="line-clamp-1">
              {conv.title}
            </Typography>
          </button>
        );
      })}
    </div>
  );
}
