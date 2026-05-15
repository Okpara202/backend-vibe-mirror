"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  page: string;
  placeholder: string;
  mode: "projects" | "chat";
  buttonText: string;
}

export default function ChatProjectsHeader({
  page,
  placeholder,
  mode,
  buttonText,
}: ChatHeaderProps) {
  const router = useRouter();

  const handleNewChat = () => {
    router.push("/dashboard");
  };

  const handleNewProject = () => {
    router.push("/projects/new");
  };
  const chat = mode === "chat";

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <Typography variant="display-section" className="text-primary">
          {page}
        </Typography>
        <Button
          onClick={chat ? handleNewChat : handleNewProject}
          className="flex items-center gap-4 font-black w-full sm:w-auto"
        >
          <Plus /> {buttonText}
        </Button>
      </div>

      <Input className="bg-surface" type="text" placeholder={placeholder} />
    </>
  );
}
