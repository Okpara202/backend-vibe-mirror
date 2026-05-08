"use client";
import { create } from "zustand";

type SidebarMode = "global" | "project";

interface UIStore {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  desktopSidebarCollapsed: boolean;
  setDesktopSidebarCollapsed: (collapsed: boolean) => void;
  upgradeModalOpen: boolean;
  setUpgradeModalOpen: (open: boolean) => void;
  activeProjectId: string | null;
  sidebarMode: SidebarMode;
  setActiveProjectId: (id: string | null) => void;
  setSidebarMode: (mode: SidebarMode) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  desktopSidebarCollapsed: false,
  setDesktopSidebarCollapsed: (collapsed) =>
    set({ desktopSidebarCollapsed: collapsed }),
  upgradeModalOpen: false,
  setUpgradeModalOpen: (open) => set({ upgradeModalOpen: open }),
  activeProjectId: null,
  sidebarMode: "global",
  setActiveProjectId: (id) => set({ activeProjectId: id }),
  setSidebarMode: (mode) => set({ sidebarMode: mode }),
}));
