"use client";

// DEV-ONLY: temporary seeding panel so the renderers can be exercised before
// the backend is wired up. Delete this file (and its import in DashboardChat)
// once the real chat flow is connected.

import { useRef } from "react";
import { Typography } from "@/components/ui/Typography";
import { useChatStore } from "@/store/chat-store";
import { useConversationsStore } from "@/store/conversations-store";
import type { ConversationMeta, Message } from "@/types";

const uid = () => crypto.randomUUID();
const now = () => new Date();

type Scenario = { id: string; label: string; build: () => Message[] };

const SCENARIOS: Scenario[] = [
  {
    id: "thinking",
    label: "Thinking",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "Write me something" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "text",
        status: "thinking",
        timestamp: now(),
        content: { markdown: "" },
      },
    ],
  },
  {
    id: "text",
    label: "Text reply",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "Explain what VibeCraft can do" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "text",
        status: "complete",
        timestamp: now(),
        content: {
          markdown:
            "VibeCraft turns plain-language ideas into shareable books, websites, posters, and games — no code required.\n\nPick a type from the chip row, describe what you want, and I'll build it.",
        },
      },
    ],
  },
  {
    id: "clarification-single",
    label: "Clarification (single)",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "Make me a children's book" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "clarification",
        status: "complete",
        timestamp: now(),
        content: {
          leadText: "Quick question before I start writing.",
          question: "What age group is this for?",
          instruction: "Select one answer",
          questionIndex: 1,
          questionTotal: 3,
          options: [
            {
              id: "a",
              label: "Toddlers (1–3)",
              description: "Short rhymes, big pictures",
            },
            {
              id: "b",
              label: "Pre-school (3–5)",
              description: "Simple sentences, bedtime feel",
            },
            {
              id: "c",
              label: "Early reader (5–8)",
              description: "Chapter book with vocabulary stretch",
            },
          ],
          submitLabel: "Continue",
        },
      },
    ],
  },
  {
    id: "clarification-multi",
    label: "Clarification (multi)",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "Build me a portfolio site" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "clarification",
        status: "complete",
        timestamp: now(),
        content: {
          leadText:
            "Pick the sections you want — you can grab as many as you like.",
          question: "Which sections should the site have?",
          instruction: "Select all that apply",
          questionIndex: 2,
          questionTotal: 3,
          options: [
            { id: "hero", label: "Hero / intro" },
            { id: "work", label: "Work samples" },
            { id: "about", label: "About me" },
            { id: "contact", label: "Contact form" },
          ],
          submitLabel: "Craft it",
        },
      },
    ],
  },
  {
    id: "book-building",
    label: "Book — building",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "A bedtime story about a star fox" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "book",
        status: "building",
        timestamp: now(),
        buildingContent: {
          label: "Building your book",
          subtitle: "The Star Fox's Dream · 8 chapters",
          stages: ["Outline", "Writing", "Illustrating", "Layout", "QA"],
          currentStageIndex: 2,
          substep: {
            label: "Generating illustrations",
            description: "Creating cozy bedtime visuals for each chapter",
            previewItems: ["Chapter 1", "Chapter 2", "Chapter 3"],
          },
        },
      },
    ],
  },
  {
    id: "book-complete",
    label: "Book — complete",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "A bedtime story about a star fox" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "book",
        status: "complete",
        timestamp: now(),
        content: {
          title: "The Star Fox's Dream",
          subtitle: "A cozy bedtime tale",
          chapters: Array.from({ length: 8 }, (_, i) => ({
            id: String(i + 1),
            title: `Chapter ${i + 1}`,
          })),
          coverImageUrl:
            "https://placehold.co/600x900/F27A1A/FFFFFF?text=Star+Fox",
          fileSize: "4.2MB",
          pageCount: 19,
          qualityChecks: [
            "All 8 chapters drafted",
            "Reading age verified for bedtime audience",
            "Illustrations sized for tablet and print",
          ],
        },
      },
    ],
  },
  {
    id: "website-building",
    label: "Website — building",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "A bakery landing page" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "website",
        status: "building",
        timestamp: now(),
        buildingContent: {
          label: "Building your website",
          subtitle: "David's Bakery · 5 sections",
          stages: ["Planning", "Coding", "Styling", "Content", "QA"],
          currentStageIndex: 1,
        },
      },
    ],
  },
  {
    id: "website-complete",
    label: "Website — complete",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "A bakery landing page" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "website",
        status: "complete",
        timestamp: now(),
        content: {
          name: "David's Bakery",
          url: "davids-bakery.vibecraft.site",
          html: "<!doctype html>\n<html>\n  <body>\n    <h1>David's Bakery</h1>\n    <p>Fresh sourdough since 1987.</p>\n  </body>\n</html>",
          qualityChecks: [
            "Mobile layout verified at 375px",
            "Lighthouse accessibility ≥ 95",
          ],
        },
      },
    ],
  },
  {
    id: "art-complete",
    label: "Art — complete",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "A festival poster" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "art",
        status: "complete",
        timestamp: now(),
        content: {
          title: "Summer Sonic Festival Poster",
          formats: ["A3 portrait", "Instagram story"],
          previewUrl:
            "https://placehold.co/600x800/7E3FF2/FFFFFF?text=Summer+Sonic",
          qualityChecks: ["Print-ready CMYK", "Bleed margins 3mm verified"],
        },
      },
    ],
  },
  {
    id: "game-complete",
    label: "Game — complete",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "A capitals quiz game" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "game",
        status: "complete",
        timestamp: now(),
        content: {
          title: "World Capitals Quiz",
          url: "capitals-quiz.vibecraft.site",
          html: "<h1>World Capitals Quiz</h1>",
        },
      },
    ],
  },
  {
    id: "error",
    label: "Error",
    build: () => [
      {
        id: uid(),
        role: "user",
        content: { text: "Something the model can't handle" },
        timestamp: now(),
      },
      {
        id: uid(),
        role: "assistant",
        type: "text",
        status: "error",
        timestamp: now(),
        content: { markdown: "" },
        error: "The model couldn't complete that request. Try rephrasing.",
      },
    ],
  },
];

