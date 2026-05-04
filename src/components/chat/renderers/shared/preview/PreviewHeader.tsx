"use client";

import type { RefObject } from "react";
import { Code2, Monitor, Smartphone, Tablet, X } from "lucide-react";
import { Typography } from "@/components/ui/Typography";
import { DeviceButton, TabButton } from "./PreviewToolbarButtons";
import type {
  ArtContent,
  BookContent,
  CreationType,
  GameContent,
  WebsiteContent,
} from "@/types";

export type ViewTab = "visual" | "code";
export type DeviceWidth = "desktop" | "tablet" | "mobile";

interface PreviewHeaderProps {
  type: CreationType;
  content: WebsiteContent | GameContent | ArtContent | BookContent;
  tab: ViewTab;
  setTab: (t: ViewTab) => void;
  device: DeviceWidth;
  setDevice: (d: DeviceWidth) => void;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}

export function PreviewHeader({
  type,
  content,
  tab,
  setTab,
  device,
  setDevice,
  onClose,
  closeButtonRef,
}: PreviewHeaderProps) {
  const supportsCodeTab = type === "website" || type === "game";
  const supportsDeviceToggle = type === "website" || type === "game";

  const url = "url" in content ? content.url : undefined;
  const pdfUrl = "pdfUrl" in content ? content.pdfUrl : undefined;
  const headerLabel = url ?? pdfUrl ?? `${type} preview`;

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-subtle bg-surface">
      <Typography
        variant="caption-mono"
        className="text-muted truncate flex-1 min-w-0"
      >
        {headerLabel}
      </Typography>

      {supportsDeviceToggle && tab === "visual" && (
        <div className="hidden lg:flex items-center gap-1">
          <DeviceButton
            active={device === "desktop"}
            onClick={() => setDevice("desktop")}
            label="Desktop width"
          >
            <Monitor className="w-4 h-4" />
          </DeviceButton>
          <DeviceButton
            active={device === "tablet"}
            onClick={() => setDevice("tablet")}
            label="Tablet width"
          >
            <Tablet className="w-4 h-4" />
          </DeviceButton>
          <DeviceButton
            active={device === "mobile"}
            onClick={() => setDevice("mobile")}
            label="Mobile width"
          >
            <Smartphone className="w-4 h-4" />
          </DeviceButton>
        </div>
      )}

      {supportsCodeTab && (
        <div className="flex items-center gap-1 rounded-full bg-subtle p-0.5">
          <TabButton active={tab === "visual"} onClick={() => setTab("visual")}>
            Visual
          </TabButton>
          <TabButton active={tab === "code"} onClick={() => setTab("code")}>
            <Code2 className="w-3.5 h-3.5" />
            Code
          </TabButton>
        </div>
      )}

      <button
        ref={closeButtonRef}
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="text-muted hover:text-primary p-1.5 cursor-pointer shrink-0"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
