"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import NavLinks from "../../../components/ui/NavLinks";
import Link from "next/link";
import VibeCraftLogo from "@/components/ui/Logo";

const navLinks = [
  {
    href: "gallery",
    text: "Gallery",
  },
  {
    href: "pricing",
    text: "Pricing",
  },
  {
    href: "how-it-works",
    text: "How It Works",
  },
  {
    href: "sign-in",
    text: "Sign In",
  },
];

export default function MarketPlaceHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-canvas general-border">
      <div className="py-5 w-[90%] mx-auto flex items-center justify-between">
        <VibeCraftLogo />

        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((navLinks) => (
            <Link key={navLinks.href} href={`#${navLinks.href}`}>
              <NavLinks href={navLinks.text} color={"secondary"} />
            </Link>
          ))}

          <Link href={"/register"}>
            <Button>Start Making </Button>
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-primary p-2 -mr-2 cursor-pointer"
        >
          {open ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="lg:hidden general-border-top bg-canvas">
          <nav className="w-[90%] mx-auto py-5 flex flex-col items-start gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`#${link.href}`}
                onClick={() => setOpen(false)}
              >
                <NavLinks href={link.text} color={"secondary"} />
              </Link>
            ))}
            <Link href={"/register"}>
              <Button>Start Making </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
