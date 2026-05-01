"use client";
import { create } from "zustand";
import type { AuthStore } from "@/types";

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  tier: "free",
  tokenBalance: 0,
  referralEarnings: 0,
  setSession: (payload) =>
    set({
      user: payload.user,
      tier: payload.tier,
      tokenBalance: payload.tokenBalance,
      referralEarnings: payload.referralEarnings,
    }),
  updateTokenBalance: (n) => set({ tokenBalance: n }),
  clearSession: () =>
    set({
      user: null,
      tier: "free",
      tokenBalance: 0,
      referralEarnings: 0,
    }),
}));
