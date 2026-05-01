"use client";

import { useChatStore } from "@/store/chat-store";
import { ConversationSkeleton } from "./ConversationSkeleton";
import { AssistantMessage } from "./AssistantMessage";
import { UserMessage } from "./UserMessage";

export function MessageList() {
  const messages = useChatStore((s) => s.messages);
  const status = useChatStore((s) => s.status);

  if (messages.length === 0 && status === "idle") return null;

  return (
    <div className="space-y-4">
      {messages.map((m) =>
        m.role === "user" ? (
          <UserMessage key={m.id} message={m} />
        ) : (
          <div
            key={m.id}
            className="mr-auto w-[90%] md:w-[80%] lg:w-[60%]"
          >
            <AssistantMessage message={m} />
          </div>
        ),
      )}
    </div>
  );
}

export { ConversationSkeleton };
