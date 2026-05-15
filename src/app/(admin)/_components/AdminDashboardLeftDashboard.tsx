import SidebarCollapseToggle from "@/components/layout/SidebarCollapseToggle";

import VibeCraftLogo from "@/components/ui/Logo";
import AdminSideNavLink from "./AdminSideNavLink";
import AdminTag from "./AdminTag";

export default function AdminDashboardLeftDashboard() {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-default h-[78px] px-6 flex items-center justify-between shrink-0">
        <VibeCraftLogo />
        <SidebarCollapseToggle />
      </div>

      <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-8 py-8">
        <AdminSideNavLink />
      </div>

      <div className="px-6 pb-5 pt-4 shrink-0">
        <AdminTag />
      </div>
    </div>
  );
}
