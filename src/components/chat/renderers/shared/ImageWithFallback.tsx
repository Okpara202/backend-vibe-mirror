"use client";

import { useState } from "react";

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fallback = null,
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);
  const [lastSrc, setLastSrc] = useState(src);

  if (lastSrc !== src) {
    setLastSrc(src);
    setErrored(false);
  }

  if (!src || errored) return <>{fallback}</>;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
