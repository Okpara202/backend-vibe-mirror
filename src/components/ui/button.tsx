import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // ── Base styles ──
  "inline-flex shrink-0 items-center justify-center rounded-lg font-sans font-medium whitespace-nowrap transition-all outline-none select-none cursor-pointer disabled:pointer-events-none text-[16px] leading-[29px] tracking-[0%] px-6 py-[10px]",
  {
    variants: {
      variant: {
        // ── Default (Brand Orange) ──
        default: [
          "bg-[#F27A1A] text-white",
          "hover:bg-[#FF9A3E]",
          "disabled:bg-[#FFD4A8] disabled:text-white/60",
          "dark:hover:bg-[#D4780A]",
          "dark:disabled:bg-[#5C3A18] dark:disabled:text-white/40",
        ],

        // ── Outline ──
        outline: [
          "border border-[#DDDCD6] bg-[#ffffff] text-[#141311]",
          "hover:bg-[#F7F6F3]",
          "disabled:border-[#EDECE8] disabled:bg-[#F7F6F3] disabled:text-[#A3A29A]",
          "dark:border-[#3D3C38] dark:bg-[#1E1D1A] dark:text-[#F5F4F1]",
          "dark:hover:bg-[#252420]",
          "dark:disabled:border-[#2A2926] dark:disabled:bg-[#141311] dark:disabled:text-[#5A5954]",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
