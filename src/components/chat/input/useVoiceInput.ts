"use client";

import { useEffect, useRef, useState } from "react";
import {
  getSpeechRecognitionCtor,
  type SpeechRecognitionInstance,
} from "./speechRecognition";

export interface VoiceInputState {
  isRecording: boolean;
  isSupported: boolean;
  analyser: AnalyserNode | null;
  error: string | null;
  start: () => Promise<void>;
  stop: () => void;
}

interface UseVoiceInputOptions {
  onTranscript: (text: string) => void;
}

// TEMP — verification only; remove with onstop hook below when transcription lands.
function downloadRecording(chunks: Blob[], mimeType: string) {
  if (chunks.length === 0) return;
  const url = URL.createObjectURL(new Blob(chunks, { type: mimeType || "audio/webm" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `vibecraft-recording-${Date.now()}.webm`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function useVoiceInput({
  onTranscript,
}: UseVoiceInputOptions): VoiceInputState {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const transcriptRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(
      Boolean(navigator.mediaDevices?.getUserMedia) &&
        typeof MediaRecorder !== "undefined",
    );
  }, []);

  const cleanup = () => {
    try { if (recorderRef.current?.state === "recording") recorderRef.current.stop(); } catch {}
    try { recognitionRef.current?.stop(); } catch {}
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close().catch(() => {});
    recorderRef.current = null;
    recognitionRef.current = null;
    streamRef.current = null;
    audioCtxRef.current = null;
  };

  useEffect(() => () => cleanup(), []);

  const start = async () => {
    if (isRecording) return;
    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setError("Microphone not supported");
      return;
    }
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const node = audioCtx.createAnalyser();
      node.fftSize = 256;
      audioCtx.createMediaStreamSource(stream).connect(node);
      setAnalyser(node);

      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      const localChunks: Blob[] = []; // closure-captured snapshot for download
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
          localChunks.push(e.data);
        }
      };
      // TEMP — verification only. Remove with downloadRecording above.
      recorder.onstop = () => downloadRecording(localChunks, recorder.mimeType);
      recorderRef.current = recorder;
      recorder.start();

      transcriptRef.current = "";
      const Ctor = getSpeechRecognitionCtor();
      if (Ctor) {
        const r = new Ctor();
        r.continuous = true;
        r.interimResults = true;
        r.lang = navigator.language || "en-US";
        r.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const res = event.results[i];
            if (res.isFinal) transcriptRef.current += res[0].transcript + " ";
          }
        };
        r.onerror = () => {};
        recognitionRef.current = r;
        try { r.start(); } catch {}
      }

      setIsRecording(true);
    } catch (err) {
      setError(
        err instanceof Error && err.name === "NotAllowedError"
          ? "Microphone permission denied"
          : "Could not start recording",
      );
      cleanup();
      setAnalyser(null);
      setIsRecording(false);
    }
  };

  const stop = () => {
    if (!isRecording) return;
    setIsRecording(false);
    setAnalyser(null);
    const finalize = () => {
      const text = transcriptRef.current.trim();
      transcriptRef.current = "";
      cleanup();
      if (text) onTranscript(text);
    };
    const r = recognitionRef.current;
    if (!r) return finalize();
    r.onend = finalize; r.onerror = finalize;
    try { r.stop(); } catch { finalize(); }
  };

  return { isRecording, isSupported, analyser, error, start, stop };
}
