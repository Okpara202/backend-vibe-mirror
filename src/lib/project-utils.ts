import type { Tier } from "@/types";
import { TIER_FEATURES } from "./constants";

/**
 * Project creation gating is count-based, not boolean — so it lives outside
 * TierGate (which is for boolean feature flags). Pass the user's tier and
 * how many active projects they currently have; returns whether another
 * project can be created. `maxProjects: -1` means unlimited (Pro tier).
 */
export function canCreateProject(
  tier: Tier,
  currentProjectCount: number,
): boolean {
  const max = TIER_FEATURES[tier].maxProjects;
  if (max === -1) return true;
  return currentProjectCount < max;
}
