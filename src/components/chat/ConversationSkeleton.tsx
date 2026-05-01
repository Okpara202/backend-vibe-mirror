import { cn } from "@/lib/utils";

export function ConversationSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading conversation"
      className="space-y-4"
    >
      <SkeletonCard variant="user" />
      <SkeletonCard variant="assistant" />
      <SkeletonCard variant="user" />
      <SkeletonCard variant="assistant" />
    </div>
  );
}

function SkeletonCard({ variant }: { variant: "user" | "assistant" }) {
  const isUser = variant === "user";
  return (
    <div
      className={cn(
        "rounded-xl p-5 border border-subtle bg-surface",
        isUser ? "ml-auto w-[60%]" : "w-full",
      )}
    >
      <div className="animate-pulse motion-reduce:animate-none space-y-3">
        <div className="h-3 bg-subtle rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-3 bg-subtle rounded w-full" />
          <div className="h-3 bg-subtle rounded w-5/6" />
          {!isUser && <div className="h-3 bg-subtle rounded w-3/4" />}
        </div>
      </div>
    </div>
  );
}
