"use client";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import LeftDashboard from "./_components/LeftDashboard";
import MobileSidebarDrawer from "@/components/layout/MobileSidebarDrawer";
import MobileSidebarTrigger from "@/components/layout/MobileSidebarTrigger";
import ProjectDevControls from "./_components/ProjectDevControls";
import UpgradeModal from "./_components/UpgradeModal";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const desktopSidebarCollapsed = useUIStore((s) => s.desktopSidebarCollapsed);

  return (
    <div className="flex">
      <aside
        className={cn(
          "hidden bg-sidebar-fill h-screen sticky top-0",
          !desktopSidebarCollapsed && "lg:block lg:basis-[23%]",
        )}
      >
        <LeftDashboard />
      </aside>
      <MobileSidebarDrawer>
        <LeftDashboard />
      </MobileSidebarDrawer>
      <MobileSidebarTrigger />
      <aside
        className={cn(
          "flex-1 border-default min-h-screen bg-canvas min-w-0",
          !desktopSidebarCollapsed && "lg:border-l",
        )}
      >
        {children}
      </aside>
      <UpgradeModal />
      <ProjectDevControls />
    </div>
  );
}
