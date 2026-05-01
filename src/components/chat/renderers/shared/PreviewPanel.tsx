"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Monitor, Smartphone, Tablet, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/Typography";
import { ImageWithFallback } from "./ImageWithFallback";
import type {
  ArtContent,
  BookContent,
  CreationType,
  GameContent,
  WebsiteContent,
} from "@/types";

type ViewTab = "visual" | "code";
type DeviceWidth = "desktop" | "tablet" | "mobile";

interface PreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  type: CreationType;
  content: WebsiteContent | GameContent | ArtContent | BookContent;
  initialTab?: ViewTab;
}

const DEVICE_FRAME: Record<DeviceWidth, string> = {
  desktop: "w-full",
  tablet: "w-[768px] mx-auto",
  mobile: "w-[375px] mx-auto",
};

export function PreviewPanel({
  isOpen,
  onClose,
  type,
  content,
  initialTab = "visual",
}: PreviewPanelProps) {
  const [tab, setTab] = useState<ViewTab>(initialTab);
  const [device, setDevice] = useState<DeviceWidth>("desktop");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActive?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const supportsCodeTab = type === "website" || type === "game";
  const supportsDeviceToggle = type === "website" || type === "game";

  const previewUrl =
    "previewUrl" in content ? content.previewUrl : undefined;
  const url = "url" in content ? content.url : undefined;
  const html = "html" in content ? content.html : undefined;
  const svgCode = "svgCode" in content ? content.svgCode : undefined;
  const pdfUrl = "pdfUrl" in content ? content.pdfUrl : undefined;
  const coverImageUrl =
    "coverImageUrl" in content ? content.coverImageUrl : undefined;

  const headerLabel = url ?? pdfUrl ?? `${type} preview`;
  const codeContent = type === "art" ? svgCode : html;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${type} preview`}
      className="fixed inset-0 z-50 bg-canvas flex flex-col"
    >
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
            <TabButton
              active={tab === "visual"}
              onClick={() => setTab("visual")}
            >
              Visual
            </TabButton>
            <TabButton
              active={tab === "code"}
              onClick={() => setTab("code")}
            >
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
              fallback={
                <Typography variant="body-sm" className="text-muted">
                  Cover image unavailable.
                </Typography>
              }
            />
          </div>
        ) : type === "art" && previewUrl ? (
          <div className="p-5 flex items-center justify-center">
            <ImageWithFallback
              src={previewUrl}
              alt="Art preview"
              className="max-w-full h-auto"
              fallback={
                <Typography variant="body-sm" className="text-muted">
                  Preview unavailable.
                </Typography>
              }
            />
          </div>
        ) : previewUrl &&
          (type === "website" || type === "game") ? (
          <div className={cn("h-full transition-all", DEVICE_FRAME[device])}>
            <iframe
              src={previewUrl}
              sandbox="allow-scripts"
              className="w-full h-full border-0"
              title={`${type} preview`}
            />
          </div>
        ) : (
          <div className="p-5">
            <Typography variant="body-sm" className="text-muted">
              Preview unavailable.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer",
        active
          ? "bg-surface text-primary shadow-sm"
          : "text-secondary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

function DeviceButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        "p-1.5 rounded transition-colors cursor-pointer",
        active ? "bg-subtle text-primary" : "text-muted hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
