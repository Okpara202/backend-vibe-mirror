"use client";

import { useEffect } from "react";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { useConversationsStore } from "@/store/conversations-store";

export default function Recents() {
  const list = useConversationsStore((s) => s.list);
  const fetchAll = useConversationsStore((s) => s.fetchAll);
  const loadConversation = useChatStore((s) => s.loadConversation);
  const activeId = useChatStore((s) => s.activeConversationId);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (list.length === 0) return null;

  return (
    <div>
      <Typography variant="body-sm" className="text-secondary py-2 px-4">
        RECENTS
      </Typography>

      {list.map((conv) => {
        const isActive = activeId === conv.id;
        return (
          <button
            key={conv.id}
            type="button"
            onClick={() => loadConversation(conv.id)}
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
