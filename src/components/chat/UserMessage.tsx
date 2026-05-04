import { Typography } from "@/components/ui/Typography";
import { cn } from "@/lib/utils";
import type {
  UserMessage as UserMessageType,
  UserAttachment,
} from "@/types";

export function UserMessage({ message }: { message: UserMessageType }) {
  const { text, attachments } = message.content;

  return (
    <div
      className={cn(
        "ml-auto w-[90%] md:w-[80%] lg:w-[60%] p-5 border border-chat-user-border bg-chat-user-fill",
        "rounded-tl-[20px] rounded-tr-[20px] rounded-bl-[20px] rounded-br-[4px]",
      )}
    >
      {text && (
        <Typography
          variant="label-md"
          className="text-chat-user-text wrap-break-word whitespace-pre-wrap"
        >
          {text}
        </Typography>
      )}

      {attachments && attachments.length > 0 && (
        <div className={cn("flex flex-wrap gap-2", text && "mt-3")}>
          {attachments.map((file) => (
            <AttachmentTile key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

function AttachmentTile({ file }: { file: UserAttachment }) {
  const isImage = file.mimeType.startsWith("image/");

  if (isImage && file.previewUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={file.previewUrl}
        alt={file.name}
        className="w-20 h-20 rounded-lg object-cover border border-chat-user-border"
      />
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-chat-user-border px-3 py-2">
      <span className="w-8 h-8 rounded bg-subtle inline-flex items-center justify-center shrink-0">
        <Typography variant="caption-default" className="text-muted">
          {file.name.split(".").pop()?.slice(0, 4) ?? "file"}
        </Typography>
      </span>
      <Typography
        variant="caption-default"
        className="text-chat-user-text truncate max-w-[180px]"
      >
        {file.name}
      </Typography>
    </div>
  );
}
