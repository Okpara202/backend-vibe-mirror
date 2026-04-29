import { Typography } from "@/components/ui/Typography";

// Avatar.tsx
type AvatarProps = {
  name: string; // required
  color?: string; // optional
};

export default function Avatar({ name, color }: AvatarProps) {
  const initial = name[0].toUpperCase();

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "40px",
        padding: "10px",
        backgroundColor: color ?? "#F27A1A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="heading-h4" className="text-[#FFFFFF]">
        {initial}
      </Typography>
    </div>
  );
}
