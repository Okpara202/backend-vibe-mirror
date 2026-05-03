# VibeCraft Dashboard — Claude Code Handoff
### Last updated: 2026-05-03 (post-dashboard-build state)

---

## BEFORE YOU DO ANYTHING — READ THIS FIRST

This document is the single source of truth for everything you will build in this project — now and in every future session. Treat it as your constitution. Every component, store, type, and pattern you write must be consistent with what is written here.

**Step 1 — Explore the codebase.**
Before writing a single line of code, read the actual files. At minimum:
- `src/app/globals.css` — all CSS variables and design tokens
- `src/components/ui/Typography.tsx` — every variant name, exactly as written
- `src/components/ui/button.tsx` — the two variants and the `asChild` pattern
- `src/components/ui/Input.tsx` — the forwardRef and RHF-compatible API
- `src/lib/utils.ts` — the `cn()` helper
- `src/app/(dashboard)/dashboard/layout.tsx` — responsive two-column shell
- `src/app/(dashboard)/dashboard/_components/LeftDashboardSvgIcons.tsx` — all dashboard SVG icons
- `src/app/(dashboard)/dashboard/_components/DashboardChat.tsx` — the client wrapper and mode switch
- Any file you are about to modify — always read before writing

Do not assume you know what's in these files. Read them first.

**Step 2 — Store this document in memory.**
This handoff informs every decision in this project. Store a reference to it now. You will return to it across multiple sessions.

**Step 3 — Note any discrepancies.**
If something in the codebase differs from this document, flag it before proceeding. Do not silently override either. Ask for clarification.

**Step 4 — Then build.**
Check section 13 (build order) for current status before starting any work.

---

> The designer's Figma is the visual reference. This doc is the technical contract.

---

## 1. Current project state

The dashboard is substantially built. The following are COMPLETE — do not recreate or overwrite:

### Dashboard shell and navigation
| File | State |
|---|---|
| `src/app/(dashboard)/dashboard/layout.tsx` | ✅ responsive two-column shell, bg-canvas, lg:border-l |
| `src/app/(dashboard)/dashboard/page.tsx` | ✅ server component → renders DashboardChat |
| `src/app/(dashboard)/dashboard/_components/DashboardChat.tsx` | ✅ client wrapper, mode switching (new vs conversation) |
| `src/app/(dashboard)/dashboard/_components/InputBar.tsx` | ✅ textarea, mode-aware, type selectors, send logic stub |
| `src/app/(dashboard)/dashboard/_components/LeftDashboard.tsx` | ✅ unchanged |
| `src/app/(dashboard)/dashboard/_components/LeftDashboardSvgIcons.tsx` | ✅ unchanged — import dashboard icons from here |
| `src/app/(dashboard)/dashboard/_components/MobileSidebarDrawer.tsx` | ✅ <lg slide-in drawer |
| `src/app/(dashboard)/dashboard/_components/OwnersDetails.tsx` | ✅ unchanged |
| `src/app/(dashboard)/dashboard/_components/Recents.tsx` | ✅ wired to conversations-store, hides header when list empty |
| `src/app/(dashboard)/dashboard/_components/RightHeader.tsx` | ✅ wired to chat-store + ui-store, hamburger added |
| `src/app/(dashboard)/dashboard/_components/SideBarLink.tsx` | ✅ unchanged |
| `src/app/(dashboard)/dashboard/_components/DemoControls.tsx` | ✅ DEV ONLY — delete before launch |

### Stores
| File | State |
|---|---|
| `src/store/auth-store.ts` | ✅ user, tier, tokenBalance, referralEarnings |
| `src/store/chat-store.ts` | ✅ messages, status, planMode, selectedType, updateMessage |
| `src/store/conversations-store.ts` | ✅ list, fetchAll stub, addToList (deduped), removeLocal |
| `src/store/ui-store.ts` | ✅ mobileSidebarOpen |

### Types
| File | State |
|---|---|
| `src/types/message.ts` | ✅ full discriminated union — User + Assistant |
| `src/types/store.ts` | ✅ all store interfaces |
| `src/types/index.ts` | ✅ barrel re-export |

