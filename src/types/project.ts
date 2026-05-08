import type { CreationType } from "./message";

export type ProjectStatus = "active" | "archived";

export interface ProjectMeta {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  creationCount: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface ProjectCreation {
  id: string; // conversationId
  projectId: string;
  title: string;
  type: CreationType;
  status: "published" | "draft" | "downloaded";
  thumbnailUrl?: string;
  createdAt: Date;
}
