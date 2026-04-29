import { Typography } from "@/components/ui/Typography";

export default function NavLinks({
  href,
  color,
}: {
  href: string;
  color: string;
}) {
  return (
    <>
      <Typography
        variant="body-sm"
        className={`text-${color} hover:text-brand`}
      >
        {href}
      </Typography>
    </>
  );
}
