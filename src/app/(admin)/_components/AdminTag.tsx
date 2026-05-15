import Avatar from "@/app/(marketplace)/_components/Avatar";
import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export default function AdminTag() {
  return (
    <div className="border border-subtle bg-surface px-4 py-2 flex justify-between items-center rounded-[8px]">
      <aside className="flex items-center gap-3">
        <Avatar name="Sunny Basra" />
        <div>
          <Typography variant="body-sm" className="text-primary">
            Sunny Basra
          </Typography>
          <Typography variant="body-sm" className="text-secondary">
            Admin
          </Typography>
        </div>
      </aside>

      <aside>
        <ChevronDown
          size={16}
          className={cn(
            "text-icon-secondary transition-transform duration-200",
            // open && "rotate-180",
          )}
        />
      </aside>
    </div>
  );
}
