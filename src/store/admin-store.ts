"use client";

import { create } from "zustand";
import type { AdminOverviewData, AdminPeriod } from "@/types/admin";

interface AdminStore {
  overview: AdminOverviewData | null;
  period: AdminPeriod;
  isLoading: boolean;
  error: string | null;
  setPeriod: (p: AdminPeriod) => void;
  fetchOverview: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  overview: null,
  period: "7d",
  isLoading: false,
  error: null,

  setPeriod: (p) => {
    set({ period: p });
    get().fetchOverview();
  },

  fetchOverview: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: uncomment when backend is ready
      // const { data } = await getAdminOverview(get().period)
      // set({ overview: data, isLoading: false })

      // Stub — remove when API is ready
      set({ isLoading: false });
    } catch {
      set({ error: "Failed to load admin overview.", isLoading: false });
    }
  },
}));
