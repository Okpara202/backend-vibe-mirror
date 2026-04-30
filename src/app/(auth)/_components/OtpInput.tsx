"use client";

import { useRef } from "react";

type OtpInputProps = {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
};

export default function OtpInput({
  length = 6,
  value,
  onChange,
}: OtpInputProps) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const focus = (i: number) => refs.current[i]?.focus();

  const setAt = (i: number, digit: string) => {
    const next = [...value];
    next[i] = digit;
    onChange(next);
  };

  const handleChange = (i: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setAt(i, digit);
    if (digit && i < length - 1) focus(i + 1);
  };

  const handleKeyDown = (
    i: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !value[i] && i > 0) {
      e.preventDefault();
      setAt(i - 1, "");
      focus(i - 1);
    } else if (e.key === "ArrowLeft" && i > 0) {
      focus(i - 1);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      focus(i + 1);
    }
  };

  const handlePaste = (
    i: number,
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!digits) return;
    e.preventDefault();
    const next = [...value];
    for (let k = 0; k < digits.length && i + k < length; k++) {
      next[i + k] = digits[k];
    }
    onChange(next);
    focus(Math.min(i + digits.length, length - 1));
  };

  return (
    <div className="flex gap-[10px]">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          onFocus={(e) => e.target.select()}
          className="w-0 flex-1 min-w-0 bg-transparent text-center font-sans font-medium text-sm leading-5 text-muted outline-none transition-all border-[0.5px] border-border-default rounded-[8px] py-[12px] px-2 focus:border-[#F27A1A]"
        />
      ))}
    </div>
  );
}
