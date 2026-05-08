"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Typography } from "@/components/ui/Typography";
import { UpgradePrompt } from "@/components/ui/tier-gate";
import { useAuthStore } from "@/store/auth-store";
import { useProjectStore } from "@/store/project-store";
import { canCreateProject } from "@/lib/project-utils";
import type { ProjectMeta } from "@/types";

interface FormValues {
  name: string;
  description?: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const tier = useAuthStore((s) => s.tier);
  const projects = useProjectStore((s) => s.projects);
  const addProject = useProjectStore((s) => s.addProject);

  const activeCount = projects.filter((p) => p.status === "active").length;
  const allowed = canCreateProject(tier, activeCount);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    const now = new Date();
    const project: ProjectMeta = {
      id: crypto.randomUUID(),
      name: values.name.trim(),
      description: values.description?.trim() || undefined,
      status: "active",
      creationCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    addProject(project);
    router.push(`/projects/${project.id}`);
  };

  if (!allowed) {
    return (
      <section className="pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-xl space-y-5">
        <Typography variant="display-section" className="text-primary text-left">
          Create a personal project
        </Typography>
        <UpgradePrompt message="Upgrade to create more projects." />
      </section>
    );
  }

  return (
    <section className="pt-20 pb-10 lg:py-10 w-[90%] mx-auto max-w-xl space-y-5">
      <Typography variant="display-section" className="text-primary text-left">
        Create a personal project
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input
          label="What are you working on?"
          placeholder="Name your Project"
          type="text"
          className="bg-surface"
          error={errors.name}
          {...register("name", {
            required: "Project name is required",
            maxLength: { value: 80, message: "Keep it under 80 characters" },
          })}
        />

        <TextArea
          label="What are you trying to achieve?"
          placeholder="Describe your project, goals, subjects, etc..."
          className="bg-surface"
          error={errors.description}
          {...register("description", {
            maxLength: { value: 500, message: "Keep it under 500 characters" },
          })}
        />

        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            className="bg-transparent"
            variant="outline"
            onClick={() => router.push("/projects")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="default" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </section>
  );
}
