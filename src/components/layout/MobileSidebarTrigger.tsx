"use client";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { ToggleLeftSideBar } from "@/app/(user)/_components/LeftDashboardSvgIcons";

export default function MobileSidebarTrigger() {
  const desktopSidebarCollapsed = useUIStore(
    (s) => s.desktopSidebarCollapsed,
  );
  const setMobileSidebarOpen = useUIStore((s) => s.setMobileSidebarOpen);
  const setDesktopSidebarCollapsed = useUIStore(
    (s) => s.setDesktopSidebarCollapsed,
  );

  // <lg: opens drawer. lg+: expands collapsed sidebar.
  // Both setters fire — only the relevant one has visual effect at the
  // current viewport, so we don't need to read screen size in JS.
  const handleClick = () => {
    setMobileSidebarOpen(true);
    setDesktopSidebarCollapsed(false);
  };

  return (
    <button
      type="button"
      aria-label="Open sidebar"
      onClick={handleClick}
      className={cn(
        "fixed top-7 left-4 z-30 text-icon-secondary hover:text-primary",
        !desktopSidebarCollapsed && "lg:hidden",
      )}
    >
      <ToggleLeftSideBar />
    </button>
  );
}
