import { api } from "@/lib/api";
import type { AdminOverviewData, AdminPeriod } from "@/types/admin";

export const getAdminOverview = (period: AdminPeriod) =>
  api.get<AdminOverviewData>(`/admin/overview?period=${period}`);

export const getAdminUsers = (params: {
  search?: string;
  page?: number;
  limit?: number;
}) => api.get("/admin/users", { params });

export const getAdminProjects = () => api.get("/admin/projects");

export const getAdminRevenue = () => api.get("/admin/revenue");
