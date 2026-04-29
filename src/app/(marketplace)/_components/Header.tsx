import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import HeaderNavLinks from "./HeaderNavLinks";
import Link from "next/link";

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
  return (
    <header className=" bg-canvas general-border">
      <div className="py-5 w-[90%] mx-auto flex items-center justify-between">
        <Typography variant={"display-section"}>
          <span className="text-primary text-[2.045625rem] leading-[36px]">
            Vibe
          </span>
          <span className="text-brand italic">Craft</span>
        </Typography>

        <nav className="flex items-center gap-5">
          {navLinks.map((navLinks) => (
            <Link key={navLinks.href} href={`#${navLinks.href}`}>
              <HeaderNavLinks href={navLinks.text} />
            </Link>
          ))}
          <Button>Start Making</Button>
        </nav>
      </div>
    </header>
  );
}
