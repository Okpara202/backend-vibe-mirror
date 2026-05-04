"use client";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";
import { ImageWithFallback } from "../ImageWithFallback";
import type {
  ArtContent,
  BookContent,
  CreationType,
  GameContent,
  WebsiteContent,
} from "@/types";
import type { DeviceWidth, ViewTab } from "./PreviewHeader";

const DEVICE_FRAME: Record<DeviceWidth, string> = {
  desktop: "w-full",
  tablet: "w-[768px] mx-auto",
  mobile: "w-[375px] mx-auto",
};

interface PreviewContentProps {
  type: CreationType;
  content: WebsiteContent | GameContent | ArtContent | BookContent;
  tab: ViewTab;
  device: DeviceWidth;
}

export function PreviewContent({
  type,
  content,
  tab,
  device,
}: PreviewContentProps) {
  const previewUrl =
    "previewUrl" in content ? content.previewUrl : undefined;
  const html = "html" in content ? content.html : undefined;
  const svgCode = "svgCode" in content ? content.svgCode : undefined;
  const coverImageUrl =
    "coverImageUrl" in content ? content.coverImageUrl : undefined;
  const codeContent = type === "art" ? svgCode : html;

  return (
    <div className="flex-1 overflow-auto bg-canvas">
      {tab === "code" && codeContent ? (
        <pre className="bg-[#1e1d1a] m-0 p-5 overflow-auto h-full">
          <Typography
            variant="code-sm"
            as="code"
            className="text-white whitespace-pre"
          >
            {codeContent}
          </Typography>
        </pre>
      ) : type === "book" && coverImageUrl ? (
        <div className="p-5">
          <ImageWithFallback
            src={coverImageUrl}
            alt="Book cover"
            className="w-full h-auto rounded-lg"
            fallback={<Unavailable text="Cover image unavailable." />}
          />
        </div>
      ) : type === "art" && previewUrl ? (
        <div className="p-5 flex items-center justify-center">
          <ImageWithFallback
            src={previewUrl}
            alt="Art preview"
            className="max-w-full h-auto"
            fallback={<Unavailable text="Preview unavailable." />}
          />
        </div>
      ) : previewUrl && (type === "website" || type === "game") ? (
        <div className={cn("h-full transition-all", DEVICE_FRAME[device])}>
          <iframe
            src={previewUrl}
            sandbox="allow-scripts"
            className="w-full h-full border-0"
            title={`${type} preview`}
          />
        </div>
      ) : (
        <Unavailable text="Preview unavailable." />
      )}
    </div>
  );
}

function Unavailable({ text }: { text: string }) {
  return (
    <div className="p-5">
      <Typography variant="body-sm" className="text-muted">
        {text}
      </Typography>
    </div>
  );
}
