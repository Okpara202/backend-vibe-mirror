"use client";

import DotTextTag from "@/components/ui/DotTextTag";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useChatStore } from "@/store/chat-store";
import { useConversationsStore } from "@/store/conversations-store";
import { useUIStore } from "@/store/ui-store";
import type { CreationType, Message, UserMessage } from "@/types";
import {
  CodeTagIcon,
  GlobeIcon,
  PaperIcon,
} from "../../_components/LeftDashboardSvgIcons";

const TYPE_LABEL: Record<CreationType, string> = {
  website: "Website",
  book: "Book",
  game: "Game",
  art: "Art",
};

const TYPE_DOT_COLOR: Record<CreationType, string> = {
  website: "#22C55E",
  book: "#F27A1A",
  game: "#4ADE80",
  art: "#FB923C",
};

const isUserMessage = (m: Message): m is UserMessage => m.role === "user";

const isCreationType = (t: string): t is CreationType =>
  t === "website" || t === "book" || t === "game" || t === "art";

function deriveTitle(
  activeTitle: string | undefined,
  firstUserText: string | undefined,
): string {
  if (activeTitle) return activeTitle;
  if (firstUserText) {
    return firstUserText.length > 60
      ? `${firstUserText.slice(0, 60)}…`
      : firstUserText;
  }
  return "New chat";
}

function deriveType(
  messages: Message[],
  selectedType: CreationType | null,
): CreationType | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === "assistant" && isCreationType(m.type)) {
      return m.type;
    }
  }
  return selectedType;
}

export default function RightHeader() {
  const messages = useChatStore((s) => s.messages);
  const selectedType = useChatStore((s) => s.selectedType);
  const activeId = useChatStore((s) => s.activeConversationId);
  const list = useConversationsStore((s) => s.list);
  const desktopSidebarCollapsed = useUIStore(
    (s) => s.desktopSidebarCollapsed,
  );

  const activeConv = activeId
    ? list.find((c) => c.id === activeId)
    : undefined;
  const firstUserText = messages.find(isUserMessage)?.content.text;

  const title = deriveTitle(activeConv?.title, firstUserText);
  const type = deriveType(messages, selectedType);

  return (
    <div
      className={cn(
        "bg-sidebar-fill border-b border-default h-[78px] flex items-center justify-between gap-3",
        "pl-12 pr-4",
        desktopSidebarCollapsed ? "lg:pl-12 lg:pr-6" : "lg:px-6",
      )}
    >
      <aside className="flex items-center gap-3 min-w-0 flex-1">
        <Typography variant="body-sm" className="text-secondary truncate">
          {title}
        </Typography>
        {type && (
          <DotTextTag text={TYPE_LABEL[type]} dotColor={TYPE_DOT_COLOR[type]} />
        )}
      </aside>
      <aside className="hidden md:flex items-center gap-2 shrink-0">
        <GlobeIcon className="text-icon-secondary" />
        <CodeTagIcon className="text-icon-secondary" />
        <PaperIcon className="text-icon-secondary" />
      </aside>
    </div>
  );
}
