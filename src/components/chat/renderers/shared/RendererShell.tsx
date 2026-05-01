import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";
import { ActionBar } from "./ActionBar";
import { ReferralLinks } from "./ReferralLinks";

type DotColor = "brand" | "success" | "building";

interface RendererShellProps {
  messageId: string;
  dotColor: DotColor;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  showReferralLinks?: boolean;
  referralLabel?: string;
  referralDescription?: string;
  textToCopy?: string;
}

// Per Figma note in handoff: building and completed dots both render as brand orange.
// The "success" prop value still maps to brand to honor the Figma design; the green
// success token is reserved for the QualityCheckCard background.
const DOT_CLASSES: Record<DotColor, string> = {
  brand: "bg-brand",
  success: "bg-brand",
  building: "bg-brand animate-pulse",
};

export function RendererShell({
  messageId,
  dotColor,
  title,
  subtitle,
  actions,
  children,
  showReferralLinks = true,
  referralLabel,
  referralDescription,
  textToCopy,
}: RendererShellProps) {
  return (
    <div className="space-y-4">
      <div className="bg-surface border border-subtle rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "inline-block w-2.5 h-2.5 rounded-full shrink-0",
              DOT_CLASSES[dotColor],
            )}
          />
          <div className="flex-1 min-w-0">
            <Typography
              variant="heading-h4"
              className="text-left text-primary block"
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="caption-mono"
                className="text-muted block truncate"
              >
                {subtitle}
              </Typography>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}

        {children}

        <ActionBar messageId={messageId} textToCopy={textToCopy} />
      </div>

      {showReferralLinks && (
        <ReferralLinks
          label={referralLabel}
          description={referralDescription}
        />
      )}
    </div>
  );
}
