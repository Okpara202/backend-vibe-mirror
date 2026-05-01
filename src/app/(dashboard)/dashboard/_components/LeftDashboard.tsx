import VibeCraftLogo from "@/components/ui/Logo";
import { ToggleLeftSideBar, UpgradeIcon } from "./LeftDashboardSvgIcons";
import OwnersDetails from "./OwnersDetails";
import SideBarLink from "./SideBarLink";
import Recents from "./Recents";
import { Typography } from "@/components/ui/Typography";

export default function LeftDashboard() {
  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-default h-[78px] px-6 flex items-center justify-between shrink-0">
        <VibeCraftLogo />
        <ToggleLeftSideBar className="text-icon-secondary" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 flex flex-col gap-8 py-8">
        <OwnersDetails />

        <SideBarLink />

        <Recents />
      </div>

      <div className="px-6 pb-5 pt-4 shrink-0">
        <div className="w-fit bg-sidebar-fill-active flex py-2 px-4 gap-3 border rounded-[8px] border-subtle items-center">
          <UpgradeIcon />
          <aside>
            <Typography variant="body-sm" className="text-[#B0460B]">
              Upgrade to Pro
            </Typography>
            <Typography variant="body-sm" className="text-sidebar-active-link">
              Unlock more Features
            </Typography>
          </aside>
        </div>
      </div>
    </div>
  );
}
