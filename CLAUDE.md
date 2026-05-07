# CLAUDE.md — VibeCraft Frontend

### Last updated: 2026-05-07

This file is the single source of truth for all frontend work on VibeCraft.
Read it fully at the start of every session before writing any code.

---

## WHO YOU ARE AND WHAT THIS PROJECT IS

You are the AI coding assistant for the VibeCraft frontend — a Next.js 16 (App Router) + React 19 + Tailwind v4 chat-style AI creation platform. Users describe what they want to make (websites, books, games, art) and the AI builds it for them.

**Team:** Favour (FE) · Kingsley (BE) · Debby (PD) · Aku (PM) · Precious (QA) · Chinedu (MKT)
**Web launch:** 5 June 2026 · **Mobile launch:** 3 July 2026
**Repo:** TekAIDA / vibecraft-frontend · Branch: main

---

## BEFORE YOU WRITE ANY CODE

1. **Read the actual files first.** Never assume from training data.
   - `src/app/globals.css` — all CSS variables and tokens
   - `src/components/ui/Typography.tsx` — every variant name exactly as written
   - `src/components/ui/button.tsx` — two variants only, asChild pattern
   - `src/components/ui/Input.tsx` / `TextArea.tsx` — RHF-compatible form primitives
   - `src/app/(dashboard)/layout.tsx` — route-group shell, sidebar collapse logic
   - `src/app/(dashboard)/dashboard/_components/DashboardChat.tsx` — dashboard-page client wrapper
   - `src/app/(dashboard)/_components/LeftDashboardSvgIcons.tsx` — shared sidebar/header icons
   - `src/store/ui-store.ts` — `mobileSidebarOpen`, `desktopSidebarCollapsed`, `upgradeModalOpen`
   - Any file you are about to modify — always read before writing

2. **Check the build order table (section 10)** to know what's done and what's next.

3. **Flag discrepancies.** If something in the codebase differs from this document — flag it, don't silently override either.

4. **150-line hard ceiling per file.** If a new feature pushes a file over 150 lines, split it before reporting work as done. Patterns already in use: custom hooks for state/side-effects, child components for cohesive JSX blocks, sub-folders named after the parent (`input/`, `preview/`, `clarification/`). Run `wc -l` on every file you create or modify.

---

## 1. TECH STACK

|                     |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| Framework           | Next.js 16.2.4 App Router                                        |
| Language            | TypeScript strict, path alias `@/*` → `./src/*`                  |
| Styling             | Tailwind CSS v4 (`@theme inline` syntax — no config files)       |
| Components          | shadcn/ui + Radix UI primitives                                  |
| State               | Zustand                                                          |
| HTTP                | Axios (`withCredentials: true`)                                  |
| Forms               | react-hook-form                                                  |
| Markdown            | react-markdown + remark-gfm                                      |
| Syntax highlighting | react-syntax-highlighter (Prism)                                 |
| Icons               | lucide-react `^1.11.0` (unusual versioning — not standard 0.4xx) |
| Animation           | tw-animate-css                                                   |
| Auth                | HttpOnly cookie set by backend, read by Next.js middleware       |

---

## 2. DESIGN SYSTEM — NON-NEGOTIABLE

### Never hardcode hex values

Use CSS tokens and Tailwind classes only. Two documented exceptions exist — see bottom of this section.

### Color tokens (defined in `src/app/globals.css`)

| Token                      | Light   | Dark    | Use                                  |
| -------------------------- | ------- | ------- | ------------------------------------ |
| `bg-canvas`                | #f7f6f3 | #141311 | page background                      |
| `bg-surface`               | #ffffff | #1e1d1a | card background                      |
| `border-subtle`            | #edece8 | #2a2926 | borders and dividers                 |
| `text-primary`             | #1a1917 | #f5f4f1 | primary text                         |
| `text-secondary`           | #7c7b74 | #b5b4ae | secondary text                       |
| `text-muted`               | #a3a29a | #7c7b74 | muted / helper text                  |
| `text-brand` / `bg-brand`  | #f27a1a | #f27a1a | brand orange                         |
| `bg-hover`                 | #fff7f0 | #fff7f0 | peach wash — **same in both themes** |
| `bg-success`               | #edfaf3 | #edfaf3 | quality check card bg                |
| `bg-accent`                | #f5f0ff | #f5f0ff | light purple accent                  |
| `bg-sidebar-fill`          | #ffffff | #1e1d1a | sidebar background                   |
| `bg-sidebar-fill-active`   | #fff7f0 | #fff7f0 | active/hover sidebar row             |
| `text-sidebar-active-link` | #d45e0a | #d45e0a | active nav link                      |
| `text-sidebar-link-text`   | #686867 | #b5b4ae | inactive nav link                    |
| `text-icon-secondary`      | #686867 | #b5b4ae | inactive icon                        |
| `bg-chat-user-fill`        | #ffffff | #2a2926 | user message bubble bg               |
| `border-chat-user-border`  | #dddcd6 | #3d3c38 | user message bubble border           |
| `text-chat-user-text`      | #2a2926 | #f5f4f1 | user message text                    |

⚠️ `bg-hover` is identical in light and dark. Text on `bg-hover` must use `text-brand` — never `text-primary`. Applies to: SuccessBanner, selected ClarificationForm options, InputBar focus states.

**Only two hardcoded hex values permitted in the entire codebase:**

