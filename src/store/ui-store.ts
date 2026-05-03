"use client";
import { create } from "zustand";

interface UIStore {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  upgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  upgradeModalOpen: false,
  setUpgradeModalOpen: (open) => set({ upgradeModalOpen: open }),
}));
