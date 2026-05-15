"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

interface MobileSidebarDrawerProps {
  children: ReactNode;
}

export default function MobileSidebarDrawer({
  children,
}: MobileSidebarDrawerProps) {
  const open = useUIStore((s) => s.mobileSidebarOpen);
  const setOpen = useUIStore((s) => s.setMobileSidebarOpen);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, setOpen]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar navigation"
        aria-hidden={!open}
        className={cn(
          "fixed top-0 left-0 h-full w-[80%] max-w-[320px] z-50 bg-sidebar-fill",
          "transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {children}
      </aside>
    </>
  );
}
