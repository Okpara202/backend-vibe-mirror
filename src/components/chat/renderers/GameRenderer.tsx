"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressCard } from "./shared/ProgressCard";
import { RendererShell } from "./shared/RendererShell";
import { QualityCheckCard } from "./shared/QualityCheckCard";
import { PreviewPanel } from "./shared/PreviewPanel";
import { ThinkingIndicator } from "../ThinkingIndicator";
import type { AssistantMessage as AssistantMessageType } from "@/types";

type GameMessage = Extract<AssistantMessageType, { type: "game" }>;

const REFERRAL_DESCRIPTION =
  "Copy the game code or prompt to continue on another platform.";

export function GameRenderer({ message }: { message: GameMessage }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTab, setPreviewTab] = useState<"visual" | "code">("visual");

  if (message.status === "thinking") return <ThinkingIndicator />;

  if (message.status === "building" && message.buildingContent) {
    return (
      <RendererShell
        messageId={message.id}
        dotColor="building"
        title={message.buildingContent.label || "Building your game"}
        subtitle={message.buildingContent.subtitle}
        showReferralLinks={false}
      >
        <ProgressCard buildingContent={message.buildingContent} />
      </RendererShell>
    );
  }

  if (message.status === "complete" && message.content) {
    const c = message.content;
    // Per handoff: Game has no SuccessBanner or QualityCheckCard by default.
    // QualityCheckCard only renders if backend sent qualityChecks.
    return (
      <>
        <div className="space-y-4">
          {c.qualityChecks && c.qualityChecks.length > 0 && (
            <QualityCheckCard checks={c.qualityChecks} />
          )}
          <RendererShell
            messageId={message.id}
            dotColor="success"
            title={c.title}
            subtitle={c.url}
            referralDescription={REFERRAL_DESCRIPTION}
            textToCopy={c.url ? `${c.title}: ${c.url}` : c.title}
            actions={
              <>
                <Button
                  variant="default"
                  onClick={() => {
                    setPreviewTab("visual");
                    setPreviewOpen(true);
                  }}
                >
                  Play
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setPreviewTab("code");
                    setPreviewOpen(true);
                  }}
                >
                  Code
                </Button>
                <Button variant="outline">Share</Button>
              </>
            }
          />
        </div>
        <PreviewPanel
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          type="game"
          content={c}
          initialTab={previewTab}
        />
      </>
    );
  }

  return null;
}
