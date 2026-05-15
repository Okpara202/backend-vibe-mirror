"use client";

import { useEffect } from "react";
import { useChatStore } from "@/store/chat-store";
import { useAuthStore } from "@/store/auth-store";
import { Typography } from "@/components/ui/Typography";
import { MessageList } from "@/components/chat/MessageList";
import { ConversationSkeleton } from "@/components/chat/ConversationSkeleton";
import InputBar from "./InputBar";
import DemoControls from "./DemoControls";

interface DashboardChatProps {
  /** Set when this chat is scoped inside a project (`/projects/:id/chat/:chatId`).
   *  Forwarded to the AI generate call so backend can attach project context. */
  projectId?: string;
  /** Conversation id for project-scoped routes. When present we trigger
   *  `loadConversation` on mount; absent → behaves as a global new chat. */
  chatId?: string;
}

export default function DashboardChat({
  projectId,
  chatId,
}: DashboardChatProps = {}) {
  const messages = useChatStore((s) => s.messages);
  const isLoadingMessages = useChatStore((s) => s.isLoadingMessages);
  const addMessage = useChatStore((s) => s.addMessage);
  const setSelectedType = useChatStore((s) => s.setSelectedType);
  const setProjectId = useChatStore((s) => s.setProjectId);
  const loadConversation = useChatStore((s) => s.loadConversation);
  const userName = useAuthStore((s) => s.user?.name) ?? "there";

  // Mirror the route's projectId into chat-store so generate-calls include
  // it. Reset on unmount so leaving the project route returns to global mode.
  useEffect(() => {
    setProjectId(projectId ?? null);
    return () => setProjectId(null);
  }, [projectId, setProjectId]);

  // Load the conversation when a chatId is supplied (project chat routes).
  useEffect(() => {
    if (chatId) loadConversation(chatId);
  }, [chatId, loadConversation]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("vibecraft_pending_message");
    if (!raw) return;
    sessionStorage.removeItem("vibecraft_pending_message");
    try {
      const payload = JSON.parse(raw);
      if (payload?.text) {
        if (payload.type) setSelectedType(payload.type);
        addMessage({
          id: crypto.randomUUID(),
          role: "user",
          content: {
            text: payload.text,
            attachments:
              Array.isArray(payload.attachments) && payload.attachments.length
                ? payload.attachments
                : undefined,
          },
          timestamp: new Date(),
        });
        // TODO: auto-fire AI call when backend is ready
      }
    } catch {
      /* malformed — ignore */
    }
  }, [addMessage, setSelectedType]);

  const showConversation = isLoadingMessages || messages.length > 0;

  return (
    <>
      <DemoControls />
      {!showConversation ? (
        <div className="flex-1 flex flex-col items-center justify-center px-[10px] py-10 gap-10 min-h-[calc(100vh-78px)]">
          <Typography variant="display-section" className="text-primary">
            What are we crafting,{" "}
            <span className="text-brand font-serif italic">{userName}?</span>
          </Typography>
          <InputBar />
        </div>
      ) : (
        <div className="flex flex-col min-h-[calc(100vh-78px)]">
          <div className="flex-1 overflow-y-auto px-[10px] py-6">
            {isLoadingMessages ? <ConversationSkeleton /> : <MessageList />}
          </div>
          <InputBar />
        </div>
      )}
    </>
  );
}
