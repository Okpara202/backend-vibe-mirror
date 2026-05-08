"use client";
import { create } from "zustand";
import type { ChatStore } from "@/types";

export const useChatStore = create<ChatStore>((set) => ({
  activeConversationId: null,
  messages: [],
  status: "idle",
  streamingMessageId: null,
  error: null,
  planMode: false,
  selectedType: null,
  isLoadingMessages: false,
  projectId: null,

  loadConversation: async (id) => {
    set({ isLoadingMessages: true, messages: [], activeConversationId: id });
    try {
      // API call goes here — populate messages from response
      // set({ messages: result })
    } catch {
      set({ error: "Failed to load conversation." });
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  startNewChat: () =>
    set({
      activeConversationId: null,
      messages: [],
      status: "idle",
      streamingMessageId: null,
      error: null,
      selectedType: null,
    }),

  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),

  updateMessage: (id, patch) =>
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === id && m.role === "assistant"
          ? ({ ...m, ...patch } as typeof m)
          : m,
      ),
    })),

  setError: (e) => set({ error: e, status: e ? "error" : "idle" }),
  togglePlanMode: () => set((s) => ({ planMode: !s.planMode })),
  setSelectedType: (t) => set({ selectedType: t }),
  setProjectId: (id) => set({ projectId: id }),
}));
