"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { useChatStore } from "@/store/chat-store";
import type { AssistantMessage as AssistantMessageType } from "@/types";
import { BookRenderer } from "./renderers/BookRenderer";
import { WebsiteRenderer } from "./renderers/WebsiteRenderer";
import { ArtRenderer } from "./renderers/ArtRenderer";
import { GameRenderer } from "./renderers/GameRenderer";
import { TextRenderer } from "./renderers/TextRenderer";
import { ClarificationForm } from "./renderers/ClarificationForm";

export function AssistantMessage({
  message,
}: {
  message: AssistantMessageType;
}) {
  const addMessage = useChatStore((s) => s.addMessage);

  const isMissingContent =
    message.status === "complete" &&
    (message.type === "book" ||
      message.type === "website" ||
      message.type === "art" ||
      message.type === "game") &&
    !message.content;

  if (message.status === "error" || isMissingContent) {
    return (
      <div className="bg-surface border border-destructive rounded-xl p-5 space-y-3">
        <Typography variant="body-sm" className="text-destructive">
          {message.error ??
            "The response finished but no content arrived. Try again."}
        </Typography>
        <Button variant="outline">Try again</Button>
      </div>
    );
  }

  switch (message.type) {
    case "book":
      return <BookRenderer message={message} />;
    case "website":
      return <WebsiteRenderer message={message} />;
    case "art":
      return <ArtRenderer message={message} />;
    case "game":
      return <GameRenderer message={message} />;
    case "clarification":
      return (
        <ClarificationForm
          message={message}
          onSubmit={(selected) => {
            addMessage({
              id: crypto.randomUUID(),
              role: "user",
              content: { text: selected.map((o) => o.label).join(", ") },
              timestamp: new Date(),
            });
          }}
        />
      );
    default:
      return <TextRenderer message={message} />;
  }
}
