"use client";

import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function TabButton({ active, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
        active
          ? "bg-surface text-primary shadow-sm"
          : "text-secondary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

export function DeviceButton({
  active,
  onClick,
  label,
  children,
}: ToolbarButtonProps & { label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "p-1.5 rounded transition-colors cursor-pointer",
        active ? "bg-subtle text-primary" : "text-muted hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
