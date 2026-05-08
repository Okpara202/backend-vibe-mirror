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
   - `src/components/ui/Input.tsx` / `TextArea.tsx` — RHF-compatible primitives
   - `src/app/(dashboard)/layout.tsx` — route-group shell, sidebar collapse logic
   - `src/app/(dashboard)/dashboard/_components/DashboardChat.tsx` — client wrapper (accepts projectId / chatId)
   - `src/app/(dashboard)/_components/LeftDashboardSvgIcons.tsx` — shared sidebar/header icons
   - `src/store/ui-store.ts` — sidebar + project + modal state lives here
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
src/components/ui/**        ← design system primitives, do not modify
src/lib/utils.ts            ← do not modify
```

One permitted exception: `HeroTextArea.tsx` will be replaced by `ChatComposer` in step 21. All other marketplace files remain read-only.

### Dashboard route group — built, do not recreate

The `(dashboard)/` route group has a lifted client layout that wraps every route inside it. Layout-level shared UI lives in `(dashboard)/_components/`. Page-scoped UI lives in the per-route `_components/` folder. `[id]/layout.tsx` flips ui-store into project mode for both `/projects/:id` and `/projects/:id/chat/:chatId`.

```
src/app/(dashboard)/
├── layout.tsx                                  ✅ client shell — sidebar visibility, drawer, mobile trigger, UpgradeModal
├── _components/                                ✅ SHARED layout-level UI
│   ├── ChatProjectsHeader.tsx                  ✅ shared title-row used by /chat and /projects
│   ├── LeftDashboard.tsx                       ✅ sidebar shell
│   ├── LeftDashboardSvgIcons.tsx               ✅ all sidebar/header SVG icons — import from here
│   ├── MobileSidebarDrawer.tsx                 ✅ <lg slide-in drawer
│   ├── MobileSidebarTrigger.tsx                ✅ fixed top-left ToggleLeftSideBar — opens drawer / expands sidebar
│   ├── OwnersDetails.tsx                       ✅ click-to-open dropdown
│   ├── ProjectDevControls.tsx                  🔧 DEV ONLY — seeds projects/conversations/tier
│   ├── Recents.tsx                             ✅ two modes (global / project) via ui-store.sidebarMode
│   ├── SideBarLink.tsx                         ✅ active-aware nav (Home / Chat / Search / Projects)
│   ├── SidebarCollapseToggle.tsx               ✅ ToggleLeftSideBar inside LeftDashboard top bar
│   ├── UpgradeModal.tsx                        ✅ full-screen dialog wrapping Pricing — mounted by layout
│   ├── UpgradeProBadge.tsx                     ✅ sidebar CTA wrapper
│   └── devSeeds.ts                             🔧 DEV ONLY — seed factories for ProjectDevControls
├── chat/
│   ├── _components/ChatHistory.tsx             ✅ static chat list (mock — TODO wire to backend)
│   └── page.tsx                                ✅ uses ChatProjectsHeader + ChatHistory
├── dashboard/
│   ├── page.tsx                                ✅ renders RightHeader + DashboardChat
│   └── _components/
│       ├── BreadcrumbDropdown.tsx              ✅ project-chevron dropdown content (chats + other projects)
│       ├── DashboardChat.tsx                   ✅ accepts optional projectId / chatId props
│       ├── DemoControls.tsx                    🔧 DEV ONLY — chat-state scenario tester
│       ├── InputBar.tsx                        ✅ thin shell mounting ChatComposer
│       ├── ProjectBreadcrumb.tsx               ✅ [Project name ˅ ›] when activeProjectId is set
│       └── RightHeader.tsx                     ✅ chat title + type tag + breadcrumb (project mode only)
└── projects/
    ├── _components/ProjectHistory.tsx          ✅ reads project-store, links cards to /projects/:id
    ├── page.tsx                                ✅ uses ChatProjectsHeader + ProjectHistory
    ├── new/page.tsx                            ✅ react-hook-form + canCreateProject gate
    └── [id]/
        ├── layout.tsx                          ✅ awaits params, mounts ProjectScope effect
        ├── page.tsx                            ✅ → ProjectHome(projectId)
        ├── chat/[chatId]/page.tsx              ✅ → RightHeader + DashboardChat(projectId, chatId)
        └── _components/
            ├── CreationGrid.tsx                ✅ filters conversations-store by projectId; empty state
            ├── DeleteProjectModal.tsx          ✅ confirmation modal with real project name + count
            ├── InlineEditableText.tsx          ✅ click-to-edit; Enter commits, Escape cancels, blur commits
            ├── ProjectHeader.tsx               ✅ title + desc inline-editable + new chat + settings
            ├── ProjectHome.tsx                 ✅ orchestrator (project lookup, Free-tier nudge)
            ├── ProjectScope.tsx                ✅ effect: setActiveProjectId + setSidebarMode("project")
            └── ProjectSettingsMenu.tsx         ✅ rename / archive | unarchive / delete dropdown
```

**RightHeader is reused on both `/dashboard` and `/projects/:id/chat/:chatId`** even though its file lives in `dashboard/_components/`. The project chat page imports it via the `@/` alias. When `useUIStore.activeProjectId` is set (project routes only), RightHeader renders `ProjectBreadcrumb` ahead of the chat title; otherwise it renders the classic header.

**UpgradeModal:** mounted ONCE in the route-group layout. Opened via `useUIStore.setUpgradeModalOpen(true)` from anywhere — `UpgradeProBadge`, `OwnersDetails`, `TierGate`'s `UpgradePrompt`, `/projects/new` cap fallback, the Free-tier nudge inside `ProjectHome`.

### Shared chat input — after step 21 refactor

```
src/components/chat/input/
├── ChatComposer.tsx          ← new (step 21) — shared by marketplace + dashboard
├── InputComposer.tsx         ← moved from dashboard/_components/input/
├── InputActionsBar.tsx       ← moved
├── TypePillSelector.tsx      ← moved
├── AttachmentChips.tsx       ← moved
├── VoiceWaveform.tsx         ← new (step 20)
├── useAttachments.ts         ← moved
└── useVoiceInput.ts          ← rewritten (step 20)
```

### Stores — all built

```
src/store/
├── auth-store.ts           ✅ user, tier, tokenBalance, referralEarnings
├── chat-store.ts           ✅ messages, status, isLoadingMessages, planMode, selectedType, projectId
├── conversations-store.ts  ✅ list (ConversationMeta carries optional projectId), fetchAll stub, addToList (deduped), removeLocal
├── project-store.ts        ✅ projects, activeProject, addProject / updateProject / removeProject / setProjects
└── ui-store.ts             ✅ mobileSidebarOpen, desktopSidebarCollapsed, upgradeModalOpen,
                               activeProjectId, sidebarMode ("global" | "project")
                               hook name is useUIStore (uppercase UI)
```

### Types — all built

```
src/types/
├── message.ts    ✅ full discriminated union — User + Assistant + UserAttachment
├── project.ts    ✅ ProjectStatus, ProjectMeta, ProjectCreation
├── store.ts      ✅ all store interfaces, ConversationMeta with optional projectId
└── index.ts      ✅ barrel re-export
```

### Infrastructure

```
src/lib/
├── api/index.ts        ✅ axios, withCredentials: true, 401 → /login
├── constants.ts        ✅ REFERRAL_LINKS, SUCCESS_MESSAGES, TIER_LABELS, TIER_FEATURES (with maxProjects, hasProjectContext)
├── project-utils.ts    ✅ canCreateProject(tier, count) — count-based gate, NOT a TierGate flag
└── utils.ts            ✅ cn() — do not modify

src/components/ui/tier-gate.tsx   ✅ TierGate + UpgradePrompt (Feature type filtered to boolean keys only)

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
    ├── TextRenderer.tsx         ✅ react-markdown — update in step 22
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

Record → stop → transcribe. Never live-transcription. Transcript always appends to existing textarea value, never replaces. See section 14.

### Marketplace → dashboard flow

Message is saved to `sessionStorage` on send. Dashboard reads it on mount and fires it automatically. Auth check via `useAuthStore`. See section 15.

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

````ts
// TODO: Replace all # values with real TekAIDA affiliate URLs before launch
export const REFERRAL_LINKS = {
  claude:   { label: "Claude",   href: "#" },
  cursor:   { label: "Cursor",   href: "#" },
  chatgpt:  { label: "ChatGPT",  href: "#" },
  lovable:  { label: "Lovable",  href: "#" },
}

export const SUCCESS_MESSAGES: Record<CreationType, {
  message: string
  subtext: (content: any) => string
}> = {
  book:    { message: "You made it. Nicely done",      subtext: (c) => `Your story is ready · ${c.chapters?.length ?? 0} chapters · ${c.pageCount ?? 0} pages` },
  website: { message: "Your website is live",          subtext: (c) => `${c.pageCount ?? 0} pages · ${c.url}` },
  art:     { message: "Your poster is ready to print", subtext: (c) => c.formats?.join(" · ") ?? "" },
  game:    { message: "Your game is ready to play",    subtext: (_) => "" },
}

export const TIER_FEATURES = {
  free:     { canUseBuildAgent: false, canUseAutonomousAgent: false, canAccessMonetisation: false, maxProjects: 1,  hasProjectContext: false },
  beginner: { canUseBuildAgent: true,  canUseAutonomousAgent: false, canAccessMonetisation: false, maxProjects: 5,  hasProjectContext: true  },
  pro:      { canUseBuildAgent: true,  canUseAutonomousAgent: true,  canAccessMonetisation: true,  maxProjects: -1, hasProjectContext: true  },
  // maxProjects: -1 = unlimited (Pro). Use helper canCreateProject() — not TierGate — because it's count-based not boolean.
  // hasProjectContext: AI remembers brand/style/context across chats inside the same project. Beginner+ only.
} as const satisfies Record<Tier, Record<string, boolean | number>> (implement when backend is ready)

```ts
async function verifyOutput(content: BookContent | WebsiteContent | ArtContent | GameContent) {
  const urlToCheck =
    "pdfUrl" in content ? content.pdfUrl :
    "previewUrl" in content ? content.previewUrl :
    null

  if (!urlToCheck) return "verified"

  try {
    const res = await fetch(urlToCheck, { method: "HEAD", signal: AbortSignal.timeout(5000) })
    return res.ok ? "verified" : "soft-fail"
  } catch {
    return "soft-fail"
  }
}
````

- `"verified"` → show full SuccessBanner + QualityCheckCard
- `"soft-fail"` → show `"Almost ready"` banner + `<Button variant="outline">Report an issue</Button>`

Currently: banner shows immediately on `status === "complete"`. Implement ping once backend URL timing is confirmed.

---

## 8. TESTING (no backend)

Two floating dev panels (lg+ only):

- **`DemoControls.tsx`** (mounted in `DashboardChat`) — chat-state scenarios: Thinking / Text reply / Clarification (single) / Clarification (multi) / Book building / Book complete / Website building / Website complete / Art complete / Game complete / Error · Seed recents / Reset chat
- **`ProjectDevControls.tsx`** (mounted in `(dashboard)/layout.tsx`) — project + tier + conversation seeders. **Set up demo** drops in 3 projects, 4 chats in the first project, 2 global chats, and tier=Pro in one click. Other actions: switch tier, fill Free/Beginner caps to test the `<UpgradePrompt>` path on `/projects/new`, seed chats in the first project, add a global chat, toggle archive on the first project, reset all.

Responsive: browser devtools at 375px / 768px / 1280px

A11y: Tab into PreviewPanel → focus trapped · ESC closes PreviewPanel, MobileSidebarDrawer, UpgradeModal, DeleteProjectModal · Emulate prefers-reduced-motion → animations freeze

**Before launch — delete:**

- `src/app/(dashboard)/dashboard/_components/DemoControls.tsx` + its import + `<DemoControls />` from `DashboardChat.tsx`
- `src/app/(dashboard)/_components/ProjectDevControls.tsx` + `src/app/(dashboard)/_components/devSeeds.ts` + the import + `<ProjectDevControls />` from `(dashboard)/layout.tsx`

---

## 9. OPEN ITEMS

### Blocked on backend

| Item                         | Notes                                                                                                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/middleware.ts`          | Protect `/dashboard/:path*` and `/projects/:path*`. Cookie name TBD. Do NOT add auth guard to layout.tsx |
| Streaming text renderer      | TextRenderer assumes complete content. Rewrite when backend confirms stream format                       |
| Completion verification ping | Pattern in section 7                                                                                     |
| ActionBar like/dislike       | console.log stubs — wire to feedback API                                                                 |
| File upload to backend       | Attachments captured client-side, backend upload is TODO                                                 |
| Project context injection    | AI receiving shared project context (brand, colours, style) on `/generate` calls — Week 7                |

### Open frontend tweaks (no backend needed)

| Item                                | Notes                                                                                                                                                                                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Free-tier nudge granularity         | `ProjectHome`'s `FreeTierContextNudge` currently shows for every Free user on every project home. Spec wants "second or subsequent chat in this project" — needs a per-project conversation count signal we don't track yet. Tighten when that signal exists.   |
| Status badge on `CreationCard`      | Spec calls for Published / Draft / Downloaded badges. `ConversationMeta` doesn't carry status; backend will provide it on `ProjectCreation`. The grid currently omits the badge.                                                                                |
| Move RightHeader to shared          | Now imported by both `/dashboard` and `/projects/:id/chat/:chatId`. Currently lives in `dashboard/_components/` and the project chat page reaches for it via `@/` alias. Candidate to move into `(dashboard)/_components/` for cleaner ownership.                |
| Voice transcription path            | See section 11. Pending product decision (Web Speech / Transformers.js / backend Whisper).                                                                                                                                                                       |

### Blocked on backend (see also "Blocked on backend" table above)

`useProjectStore` and `useConversationsStore` are in-memory only — reload wipes them. Wiring plan once the API lands:

- `useConversationsStore.fetchAll` → `GET /conversations` (currently a no-op)
- `useProjectStore.setProjects` ← `GET /projects` on app boot
- `/projects/new` form ← additionally `POST /projects` before `addProject`
- `ProjectCreation` (in `src/types/project.ts`, currently unused) becomes the wire format from a creations endpoint, replacing the `ConversationMeta`-filtered approach in `CreationGrid`
- `chat-store.projectId` is already plumbed and forwarded — needs to be included in the generate-call payload when that exists

### Known non-issues — do not fix

- Theme toggle covers InputBar on small screens — pre-existing
- PreviewPanel always full-screen — split-view is future refactor
- Workspace switcher in OwnersDetails is non-functional v1 — intentional, leave as-is
- RTL/i18n — not on roadmap
- react-markdown XSS — safe by default, do NOT add rehype-raw

---

## 10. BUILD ORDER — CURRENT STATUS

| #    | Step                                                    | Status                                                                   |
| ---- | ------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1–16 | Layout, types, stores, renderers, wiring                | ✅ all done                                                              |
| 17   | ConversationSkeleton wiring                             | ✅ done                                                                  |
| 18   | OwnersDetails dropdown                                  | ✅ done                                                                  |
| 19   | Upgrade modal                                           | ✅ done                                                                  |
| 20   | Voice waveform + record-then-transcribe                 | 🔧 code shipped, mic broken — pending architecture decision (section 11) |
| 21   | Shared ChatComposer + marketplace flow                  | ✅ done                                                                  |
| 22   | TextRenderer — syntax highlighting + markdown           | ✅ done                                                                  |
| 23   | TierGate component                                      | ✅ done                                                                  |
| 24   | Lifted dashboard layout + route split                   | ✅ done                                                                  |
| 25   | /chat, /projects, /new-project pages + sidebar collapse | ✅ done (static UI only)                                                 |
| 26   | Project types + project-store + ui-store additions      | ✅ done                                                                   |
| 27   | Rename /new-project → /projects/new + wire submit       | ✅ done                                                                   |
| 28   | /projects/:id — project home view                       | ✅ done                                                                   |
| 29   | /projects/:id/chat/:chatId — scoped chat route          | ✅ done                                                                   |
| 30   | Recents.tsx two modes (global vs project-scoped)        | ✅ done                                                                   |
| 31   | RightHeader.tsx breadcrumb mode                         | ✅ done                                                                   |
| —    | Middleware                                              | ⏸ backend dependency                                                     |
| —    | Wire projects to API                                    | ⏸ backend dependency (Week 5)                                            |
| —    | Project context injection                               | ⏸ backend dependency (Week 7)                                            |
| —    | Streaming renderer                                      | ⏸ backend dependency                                                     |
| —    | Completion ping                                         | ⏸ backend dependency                                                     |
| —    | Feedback API                                            | ⏸ backend dependency                                                     |

---

## 11. SPEC — Voice waveform + record-then-transcribe (step 20)

### What changes

|               | Current                           | New                                       |
| ------------- | --------------------------------- | ----------------------------------------- |
| Model         | Live transcription while speaking | Record → transcribe on stop               |
| Visual        | Mic button colour change          | Modulating waveform line in textarea area |
| Existing text | Appends                           | Always appends — never replaces           |

### Files to change

- `src/components/chat/input/useVoiceInput.ts` — full rewrite
- `InputActionsBar.tsx` — mic button click handler only
- `InputComposer.tsx` — mount waveform, swap textarea visibility

### New file

- `src/components/chat/input/VoiceWaveform.tsx`

### `useVoiceInput.ts` rewrite

```ts
interface VoiceInputState {
  isRecording: boolean;
  analyser: AnalyserNode | null;
  start: () => Promise<void>;
  stop: () => void;
  error: string | null;
}
```

**`start()`:**

1. `navigator.mediaDevices.getUserMedia({ audio: true })`
2. Create `AudioContext` + `AnalyserNode` (fftSize: 256) → expose on state
3. Create `MediaRecorder` from stream → collect chunks on `ondataavailable`
4. Set `isRecording: true`

**`stop()`:**

1. `mediaRecorder.stop()` → triggers `onstop`
2. In `onstop`: build Blob from chunks → use Web Speech API in one-shot mode for transcription
3. On result: call `onTranscript(text)` callback — caller appends to textarea
4. `audioContext.close()`, set `isRecording: false`, `analyser: null`
5. Mark with `// TODO: swap for Whisper endpoint when backend is ready`

**SSR safety:** wrap all Web API access in `typeof window !== "undefined"`. Return no-op state on server.

**Feature detection:** if `navigator.mediaDevices` unavailable, set `error: "Microphone not supported"` and hide mic button.

### `VoiceWaveform.tsx`

```tsx
interface VoiceWaveformProps {
  analyser: AnalyserNode;
  className?: string;
}
```

Drawing loop — reads `getByteTimeDomainData`, draws a single modulating centre line:

```ts
const draw = () => {
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(data);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  const sliceWidth = canvas.width / data.length;
  let x = 0;
  data.forEach((v, i) => {
    const y = (v / 128.0) * (canvas.height / 2);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    x += sliceWidth;
  });
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.strokeStyle = "var(--brand)";
  ctx.lineWidth = 2;
  ctx.stroke();
  rafRef.current = requestAnimationFrame(draw);
};
```

- Cancel RAF on unmount
- If `prefers-reduced-motion`: skip RAF, draw one static flat line in brand orange
- Canvas: `width="100%" height="40"`

### `InputComposer.tsx` wiring

While `voice.isRecording`:

- Hide `<textarea>` with `hidden` class — keep in DOM, value preserved
- Show `<VoiceWaveform analyser={voice.analyser!} className="w-full" />`

`onTranscript` callback:

```ts
setValue((prev) => (prev ? prev + " " + text : text));
```

### `InputActionsBar.tsx` mic button

```ts
onClick={() => voice.isRecording ? voice.stop() : voice.start()}
```

Recording visual: `bg-brand text-white shadow-md` + two `animate-ping` rings (`bg-brand/40` + `bg-brand/25`, second has 0.6s delay). Both `motion-reduce:animate-none`.

---

## 12. SPEC — Shared ChatComposer + marketplace flow (step 21)

### File moves — do these first

Move from `src/app/(dashboard)/dashboard/_components/input/` to `src/components/chat/input/`:

- `InputComposer.tsx`, `InputActionsBar.tsx`, `TypePillSelector.tsx`, `AttachmentChips.tsx`, `useAttachments.ts`, `useVoiceInput.ts`, `VoiceWaveform.tsx`

Update all import paths after moving.

### New file: `src/components/chat/input/ChatComposer.tsx`

```tsx
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
```

### `InputBar.tsx` (dashboard) becomes thin wrapper

```tsx
"use client";
import { ChatComposer } from "@/components/chat/input/ChatComposer";
import { useChatStore } from "@/store/chat-store";

export function InputBar() {
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const status = useChatStore((s) => s.status);
  const mode = messages.length === 0 ? "new" : "conversation";

  const handleSend = (payload) => {
    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: { text: payload.text, attachments: payload.attachments },
      timestamp: new Date(),
    });
    // TODO: trigger AI call when backend is ready
  };

  return (
    <ChatComposer
      mode={mode}
      onSend={handleSend}
      disabled={status === "building" || status === "streaming"}
    />
  );
}
```

### `HeroTextArea.tsx` (marketplace) — replace contents

```tsx
"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { ChatComposer } from "@/components/chat/input/ChatComposer";

export function HeroTextArea() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const handleSend = (payload) => {
    sessionStorage.setItem(
      "vibecraft_pending_message",
      JSON.stringify(payload),
    );
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
      placeholder="tell Vibecraft what you want..."
    />
  );
}
```

### `DashboardChat.tsx` — pick up pending message on mount

```ts
useEffect(() => {
  const raw = sessionStorage.getItem("vibecraft_pending_message");
  if (!raw) return;
  sessionStorage.removeItem("vibecraft_pending_message");
  try {
    const payload = JSON.parse(raw);
    if (payload?.text) {
      addMessage({
        id: crypto.randomUUID(),
        role: "user",
        content: { text: payload.text, attachments: payload.attachments ?? [] },
        timestamp: new Date(),
      });
      // TODO: auto-fire AI call when backend is ready
    }
  } catch {
    /* malformed — ignore */
  }
}, []);
```

### Flow summary

```
Marketplace send
  → save to sessionStorage
  → authenticated? → /dashboard → DashboardChat reads storage → fires message
  → not auth?     → /login?next=/dashboard → login → middleware → /dashboard → same
