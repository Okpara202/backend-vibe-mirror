"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AttachmentChips } from "./AttachmentChips";
import { InputActionsBar } from "./InputActionsBar";
import { VoiceWaveform } from "./VoiceWaveform";
import { useAttachments } from "./useAttachments";
import { useVoiceInput } from "./useVoiceInput";
import type { UserAttachment } from "@/types";

interface InputComposerProps {
  mode: "new" | "conversation";
  onSend: (payload: { text: string; attachments: UserAttachment[] }) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function InputComposer({
  mode,
  onSend,
  disabled = false,
  placeholder = "Come Board, May we Vibe",
}: InputComposerProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { attachments, addFiles, remove, clear } = useAttachments();
  const voice = useVoiceInput({
    onTranscript: (text) =>
      setValue((prev) => (prev ? prev + " " + text : text)),
  });

  const canSend =
    (value.trim().length > 0 || attachments.length > 0) && !disabled;

  const resize = (ta: HTMLTextAreaElement) => {
    ta.style.height = "auto";
    const lh = parseInt(getComputedStyle(ta).lineHeight, 10) || 20;
    ta.style.height = `${Math.max(lh * 5, Math.min(ta.scrollHeight, lh * 10))}px`;
  };

  const handleSend = () => {
    const text = value.trim();
    if ((!text && attachments.length === 0) || disabled) return;
    onSend({ text, attachments });
    setValue("");
    clear();
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  return (
    <div
      className={cn(
        "bg-surface rounded-[20px] px-5 py-3 border transition-all",
        isFocused ? "border-brand" : "border-transparent hero-textarea-shadow",
        mode === "new"
          ? "w-full max-w-[580px]"
          : "w-[90%] md:w-[80%] lg:w-[60%]",
      )}
    >
      <AttachmentChips
        attachments={attachments}
        onRemove={remove}
        className="mb-2"
      />

      {voice.isRecording && voice.analyser ? (
        <VoiceWaveform analyser={voice.analyser} className="w-full mb-3" />
      ) : null}

      <textarea
        ref={textareaRef}
        aria-label="Message input"
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInput={(e) => resize(e.currentTarget)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "general-border w-full resize-none bg-transparent outline-none",
          "pb-3 overflow-y-auto",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "font-sans font-medium text-sm leading-5 text-primary placeholder:text-muted",
          voice.isRecording && "hidden",
        )}
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <InputActionsBar
        ctaLabel={mode === "new" ? "Build with Vibe" : "Ask to edit"}
        canSend={canSend}
        showStop={mode === "conversation" && disabled}
        onAttach={() => fileInputRef.current?.click()}
        onSend={handleSend}
        onCancel={() => console.log("[InputComposer] cancel requested")}
        voice={voice}
      />
    </div>
  );
}
