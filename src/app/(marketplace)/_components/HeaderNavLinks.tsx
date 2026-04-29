import { Typography } from "@/components/ui/Typography";

export default function HeaderNavLinks({ href }: { href: string }) {
  return (
    <>
      <Typography variant="body-sm" className="text-secondary hover:text-brand">
        {href}
      </Typography>
    </>
  );
}