```

---

## 13. SPEC — TextRenderer syntax highlighting + markdown formatting (step 22)

### Install

```bash
npm install react-syntax-highlighter
npm install --save-dev @types/react-syntax-highlighter
```

### What to update in `TextRenderer.tsx`

Add custom component overrides to the `react-markdown` `components` prop. Use the design system's font values and CSS tokens as className strings — not the `<Typography>` component wrapper (would cause nested block elements).

**Headings:**

```tsx
h1: ({ children }) => <h1 className="font-sans font-medium text-[1.5rem] leading-[1.875rem] text-primary mt-4 mb-2">{children}</h1>,
h2: ({ children }) => <h2 className="font-sans font-medium text-[1.125rem] leading-[1.625rem] text-primary mt-4 mb-2 text-left">{children}</h2>,
h3: ({ children }) => <h3 className="font-sans font-medium text-[0.9375rem] leading-[1.4rem] text-primary mt-3 mb-1 text-left">{children}</h3>,
```

**Inline formatting:**

```tsx
strong: ({ children }) => <strong className="font-medium text-primary">{children}</strong>,
em:     ({ children }) => <em className="italic text-secondary">{children}</em>,
del:    ({ children }) => <del className="line-through text-muted">{children}</del>,
```

**Inline code:**

```tsx
// Inside the code override, detect block vs inline:
code({ className, children }) {
  const match = /language-(\w+)/.exec(className || "")
  const isBlock = !!match

  if (!isBlock) {
    return (
      <code className="font-code font-normal text-[0.75rem] leading-[1rem] bg-subtle px-1.5 py-0.5 rounded text-primary">
        {children}
      </code>
    )
  }

  // Block code — syntax highlighted
  return (
    <SyntaxHighlighter
      language={match[1]}
      style={oneDark}
      PreTag="div"
      customStyle={{
        background: "#1e1d1a",
        borderRadius: "0.75rem",
        padding: "1rem",
        fontSize: "0.75rem",
        fontFamily: "var(--font-jetbrains-mono)",
        margin: "0.5rem 0",
        overflowX: "auto",
      }}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  )
}
```

**Import:**

```tsx
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
```

**Theme:** `oneDark` — warm dark background with orange tones that complement `--brand`.

**Other elements:**

```tsx
p:          ({ children }) => <p className="font-sans font-normal text-[0.875rem] leading-[1.25rem] text-primary mb-2">{children}</p>,
ul:         ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
ol:         ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
li:         ({ children }) => <li className="font-sans font-normal text-[0.875rem] leading-[1.25rem] text-primary">{children}</li>,
blockquote: ({ children }) => <blockquote className="border-l-2 border-brand pl-3 italic text-secondary my-2">{children}</blockquote>,
hr:         () => <hr className="border-subtle my-4" />,
a:          ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-brand underline hover:opacity-80">{children}</a>,
table:      ({ children }) => <div className="overflow-x-auto my-2"><table className="w-full text-[0.875rem] border-collapse">{children}</table></div>,
th:         ({ children }) => <th className="border border-subtle px-3 py-2 text-left font-medium text-primary bg-subtle">{children}</th>,
td:         ({ children }) => <td className="border border-subtle px-3 py-2 text-primary">{children}</td>,
```

**Rule:** all classes use design system tokens only. No hardcoded hex except `#1e1d1a` for the code panel background (documented exception).

