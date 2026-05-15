"use client";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { Typography } from "@/components/ui/Typography";
import {
  AdminHomeIcon,
  AdminProjectIconSvg,
  AdminRevenueIcon,
  AdminUserIconSvg,
} from "./AdminSvgIcons";

const links = [
  {
    icon: AdminHomeIcon,
    name: "Dashboard Overview",
    href: "/admin-dashboard-overview",
  },
  {
    icon: AdminProjectIconSvg,
    name: "Project Moderation",
    href: "#",
  },
  {
    icon: AdminUserIconSvg,
    name: "User Management",
    href: "#",
  },
  {
    icon: AdminRevenueIcon,
    name: "Revenue & Billing",
    href: "#",
  },
];

export default function AdminSideNavLink() {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => {
        const active =
          link.href === "/dashboard"
            ? pathName === link.href
            : pathName.startsWith(link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-2.5 py-2 px-4 rounded-[8px] ${
              active ? "bg-sidebar-fill-active" : ""
            }`}
          >
            <link.icon
              className={active ? "text-brand" : "text-icon-secondary"}
            />
            <Typography
              variant="body-sm"
              className={
                active ? "text-sidebar-active-link" : "text-sidebar-link-text"
              }
            >
              {link.name}
            </Typography>
          </Link>
        );
      })}
    </div>
  );
}
