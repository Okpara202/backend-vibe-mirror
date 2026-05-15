import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { AdminUser } from "@/types/admin";
import { RecentUsersPlanBadge } from "./RecentUsersPlanBadge";

interface RecentUsersTableRowProps {
  user: AdminUser;
  withDivider: boolean;
}

export function RecentUsersTableRow({
  user,
  withDivider,
}: RecentUsersTableRowProps) {
  return (
    <tr className={cn(withDivider && "general-border")}>
      <td className="py-4 pr-4">
        <div className="flex flex-col gap-0.5">
          <Typography variant="body-sm" className="text-primary">
            {user.name}
          </Typography>
          <Typography variant="label-sm" className="text-secondary">
            {user.email}
          </Typography>
        </div>
      </td>

      <td className="py-4 pr-4">
        <RecentUsersPlanBadge tier={user.tier} />
      </td>

      <td className="py-4 pr-4">
        <Typography variant="body-sm" className="text-primary">
          {user.projects}
        </Typography>
      </td>

      <td className="py-4 pr-4">
        <Typography variant="body-sm" className="text-primary">
          {user.lastActive}
        </Typography>
      </td>

      <td className="py-4 pr-4">
        <Typography variant="body-sm" className="text-primary">
          {user.revenue}
        </Typography>
      </td>

      <td className="py-4">
        <Typography variant="body-sm" className="text-primary">
          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
        </Typography>
      </td>
    </tr>
  );
}
