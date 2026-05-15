"use client";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import MobileSidebarDrawer from "@/components/layout/MobileSidebarDrawer";
import MobileSidebarTrigger from "@/components/layout/MobileSidebarTrigger";
import AdminDashboardLeftDashboard from "./_components/AdminDashboardLeftDashboard";

export default function AdminDashboardLayout({
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
        <AdminDashboardLeftDashboard />
      </aside>
      <MobileSidebarDrawer>
        <AdminDashboardLeftDashboard />
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
    </div>
  );
}
