import LeftDashboard from "./_components/LeftDashboard";
import RightHeader from "./_components/RightHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="basis-[23%] bg-sidebar-fill h-screen sticky top-0">
        <LeftDashboard />
      </aside>
      <aside className="flex-1 border-l border-default min-h-screen">
        <RightHeader />
        {children}
      </aside>
    </div>
  );
}
