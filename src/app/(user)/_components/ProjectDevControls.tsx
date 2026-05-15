"use client";

// DEV ONLY — delete before launch alongside DemoControls.tsx and devSeeds.ts.
// Floating panel (lg+ only) that seeds project + conversation data so we
// can exercise every screen state without a backend.

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useConversationsStore } from "@/store/conversations-store";
import { useProjectStore } from "@/store/project-store";
import type { Tier } from "@/types";
import { CHAT_SEEDS, PROJECT_SEEDS, makeChat, makeProject } from "./devSeeds";

export default function ProjectDevControls() {
  const [open, setOpen] = useState(false);

  const setupDemo = () => {
    useAuthStore.setState({ tier: "pro" });
    const projects = PROJECT_SEEDS.map(makeProject);
    useProjectStore.setState({ projects, activeProject: null });
    const firstId = projects[0]?.id;
    const projectChats = firstId
      ? CHAT_SEEDS.map((c) => makeChat(c, firstId))
      : [];
    const globalChats = [
      makeChat({ title: "Quick poster idea", type: "art" }),
      makeChat({ title: "Fix the homepage tagline", type: "website" }),
    ];
    useConversationsStore.setState({ list: [...projectChats, ...globalChats] });
  };

  const resetAll = () => {
    useProjectStore.setState({ projects: [], activeProject: null });
    useConversationsStore.setState({ list: [] });
  };

  const setTier = (tier: Tier) => useAuthStore.setState({ tier });

  const fillCap = (count: number, tier: Tier) => {
    setTier(tier);
    const projects = Array.from({ length: count }, (_, i) =>
      makeProject({
        name: `Cap test ${i + 1}`,
        description: "Seeded to exercise the limit-reached path.",
      }),
    );
    useProjectStore.setState({ projects });
  };

  const seedChatsInFirstProject = () => {
    const firstId = useProjectStore
      .getState()
      .projects.find((p) => p.status === "active")?.id;
    if (!firstId) return;
    const chats = CHAT_SEEDS.map((c) => makeChat(c, firstId));
    useConversationsStore.setState((s) => ({ list: [...chats, ...s.list] }));
  };

  const addGlobalChat = () => {
    const chat = makeChat({ title: "Untitled global chat", type: "art" });
    useConversationsStore.setState((s) => ({ list: [chat, ...s.list] }));
  };

  const toggleArchiveFirst = () => {
    const first = useProjectStore.getState().projects[0];
    if (!first) return;
    useProjectStore.getState().updateProject(first.id, {
      status: first.status === "archived" ? "active" : "archived",
      updatedAt: new Date(),
    });
  };

  return (
    <div className="hidden lg:block fixed bottom-4 right-4 z-40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bg-canvas border border-subtle rounded-full px-3 py-1.5 text-xs font-mono shadow-md text-secondary hover:text-primary"
      >
        DEV: projects
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-72 bg-surface border border-subtle rounded-xl p-3 shadow-lg space-y-3 max-h-[80vh] overflow-y-auto">
          <Group label="Demo state">
            <Btn onClick={setupDemo}>Set up demo</Btn>
            <Btn onClick={resetAll}>Reset all</Btn>
          </Group>
          <Group label="Tier">
            <Btn onClick={() => setTier("free")}>Free</Btn>
            <Btn onClick={() => setTier("beginner")}>Beginner</Btn>
            <Btn onClick={() => setTier("pro")}>Pro</Btn>
          </Group>
          <Group label="Caps">
            <Btn onClick={() => fillCap(1, "free")}>Fill Free (1)</Btn>
            <Btn onClick={() => fillCap(5, "beginner")}>Fill Beginner (5)</Btn>
          </Group>
          <Group label="Content">
            <Btn onClick={seedChatsInFirstProject}>+4 chats in first project</Btn>
            <Btn onClick={addGlobalChat}>+1 global chat</Btn>
            <Btn onClick={toggleArchiveFirst}>Toggle archive first</Btn>
          </Group>
        </div>
      )}
    </div>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-muted mb-1.5">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Btn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-xs px-2 py-1 rounded border border-subtle hover:bg-hover hover:text-brand text-primary"
    >
      {children}
    </button>
  );
}
