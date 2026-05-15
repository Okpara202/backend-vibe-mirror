"use client";

import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/store/admin-store";
import type { AdminPeriod } from "@/types/admin";

import { BackIcon, NotificationIcon } from "./AdminOverviewIcons";

const headerButtonsText: AdminPeriod[] = ["24h", "7d", "30d", "90d"];

const buttonBase =
  "cursor-pointer border-[0.5px] border-default rounded-[8px] w-11 h-11 flex items-center justify-center";

export default function AdminDashboardOverviewHeader() {
  const period = useAdminStore((s) => s.period);
  const setPeriod = useAdminStore((s) => s.setPeriod);

  return (
    <div className="bg-surface border-b border-default flex flex-col lg:flex-row lg:items-center lg:justify-between lg:h-[78px] lg:px-8">
      <div className="h-[78px] flex items-center pl-14 pr-4 lg:h-auto lg:p-0">
        <Typography variant="heading-h3" className="text-primary">
          Overview
        </Typography>
      </div>

      <aside className="flex flex-wrap items-center gap-2 px-4 pb-4 lg:p-0">
        {headerButtonsText.map((btnText) => {
          const isActive = period === btnText;
          return (
            <button
              key={btnText}
              onClick={() => setPeriod(btnText)}
              className={cn(
                buttonBase,
                isActive ? "bg-brand text-white" : "bg-transparent",
              )}
            >
              <Typography
                variant="label-sm"
                className={isActive ? "text-white" : "text-primary"}
              >
                {btnText}
              </Typography>
            </button>
          );
        })}
        <button className={cn(buttonBase, "bg-transparent")}>
          <BackIcon />
        </button>
        <button className={cn(buttonBase, "bg-transparent")}>
          <NotificationIcon />
        </button>
      </aside>
    </div>
  );
}