const MOCK_RECENTS: ConversationMeta[] = [
  {
    id: "demo-recent-1",
    title: "The Star Fox's Dream",
    type: "book",
    updatedAt: new Date(),
  },
  {
    id: "demo-recent-2",
    title: "Create a simple game for me",
    type: "game",
    updatedAt: new Date(),
  },
  {
    id: "demo-recent-3",
    title: "Design a website for my landing page",
    type: "website",
    updatedAt: new Date(),
  },
  {
    id: "demo-recent-4",
    title: "Publish a book about Africa",
    type: "book",
    updatedAt: new Date(),
  },
  {
    id: "demo-recent-5",
    title: "Social media banner for my brand",
    type: "art",
    updatedAt: new Date(),
  },
];

export default function DemoControls() {
  const startNewChat = useChatStore((s) => s.startNewChat);
  const addMessage = useChatStore((s) => s.addMessage);
  const addToList = useConversationsStore((s) => s.addToList);
  const ref = useRef<HTMLSelectElement>(null);

  const handleAction = (value: string) => {
    if (value === "reset") {
      startNewChat();
      return;
    }
    if (value === "seed-recents") {
      MOCK_RECENTS.forEach(addToList);
      return;
    }
    const scenario = SCENARIOS.find((s) => s.id === value);
    if (scenario) {
      startNewChat();
      scenario.build().forEach(addMessage);
    }
  };

  return (
    <div className="hidden lg:flex fixed top-[88px] right-[10px] z-40 bg-surface border border-subtle rounded-lg shadow-md p-2 items-center gap-2">
      <Typography
        variant="label-sm"
        className="text-muted shrink-0 px-1 uppercase"
      >
        Dev
      </Typography>
      <select
        ref={ref}
        defaultValue=""
        onChange={(e) => {
          if (!e.target.value) return;
          handleAction(e.target.value);
          if (ref.current) ref.current.value = "";
        }}
        className="text-xs px-3 py-1.5 rounded-md border border-subtle bg-surface text-primary cursor-pointer outline-none"
      >
        <option value="" disabled>
          Pick an action…
        </option>
        <optgroup label="Scenarios">
          {SCENARIOS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Other">
          <option value="seed-recents">Seed recents</option>
          <option value="reset">Reset chat</option>
        </optgroup>
      </select>
    </div>
  );
}
