"use client";
import { usePathname } from "next/navigation";
import {
  ChatSvgIcon,
  HomeSvgIcon,
  ProjectIconSvg,
  SearchIconSvg,
} from "./LeftDashboardSvgIcons";
import Link from "next/link";
import { Typography } from "@/components/ui/Typography";

const links = [
  {
    icon: HomeSvgIcon,
    name: "Home",
    href: "/dashboard",
  },
  {
    icon: ChatSvgIcon,
    name: "Chat",
    href: "#",
  },
  {
    icon: SearchIconSvg,
    name: "Search",
    href: "#",
  },
  {
    icon: ProjectIconSvg,
    name: "Projects",
    href: "#",
  },
];

export default function SideBarLink() {
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
