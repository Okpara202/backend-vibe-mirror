"use client";

import { useEffect, useRef, useState } from "react";
import {
  PreviewHeader,
  type DeviceWidth,
  type ViewTab,
} from "./preview/PreviewHeader";
import { PreviewContent } from "./preview/PreviewContent";
import type {
  ArtContent,
  BookContent,
  CreationType,
  GameContent,
  WebsiteContent,
} from "@/types";

interface PreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  type: CreationType;
  content: WebsiteContent | GameContent | ArtContent | BookContent;
  initialTab?: ViewTab;
}

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${type} preview`}
      className="fixed inset-0 z-50 bg-canvas flex flex-col"
    >
      <PreviewHeader
        type={type}
        content={content}
        tab={tab}
        setTab={setTab}
        device={device}
        setDevice={setDevice}
        onClose={onClose}
        closeButtonRef={closeButtonRef}
      />
      <PreviewContent
        type={type}
        content={content}
        tab={tab}
        device={device}
      />
    </div>
  );
}