---

## 14. SPEC — TierGate component (step 23)

### What it is

A wrapper that shows or hides features based on the user's tier. Reads from `auth-store` and `TIER_FEATURES` in constants. UI concern only — backend enforces real access control.

### File to create

`src/components/ui/tier-gate.tsx`

### Update `TIER_FEATURES` in `src/lib/constants.ts` first

```ts
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
};
```

### Type

```ts
type Feature = keyof typeof TIER_FEATURES.free;
// "canUseBuildAgent" | "canUseAutonomousAgent" | "canAccessMonetisation"
// TypeScript will catch misspelled feature names at compile time
```

### Component

```tsx
"use client";
import { useAuthStore } from "@/store/auth-store";
import { TIER_FEATURES } from "@/lib/constants";

type Feature = keyof typeof TIER_FEATURES.free;

interface TierGateProps {
  feature: Feature;
  children: React.ReactNode;
  fallback?: React.ReactNode; // default: null
}

export function TierGate({
  feature,
  children,
  fallback = null,
}: TierGateProps) {
  const tier = useAuthStore((s) => s.tier);
  const allowed = TIER_FEATURES[tier]?.[feature] ?? false;
  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}
```

### Usage

```tsx
// Blocks Free users from the build agent
<TierGate feature="canUseBuildAgent" fallback={<UpgradePrompt />}>
  <BuildAgentPanel />
</TierGate>

// No fallback — feature simply hidden for lower tiers
<TierGate feature="canAccessMonetisation">
  <MonetisationInsights />
</TierGate>
```

