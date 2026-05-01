"use client";

import { useChatStore } from "@/store/chat-store";
import { useAuthStore } from "@/store/auth-store";
import { Typography } from "@/components/ui/Typography";
import { MessageList } from "@/components/chat/MessageList";
import InputBar from "./InputBar";
import DemoControls from "./DemoControls";

export default function DashboardChat() {
  const messages = useChatStore((s) => s.messages);
  const userName = useAuthStore((s) => s.user?.name) ?? "there";

  return (
    <>
      <DemoControls />
      {messages.length === 0 ? (
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
            <MessageList />
          </div>
          <InputBar />
        </div>
      )}
    </>
  );
}
