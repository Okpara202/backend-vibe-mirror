"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SUCCESS_MESSAGES } from "@/lib/constants";
import { ProgressCard } from "./shared/ProgressCard";
import { RendererShell } from "./shared/RendererShell";
import { SuccessBanner } from "./shared/SuccessBanner";
import { QualityCheckCard } from "./shared/QualityCheckCard";
import { PreviewPanel } from "./shared/PreviewPanel";
import { ThinkingIndicator } from "../ThinkingIndicator";
import type { AssistantMessage as AssistantMessageType } from "@/types";

type WebsiteMessage = Extract<AssistantMessageType, { type: "website" }>;

export function WebsiteRenderer({ message }: { message: WebsiteMessage }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<"visual" | "code">("visual");

  if (message.status === "thinking") return <ThinkingIndicator />;

  if (message.status === "building" && message.buildingContent) {
    return (
      <RendererShell
        messageId={message.id}
        dotColor="building"
        title={message.buildingContent.label || "Building your website"}
        subtitle={message.buildingContent.subtitle}
        showReferralLinks={false}
      >
        <ProgressCard buildingContent={message.buildingContent} />
      </RendererShell>
    );
  }

  if (message.status === "complete" && message.content) {
    const c = message.content;
    const successCopy = SUCCESS_MESSAGES.website;

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
            title={c.name}
            subtitle={c.url}
            textToCopy={c.url ? `${c.name}: ${c.url}` : c.name}
            actions={
              <>
                <Button
                  variant="default"
                  onClick={() => {
                    setPreviewTab("visual");
                    setPreviewOpen(true);
                  }}
                >
                  Preview
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPreviewTab("code");
                    setPreviewOpen(true);
                  }}
                >
                  View Code
                </Button>
                <Button variant="outline">Share</Button>
              </>
            }
          />
        </div>
        <PreviewPanel
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          type="website"
          content={c}
          initialTab={previewTab}
        />
      </>
    );
  }

  return null;
}