### `UpgradePrompt` inline component

Create alongside `TierGate` or co-locate wherever first used:

```tsx
"use client";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";

export function UpgradePrompt({
  message = "This feature is available on paid plans.",
}: {
  message?: string;
}) {
  const setUpgradeModalOpen = useUIStore((s) => s.setUpgradeModalOpen);
  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-surface border border-subtle rounded-xl text-center">
      <Typography variant="body-sm" className="text-secondary">
        {message}
      </Typography>
      <Button variant="default" onClick={() => setUpgradeModalOpen(true)}>
        Upgrade to Pro
      </Button>
    </div>
  );
}
```

### Wire the upgrade modal trigger

`TierGate`'s fallback `<UpgradePrompt />` opens `UpgradeModal` via `useUIStore`. This completes the full upgrade flow:

```
User hits locked feature
  → TierGate renders UpgradePrompt
  → User clicks "Upgrade to Pro"
  → UpgradeModal opens (Pricing component)
  → User selects plan → payment (Week 8)
```

---

## 16. PROJECT ARCHITECTURE — CONFIRMED DECISIONS

All decisions in this section are confirmed by the product designer (2026-05-07). Build against these exactly.

### What a project is

A project is a named folder that groups related creations. One user can have a "David's Bakery" project containing a website chat, a poster chat, and a menu PDF chat — all separate conversations producing separate outputs, tied together under shared brand context.

