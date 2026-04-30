"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";

const COUNTDOWN_SECONDS = 5 * 60;

export default function VerifyMailForm() {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [code, setCode] = useState<string[]>(() => Array(6).fill(""));

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <form className="space-y-4 w-full min-h-[calc(100vh-6rem)] flex flex-col justify-center lg:min-h-0 lg:block">
      <div className="space-y-1">
        <Typography
          variant="heading-h3"
          className="text-primary text-center lg:text-left block"
        >
          Check your email
        </Typography>

        <Typography
          variant="heading-h4"
          className="text-secondary text-center lg:text-left block"
        >
          We sent you a 6-digit code
        </Typography>
      </div>

      <div className="w-full flex items-center">
        <aside className="general-border flex-1" />
        <Typography variant="heading-h4" className="text-secondary px-5">
          or
        </Typography>
        <aside className="general-border flex-1" />
      </div>

      <OtpInput value={code} onChange={setCode} />

      <Button className="w-full"> verify email</Button>

      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
        <Typography
          variant="heading-h4"
          className="text-center lg:text-left text-secondary"
        >
          Didn&apos;t receive it?{" "}
          <Link className="auth-link" href="#">
            Resend code
          </Link>
        </Typography>
        <Typography
          variant="heading-h4"
          className="text-center lg:text-left text-secondary"
        >
          {minutes}:{seconds}
        </Typography>
      </div>
    </form>
  );
}
