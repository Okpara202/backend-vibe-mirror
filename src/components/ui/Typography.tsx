import { cn } from "@/lib/utils";

const variantStyles = {
  // ── Display (Instrument Serif, Regular 400) ──
  "display-hero":
    "font-serif font-normal text-[6rem] leading-[6.25rem] tracking-[0%] text-center",
  "display-page":
    "font-serif font-normal text-[4rem] leading-[4.375rem] tracking-[0%] text-center",
  "display-section":
    "font-serif font-normal text-[2.5rem] leading-[2.75rem] tracking-[0%] text-center",

  // ── Headings (Geist, Medium 500) ──
  "heading-h1":
    "font-sans font-medium text-[2rem] leading-[2.375rem] tracking-[0%]",
  "heading-h3":
    "font-sans font-medium text-[1.25rem] leading-[1.75rem] tracking-[0%] text-center",
  "heading-h4":
    "font-sans font-medium text-[1rem] leading-[1.5rem] tracking-[0%] text-center",

  // ── Labels (Geist, Medium 500) ──
  "label-lg":
    "font-sans font-medium text-[1rem] leading-[1.8125rem] tracking-[0%]",
  "label-md":
    "font-sans font-medium text-[0.875rem] leading-[1.25rem] tracking-[0%]",
  "label-sm":
    "font-sans font-medium text-[0.75rem] leading-[1rem] tracking-[0%]",

  // ── Body (Geist, Regular 400) ──
  "body-sm":
    "font-sans font-normal text-[0.875rem] leading-[1.25rem] tracking-[0%]",

  // ── Captions ──
  "caption-default":
    "font-sans font-normal text-[0.75rem] leading-[1rem] tracking-[0%]",
  "caption-mono":
    "font-code font-normal text-[0.75rem] leading-[1rem] tracking-[0%]",

  // ── Code (JetBrains Mono, Regular 400) ──
  "code-md":
    "font-code font-normal text-[0.875rem] leading-[1.125rem] tracking-[0%]",
  "code-sm":
    "font-code font-normal text-[0.75rem] leading-[1rem] tracking-[0%]",
} as const;

// ─────────────────────────────────────────────
// Default HTML element per variant
// ─────────────────────────────────────────────

const defaultElement: Record<keyof typeof variantStyles, string> = {
  "display-hero": "h1",
  "display-page": "h1",
  "display-section": "h2",
  "heading-h1": "h1",
  "heading-h3": "h3",
  "heading-h4": "h4",
  "label-lg": "span",
  "label-md": "span",
  "label-sm": "span",
  "body-sm": "p",
  "caption-default": "span",
  "caption-mono": "span",
  "code-md": "code",
  "code-sm": "code",
};

// Types
type Variant = keyof typeof variantStyles;

type TypographyProps = {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function Typography({
  variant,
  children,
  className,
  as,
}: TypographyProps) {
  const Tag = as ?? defaultElement[variant];

  return (
    <Tag className={cn(variantStyles[variant], className)}>{children}</Tag>
  );
}

// usage
{
  /* <Typography variant="display-hero">Welcome</Typography>
<Typography variant="heading-h1">Title</Typography>
<Typography variant="label-md">Form label</Typography>
<Typography variant="code-md">npm install</Typography> 
// Renders as a div instead of h1
<Typography variant="display-hero" as="div">
  content here
</Typography>
*/
}