- `bg-[#1e2a4a]` — dark navy chapter cards in ProgressCard (Figma spec)
- `bg-[#1e1d1a]` — code panel background in PreviewPanel, TextRenderer, SyntaxHighlighter

### Typography

Always use `<Typography>` from `src/components/ui/Typography.tsx`. Never raw `<h1>/<p>/<span>`.

**Exception — react-markdown component overrides in TextRenderer only:** `react-markdown` gives raw HTML elements to override. Wrapping them in `<Typography>` causes nested block elements (invalid HTML). In this one file, apply the equivalent Tailwind classes directly — same fonts, sizes, weights, tokens as the Typography variants, just as className strings. Never invent new styles.

| Variant               | Use for                    | Notes                                                            |
| --------------------- | -------------------------- | ---------------------------------------------------------------- |
| `display-hero`        | Hero headings              | Instrument Serif, centered                                       |
| `display-page`        | Page titles                | Instrument Serif, centered                                       |
| `display-section`     | Section titles             | Instrument Serif, centered                                       |
| `heading-h1`          | Renderer card titles       | Geist medium                                                     |
| `heading-h3`          | Section headings           | **text-center baked in** — override with `className="text-left"` |
| `heading-h4`          | Sub-section labels         | **text-center baked in** — override with `className="text-left"` |
| `label-lg`            | Tab labels                 | Geist medium                                                     |
| `label-md`            | Option titles, body labels | Geist medium                                                     |
| `label-sm`            | Tags, pills, stage labels  | Geist medium                                                     |
| `body-sm`             | All paragraph text         | Geist regular                                                    |
| `caption-default`     | Timestamps, metadata       | Geist regular                                                    |
| `caption-mono`        | URLs, file names           | JetBrains Mono                                                   |
| `code-md` / `code-sm` | Code content               | JetBrains Mono                                                   |

**`heading-h2` does not exist.** Markdown `##` maps to `heading-h3` in TextRenderer overrides.

### Button

Two variants only: `default` (orange fill) and `outline` (bordered neutral).

```tsx
// Link-styled button
<Button asChild variant="outline">
  <a href={url} target="_blank" rel="noopener noreferrer">
    Label
  </a>
</Button>
```

### Form primitives

`Input` (`src/components/ui/Input.tsx`) and `TextArea` (`src/components/ui/TextArea.tsx`) are the RHF-compatible primitives. Both:

- Use `forwardRef` so `register()` from react-hook-form attaches its ref directly.
- Accept `label`, `placeholder`, `error: FieldError`, `className`, plus all native input/textarea attributes.
- Auto-derive `id` from the label (lowercased, spaces → dashes) for `htmlFor` if no `id` is provided.
- Share the same border/focus/error visuals: `border-[0.5px] border-border-default`, `focus:border-[#F27A1A]`, error red `#D93B3B`.
- `TextArea` adds `rows={5}` default, `resize-y`, and `min-h-[125px]` so the user cannot shrink below 5 rows of `text-sm leading-5` content.

Use these — never raw `<input>` / `<textarea>`.

### Icons

- Dashboard icons → `LeftDashboardSvgIcons.tsx`
- Chat/renderer icons → lucide-react
- Verified present: Plus, Mic, Square, ChevronDown, Code2, Monitor, Smartphone, Tablet, X, Menu, FileText, Check, RotateCcw, ThumbsUp, ThumbsDown, Copy, MoreHorizontal

### Utility

`cn()` from `src/lib/utils.ts` for all conditional class merging.

---

## 3. FILE STRUCTURE — CURRENT STATE

### Do not touch

```
src/app/(marketplace)/**    ← read-only. You may IMPORT from here, never modify
src/app/(auth)/**           ← read-only
src/app/globals.css         ← only modify with explicit user instruction
src/components/ui/**        ← do not modify existing primitives. Adding NEW primitives is OK only when explicitly authorized
src/lib/utils.ts            ← do not modify
```

`HeroTextArea.tsx` is the one marketplace file that's been replaced (step 21) — it now mounts the shared `ChatComposer`. All other marketplace files remain read-only.

### UI primitives — `src/components/ui/`

```
src/components/ui/
├── button.tsx              ✅ two variants (default / outline) + asChild
├── ChatPageBackground.tsx  ✅ decorative SVG/gradient backdrop
├── DotTextTag.tsx          ✅ pill with leading colored dot — used by RightHeader for creation-type tag
├── Input.tsx               ✅ RHF-compatible text input (see section 2 — Form primitives)
├── Logo.tsx                ✅ VibeCraft brand mark
├── NavLinks.tsx            ✅ marketplace header nav links
├── TextArea.tsx            ✅ RHF-compatible textarea, min 5 rows (added 2026-05-07)
├── ThemeToggle.tsx         ✅ light/dark switcher (uses ThemeProvider)
├── tier-gate.tsx           ✅ <TierGate> + <UpgradePrompt> — section 14
└── Typography.tsx          ✅ all text. Never raw <h1>/<p>/<span>.
```

### Theme provider

```
src/providers/ThemeProvider.tsx   ← wraps the app in src/app/layout.tsx (root layout)
```

### Dashboard route group — built, do not recreate

The `(dashboard)` route group has a lifted layout that wraps every route inside it (`/dashboard`, `/chat`, future routes). Layout-level shared UI lives in `(dashboard)/_components/`. Page-scoped UI lives in the per-route `_components/` folder.

