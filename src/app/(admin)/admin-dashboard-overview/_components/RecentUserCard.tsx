"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import type { AdminUser } from "@/types/admin";
import { MOCK_USERS } from "./recent-users.mock";
import { RecentUsersTableRow } from "./RecentUsersTableRow";

const COLUMNS: { label: string; width: string }[] = [
  { label: "User", width: "30%" },
  { label: "Plan", width: "14%" },
  { label: "Projects", width: "10%" },
  { label: "Last Active", width: "15%" },
  { label: "Revenue", width: "16%" },
  { label: "Status", width: "15%" },
];

interface RecentUsersTableProps {
  users?: AdminUser[];
}

export function RecentUserCard({
  users = MOCK_USERS,
}: RecentUsersTableProps) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="px-4 lg:px-8 mt-3">
      <div className="bg-surface rounded-[12px] w-full p-4 lg:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
          <Typography variant="heading-h4" className="text-left text-primary">
            Recent Users
          </Typography>

          <div className="flex items-center gap-2 border border-subtle rounded-[120px] px-4 py-2 bg-canvas w-full sm:w-[220px]">
            <Search size={14} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder="Search users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none w-full font-sans font-normal text-[0.875rem] leading-5 text-primary placeholder:text-muted"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="general-border">
                {COLUMNS.map((col, i) => (
                  <th
                    key={col.label}
                    className={`text-left pb-3 ${i < COLUMNS.length - 1 ? "pr-4" : ""}`}
                    style={{ width: col.width }}
                  >
                    <Typography
                      variant="label-md"
                      className="text-secondary text-left"
                    >
                      {col.label}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.map((user, index) => (
                <RecentUsersTableRow
                  key={user.id}
                  user={user}
                  withDivider={index < filtered.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
