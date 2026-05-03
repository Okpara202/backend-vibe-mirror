"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import Pricing from "@/app/(marketplace)/_components/Pricing";

export default function UpgradeModal() {
  const upgradeModalOpen = useUIStore((s) => s.upgradeModalOpen);
  const setUpgradeModalOpen = useUIStore((s) => s.setUpgradeModalOpen);

  useEffect(() => {
    if (!upgradeModalOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setUpgradeModalOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [upgradeModalOpen, setUpgradeModalOpen]);

  if (!upgradeModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Upgrade plan"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setUpgradeModalOpen(false)}
      />

      <div className="relative z-10 bg-canvas rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        <button
          type="button"
          onClick={() => setUpgradeModalOpen(false)}
          className="absolute top-4 right-4 text-muted hover:text-primary transition-colors z-10"
          aria-label="Close upgrade modal"
        >
          <X size={20} />
        </button>

        <div className="px-0">
          <Pricing />
        </div>
      </div>
    </div>
  );
}