```
src/app/(dashboard)/
├── layout.tsx                        ✅ route-group shell (client) — conditionally renders desktop aside based on desktopSidebarCollapsed
├── _components/                      ✅ SHARED layout-level UI (mounted by layout)
│   ├── ChatProjectsHeader.tsx        ✅ shared title-row used by /chat and /projects (responsive: stacks on <sm)
│   ├── LeftDashboard.tsx             ✅ sidebar shell
│   ├── LeftDashboardSvgIcons.tsx     ✅ all sidebar/header SVG icons — import from here
│   ├── MobileSidebarDrawer.tsx       ✅ <lg slide-in drawer
│   ├── MobileSidebarTrigger.tsx      ✅ fixed top-left ToggleLeftSideBar button — opens drawer <lg, expands sidebar lg+ when collapsed
│   ├── OwnersDetails.tsx             ✅ click-to-open dropdown
│   ├── Recents.tsx                   ✅ wired to conversations-store
│   ├── SideBarLink.tsx               ✅ active-aware nav (Home / Chat / Search / Projects)
│   ├── SidebarCollapseToggle.tsx     ✅ ToggleLeftSideBar inside LeftDashboard's top bar — closes drawer <lg, collapses sidebar lg+
│   ├── UpgradeModal.tsx              ✅ full-screen dialog wrapping Pricing — mounted in layout, opened via ui-store
│   └── UpgradeProBadge.tsx           ✅ sidebar CTA wrapper
├── chat/
│   ├── _components/
│   │   └── ChatHistory.tsx           ✅ static chat list (mock data — TODO wire to backend)
│   └── page.tsx                      ✅ chat list — uses ChatProjectsHeader + ChatHistory
├── new-project/
│   └── page.tsx                      ✅ create-project form — Input + TextArea + Cancel/Create buttons
├── projects/
│   ├── _components/
│   │   └── ProjectHistory.tsx        ✅ static project grid (mock data — TODO wire to backend)
│   └── page.tsx                      ✅ projects list — uses ChatProjectsHeader + ProjectHistory
└── dashboard/
    ├── page.tsx                      ✅ renders RightHeader + DashboardChat
    └── _components/                  ✅ DASHBOARD-PAGE-ONLY UI
        ├── DashboardChat.tsx         ✅ client wrapper, mode switching
        ├── DemoControls.tsx          ✅ DEV ONLY — delete before launch
        ├── InputBar.tsx              ✅ thin shell — picks new vs conversation, mounts ChatComposer
        └── RightHeader.tsx           ✅ page header (chat title + type tag) — dashboard route only; mobile-trigger lives in shared layout, not here
```

**Why RightHeader sits here, not in the shared `_components/`:** the chat title + creation-type tag + mobile hamburger only make sense on the `/dashboard` chat surface. `/chat` (and future routes) render their own header. RightHeader's import for `LeftDashboardSvgIcons` reaches up two levels to `../../_components/LeftDashboardSvgIcons`.

