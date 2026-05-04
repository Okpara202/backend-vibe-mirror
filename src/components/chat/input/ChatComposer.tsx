"use client";

import { useChatStore } from "@/store/chat-store";
import { InputComposer } from "./InputComposer";
import { TypePillSelector } from "./TypePillSelector";
import type { CreationType, UserAttachment } from "@/types";

interface ChatComposerProps {
  mode: "new" | "conversation";
  onSend: (payload: {
    text: string;
    attachments: UserAttachment[];
    type: CreationType | null;
  }) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatComposer({
  mode,
  onSend,
  disabled,
  placeholder,
}: ChatComposerProps) {
  const selectedType = useChatStore((s) => s.selectedType);
  const setSelectedType = useChatStore((s) => s.setSelectedType);

  const handleSend = ({
    text,
    attachments,
  }: {
    text: string;
    attachments: UserAttachment[];
  }) => {
    onSend({ text, attachments, type: selectedType });
  };

  if (mode === "new") {
    return (
      <div className="w-full flex flex-col items-center gap-4">
        <InputComposer
          mode="new"
          onSend={handleSend}
          disabled={disabled}
          placeholder={placeholder}
        />
        <TypePillSelector
          selectedType={selectedType}
          onToggle={(t) => setSelectedType(selectedType === t ? null : t)}
        />
      </div>
    );
  }

  return (
    <div className="bg-canvas px-4 py-3">
      <div className="flex justify-center">
        <InputComposer
          mode="conversation"
          onSend={handleSend}
          disabled={disabled}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
