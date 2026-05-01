"use client";

import { useState } from "react";
import { FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { SUCCESS_MESSAGES } from "@/lib/constants";
import { ProgressCard } from "./shared/ProgressCard";
import { RendererShell } from "./shared/RendererShell";
import { SuccessBanner } from "./shared/SuccessBanner";
import { QualityCheckCard } from "./shared/QualityCheckCard";
import { PreviewPanel } from "./shared/PreviewPanel";
import { ImageWithFallback } from "./shared/ImageWithFallback";
import { ThinkingIndicator } from "../ThinkingIndicator";
import type { AssistantMessage as AssistantMessageType } from "@/types";

type BookMessage = Extract<AssistantMessageType, { type: "book" }>;

const REFERRAL_LABEL = "Build with another tool";
const REFERRAL_DESCRIPTION =
  "Take your prompt to another AI · each link earns VibeCraft a small referral.";

export function BookRenderer({ message }: { message: BookMessage }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (message.status === "thinking") return <ThinkingIndicator />;

  if (message.status === "building" && message.buildingContent) {
    return (
      <RendererShell
        messageId={message.id}
        dotColor="building"
        title={message.buildingContent.label || "Building your book"}
        subtitle={message.buildingContent.subtitle}
        showReferralLinks={false}
      >
        <ProgressCard buildingContent={message.buildingContent} />
      </RendererShell>
    );
  }

  if (message.status === "complete" && message.content) {
    const c = message.content;
    const successCopy = SUCCESS_MESSAGES.book;
    const subtitle = [
      "PDF",
      c.pageCount != null ? `${c.pageCount} pages` : null,
      c.fileSize ?? null,
    ]
      .filter(Boolean)
      .join(" · ");

    return (
      <>
        <div className="space-y-4">
          <SuccessBanner
            message={message.successMessage ?? successCopy.message}
            subtext={message.successSubtext ?? successCopy.subtext(c)}
          />
          {c.qualityChecks && c.qualityChecks.length > 0 && (
            <QualityCheckCard checks={c.qualityChecks} />
          )}
          <RendererShell
            messageId={message.id}
            dotColor="success"
            title={c.title}
            subtitle={subtitle}
            referralLabel={REFERRAL_LABEL}
            referralDescription={REFERRAL_DESCRIPTION}
            textToCopy={[c.title, c.subtitle, c.pdfUrl]
              .filter(Boolean)
              .join("\n")}
            actions={
              <>
                <Button
                  variant="default"
                  onClick={() =>
                    c.pdfUrl && window.open(c.pdfUrl, "_blank")
                  }
                >
                  Download
                </Button>
                <Button variant="outline">Share</Button>
                <Button
                  variant="outline"
                  onClick={() => setPreviewOpen(true)}
                >
                  Preview
                </Button>
              </>
            }
          >
            <ImageWithFallback
              src={c.coverImageUrl}
              alt={`${c.title} cover`}
              className="w-full h-auto rounded-lg"
            />
            <FileChip title={c.title} fileSize={c.fileSize} />
          </RendererShell>
        </div>
        <PreviewPanel
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          type="book"
          content={c}
        />
      </>
    );
  }

  return null;
}

function FileChip({ title, fileSize }: { title: string; fileSize?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-subtle">
      <FileText className="w-5 h-5 text-brand shrink-0" />
      <div className="flex-1 min-w-0">
        <Typography
          variant="label-sm"
          className="text-primary block truncate"
        >
          {title}.pdf
        </Typography>
        <Typography variant="caption-default" className="text-muted block">
          {fileSize ?? "—"} · Just now
        </Typography>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        className="text-muted hover:text-primary p-1 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
