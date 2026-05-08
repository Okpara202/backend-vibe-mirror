"use client";
import { create } from "zustand";
import type { ProjectStore } from "@/types";

export const useProjectStore = create<ProjectStore>((set) => ({
  activeProject: null,
  projects: [],
  isLoading: false,

  setActiveProject: (p) => set({ activeProject: p }),
  setProjects: (list) => set({ projects: list }),

  addProject: (p) =>
    set((s) => ({
      projects: [p, ...s.projects.filter((x) => x.id !== p.id)],
    })),

  updateProject: (id, patch) =>
    set((s) => ({
      projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      activeProject:
        s.activeProject?.id === id
          ? { ...s.activeProject, ...patch }
          : s.activeProject,
    })),

  removeProject: (id) =>
    set((s) => ({
      projects: s.projects.filter((p) => p.id !== id),
      activeProject:
        s.activeProject?.id === id ? null : s.activeProject,
    })),
}));