**Hierarchy:** Workspace (personal, v1 only) → Projects → Chats → Creations

**Persistent context (Beginner+ only):** when a user starts a new chat inside a project, the AI receives the project's shared context automatically — brand name, colours, tone, audience, location — built from previous chats in the same project. Free users get a visual folder only; each chat starts fresh with no memory.

### Project limits per tier

| Tier     | Max projects                  | Persistent context           |
| -------- | ----------------------------- | ---------------------------- |
| Free     | 1                             | ❌ visual folder only        |
| Beginner | 5                             | ✅ AI remembers across chats |
| Pro      | Unlimited (`maxProjects: -1`) | ✅                           |

Archived projects do not count against the limit.

### New types — add to `src/types/message.ts` or a new `src/types/project.ts`

```ts
export type ProjectStatus = "active" | "archived";

export interface ProjectMeta {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  creationCount: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface ProjectCreation {
  id: string; // conversationId
  projectId: string;
  title: string;
  type: CreationType;
  status: "published" | "draft" | "downloaded";
  thumbnailUrl?: string;
  createdAt: Date;
}
```

### New store — `src/store/project-store.ts`

```ts
interface ProjectStore {
  activeProject: ProjectMeta | null;
  projects: ProjectMeta[]; // list for /projects page
  isLoading: boolean;
  setActiveProject: (p: ProjectMeta | null) => void;
  setProjects: (list: ProjectMeta[]) => void;
  addProject: (p: ProjectMeta) => void;
  updateProject: (id: string, patch: Partial<ProjectMeta>) => void;
  removeProject: (id: string) => void;
}
```

