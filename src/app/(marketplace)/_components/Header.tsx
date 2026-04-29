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
  return (
    <header className=" bg-canvas general-border">
      <div className="py-5 w-[90%] mx-auto flex items-center justify-between">
        <VibeCraftLogo />

        <nav className="flex items-center gap-5">
          {navLinks.map((navLinks) => (
            <Link key={navLinks.href} href={`#${navLinks.href}`}>
              <NavLinks href={navLinks.text} color={"secondary"} />
            </Link>
          ))}
          <Button>Start Making</Button>
        </nav>
      </div>
    </header>
  );
}
