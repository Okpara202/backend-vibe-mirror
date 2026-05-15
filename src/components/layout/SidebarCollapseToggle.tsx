"use client";

import { useUIStore } from "@/store/ui-store";
import { ToggleLeftSideBar } from "@/app/(user)/_components/LeftDashboardSvgIcons";

export default function SidebarCollapseToggle() {
  const setMobileSidebarOpen = useUIStore((s) => s.setMobileSidebarOpen);
  const setDesktopSidebarCollapsed = useUIStore(
    (s) => s.setDesktopSidebarCollapsed,
  );

  // <lg: closes drawer. lg+: collapses sidebar.
  const handleClick = () => {
    setMobileSidebarOpen(false);
    setDesktopSidebarCollapsed(true);
  };

  return (
    <button
      type="button"
      aria-label="Collapse sidebar"
      onClick={handleClick}
      className="text-icon-secondary hover:text-primary"
    >
      <ToggleLeftSideBar />
    </button>
  );
}