**UpgradeModal:** opened via `useUIStore.setUpgradeModalOpen(true)` from anywhere (sidebar `UpgradeProBadge`, `OwnersDetails`, `TierGate`'s `UpgradePrompt`). Mounted ONCE in the route-group layout so every route inside `(dashboard)` can open it.

### Shared chat input — built, do not recreate

```
src/components/chat/input/
├── ChatComposer.tsx          ✅ shared composer; reads selectedType from chat-store, calls onSend
├── InputComposer.tsx         ✅ presentational textarea + actions; accepts onSend / disabled / placeholder
├── InputActionsBar.tsx       ✅ attach + mic + send/stop row
├── TypePillSelector.tsx      ✅ creation-type pill row (new mode only)
├── AttachmentChips.tsx       ✅ pending attachment chips
├── VoiceWaveform.tsx         ✅ canvas waveform fed by AnalyserNode
├── speechRecognition.ts      ✅ Web Speech API adapter (types + ctor lookup)
├── useAttachments.ts         ✅ blob-URL lifecycle for pending uploads
└── useVoiceInput.ts          ✅ getUserMedia + AnalyserNode + MediaRecorder + buffered transcript
```

### Stores — all built

```
src/store/
├── auth-store.ts           ✅ user, tier, tokenBalance, referralEarnings
├── chat-store.ts           ✅ messages, status, isLoadingMessages, planMode, selectedType
├── conversations-store.ts  ✅ list, fetchAll stub, addToList (deduped), removeLocal
└── ui-store.ts             ✅ mobileSidebarOpen, desktopSidebarCollapsed, upgradeModalOpen
                               hook name is useUIStore (uppercase UI)
```

### Types — all built

```
src/types/
├── message.ts    ✅ full discriminated union — User + Assistant + UserAttachment
├── store.ts      ✅ all store interfaces including isLoadingMessages
└── index.ts      ✅ barrel re-export
```

### Infrastructure

```
src/lib/
├── api/index.ts    ✅ axios, withCredentials: true, 401 → /login
├── constants.ts    ✅ REFERRAL_LINKS (#placeholders), SUCCESS_MESSAGES, TIER_LABELS, TIER_FEATURES
└── utils.ts        ✅ cn() — do not modify

src/components/ui/tier-gate.tsx  ✅ TierGate + UpgradePrompt (step 23)

src/middleware.ts   ⏸ DEFERRED — needs backend cookie name
```

### Chat components — all built

```
src/components/chat/
├── AssistantMessage.tsx         ✅ dispatcher with error/missing-content fallback
├── ConversationSkeleton.tsx     ✅ wired to isLoadingMessages
├── MessageList.tsx              ✅
├── ThinkingIndicator.tsx        ✅ motion-reduce safe
├── UserMessage.tsx              ✅ right-aligned 60% bubble
└── renderers/
    ├── ArtRenderer.tsx          ✅
    ├── BookRenderer.tsx         ✅
    ├── ClarificationForm.tsx    ✅ post-submit lock
    ├── GameRenderer.tsx         ✅
    ├── TextRenderer.tsx         ✅ react-markdown + Prism syntax highlighting (oneDark theme)
    ├── WebsiteRenderer.tsx      ✅
    ├── clarification/
    │   └── ClarificationOptionCard.tsx  ✅
    └── shared/
        ├── ActionBar.tsx        ✅ textToCopy prop
        ├── ImageWithFallback.tsx ✅
        ├── PreviewPanel.tsx     ✅ full-screen overlay, ESC, focus mgmt
        ├── ProgressCard.tsx     ✅ stage pipeline + substep grid
        ├── QualityCheckCard.tsx ✅
        ├── ReferralLinks.tsx    ✅ 4-link grid
        ├── RendererShell.tsx    ✅
        ├── SuccessBanner.tsx    ✅
        └── preview/
            ├── PreviewContent.tsx       ✅
            ├── PreviewHeader.tsx        ✅
            └── PreviewToolbarButtons.tsx ✅
```

---

## 4. ARCHITECTURE — LOCKED DECISIONS

### Renderer pipeline

```
chat-store.messages
  ↓
MessageList (w-[90%] md:w-[80%] lg:w-[60%])
  ↓
  user      → UserMessage (right-aligned bubble, chat-user-* tokens)
  assistant → AssistantMessage dispatcher
                ↓
                if status=error OR (complete AND book/website/art/game AND no content):
                  → destructive error card + "Try again" button
                else switch(type):
                  text          → TextRenderer
                  clarification → ClarificationForm
                  book          → BookRenderer
                  website       → WebsiteRenderer
                  art           → ArtRenderer
                  game          → GameRenderer
                                    ↓ each handles: thinking | building | complete
```

### Per-renderer states

- **thinking** → `<ThinkingIndicator />`
- **building** → `RendererShell` + `ProgressCard`
- **complete** → optional `SuccessBanner` + optional `QualityCheckCard` + `RendererShell`

### Stage names per type

| Type    | Stages                                         |
| ------- | ---------------------------------------------- |
| book    | Outline → Writing → Illustrating → Layout → QA |
| website | Planning → Coding → Styling → Content → QA     |
| art     | Brief → Exploring → Rendering → Polishing → QA |
| game    | Designing → Coding → Testing → Balancing → QA  |

### RendererShell dot colors

All three states render as brand orange. `"building"` adds `animate-pulse motion-reduce:animate-none`. Green from `--success` is for QualityCheckCard background only.

### GameRenderer

No SuccessBanner or QualityCheckCard by default. Only shows QualityCheckCard if backend sends `qualityChecks`.

### PreviewPanel

Always full-screen overlay. Desktop split-view is a future additive refactor.

### ActionBar copy text

- book: `${title}\n${subtitle}\n${pdfUrl}`
- website: `${name}: ${url}`
- art: `${title} (${formats.join(', ')})`
- game: `${title}: ${url}`
- text: full markdown

### updateMessage cast

Uses `{ ...m, ...patch } as typeof m`. Only patch shared fields. To change `type` or `content`, use `addMessage` instead.

### Success copy

Frontend owns success strings via `SUCCESS_MESSAGES`. `qualityChecks` are backend-owned — if absent, skip QualityCheckCard entirely.

### Responsive widths

AI messages, user bubbles, InputBar conversation mode: `w-[90%] md:w-[80%] lg:w-[60%]`
InputBar new mode: `w-full max-w-[580px]`

### bg-hover dark mode

`bg-hover` is identical in both themes. Text on it must use `text-brand` — never `text-primary`.

### Voice input model

Record → stop → transcribe. Never live-transcription. Transcript always appends to existing textarea value, never replaces. See section 11.

### Marketplace → dashboard flow

Message is saved to `sessionStorage` on send under key `vibecraft_pending_message`. `DashboardChat` reads + clears it on mount and fires the message. Auth check via `useAuthStore` (logged-out users go via `/login?next=/dashboard`). See section 12.

---

## 5. TYPE DEFINITIONS

### `src/types/message.ts`

```ts
export type CreationType = "website" | "game" | "book" | "art";
export type MessageStatus = "thinking" | "building" | "complete" | "error";

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

export interface UserAttachment {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  previewUrl?: string; // blob URL while pending; backend URL once uploaded
}

export type UserMessage = {
  id: string;
  role: "user";
  content: { text: string; attachments?: UserAttachment[] };
  timestamp: Date;
};

export type AssistantMessage = {
  id: string;
  role: "assistant";
  timestamp: Date;
  status: MessageStatus;
  buildingContent?: BuildingContent;
  successMessage?: string; // set by frontend after verification ping
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
```

---

## 6. CONSTANTS (`src/lib/constants.ts`)

```ts
// TODO: Replace all # values with real TekAIDA affiliate URLs before launch
export const REFERRAL_LINKS = {
  claude: { label: "Claude", href: "#" },
  cursor: { label: "Cursor", href: "#" },
  chatgpt: { label: "ChatGPT", href: "#" },
  lovable: { label: "Lovable", href: "#" },
};

export const SUCCESS_MESSAGES: Record<
  CreationType,
  {
    message: string;
    subtext: (content: any) => string;
  }
> = {
  book: {
    message: "You made it. Nicely done",
    subtext: (c) =>
      `Your story is ready · ${c.chapters?.length ?? 0} chapters · ${c.pageCount ?? 0} pages`,
  },
  website: {
    message: "Your website is live",
    subtext: (c) => `${c.pageCount ?? 0} pages · ${c.url}`,
  },
  art: {
    message: "Your poster is ready to print",
    subtext: (c) => c.formats?.join(" · ") ?? "",
  },
  game: { message: "Your game is ready to play", subtext: (_) => "" },
};

// Display labels — presentation only. Feature gating lives in TIER_FEATURES.
export const TIER_LABELS: Record<Tier, string> = {
  free: "Free",
  beginner: "Beginner",
  pro: "Pro",
};

// UI-side feature flags. Backend enforces real access control.
export const TIER_FEATURES = {
  free: {
    canUseBuildAgent: false,
    canUseAutonomousAgent: false,
    canAccessMonetisation: false,
  },
  beginner: {
    canUseBuildAgent: true,
    canUseAutonomousAgent: false,
    canAccessMonetisation: false,
  },
  pro: {
    canUseBuildAgent: true,
    canUseAutonomousAgent: true,
    canAccessMonetisation: true,
  },
} as const satisfies Record<Tier, Record<string, boolean>>;
```

---

## 7. COMPLETION VERIFICATION (implement when backend is ready)

```ts
async function verifyOutput(
  content: BookContent | WebsiteContent | ArtContent | GameContent,
) {
  const urlToCheck =
    "pdfUrl" in content
      ? content.pdfUrl
      : "previewUrl" in content
        ? content.previewUrl
        : null;

  if (!urlToCheck) return "verified";

  try {
    const res = await fetch(urlToCheck, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    });
    return res.ok ? "verified" : "soft-fail";
  } catch {
    return "soft-fail";
  }
}
```

- `"verified"` → show full SuccessBanner + QualityCheckCard
- `"soft-fail"` → show `"Almost ready"` banner + `<Button variant="outline">Report an issue</Button>`

Currently: banner shows immediately on `status === "complete"`. Implement ping once backend URL timing is confirmed.

---

## 8. TESTING (no backend)

Use `DemoControls.tsx` — floating dropdown, visible only at lg+.

Scenarios: Thinking / Text reply / Clarification (single) / Clarification (multi) / Book building / Book complete / Website building / Website complete / Art complete / Game complete / Error

Other: Seed recents / Reset chat

Responsive: browser devtools at 375px / 768px / 1280px

A11y: Tab into PreviewPanel → focus trapped · ESC closes PreviewPanel and MobileSidebarDrawer · Emulate prefers-reduced-motion → animations freeze

**Before launch:** delete `DemoControls.tsx` + remove its import and `<DemoControls />` from `DashboardChat.tsx`.

---

## 9. OPEN ITEMS

### Open frontend decisions

| Item                         | Notes                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| **Voice transcription path** | Web Speech API fails on Brave + on Windows machines with Online Speech off. Pick: Web Speech (with hide-on-Firefox + runtime error UI) / Transformers.js Whisper / backend Whisper / OpenAI route. See section 11. |

### Blocked on backend

| Item                         | Notes                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `src/middleware.ts`          | Protect `/dashboard/:path*`. Cookie name TBD. Do NOT add auth guard to layout.tsx  |
| Streaming text renderer      | TextRenderer assumes complete content. Rewrite when backend confirms stream format |
| Completion verification ping | Pattern in section 7                                                               |
| ActionBar like/dislike       | console.log stubs — wire to feedback API                                           |
| File upload to backend       | Attachments captured client-side, backend upload is TODO                           |

### Known non-issues — do not fix

- Theme toggle covers InputBar on small screens — pre-existing
- PreviewPanel always full-screen — split-view is future refactor
- RTL/i18n — not on roadmap
- react-markdown XSS — safe by default, do NOT add rehype-raw

---

## 10. BUILD ORDER — CURRENT STATUS

| #    | Step                                                     | Status                            |
| ---- | -------------------------------------------------------- | --------------------------------- |
| 1–16 | Layout, types, stores, renderers, wiring                 | ✅ all done                       |
| 17   | ConversationSkeleton wiring                              | ✅ done                           |
| 18   | OwnersDetails dropdown                                   | ✅ done                           |
| 19   | Upgrade modal                                            | ✅ done                           |
| 20   | Voice waveform + record-then-transcribe                  | 🔧 code shipped but mic broken in practice — see section 11 |
| 21   | Shared ChatComposer + marketplace flow                   | ✅ done — notes in section 12     |
| 22   | TextRenderer — syntax highlighting + markdown formatting | ✅ done — notes in section 13     |
| 23   | TierGate component                                       | ✅ done — notes in section 14     |
| 24   | Lifted dashboard layout + `_components/` split + chat route stub | ✅ done — notes in section 15 |
| 25   | `/chat`, `/projects`, `/new-project` pages + sidebar collapse on lg+ | ✅ done — notes in section 16 |
| —    | Middleware                                               | ⏸ backend dependency              |
| —    | Streaming renderer                                       | ⏸ backend dependency              |
| —    | Completion ping                                          | ⏸ backend dependency              |
| —    | Feedback API                                             | ⏸ backend dependency              |

---

## 11. NOTES — Voice waveform + record-then-transcribe (step 20)

**Status: 🔧 implementation done, but voice transcription is broken in practice — pending architecture decision before next session continues.** Behaviour intent: record → stop → transcribe; transcript always appends to existing textarea value, never replaces. While recording, the textarea hides (`hidden` class, value preserved) and `<VoiceWaveform>` renders in its place.

### ⚠️ OPEN ITEM — fix the mic, decide Web Speech vs Whisper

Tested 2026-05-04 on Brave and Edge / Windows 11. Mic capture and waveform animation work. Transcript never appears in the textarea. Console diagnostics narrowed it to the Web Speech API cloud call failing:

- **Brave:** `error: aborted` — Brave's privacy shield blocks Chromium's cloud speech service by default.
- **Edge (same machine):** `error: network` — Windows 11's `Privacy & security → Speech → Online speech recognition` toggle is off; all Chromium browsers on that machine inherit the failure.
- **Firefox:** unsupported entirely (no `webkitSpeechRecognition` constructor).

**Open question for next session:** which transcription backend?

| Option | Frontend-only? | Reliability | First-load cost | Quality |
| --- | --- | --- | --- | --- |
| **Web Speech API + hide-mic-on-Firefox + inline error on runtime fail** | ✅ no backend | ❌ fails on Brave default, Windows speech off, Firefox, corporate firewalls | none | good when it works |
| **Transformers.js + `Xenova/whisper-tiny.en` (chunked or post-stop)** | ✅ no backend, no API key | ✅ uniform across browsers/OS | ~75 MB model download on first mic click (cached after) | good for short English prompts |
| **Backend Whisper endpoint** (the original CLAUDE.md plan) | ❌ requires Kingsley to ship `/transcribe` | ✅ uniform | none | full Whisper quality |
| **OpenAI Whisper API via Next.js route handler** | ❌ adds an `OPENAI_API_KEY` to manage; route is throwaway when backend lands | ✅ uniform | none | full Whisper quality |

User leaning recorded as of this session: discussing all three. **Do not pick one before checking with the user — this is a product/architecture decision, not a code one.** Once chosen, the cleanup work changes meaningfully:

- If Web Speech API: tighten `isSupported` to also require the constructor (hide mic on Firefox), add `isTranscribing` state + a small loader between stop and `recognition.onend`, surface an inline error on runtime `error` events, **delete the MediaRecorder + chunks wiring entirely** (dead code under this path).
- If Transformers.js: keep MediaRecorder, drop SpeechRecognition entirely, lazy-load `@huggingface/transformers` on first mic click, transcribe the assembled blob in a worker, show a "Loading voice model…" indicator on first run.
- If a backend route: keep MediaRecorder, drop SpeechRecognition, post the blob to the route, show a loader.

### ⚠️ Temporary verification code currently in useVoiceInput.ts

`useVoiceInput.ts` currently auto-downloads a `.webm` of the recorded audio on stop (search for `// TEMP — verification only`). Added 2026-05-04 to confirm `MediaRecorder` produces a valid blob before committing to a transcription path. **Remove when transcription path is decided** — together with the helper `downloadRecording` and the `recorder.onstop` hook + the closure-captured `localChunks` array.

### Files

- `src/components/chat/input/useVoiceInput.ts` — `getUserMedia` + `AudioContext` + `AnalyserNode` (fftSize 256) + `MediaRecorder`. Exposes `{ isRecording, isSupported, analyser, error, start, stop }`. SSR-safe; `isSupported` only flips true after mount once `navigator.mediaDevices?.getUserMedia` and `MediaRecorder` are confirmed.
- `src/components/chat/input/speechRecognition.ts` — Web Speech API types + vendor-prefixed ctor lookup, extracted so `useVoiceInput.ts` stays under the 150-line ceiling.
- `src/components/chat/input/VoiceWaveform.tsx` — canvas (`width: 100%`, `height: 40px`), reads `getByteTimeDomainData` in a RAF loop, single centre line stroked with `--brand`. Cancels RAF on unmount. Under `prefers-reduced-motion` it draws one static flat line and skips the loop. Canvas internal resolution is synced to `clientWidth/clientHeight * devicePixelRatio` for crisp rendering.
- `InputActionsBar.tsx` — mic button toggles `voice.start()` / `voice.stop()`. Recording visual is `bg-brand text-white shadow-md` plus two `animate-ping` rings (`bg-brand/40` and `bg-brand/25` with `0.6s` delay), both `motion-reduce:animate-none`.

### ⚠️ Web Speech API workaround — important

The original spec called for transcribing the recorded `Blob` via "Web Speech API in one-shot mode" after stop. **The Web Speech API cannot transcribe a recorded blob — it only listens to the live mic.** To preserve the user-visible record→stop→transcribe behaviour, the implementation runs `SpeechRecognition` (`continuous: true`, `interimResults: false`) **concurrently with `MediaRecorder`**, buffering finals into a ref and emitting the joined transcript through `onTranscript` from `MediaRecorder.onstop`. The recorded chunks are kept ready for a real Whisper backend swap (marked `// TODO: swap for Whisper endpoint when backend is ready`). Don't be surprised that two mic consumers exist concurrently — that's the workaround, not a bug. When the backend ships Whisper, drop the `SpeechRecognition` block and post the assembled blob from `chunksRef` to the endpoint.

### Cleanup

`stop()` stops `SpeechRecognition` and `MediaRecorder`; `onstop` calls a single `cleanup()` that stops media tracks, closes the `AudioContext`, and clears all refs. The hook's unmount effect calls the same `cleanup()`.

---

## 12. NOTES — Shared ChatComposer + marketplace flow (step 21)

**Status: ✅ implemented.**

### Component split

- **`ChatComposer`** (`src/components/chat/input/ChatComposer.tsx`) — props: `{ mode: "new" | "conversation", onSend({ text, attachments, type }), disabled?, placeholder? }`. Reads `selectedType` from `useChatStore`, forwards it on send, renders `<TypePillSelector>` only in `mode === "new"`. The new-mode wrapper centres a `max-w-[580px]` column; conversation-mode wraps in a `bg-canvas px-4 py-3` strip.
- **`InputComposer`** is now presentational — accepts `onSend` / `disabled` / `placeholder`, owns local textarea / attachments / voice state only. **No direct chat-store coupling.** `disabled` controls `canSend` and the conversation-mode stop button.
- **`InputBar.tsx`** (dashboard) is a thin wrapper: reads `messages` / `addMessage` / `status` from `useChatStore`, derives `mode`, calls `addMessage` from its `handleSend`, and disables when `status` is `building` or `streaming`.
- **`HeroTextArea.tsx`** (marketplace) saves the payload to `sessionStorage` under `vibecraft_pending_message`, then `router.push`es to `/dashboard` (logged in) or `/login?next=/dashboard` (logged out).
- **`DashboardChat.tsx`** runs an effect on mount that reads + clears `sessionStorage`, calls `setSelectedType(payload.type)` if present, and dispatches the message via `addMessage`. Wrapped in `try/catch` for malformed payloads. Marked `// TODO: auto-fire AI call when backend is ready`.

### Flow

```
Marketplace send
  → save to sessionStorage[vibecraft_pending_message]
  → authenticated? → /dashboard → DashboardChat reads + clears storage → fires message
  → not auth?     → /login?next=/dashboard → login → middleware → /dashboard → same
```

---

## 13. NOTES — TextRenderer syntax highlighting + markdown formatting (step 22)

**Status: ✅ implemented.** `react-syntax-highlighter` and `@types/react-syntax-highlighter` are installed; `TextRenderer.tsx` provides full `components` overrides for `react-markdown`.

### Key decisions

- **Why className strings, not `<Typography>`:** wrapping `react-markdown`'s raw HTML (h1/p/li/etc.) in `<Typography>` would nest block elements (invalid HTML). All overrides apply equivalent Tailwind classes directly using design-system tokens (`text-primary`, `text-secondary`, `text-muted`, `bg-subtle`, `border-brand`, `border-subtle`, etc.).
- **Code blocks:** Prism via `react-syntax-highlighter` with the `oneDark` theme (warm dark background with orange tones that complement `--brand`). The override detects `language-(\w+)` from `className`; if absent, renders an inline `<code>` with `bg-subtle` + `font-code`.
- **Headings:** `h1/h2/h3/h4` map to Geist medium at design-system sizes. `h2` and below get `text-left` to override the centred Typography defaults that would otherwise apply if Typography were used.
- **Tables:** wrapped in a `overflow-x-auto` div so wide tables scroll instead of breaking layout.
- **Code panel hex:** `#1e1d1a` is one of the two documented hardcoded-hex exceptions (matches PreviewPanel/SyntaxHighlighter) — see section 2.

---

## 14. NOTES — TierGate component (step 23)

**Status: ✅ implemented.** Both `TierGate` and `UpgradePrompt` live in `src/components/ui/tier-gate.tsx`. UI concern only — backend enforces real access control.

### TIER_FEATURES — shape change

The previous `TIER_FEATURES` shape (`{ label, monthlyTokens, features }`) was replaced with feature flags (`canUseBuildAgent`, `canUseAutonomousAgent`, `canAccessMonetisation`). See section 6.

**Side effect:** `OwnersDetails.tsx` previously read `TIER_FEATURES[tier].label` — now updated to read from a new `TIER_LABELS` constant in `src/lib/constants.ts`. Keep label/feature concerns separate going forward.

### API

```ts
type Feature = keyof typeof TIER_FEATURES.free;
// "canUseBuildAgent" | "canUseAutonomousAgent" | "canAccessMonetisation"
// TypeScript catches misspelled feature names at compile time.
```

```tsx
// Block Free users; show upgrade CTA
<TierGate feature="canUseBuildAgent" fallback={<UpgradePrompt />}>
  <BuildAgentPanel />
</TierGate>

// No fallback — feature simply hidden for lower tiers
<TierGate feature="canAccessMonetisation">
  <MonetisationInsights />
</TierGate>
```

### UpgradePrompt

Renders a centred surface card with copy + "Upgrade to Pro" button. The button calls `useUIStore.setUpgradeModalOpen(true)`, which mounts the existing `UpgradeModal` (already wraps `Pricing`). Customise copy via the optional `message` prop.

### Full upgrade flow

```
User hits locked feature
  → TierGate renders UpgradePrompt
  → User clicks "Upgrade to Pro"
  → UpgradeModal opens (Pricing component)
  → User selects plan → payment (Week 8)
```

---

## 15. NOTES — Lifted dashboard layout + `_components/` split (step 24)

**Status: ✅ implemented on `feat/chat`.** The previous `(dashboard)/dashboard/layout.tsx` was lifted to `(dashboard)/layout.tsx` so a single shell wraps every route in the group (`/dashboard`, `/chat`, future routes). Old layout file deleted.

### What moved where

Layout-level shared UI moved from `(dashboard)/dashboard/_components/` → `(dashboard)/_components/`:

- `LeftDashboard`, `MobileSidebarDrawer` — directly mounted by the route-group layout
- `LeftDashboardSvgIcons`, `OwnersDetails`, `SideBarLink`, `Recents`, `UpgradeProBadge` — sidebar internals
- `UpgradeModal` — opened via `useUIStore` from anywhere in the group; mounted ONCE in the layout (previously mounted inside `DashboardChat`, which meant `/chat` couldn't open it)

Page-scoped UI stayed in `(dashboard)/dashboard/_components/`:

- `DashboardChat`, `InputBar`, `DemoControls`
- `RightHeader` — kept dashboard-page-only on purpose. The chat-title + creation-type tag + mobile hamburger only make sense on `/dashboard`. Now rendered by `dashboard/page.tsx` above `<DashboardChat />`, not by the layout. Its `LeftDashboardSvgIcons` import reaches up two levels: `../../_components/LeftDashboardSvgIcons`.

### Mobile sidebar trigger — resolved (2026-05-07)

`RightHeader` no longer owns the mobile sidebar trigger. A shared `MobileSidebarTrigger` lives in `(dashboard)/_components/` and is mounted in the route-group layout, so every dashboard route gets it on mobile.

- `fixed top-7 left-4 z-30` — sits at the top-left corner of the viewport, aligned vertically with the 78px header band on `/dashboard`. On routes without a header (e.g. `/chat`), it floats over `bg-canvas` at the same position. `z-30` is below `MobileSidebarDrawer`'s backdrop (`z-40`) and panel (`z-50`), so the drawer cleanly covers it when open.
- Uses the existing `ToggleLeftSideBar` icon from `LeftDashboardSvgIcons` (replacing the lucide `Menu` hamburger).
- Visibility: always on `<lg`; on `lg+` only when `desktopSidebarCollapsed` (extended in step 25 — see section 16).
- `RightHeader`'s padding adapts to the trigger's visibility — see section 16.

The `ToggleLeftSideBar` icon already shown inside `LeftDashboard`'s top bar is now wired via `SidebarCollapseToggle` — see section 16.

### `chat/page.tsx`

No longer a stub — see section 16.

---

## 16. NOTES — `/chat`, `/projects`, `/new-project` + sidebar collapse on lg+ (step 25)

**Status: ✅ implemented on `feat/chat`.**

### New routes

All three live inside `(dashboard)/` so they share the route-group layout (sidebar + drawer + mobile trigger + UpgradeModal):

- **`/chat`** — list view of past chats. Renders shared `ChatProjectsHeader` (title row + search input) above `chat/_components/ChatHistory.tsx` (single-column list, mock data).
- **`/projects`** — list view of projects. Same header, with `projects/_components/ProjectHistory.tsx` (responsive grid: `grid-cols-1 sm:grid-cols-2`, mock data).
- **`/new-project`** — create-project form: `Input` for project name, `TextArea` for description, Cancel/Create buttons. Uses the shared `<TextArea>` primitive (matches `<Input>` styling; min 5 rows via `rows={5}` + `min-h-[125px]`).

### Page wrappers — responsive top padding

All three page sections use `pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-{3xl|xl} space-y-5`. The `pt-20` reserves vertical room on `<lg` so the fixed `MobileSidebarTrigger` (top-7 left-4) doesn't collide with the page title; `lg:py-10` reverts to normal padding once the sidebar is expanded and the trigger is hidden.

### `ChatProjectsHeader` — responsive title row

Title + "New …" button stack on `<sm` (`flex flex-col gap-4`), side-by-side on `sm+` (`sm:flex-row sm:justify-between sm:items-center`). Button is `w-full sm:w-auto` so it spans the column on small screens.

### Sidebar collapse on lg+

New ui-store field `desktopSidebarCollapsed: boolean` (default `false`). Two interaction surfaces:

- **`SidebarCollapseToggle`** (inside `LeftDashboard`'s top bar, replaces the previously decorative `<ToggleLeftSideBar />`) — onClick fires both `setMobileSidebarOpen(false)` and `setDesktopSidebarCollapsed(true)`. The first applies on `<lg` (closes the drawer), the second on `lg+` (collapses the desktop aside). Whichever is active at the current viewport takes effect; the other is a no-op.
- **`MobileSidebarTrigger`** (fixed top-left) — onClick fires `setMobileSidebarOpen(true)` + `setDesktopSidebarCollapsed(false)`. Visibility: always on `<lg`; on `lg+` only when collapsed (`!desktopSidebarCollapsed && "lg:hidden"`).

The pattern of firing both setters from one handler avoids reading viewport size in JS — the CSS responsive classes already gate which sidebar is "active," so only the relevant state change has visual effect.

### Layout changes

`(dashboard)/layout.tsx` is now a client component (it reads `desktopSidebarCollapsed`). Two conditional classes:

- Desktop aside: `hidden` at base; adds `lg:block lg:basis-[23%]` only when not collapsed.
- Right aside (content): drops `lg:border-l` when collapsed (no left edge to border against).

### `RightHeader` padding

Adapts to whether the floating trigger is visible: `pl-12 pr-4` on `<lg` (always), and `lg:pl-12 lg:pr-6` when `desktopSidebarCollapsed`, otherwise `lg:px-6`. Without this, the chat title would slide under the trigger on lg+ collapsed.
