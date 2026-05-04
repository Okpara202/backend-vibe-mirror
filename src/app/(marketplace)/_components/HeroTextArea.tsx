"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ChatComposer } from "@/components/chat/input/ChatComposer";
import type { CreationType, UserAttachment } from "@/types";

export default function HeroTextArea() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const handleSend = (payload: {
    text: string;
    attachments: UserAttachment[];
    type: CreationType | null;
  }) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "vibecraft_pending_message",
        JSON.stringify(payload),
      );
    }
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login?next=/dashboard");
    }
  };

  return (
    <ChatComposer
      mode="new"
      onSend={handleSend}
      placeholder="Come Board, May we Vibe"
    />
  );
}
