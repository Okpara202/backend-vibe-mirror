import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { REFERRAL_LINKS } from "@/lib/constants";

interface ReferralLinksProps {
  label?: string;
  description?: string;
  links?: ReadonlyArray<{ label: string; href: string }>;
}

const DEFAULT_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  REFERRAL_LINKS.claude,
  REFERRAL_LINKS.cursor,
  REFERRAL_LINKS.chatgpt,
  REFERRAL_LINKS.lovable,
];

export function ReferralLinks({
  label = "Take it elsewhere",
  description = "Copy the source code or prompt to continue on another platform.",
  links = DEFAULT_LINKS,
}: ReferralLinksProps) {
  return (
    <div className="bg-surface border border-subtle rounded-xl p-5">
      <Typography
        variant="label-md"
        className="text-left text-primary block"
      >
        {label}
      </Typography>
      <Typography
        variant="body-sm"
        className="text-muted text-left mt-1 block"
      >
        {description}
      </Typography>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {links.map((link) => (
          <Button key={link.label} asChild variant="outline">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