### Infrastructure
| File | State |
|---|---|
| `src/lib/constants.ts` | ✅ REFERRAL_LINKS (#placeholders), SUCCESS_MESSAGES, TIER_FEATURES (placeholder shape) |
| `src/lib/api/index.ts` | ✅ axios, withCredentials: true, 401 → /login |
| `src/middleware.ts` | ⏸ DEFERRED — needs backend cookie name |

### Chat components
| File | State |
|---|---|
| `src/components/chat/MessageList.tsx` | ✅ maps messages → UserMessage or AssistantMessage |
| `src/components/chat/AssistantMessage.tsx` | ✅ dispatcher with error/missing-content fallback |
| `src/components/chat/UserMessage.tsx` | ✅ right-aligned 60% bubble |
| `src/components/chat/ThinkingIndicator.tsx` | ✅ 3 pulsing dots, motion-reduce safe |
| `src/components/chat/ConversationSkeleton.tsx` | ✅ built but NOT YET WIRED to a loading flag |

### Renderers
| File | State |
|---|---|
| `src/components/chat/renderers/TextRenderer.tsx` | ✅ react-markdown + remark-gfm + ActionBar |
| `src/components/chat/renderers/BookRenderer.tsx` | ✅ |
| `src/components/chat/renderers/WebsiteRenderer.tsx` | ✅ |
| `src/components/chat/renderers/ArtRenderer.tsx` | ✅ |
| `src/components/chat/renderers/GameRenderer.tsx` | ✅ |
| `src/components/chat/renderers/ClarificationForm.tsx` | ✅ single + multi select, post-submit lock |
| `src/components/chat/renderers/shared/RendererShell.tsx` | ✅ |
| `src/components/chat/renderers/shared/ProgressCard.tsx` | ✅ pulsing dot, stage pipeline, substep grid |
| `src/components/chat/renderers/shared/SuccessBanner.tsx` | ✅ peach card, serif italic |
| `src/components/chat/renderers/shared/QualityCheckCard.tsx` | ✅ green-success bg, checkmark list |
| `src/components/chat/renderers/shared/ActionBar.tsx` | ✅ textToCopy prop, clipboard write |
| `src/components/chat/renderers/shared/ReferralLinks.tsx` | ✅ 4-link grid |
| `src/components/chat/renderers/shared/PreviewPanel.tsx` | ✅ full-screen overlay, ESC, focus mgmt, scroll lock |
| `src/components/chat/renderers/shared/ImageWithFallback.tsx` | ✅ error-tolerant img wrapper |

---

## 2. Design system rules — non-negotiable

**Never hardcode hex values** except for the two documented exceptions below.

### Color tokens (all defined in `src/app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg-canvas` | #f7f6f3 | #141311 | page background |
| `bg-surface` | #ffffff | #1e1d1a | card background |
| `border-subtle` | #edece8 | #2a2926 | borders and dividers |
| `text-primary` | #1a1917 | #f5f4f1 | primary text |
| `text-secondary` | #7c7b74 | #b5b4ae | secondary text |
| `text-muted` | #a3a29a | #7c7b74 | muted / helper text |
| `text-brand` / `bg-brand` | #f27a1a | #f27a1a | brand orange |
| `bg-hover` | #fff7f0 | #fff7f0 | **same in both themes** — peach wash |
| `bg-success` | #edfaf3 | #edfaf3 | quality check card background |
| `bg-accent` | #f5f0ff | #f5f0ff | light purple accent |
| `bg-sidebar-fill` | #ffffff | #1e1d1a | sidebar background |
| `bg-sidebar-fill-active` | #fff7f0 | #fff7f0 | active/hover row |
| `text-sidebar-active-link` | #d45e0a | #d45e0a | active nav link |
| `text-sidebar-link-text` | #686867 | #b5b4ae | inactive nav link |
| `text-icon-secondary` | #686867 | #b5b4ae | inactive icon |
| `bg-chat-user-fill` | #ffffff | #2a2926 | user message bubble bg |
| `border-chat-user-border` | #dddcd6 | #3d3c38 | user message bubble border |
| `text-chat-user-text` | #2a2926 | #f5f4f1 | user message text |

⚠️ **`bg-hover` is the same hex in light and dark.** Any text on `bg-hover` must use `text-brand` or another mode-stable color — never `text-primary`. This applies to: `SuccessBanner`, selected `ClarificationForm` options, `InputBar` focus states.

### Documented hex exceptions (only these two are permitted)
- `bg-[#1e2a4a]` — dark navy substep chapter cards in `ProgressCard` (per Figma spec)
- `bg-[#1e1d1a]` — code panel background in `PreviewPanel` and `TextRenderer` code blocks

### Typography
Always use `<Typography>` from `src/components/ui/Typography.tsx`. Never raw `<h1>/<p>/<span>`.

| Variant | Use for | Notes |
|---|---|---|
| `display-hero` | Hero headings | Instrument Serif, centered |
| `display-page` | Page titles | Instrument Serif, centered |
| `display-section` | Section titles | Instrument Serif, centered |
| `heading-h1` | Renderer card titles | Geist medium |
| `heading-h3` | Section headings | Geist medium, **text-center baked in** — pass `className="text-left"` to override |
| `heading-h4` | Sub-section labels | Geist medium, **text-center baked in** — pass `className="text-left"` to override |
| `label-lg` | Tab labels | Geist medium |
| `label-md` | Option titles, body labels | Geist medium |
| `label-sm` | Tags, pills, stage labels | Geist medium |
| `body-sm` | All paragraph text | Geist regular |
| `caption-default` | Timestamps, file sizes, metadata | Geist regular |
| `caption-mono` | URLs, file names | JetBrains Mono |
| `code-md` / `code-sm` | Code content | JetBrains Mono |

**`heading-h2` does not exist.** In `TextRenderer`'s markdown overrides, `##` maps to `heading-h3`.

### Button
Two variants only: `default` (orange fill) and `outline` (bordered neutral). Use `asChild` with `<a>` for link-styled buttons:
```tsx
<Button asChild variant="outline">
  <a href={url} target="_blank" rel="noopener noreferrer">Claude</a>
</Button>
```

### Icons
- Dashboard icons (sidebar, topbar) → import from `LeftDashboardSvgIcons.tsx`
- Chat/renderer icons → import from `lucide-react` (note: project uses `^1.11.0`, not standard 0.4xx)
- Verified present: Plus, Mic, Square, ChevronDown, Code2, Monitor, Smartphone, Tablet, X, Menu, FileText, Check, RotateCcw, ThumbsUp, ThumbsDown, Copy, MoreHorizontal

### Utility
`cn()` from `src/lib/utils.ts` for all conditional class merging.

---

## 3. Architecture decisions (locked — do not revisit without instruction)

### Renderer pipeline
```
chat-store.messages
  ↓
MessageList (w-[90%] md:w-[80%] lg:w-[60%])
  ↓
  user    → UserMessage (right-aligned bubble, chat-user-* tokens)
  assistant → AssistantMessage dispatcher
                ↓
                if status=error OR (status=complete AND book/website/art/game AND content missing):
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
- **thinking** (`status === "thinking"`) → `<ThinkingIndicator />`
- **building** (`status === "building"`) → `RendererShell` + `ProgressCard`
- **complete** (`status === "complete"`) → optional `SuccessBanner` + optional `QualityCheckCard` + `RendererShell` with content

### RendererShell dot colors
All three dot states (`"brand"`, `"success"`, `"building"`) render as brand orange per Figma. `"building"` adds `animate-pulse motion-reduce:animate-none`. The green from `--success` is reserved for `QualityCheckCard` background only — not the dot.

### Stage names per creation type
| Type | Stages |
|---|---|
| book | Outline → Writing → Illustrating → Layout → QA |
| website | Planning → Coding → Styling → Content → QA |
| art | Brief → Exploring → Rendering → Polishing → QA |
| game | Designing → Coding → Testing → Balancing → QA |
| fallback | Planning → Building → Reviewing → QA |

### GameRenderer
No `SuccessBanner` or `QualityCheckCard` by default. `QualityCheckCard` only renders if backend sends `qualityChecks`.

### PreviewPanel
Always full-screen overlay on all screen sizes. The handoff's "split-view on desktop" was simplified — refactor later as additive change.

### ActionBar copy text per renderer
- book: `${title}\n${subtitle}\n${pdfUrl}` (filtered for undefined)
- website: `${name}: ${url}`
- art: `${title} (${formats.join(', ')})`
- game: `${title}: ${url}`
- text: full markdown string

### updateMessage cast
`chat-store.updateMessage` uses `{ ...m, ...patch } as typeof m` because `Partial<AssistantMessage>` widens discriminated unions on spread. Only patch shared fields (`status`, `buildingContent`, `error`, `successMessage`, `successSubtext`). To change `type` or `content`, use `addMessage` instead.

### Success copy ownership
Frontend owns success copy via `SUCCESS_MESSAGES` in `src/lib/constants.ts`. `qualityChecks` are backend-owned. If absent, skip `QualityCheckCard` — do not fabricate checks.

### Responsive widths
AI messages, user bubbles, InputBar (conversation mode): `w-[90%] md:w-[80%] lg:w-[60%]`
InputBar (new mode): `w-full max-w-[580px]`

### bg-hover dark mode rule
`bg-hover` (#fff7f0) is the same in light and dark. Text on this surface must use `text-brand` or mode-stable equivalents — never `text-primary`. Applies to: SuccessBanner text, ClarificationForm selected option label/description, any other component using bg-hover.

---

## 4. Type definitions

### Message union (`src/types/message.ts`)
```ts
export type CreationType = "website" | "game" | "book" | "art"
export type MessageStatus = "thinking" | "building" | "complete" | "error"

export interface BuildingContent {
  label: string
  subtitle: string
  stages: string[]
  currentStageIndex: number
  substep?: {
    label: string
    description: string
    previewItems?: string[]
  }
}

export interface ClarificationOption {
  id: string
  label: string
  description?: string
}

export interface ClarificationContent {
  leadText: string
  question: string
  instruction: "Select one answer" | "Select all that apply"
  questionIndex: number
  questionTotal: number
  options: ClarificationOption[]
  submitLabel: string
}

export interface BookContent {
  title: string
  subtitle?: string
  chapters: Array<{ id: string; title: string; thumbnailUrl?: string }>
  coverImageUrl?: string
  pdfUrl?: string
  fileSize?: string
  pageCount?: number
  qualityChecks?: string[]
}

export interface WebsiteContent {
  name: string
  url: string
  html: string
  previewUrl?: string
  qualityChecks?: string[]
}

export interface ArtContent {
  title: string
  formats: string[]
  svgCode?: string
  previewUrl?: string
  qualityChecks?: string[]
}

export interface GameContent {
  title: string
  url?: string
  html: string
  previewUrl?: string
  qualityChecks?: string[]
}

export type UserMessage = {
  id: string
  role: "user"
  content: { text: string }
  timestamp: Date
}

export type AssistantMessage = {
  id: string
  role: "assistant"
  timestamp: Date
  status: MessageStatus
  buildingContent?: BuildingContent
  // successMessage and successSubtext are set by frontend after client-side ping verification
  // See section 6 — Completion verification
  successMessage?: string
  successSubtext?: string
  error?: string
} & (
  | { type: "text";          content: { markdown: string } }
  | { type: "clarification"; content: ClarificationContent }
  | { type: "book";          content?: BookContent }
  | { type: "website";       content?: WebsiteContent }
  | { type: "art";           content?: ArtContent }
  | { type: "game";          content?: GameContent }
)

export type Message = UserMessage | AssistantMessage
```

---

## 5. Constants (`src/lib/constants.ts`)

```ts
// TODO: Replace all # values with real TekAIDA affiliate tracking URLs before launch.
// Do not change labels or structure — only the href strings.
export const REFERRAL_LINKS = {
  claude:   { label: "Claude",   href: "#" },
  cursor:   { label: "Cursor",   href: "#" },
  chatgpt:  { label: "ChatGPT",  href: "#" },
  lovable:  { label: "Lovable",  href: "#" },
}

export const SUCCESS_MESSAGES: Record<CreationType, { message: string; subtext: (content: any) => string }> = {
  book:    { message: "You made it. Nicely done",       subtext: (c) => `Your bedtime story is ready · ${c.chapters?.length ?? 0} chapters · ${c.pageCount ?? 0} pages` },
  website: { message: "Your website is live",           subtext: (c) => `${c.pageCount ?? 0} pages · ${c.url}` },
  art:     { message: "Your poster is ready to print",  subtext: (c) => c.formats?.join(" · ") ?? "" },
  game:    { message: "Your game is ready to play",     subtext: (_) => "" },
}

// TIER_FEATURES: placeholder shape — real shape TBD when upgrade/billing UI is built
export const TIER_FEATURES = {
  free:     { label: "Free",     monthlyTokens: 0,    features: [] },
  beginner: { label: "Beginner", monthlyTokens: 50000, features: [] },
  pro:      { label: "Pro",      monthlyTokens: 200000, features: [] },
}
```

---

## 6. Completion verification (not yet implemented)

When backend marks a message complete, the frontend should silently verify the output is actually accessible before showing the success banner. Pattern to implement when backend is ready:

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
```

- `"verified"` → set `successMessage`/`successSubtext` from `SUCCESS_MESSAGES`, show `SuccessBanner` + `QualityCheckCard`
- `"soft-fail"` → show softer banner: `"Almost ready"` + `"Your [type] is ready — let us know if anything looks off"` + `<Button variant="outline">Report an issue</Button>` instead of quality check

Currently: banner shows immediately on `status === "complete"`. Implement ping when backend URL patterns are confirmed.

---

## 7. Testing (no backend)

Use `DemoControls.tsx` — floating dropdown top-right (hidden below lg breakpoint).

Scenario groups available:
- **Scenarios**: Thinking / Text reply / Clarification (single) / Clarification (multi) / Book — building / Book — complete / Website — building / Website — complete / Art — complete / Game — complete / Error
- **Other**: Seed recents / Reset chat

Responsive testing: browser devtools at 375px / 768px / 1280px.

A11y testing:
- Tab into PreviewPanel → focus trapped to close button
- ESC closes PreviewPanel and MobileSidebarDrawer
- Enable "Emulate prefers-reduced-motion" → all pulses/animations freeze

**Before launch:** delete `DemoControls.tsx` and remove its import + `<DemoControls />` from `DashboardChat.tsx`. One file, two lines.

---

## 8. Open items (prioritised)

### Must do when backend is ready
| Item | Notes |
|---|---|
| `src/middleware.ts` | Protect `/dashboard/:path*` via HttpOnly cookie. Cookie name unknown until backend. Do NOT add auth guard to layout.tsx |
| Streaming text renderer | TextRenderer assumes complete content. Need streaming variant when backend confirms token-stream format |
| Completion verification ping | HEAD-ping pdfUrl/previewUrl on status=complete before showing SuccessBanner. Pattern in section 6 |
| ActionBar like/dislike | Currently console.log stubs. Wire to feedback API endpoint |

### Do now (no backend needed)
| Item | Notes |
|---|---|
| ConversationSkeleton wiring | Add `isLoadingMessages` to chat-store, show skeleton during loadConversation. Spec in section 11 |
| OwnersDetails dropdown | Token balance + referral earnings + tier badge. Spec in section 12 |
| Upgrade modal | Reuse Pricing.tsx from marketplace. Spec in section 13 |

### Known non-issues (do not fix)
| Item | Notes |
|---|---|
| Theme toggle covers InputBar on small screens | Pre-existing, not introduced by dashboard work |
| PreviewPanel always full-screen | Desktop split-view deferred — additive refactor when needed |
| RTL/i18n | Not on roadmap |
| Multi-attachment user messages | Schema change needed — defer |
| react-markdown XSS | Safe by default. Do NOT add rehype-raw |

---

## 9. Do-not-modify list

- `src/app/globals.css` — only modify with explicit user instruction
- `src/components/ui/Typography.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/Input.tsx`
- `src/lib/utils.ts`
- `src/app/(marketplace)/**` — read-only. You may IMPORT from here but never modify files
- `src/app/(auth)/**`

---

## 10. Build order — current status

| # | Step | Status |
|---|---|---|
| 1 | Layout shell, sidebar, topbar | ✅ done |
| 2 | `src/types/` | ✅ done |
| 3 | `src/store/` (auth, chat, conversations, ui) | ✅ done |
| 4 | `lib/constants.ts` + `lib/api/index.ts` | ✅ done |
| 5 | `src/middleware.ts` | ⏸ deferred — needs backend cookie name |
| 6 | `InputBar.tsx` | ✅ done |
| 7 | Shared renderer components | ✅ done |
| 8 | `ThinkingIndicator` + `ConversationSkeleton` | ✅ done (skeleton not yet wired) |
| 9 | `ClarificationForm` | ✅ done |
| 10 | Five renderers | ✅ done |
| 11 | `AssistantMessage` + `UserMessage` + `MessageList` | ✅ done |
| 12 | `dashboard/page.tsx` wiring | ✅ done |
| 13 | Wire `Recents` to conversations-store | ✅ done |
| 14 | Wire `RightHeader` to chat-store | ✅ done |
| 15 | Responsive layout + mobile drawer | ✅ done |
| 16 | DemoControls dev panel | ✅ done — delete before launch |
| 17 | ConversationSkeleton wiring | 🔧 build now — spec in section 11 |
| 18 | OwnersDetails dropdown | 🔧 build now — spec in section 12 |
| 19 | Upgrade modal | 🔧 build now — spec in section 13 |
| — | Middleware | ⏸ backend dependency |
| — | Streaming text renderer | ⏸ backend dependency |
| — | Completion verification ping | ⏸ backend dependency |
| — | ActionBar feedback API | ⏸ backend dependency |

---

## 11. ConversationSkeleton wiring

### What to do
Add `isLoadingMessages: boolean` to `chat-store`, show `ConversationSkeleton` in `DashboardChat` while it's true.

### chat-store changes
```ts
// Add to ChatStore interface in src/types/store.ts
isLoadingMessages: boolean

// Add to chat-store.ts state
isLoadingMessages: false,

// Update loadConversation in chat-store.ts
loadConversation: async (id) => {
  set({ isLoadingMessages: true, messages: [], activeConversationId: id })
  try {
    // API call goes here — populate messages from response
    // set({ messages: result })
  } catch {
    set({ error: "Failed to load conversation." })
  } finally {
    set({ isLoadingMessages: false })
  }
},
```

### DashboardChat changes
```tsx
const isLoadingMessages = useChatStore((s) => s.isLoadingMessages)

// In conversation mode, before MessageList:
{isLoadingMessages ? (
  <ConversationSkeleton />
) : (
  <MessageList />
)}
```

---

## 12. OwnersDetails dropdown

### What it is
The existing `OwnersDetails.tsx` shows the workspace name and avatar. Extend it into a clickable dropdown that reveals the user's account summary. No new component needed — modify `OwnersDetails.tsx` in place.

### Visual structure
```
[OwnersDetails card — always visible]
  Avatar  "DeBee's Vibecraft"  <ChevronDown icon — rotates 180° when open>

[Dropdown panel — shown on click, bg-surface border border-subtle rounded-xl shadow]
  ┌─────────────────────────────────┐
  │  Tier badge                     │  e.g. "Free", "Beginner", "Pro"
  │  <Typography variant="label-sm" className="bg-brand text-white rounded px-2 py-0.5">
  │                                 │
  │  Token balance                  │  (Beginner + Pro only — hide for Free)
  │  <Typography variant="label-sm" className="text-muted">Tokens remaining</Typography>
  │  <Typography variant="heading-h4" className="text-left text-primary">{tokenBalance.toLocaleString()}</Typography>
  │                                 │
  │  Referral earnings              │  (All tiers)
  │  <Typography variant="label-sm" className="text-muted">Referral earnings</Typography>
  │  <Typography variant="heading-h4" className="text-left text-brand">₦{referralEarnings.toLocaleString()}</Typography>
  │                                 │
  │  divider                        │
  │  <Button variant="default" className="w-full">Upgrade to Pro</Button>  (hide if already Pro)
  └─────────────────────────────────┘
```

### Implementation notes
- `"use client"` — needs `useState` for open/close
- Use `useAuthStore` to read `tier`, `tokenBalance`, `referralEarnings`
- ChevronDown from lucide-react — rotate with `transition-transform duration-200 ${open ? "rotate-180" : ""}`
- Close on outside click — attach a `useEffect` with a `mousedown` listener on `document`, or use the Radix `Popover` primitive already available via shadcn
- Token balance: only render that row when `tier === "beginner" || tier === "pro"`
- Upgrade button: only render when `tier !== "pro"`. Clicking it opens the upgrade modal (section 13). Wire with a callback prop or a `ui-store` flag `upgradeModalOpen`
- Add `upgradeModalOpen: boolean` + `setUpgradeModalOpen: (v: boolean) => void` to `ui-store`

### File to modify
`src/app/(dashboard)/dashboard/_components/OwnersDetails.tsx`

---

## 13. Upgrade modal

### What it is
A full-screen-dimmed modal that slides up when the user clicks "Upgrade to Pro" anywhere in the dashboard. It reuses the existing `Pricing` component from the marketing page — same cards, same layout, no duplication.

### Trigger points
- "Upgrade to Pro" button in the OwnersDetails dropdown (section 12)
- "Upgrade to Pro" CTA at the bottom of `LeftDashboard.tsx` (already exists as a static element — make it open the modal)
- `TierGate` fallback — when a Free user hits a locked feature

### State
Add to `ui-store.ts`:
```ts
upgradeModalOpen: boolean
setUpgradeModalOpen: (v: boolean) => void
```

### Implementation
```tsx
// src/app/(dashboard)/dashboard/_components/UpgradeModal.tsx
"use client"
import { useUiStore } from "@/store/ui-store"
import { Pricing } from "@/app/(marketplace)/_components/Pricing"

export function UpgradeModal() {
  const { upgradeModalOpen, setUpgradeModalOpen } = useUiStore()
  if (!upgradeModalOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setUpgradeModalOpen(false)}
      />

      {/* Panel */}
      <div className="relative z-10 bg-canvas rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        {/* Close button */}
        <button
          onClick={() => setUpgradeModalOpen(false)}
          className="absolute top-4 right-4 text-muted hover:text-primary transition-colors"
          aria-label="Close upgrade modal"
        >
          <X size={20} />
        </button>

        {/* Reuse the existing Pricing component */}
        <Pricing />
      </div>
    </div>
  )
}
```

### Important rules for this component
- **Import `Pricing` directly** from `@/app/(marketplace)/_components/Pricing` — do NOT copy or recreate it
- **Do NOT modify `Pricing.tsx`** — it's in the marketplace route group (read-only)
- If `Pricing.tsx` has layout padding or margins that look wrong inside the modal, wrap it in a `<div className="px-0">` override — do not edit the source file
- Mount `<UpgradeModal />` in `DashboardChat.tsx` or `layout.tsx` so it's always available
- ESC key closes the modal — add `useEffect` keydown listener for `Escape`
- Body scroll lock while open — `document.body.style.overflow = "hidden"` on open, restore on close
- If `Pricing.tsx` CTA buttons currently link to `/register` or external URLs, they will still work — the payment wiring comes in Week 8, not now

### File to create
`src/app/(dashboard)/dashboard/_components/UpgradeModal.tsx`
