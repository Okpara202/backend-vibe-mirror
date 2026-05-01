import DotTextTag from "@/components/ui/DotTextTag";
import { Typography } from "@/components/ui/Typography";
import { CodeTagIcon, GlobeIcon, PaperIcon } from "./LeftDashboardSvgIcons";

export default function RightHeader() {
  return (
    <div className="bg-sidebar-fill border-b border-default px-6 h-[78px] flex items-center justify-between">
      <aside className="flex items-center gap-3">
        <Typography variant="body-sm" className="text-secondary">
          {/* Change to state to determine topic of the chat later */}
          The Star Fox&apos;s Dream
        </Typography>
        <DotTextTag text="Book" dotColor="#7E3FF2" />
      </aside>
      <aside className="flex items-center gap-2">
        <GlobeIcon className="text-icon-secondary" />
        <CodeTagIcon className="text-icon-secondary" />
        <PaperIcon className="text-icon-secondary" />
      </aside>
    </div>
  );
}