### ui-store additions — add to `src/store/ui-store.ts`

```ts
activeProjectId: string | null
sidebarMode: "global" | "project"
setActiveProjectId: (id: string | null) => void
setSidebarMode: (mode: "global" | "project") => void
```

When entering a project: `setActiveProjectId(id)` + `setSidebarMode("project")`
When leaving: `setActiveProjectId(null)` + `setSidebarMode("global")`

### chat-store addition

Add `projectId: string | null` to `ChatStore`. Pass through to the AI generate call when backend is ready:

```ts
projectId: null   // initial state
setProjectId: (id: string | null) => void
```

### canCreateProject helper — NOT a TierGate feature flag

Project creation gating is count-based, not boolean. Use a helper function:

```ts
// src/lib/utils.ts (or a new src/lib/project-utils.ts)
export function canCreateProject(
  tier: Tier,
  currentProjectCount: number,
): boolean {
  const max = TIER_FEATURES[tier].maxProjects;
  if (max === -1) return true; // Pro = unlimited
  return currentProjectCount < max;
}
```

Use this wherever the "New project" button appears. If `canCreateProject` returns false, show `<UpgradePrompt message="Upgrade to create more projects." />`.

### Routing

```
/projects              ← project list grid (already exists as static — wire to store)
/projects/new          ← create project form (rename from /new-project)
/projects/:id          ← project home view (NEW)
/projects/:id/chat/:chatId  ← chat scoped inside a project (NEW)
/dashboard             ← global chat, no project context (unchanged)
```

