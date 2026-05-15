"use client";

import { Typography } from "@/components/ui/Typography";
import { useUIStore } from "@/store/ui-store";
import { UpgradeIcon } from "./LeftDashboardSvgIcons";

export default function UpgradeProBadge() {
  const setUpgradeModalOpen = useUIStore((s) => s.setUpgradeModalOpen);

  return (
    <button
      type="button"
      onClick={() => setUpgradeModalOpen(true)}
      className="w-fit bg-sidebar-fill-active flex py-2 px-4 gap-3 border rounded-[8px] border-subtle items-center hover:opacity-90 transition-opacity cursor-pointer text-left"
    >
      <UpgradeIcon />
      <aside>
        <Typography variant="body-sm" className="text-[#B0460B]">
          Upgrade to Pro
        </Typography>
        <Typography variant="body-sm" className="text-sidebar-active-link">
          Unlock more Features
        </Typography>
      </aside>
    </button>
  );
}
