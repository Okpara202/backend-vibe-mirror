import { Typography } from "@/components/ui/Typography";

export default function PillButton({
  tag,
  bgColor,
  dotColor,
}: {
  tag: string;
  bgColor: string; // e.g. "#EDE9FE"
  dotColor: string; // e.g. "#7C3AED"
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 16px",
        borderRadius: "9999px",
        backgroundColor: bgColor,
      }}
    >
      {/* dot */}
      <span
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: dotColor,
          flexShrink: 0,
        }}
      />
      {/* label */}
      <Typography variant="caption-default" className="text-secondary">
        {tag}
      </Typography>
    </div>
  );
}
