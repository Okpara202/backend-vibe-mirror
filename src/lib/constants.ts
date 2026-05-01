import type { CreationType, Tier } from "@/types";

// ── Referral links ────────────────────────────────────────────────────
// TODO: Replace all href values with real TekAIDA affiliate tracking URLs
// before launch. Do not change labels or structure — only the href strings.
export const REFERRAL_LINKS = {
  claude: { label: "Claude", href: "#" },
  cursor: { label: "Cursor", href: "#" },
  chatgpt: { label: "ChatGPT", href: "#" },
  lovable: { label: "Lovable", href: "#" },
} as const;

// ── Frontend-owned success copy per creation type ──────────────────────
// `subtext` takes the renderer's `content` object and produces the line
// rendered under the success banner. `qualityChecks` still come from the
// backend — these strings are the celebratory copy only.
export const SUCCESS_MESSAGES: Record<
  CreationType,
  {
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subtext: (content: any) => string;
  }
> = {
  book: {
    message: "You made it. Nicely done",
    subtext: (c) =>
      `Your bedtime story is ready · ${c.chapters?.length ?? 0} chapters · ${c.pageCount ?? 0} pages`,
  },
  website: {
    message: "Your website is live",
    subtext: (c) => `${c.pageCount ?? 0} pages · ${c.url ?? ""}`,
  },
  art: {
    message: "Your poster is ready to print",
    subtext: (c) => c.formats?.join(" · ") ?? "",
  },
  game: {
    message: "Your game is ready to play",
    subtext: () => "",
  },
};

// ── Tier features ──────────────────────────────────────────────────────
// TODO: confirm exact shape with stakeholders when the upgrade flow / pricing
// page consumes this. Keeping it minimal for now so unrelated work isn't
// blocked.
export const TIER_FEATURES: Record<
  Tier,
  { label: string; monthlyTokens: number; features: string[] }
> = {
  free: { label: "Free", monthlyTokens: 0, features: [] },
  beginner: { label: "Beginner", monthlyTokens: 0, features: [] },
  pro: { label: "Pro", monthlyTokens: 0, features: [] },
};
