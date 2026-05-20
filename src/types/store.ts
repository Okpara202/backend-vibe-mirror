import type { AssistantMessage, CreationType, Message } from "./message";
import type { ProjectMeta } from "./project";

export interface ConversationMeta {
  id: string;
  title: string;
  type?: CreationType;
  updatedAt: Date;
  projectId?: string;
}

export type Tier = "free" | "beginner" | "pro";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "admin";
}

export interface AuthStore {
  user: User | null;
  tier: Tier;
  tokenBalance: number;
  referralEarnings: number;
  role: "user" | "admin";
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
  isLoadingMessages: boolean;
  projectId: string | null;
  loadConversation: (id: string) => Promise<void>;
  startNewChat: () => void;
  addMessage: (m: Message) => void;
  updateMessage: (id: string, patch: Partial<AssistantMessage>) => void;
  setError: (e: string | null) => void;
  togglePlanMode: () => void;
  setSelectedType: (t: CreationType | null) => void;
  setProjectId: (id: string | null) => void;
}

export interface ConversationsStore {
  list: ConversationMeta[];
  isLoading: boolean;
  fetchAll: () => Promise<void>;
  addToList: (c: ConversationMeta) => void;
  removeLocal: (id: string) => void;
}

export interface ProjectStore {
  activeProject: ProjectMeta | null;
  projects: ProjectMeta[];
  isLoading: boolean;
  setActiveProject: (p: ProjectMeta | null) => void;
  setProjects: (list: ProjectMeta[]) => void;
  addProject: (p: ProjectMeta) => void;
  updateProject: (id: string, patch: Partial<ProjectMeta>) => void;
  removeProject: (id: string) => void;
}
