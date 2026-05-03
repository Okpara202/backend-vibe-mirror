"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import Avatar from "@/app/(marketplace)/_components/Avatar";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { TIER_FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function OwnersDetails() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const tier = useAuthStore((s) => s.tier);
  const tokenBalance = useAuthStore((s) => s.tokenBalance);
  const referralEarnings = useAuthStore((s) => s.referralEarnings);
  const setUpgradeModalOpen = useUIStore((s) => s.setUpgradeModalOpen);

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  const tierLabel = TIER_FEATURES[tier].label;
  const showTokenBalance = tier === "beginner" || tier === "pro";
  const showUpgrade = tier !== "pro";

  function handleUpgradeClick() {
    setOpen(false);
    setUpgradeModalOpen(true);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="w-full border border-subtle px-4 py-2 flex items-center gap-4 bg-surface rounded-[8px] hover:bg-sidebar-fill-active transition-colors"
      >
        <Avatar name="D" />
        <Typography
          variant="body-sm"
          className="text-secondary flex-1 text-left"
        >
          DeBee&apos;s Vibecraft
        </Typography>
        <ChevronDown
          size={16}
          className={cn(
            "text-icon-secondary transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 right-0 top-full mt-2 z-20 bg-surface border border-subtle rounded-xl shadow-lg p-4 flex flex-col gap-4"
        >
          <div>
            <Typography
              variant="label-sm"
              className="bg-brand text-white rounded px-2 py-0.5 inline-block"
            >
              {tierLabel}
            </Typography>
          </div>

          {showTokenBalance && (
            <div className="flex flex-col gap-1">
              <Typography variant="label-sm" className="text-muted">
                Tokens remaining
              </Typography>
              <Typography
                variant="heading-h4"
                className="text-left text-primary"
              >
                {tokenBalance.toLocaleString()}
              </Typography>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <Typography variant="label-sm" className="text-muted">
              Referral earnings
            </Typography>
            <Typography variant="heading-h4" className="text-left text-brand">
              ₦{referralEarnings.toLocaleString()}
            </Typography>
          </div>

          {showUpgrade && (
            <>
              <div className="border-t border-subtle" />
              <Button
                variant="default"
                className="w-full"
                onClick={handleUpgradeClick}
              >
                Upgrade to Pro
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
