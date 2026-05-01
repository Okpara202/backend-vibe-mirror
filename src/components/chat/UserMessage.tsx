import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type { UserMessage as UserMessageType } from "@/types";

export function UserMessage({ message }: { message: UserMessageType }) {
  return (
    <div
      className={cn(
        "ml-auto w-[90%] md:w-[80%] lg:w-[60%] p-5 border border-chat-user-border bg-chat-user-fill",
        "rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[4px]",
      )}
    >
      <Typography
        variant="label-md"
        className="text-chat-user-text wrap-break-word whitespace-pre-wrap"
      >
        {message.content.text}
      </Typography>
    </div>
  );
}
