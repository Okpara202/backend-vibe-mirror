"use client";

import { useChatStore } from "@/store/chat-store";
import { ChatComposer } from "@/components/chat/input/ChatComposer";
import type { CreationType, UserAttachment } from "@/types";

export default function InputBar() {
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const status = useChatStore((s) => s.status);

  const mode = messages.length === 0 ? "new" : "conversation";

  const handleSend = (payload: {
    text: string;
    attachments: UserAttachment[];
    type: CreationType | null;
  }) => {
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: {
        text: payload.text,
        attachments:
          payload.attachments.length > 0 ? payload.attachments : undefined,
      },
      timestamp: new Date(),
    });
    // TODO: trigger AI call when backend is ready
  };

  return (
    <ChatComposer
      mode={mode}
      onSend={handleSend}
      disabled={status === "building" || status === "streaming"}
    />
  );
}