`DashboardChat` is reused inside `/projects/:id/chat/:chatId`. It receives `projectId` as a prop and passes it to the generate call. The component itself is otherwise unchanged.

### Sidebar — `Recents.tsx` two modes

Driven by `sidebarMode` from `ui-store`:

**`global` mode** (default, no project active):

- Shows all recent conversations across all projects
- Same as current behaviour

**`project` mode** (inside a project):

- Shows only conversations belonging to `activeProjectId`
- "Back to all projects" link pinned at the top of the list
- "RECENTS" label changes to "THIS PROJECT"
- Clicking "Back to all projects" calls `setSidebarMode("global")` + `setActiveProjectId(null)` + navigates to `/projects`

### RightHeader — breadcrumb mode

Two modes driven by whether `activeProjectId` is set in `ui-store`:

**No project (current behaviour):**

```
[chat title]  [type tag pill]  [action icons]
```

**Inside project:**

```
[Project name ˅]  ›  [chat title]  [type tag pill]  [action icons]
```

The project name is clickable — navigates to `/projects/:id`. The chevron opens a dropdown with two sections:

1. **Chats in this project** — list of `ProjectCreation` titles for quick-switching
2. **Your projects** — list of recent `ProjectMeta` for cross-project switching

Both sections navigate to the relevant `/projects/:id/chat/:chatId` or `/projects/:id` route.

