import LeftDashboard from "./_components/LeftDashboard";
import MobileSidebarDrawer from "./_components/MobileSidebarDrawer";
import RightHeader from "./_components/RightHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="hidden lg:block lg:basis-[23%] bg-sidebar-fill h-screen sticky top-0">
        <LeftDashboard />
      </aside>
      <MobileSidebarDrawer />
      <aside className="flex-1 lg:border-l border-default min-h-screen bg-canvas min-w-0">
        <RightHeader />
        {children}
      </aside>
    </div>
  );
}
