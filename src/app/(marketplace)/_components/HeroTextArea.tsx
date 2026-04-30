"use client";

import { useRef, useState } from "react";
import { Typography } from "@/components/ui/Typography";
import DotTextTag from "./DotTextTag";

const MAX_LENGTH = 500;

const TAG_PROMPTS: Record<string, string> = {
  Website:
    "Build a modern portfolio website for a freelance photographer with a dark theme, image gallery, and contact form.",
  Book: "Write a short children's book about a curious fox who learns to share, with 8 illustrated pages.",
  Game: "Create a simple 2D platformer game with a cat character collecting yarn balls across 5 levels.",
  Art: "Generate a watercolor-style illustration of a misty mountain landscape at sunrise.",
};

export default function HeroTextArea() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTagClick = (tag: keyof typeof TAG_PROMPTS) => {
    setValue(TAG_PROMPTS[tag]);
    textareaRef.current?.focus();
  };

  return (
    <div className="space-y-5 w-full">
      <aside className="flex items-center justify-center gap-2">
        <DotTextTag
          dotColor="#F27A1A"
          text="Website"
          onClick={() => handleTagClick("Website")}
        />
        <DotTextTag
          dotColor="#7E3FF2"
          text="Book"
          onClick={() => handleTagClick("Book")}
        />
        <DotTextTag
          dotColor="#4ADE80"
          text="Game"
          onClick={() => handleTagClick("Game")}
        />
        <DotTextTag
          dotColor="#D45E0A"
          text="Art"
          onClick={() => handleTagClick("Art")}
        />
      </aside>

      <div className="bg-surface border border-border rounded-[20px] px-5 py-3 hero-textarea-shadow focus-within:border-brand transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX_LENGTH}
          className="py-5 general-border w-full focus:outline-none text-input-helper font-medium font-sans text-sm leading-5"
          placeholder="Pick a type above, choose a suggestion, or type your own idea here...
"
        />

        <div className="py-5 text-left">
          <Typography variant="code-sm" className="text-input-helper">
            {value.length} / {MAX_LENGTH}
          </Typography>
        </div>
      </div>

      <div className="text-center">
        <Typography variant="label-md" className="text-input-helper">
          Edit the prompt to make it yours, copy it or let Vibe build it.
        </Typography>
      </div>
    </div>
  );
}
