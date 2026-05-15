"use client";

import { useEffect, useRef, useState } from "react";
import { getSpeechRecognitionCtor } from "./speechRecognition";

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

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSupported(
      Boolean(navigator.mediaDevices?.getUserMedia) &&
        typeof MediaRecorder !== "undefined",
    );
  }, []);

  const teardown = () => {
    try {
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    } catch {}
    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close().catch(() => {});
    streamRef.current = null;
    audioCtxRef.current = null;
    recorderRef.current = null;
    setAnalyser(null);
    setIsRecording(false);
  };

  useEffect(() => () => teardown(), []);

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
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        void audioBlob;

        // TODO: swap for POST /transcribe (Whisper) when backend is ready
        const SpeechCtor = getSpeechRecognitionCtor();
        if (SpeechCtor) {
          const sr = new SpeechCtor();
          sr.continuous = false;
          sr.interimResults = false;
          sr.lang = navigator.language || "en-US";
          sr.onresult = (e) => {
            const t = e.results[0]?.[0]?.transcript ?? "";
            if (t) onTranscript(t);
          };
          try { sr.start(); } catch {}
        }
        teardown();
      };
      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      setError(
        err instanceof Error && err.name === "NotAllowedError"
          ? "Microphone permission denied"
          : "Could not start recording",
      );
      teardown();
    }
  };

  const stop = () => {
    if (!isRecording) return;
    recorderRef.current?.stop();
  };

  return { isRecording, isSupported, analyser, error, start, stop };
}
