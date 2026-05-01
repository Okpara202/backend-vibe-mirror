import Avatar from "@/app/(marketplace)/_components/Avatar";
import { Typography } from "@/components/ui/Typography";

export default function OwnersDetails() {
  return (
    <div className="border border-subtle px-4 py-2 flex items-center gap-4 bg-surface rounded-[8px]">
      <Avatar name="D" />
      <Typography variant="body-sm" className="text-secondary">
        DeBee&apos;s Vibecraft
      </Typography>
    </div>
  );
}
