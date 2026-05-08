"use client";

import { useAuthStore } from "@/store/auth-store";
import { useUIStore } from "@/store/ui-store";
import { TIER_FEATURES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";

// Only boolean feature flags belong to TierGate. Count-based gates (e.g.
// `maxProjects`) use the `canCreateProject` helper instead — see
// src/lib/project-utils.ts. This filter narrows the Feature type so the
// non-boolean keys are caught at compile time.
type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];
type Feature = BooleanKeys<typeof TIER_FEATURES.free>;

interface TierGateProps {
  feature: Feature;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function TierGate({
  feature,
  children,
  fallback = null,
}: TierGateProps) {
  const tier = useAuthStore((s) => s.tier);
  const allowed = TIER_FEATURES[tier]?.[feature] ?? false;
  if (!allowed) return <>{fallback}</>;
  return <>{children}</>;
}

interface UpgradePromptProps {
  message?: string;
}

export function UpgradePrompt({
  message = "This feature is available on paid plans.",
}: UpgradePromptProps) {
  const setUpgradeModalOpen = useUIStore((s) => s.setUpgradeModalOpen);
  return (
    <div className="flex flex-col items-center gap-3 p-6 bg-surface border border-subtle rounded-xl text-center">
      <Typography variant="body-sm" className="text-secondary">
        {message}
      </Typography>
      <Button variant="default" onClick={() => setUpgradeModalOpen(true)}>
        Upgrade to Pro
      </Button>
    </div>
  );
}
