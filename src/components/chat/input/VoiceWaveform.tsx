"use client";

import { useEffect, useRef } from "react";

interface VoiceWaveformProps {
  analyser: AnalyserNode;
  className?: string;
}

export function VoiceWaveform({ analyser, className }: VoiceWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const sync = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sync();

    const stroke = () =>
      getComputedStyle(canvas).getPropertyValue("--brand").trim() || "#f27a1a";

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.strokeStyle = stroke();
      ctx.lineWidth = 2;
      ctx.stroke();
      return;
    }

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(data);
      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      const sliceWidth = w / data.length;
      let x = 0;
      data.forEach((v, i) => {
        const y = (v / 128.0) * (h / 2);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      });
      ctx.lineTo(w, h / 2);
      ctx.strokeStyle = stroke();
      ctx.lineWidth = 2;
      ctx.stroke();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [analyser]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "40px", display: "block" }}
    />
  );
}
