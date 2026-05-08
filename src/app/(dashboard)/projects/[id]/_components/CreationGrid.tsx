"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import DotTextTag from "@/components/ui/DotTextTag";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { useConversationsStore } from "@/store/conversations-store";
import type { ConversationMeta, CreationType } from "@/types";

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

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CreationCard({
  projectId,
  conv,
}: {
  projectId: string;
  conv: ConversationMeta;
}) {
  return (
    <Link
      href={`/projects/${projectId}/chat/${conv.id}`}
      className="rounded-[12px] border border-subtle p-5 flex flex-col gap-3 min-h-44 hover:bg-surface transition-all duration-300"
    >
      {conv.type && (
        <DotTextTag
          text={TYPE_LABEL[conv.type]}
          dotColor={TYPE_DOT_COLOR[conv.type]}
        />
      )}
      <Typography variant="label-md" className="text-primary line-clamp-2">
        {conv.title || "Untitled chat"}
      </Typography>
      <Typography variant="body-sm" className="text-input-helper mt-auto">
        {formatDate(conv.updatedAt)}
      </Typography>
    </Link>
  );
}

export default function CreationGrid({ projectId }: { projectId: string }) {
  const router = useRouter();
  const list = useConversationsStore((s) => s.list);
  const creations = list.filter((c) => c.projectId === projectId);

  const startFirstChat = () => {
    const chatId = crypto.randomUUID();
    router.push(`/projects/${projectId}/chat/${chatId}`);
  };

  if (creations.length === 0) {
    return (
      <section className="mt-8 rounded-[12px] border border-subtle p-10 bg-surface flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-hover flex items-center justify-center">
          <Plus className="w-6 h-6 text-brand" />
        </div>
        <Typography variant="label-md" className="text-primary">
          No creations yet
        </Typography>
        <Typography variant="body-sm" className="text-input-helper max-w-sm">
          Start your first creation — Vibe will remember it as part of this
          project.
        </Typography>
        <Button onClick={startFirstChat} className="mt-2">
          Start your first creation
        </Button>
      </section>
    );
  }

  return (
    <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {creations.map((c) => (
        <CreationCard key={c.id} projectId={projectId} conv={c} />
      ))}
    </section>
  );
}
