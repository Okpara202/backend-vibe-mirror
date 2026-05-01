"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SUCCESS_MESSAGES } from "@/lib/constants";
import { ProgressCard } from "./shared/ProgressCard";
import { RendererShell } from "./shared/RendererShell";
import { SuccessBanner } from "./shared/SuccessBanner";
import { QualityCheckCard } from "./shared/QualityCheckCard";
import { PreviewPanel } from "./shared/PreviewPanel";
import { ImageWithFallback } from "./shared/ImageWithFallback";
import { ThinkingIndicator } from "../ThinkingIndicator";
import type { AssistantMessage as AssistantMessageType } from "@/types";

type ArtMessage = Extract<AssistantMessageType, { type: "art" }>;

export function ArtRenderer({ message }: { message: ArtMessage }) {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (message.status === "thinking") return <ThinkingIndicator />;

  if (message.status === "building" && message.buildingContent) {
    return (
      <RendererShell
        messageId={message.id}
        dotColor="building"
        title={message.buildingContent.label || "Designing your poster"}
        subtitle={message.buildingContent.subtitle}
        showReferralLinks={false}
      >
        <ProgressCard buildingContent={message.buildingContent} />
      </RendererShell>
    );
  }

  if (message.status === "complete" && message.content) {
    const c = message.content;
    const successCopy = SUCCESS_MESSAGES.art;

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
            subtitle={c.formats.join(" · ")}
            textToCopy={`${c.title} (${c.formats.join(", ")})`}
            actions={
              <>
                <Button
                  variant="default"
                  onClick={() => setPreviewOpen(true)}
                >
                  Preview
                </Button>
                <Button variant="outline">SVG Code</Button>
                <Button variant="outline">Download</Button>
              </>
            }
          >
            <ImageWithFallback
              src={c.previewUrl}
              alt={c.title}
              className="w-full h-auto rounded-lg bg-subtle"
            />
          </RendererShell>
        </div>
        <PreviewPanel
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          type="art"
          content={c}
        />
      </>
    );
  }

  return null;
}
