"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";

/**
 * Mounted by the `/projects/[id]` layout. Whenever the user is anywhere
 * inside a project (the home view OR a project-scoped chat), we flip the
 * sidebar into project mode and remember which project is active. On
 * unmount (i.e. when the user leaves the project route group) both fields
 * reset to global defaults.
 */
export default function ProjectScope({ projectId }: { projectId: string }) {
  const setActiveProjectId = useUIStore((s) => s.setActiveProjectId);
  const setSidebarMode = useUIStore((s) => s.setSidebarMode);

  useEffect(() => {
    setActiveProjectId(projectId);
    setSidebarMode("project");
    return () => {
      setActiveProjectId(null);
      setSidebarMode("global");
    };
  }, [projectId, setActiveProjectId, setSidebarMode]);

  return null;
}
