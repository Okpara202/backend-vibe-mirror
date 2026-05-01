import type { AssistantMessage, CreationType, Message } from "./message";

export interface ConversationMeta {
  id: string;
  title: string;
  type?: CreationType;
  updatedAt: Date;
}

export type Tier = "free" | "beginner" | "pro";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthStore {
  user: User | null;
  tier: Tier;
  tokenBalance: number;
  referralEarnings: number;
  setSession: (payload: {
    user: User;
    tier: Tier;
    tokenBalance: number;
    referralEarnings: number;
  }) => void;
  updateTokenBalance: (n: number) => void;
  clearSession: () => void;
}

export interface ChatStore {
  activeConversationId: string | null;
  messages: Message[];
  status: "idle" | "streaming" | "building" | "error";
  streamingMessageId: string | null;
  error: string | null;
  planMode: boolean;
  selectedType: CreationType | null;
  loadConversation: (id: string) => Promise<void>;
  startNewChat: () => void;
  addMessage: (m: Message) => void;
  updateMessage: (id: string, patch: Partial<AssistantMessage>) => void;
  setError: (e: string | null) => void;
  togglePlanMode: () => void;
  setSelectedType: (t: CreationType | null) => void;
}

export interface ConversationsStore {
  list: ConversationMeta[];
  isLoading: boolean;
  fetchAll: () => Promise<void>;
  addToList: (c: ConversationMeta) => void;
  removeLocal: (id: string) => void;
}
