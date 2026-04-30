import { Typography } from "@/components/ui/Typography";

export default function DotTextTag({
  dotColor,
  text,
  onClick,
}: {
  dotColor: string;
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-surface border border-subtle inline-flex items-center gap-2.5 py-2 px-4 rounded-[120px] mx-auto justify-center cursor-pointer transition-colors hover:border-brand"
    >
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: dotColor,
          flexShrink: 0,
        }}
      />
      <Typography variant="body-sm" className="text-secondary">
        {text}
      </Typography>
    </button>
  );
}
