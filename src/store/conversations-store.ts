"use client";
import { create } from "zustand";
import type { ConversationsStore } from "@/types";

export const useConversationsStore = create<ConversationsStore>((set) => ({
  list: [],
  isLoading: false,
  fetchAll: async () => {
    set({ isLoading: true });
    // API call goes here
    set({ isLoading: false });
  },
  addToList: (c) =>
    set((s) => ({
      list: [c, ...s.list.filter((x) => x.id !== c.id)],
    })),
  removeLocal: (id) =>
    set((s) => ({ list: s.list.filter((c) => c.id !== id) })),
}));
