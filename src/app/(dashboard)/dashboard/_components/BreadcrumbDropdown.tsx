"use client";

import { useRouter } from "next/navigation";
import { Typography } from "@/components/ui/Typography";
import { useConversationsStore } from "@/store/conversations-store";
import { useProjectStore } from "@/store/project-store";

interface BreadcrumbDropdownProps {
  projectId: string;
  onClose: () => void;
}

export default function BreadcrumbDropdown({
  projectId,
  onClose,
}: BreadcrumbDropdownProps) {
  const router = useRouter();
  const conversations = useConversationsStore((s) => s.list);
  const allProjects = useProjectStore((s) => s.projects);

  const projectChats = conversations.filter(
    (c) => c.projectId === projectId,
  );
  const otherProjects = allProjects.filter(
    (p) => p.id !== projectId && p.status === "active",
  );

  const goTo = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="absolute left-0 top-full mt-2 w-72 bg-surface border border-subtle rounded-xl shadow-lg z-30 overflow-hidden">
      <Section label="Chats in this project">
        {projectChats.length === 0 ? (
          <EmptyHint>No chats yet</EmptyHint>
        ) : (
          projectChats.slice(0, 6).map((c) => (
            <Row
              key={c.id}
              onClick={() => goTo(`/projects/${projectId}/chat/${c.id}`)}
            >
              {c.title || "Untitled chat"}
            </Row>
          ))
        )}
      </Section>

      <Section label="Your projects">
        {otherProjects.length === 0 ? (
          <EmptyHint>No other projects</EmptyHint>
        ) : (
          otherProjects.slice(0, 6).map((p) => (
            <Row key={p.id} onClick={() => goTo(`/projects/${p.id}`)}>
              {p.name}
            </Row>
          ))
        )}
      </Section>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-subtle last:border-b-0 py-1">
      <div className="px-4 pt-2 pb-1">
        <Typography variant="body-sm" className="text-muted text-[11px]">
          {label.toUpperCase()}
        </Typography>
      </div>
      {children}
    </div>
  );
}

function Row({
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
      className="block w-full text-left px-4 py-2 text-sm text-primary hover:bg-hover/60 truncate"
    >
      {children}
    </button>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2">
      <Typography variant="body-sm" className="text-input-helper">
        {children}
      </Typography>
    </div>
  );
}
