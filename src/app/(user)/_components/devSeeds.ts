// DEV ONLY — delete before launch with ProjectDevControls.tsx.
// Seed data + factories used by the project dev panel.

import type { ConversationMeta, CreationType, ProjectMeta } from "@/types";

export const PROJECT_SEEDS: Array<{ name: string; description: string }> = [
  {
    name: "David's Bakery",
    description:
      "Branding, printable menu, and a small ordering site for the corner shop.",
  },
  {
    name: "StarFox's Dream",
    description: "A short illustrated bedtime story aimed at 4–7 year olds.",
  },
  {
    name: "Indic8 Trading",
    description:
      "Beginner-friendly market indicator with an onboarding mini-game.",
  },
];

export const CHAT_SEEDS: Array<{ title: string; type: CreationType }> = [
  { title: "Logo and brand palette", type: "art" },
  { title: "Hero section copy", type: "website" },
  { title: "Printable menu PDF", type: "book" },
  { title: "Loyalty mini-game", type: "game" },
];

export function makeProject(seed: {
  name: string;
  description: string;
}): ProjectMeta {
  const now = new Date();
  return {
    id: crypto.randomUUID(),
    name: seed.name,
    description: seed.description,
    status: "active",
    creationCount: 0,
    createdAt: now,
    updatedAt: now,
  };
}

export function makeChat(
  seed: { title: string; type: CreationType },
  projectId?: string,
): ConversationMeta {
  return {
    id: crypto.randomUUID(),
    title: seed.title,
    type: seed.type,
    updatedAt: new Date(),
    projectId,
  };
}