### Project home view — `/projects/:id`

New page at `src/app/(dashboard)/projects/[id]/page.tsx`

Structure:

```
[Project name — inline editable]
[Project description — inline editable]
[New chat button]  [Settings dropdown — rename, archive, delete]

[Creation grid — ProjectCreation cards]
  Each card: type badge (Website/Book/Game/Art), thumbnail or type icon,
             creation title, date, status badge (Published/Draft/Downloaded)
  Click → navigates to /projects/:id/chat/:chatId

[Empty state — when no creations yet]
  Icon + "No creations yet" + "Start your first creation" button → new chat
```

### OwnersDetails workspace switcher

The "DeBee's Vibecraft" label + chevron in OwnersDetails IS the trigger for the existing token/referral dropdown. The workspace switcher concept (switching between team accounts) is a v2 feature. For v1:

- The trigger opens the existing dropdown as it already does
- Do NOT add workspace-switching functionality
- Do NOT grey it out or disable it — it already works as the dropdown trigger

### Free tier upgrade nudge — `ProjectContextBanner`

Shown as a subtle inline banner (not a modal) when a Free user opens a **second or subsequent chat** inside their one project. It is informational, not a hard block. The user can still proceed.

```tsx
// src/app/(dashboard)/_components/ProjectContextBanner.tsx
// Only renders when: tier === "free" AND inside a project AND conversationCount > 0
<div className="bg-hover border border-subtle rounded-xl px-4 py-3 flex items-center justify-between">
  <Typography variant="body-sm" className="text-secondary">
    Upgrade to Beginner — Vibe will remember your brand across all chats in this
    project.
  </Typography>
  <Button variant="default" size="sm" onClick={() => setUpgradeModalOpen(true)}>
    Upgrade
  </Button>
</div>
```

### Archive and delete

Archive: moves project to `status: "archived"`. Accessible via "View archived" on `/projects`. Does not count against project limit.

Delete: confirmation modal required. Copy: "This will permanently delete [name] and all X chats inside it. Published sites will be unpublished. This cannot be undone." Hard delete — everything removed, published sites go offline.

Both actions available from: project home settings dropdown (three-dot menu) and the `/projects` grid card menu.

### Rename

Inline edit on the project title in the project home view (click title to edit). Also available from the settings dropdown. Description is also editable from both places.
