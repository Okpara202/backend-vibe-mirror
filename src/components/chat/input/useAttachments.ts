"use client";

import { useEffect, useState } from "react";
import type { UserAttachment } from "@/types";

export function useAttachments() {
  const [attachments, setAttachments] = useState<UserAttachment[]>([]);

  useEffect(
    () => () => {
      attachments.forEach(
        (a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl),
      );
    },
    [attachments],
  );

  const addFiles = (files: FileList | File[]) => {
    const list = Array.from(files);
    const next: UserAttachment[] = list.map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      mimeType: f.type || "application/octet-stream",
      size: f.size,
      previewUrl: f.type.startsWith("image/")
        ? URL.createObjectURL(f)
        : undefined,
    }));
    setAttachments((prev) => [...prev, ...next]);
  };

  const remove = (id: string) => {
    setAttachments((prev) => {
      const target = prev.find((a) => a.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((a) => a.id !== id);
    });
  };

  const clear = () => {
    attachments.forEach(
      (a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl),
    );
    setAttachments([]);
  };

  return { attachments, addFiles, remove, clear };
}
