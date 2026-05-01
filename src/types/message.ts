export type CreationType = "website" | "game" | "book" | "art";
export type MessageStatus = "thinking" | "building" | "complete" | "error";

// ── Building state (shared across all types) ──────────────────────────
export interface BuildingContent {
  label: string;
  subtitle: string;
  stages: string[];
  currentStageIndex: number;
  substep?: {
    label: string;
    description: string;
    previewItems?: string[];
  };
}

// ── Clarification form ────────────────────────────────────────────────
export interface ClarificationOption {
  id: string;
  label: string;
  description?: string;
}

export interface ClarificationContent {
  leadText: string;
  question: string;
  instruction: "Select one answer" | "Select all that apply";
  questionIndex: number;
  questionTotal: number;
  options: ClarificationOption[];
  submitLabel: string;
}

// ── Completed content per type ─────────────────────────────────────────
export interface BookContent {
  title: string;
  subtitle?: string;
  chapters: Array<{ id: string; title: string; thumbnailUrl?: string }>;
  coverImageUrl?: string;
  pdfUrl?: string;
  fileSize?: string;
  pageCount?: number;
  qualityChecks?: string[];
}

export interface WebsiteContent {
  name: string;
  url: string;
  html: string;
  previewUrl?: string;
  qualityChecks?: string[];
}

export interface ArtContent {
  title: string;
  formats: string[];
  svgCode?: string;
  previewUrl?: string;
  qualityChecks?: string[];
}

export interface GameContent {
  title: string;
  url?: string;
  html: string;
  previewUrl?: string;
  qualityChecks?: string[];
}

// ── Message union ──────────────────────────────────────────────────────
export type UserMessage = {
  id: string;
  role: "user";
  content: { text: string };
  timestamp: Date;
};

export type AssistantMessage = {
  id: string;
  role: "assistant";
  timestamp: Date;
  status: MessageStatus;
  buildingContent?: BuildingContent;
  successMessage?: string;
  successSubtext?: string;
  error?: string;
} & (
  | { type: "text"; content: { markdown: string } }
  | { type: "clarification"; content: ClarificationContent }
  | { type: "book"; content?: BookContent }
  | { type: "website"; content?: WebsiteContent }
  | { type: "art"; content?: ArtContent }
  | { type: "game"; content?: GameContent }
);

export type Message = UserMessage | AssistantMessage;
