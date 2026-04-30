import NavLinks from "@/components/ui/NavLinks";
import VibeCraftLogo from "@/components/ui/Logo";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

const productLinks = [
  {
    href: "gallery",
    text: "Gallery",
  },
  {
    href: "pricing",
    text: "Pricing",
  },
  {
    href: "changelog",
    text: "ChangeLogs",
  },
];

const resourcesLinks = [
  { href: "#", text: "Help Centre" },
  { href: "#", text: "Community" },
  { href: "#", text: "Blog" },
];

const companyLinks = [
  { href: "#", text: "About" },
  { href: "#", text: "Terms" },
  { href: "#", text: "Privacy" },
];

export default function MarketPlaceFooter() {
  return (
    <footer className="bg-canvas">
      <div className="w-[90%] mx-auto general-border py-16 lg:py-24 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-20">
        {/* Footer Nav area */}
        <aside className="sm:col-span-3 lg:col-span-2 flex flex-col gap-4 items-start">
          <VibeCraftLogo />
          <Typography variant="body-sm" className="text-muted">
            Vibe it. Craft it. Launch it. Made by TekAIDA.
          </Typography>
        </aside>

        <aside className="space-y-4">
          {/* Product Links */}
          <Typography variant="body-sm" className="text-primary">
            PRODUCT
          </Typography>
          {productLinks.map((links) => (
            <Link
              className="block space-y-4"
              key={links.href}
              href={`#${links.href}`}
            >
              <NavLinks href={links.text} color="muted" />
            </Link>
          ))}
        </aside>

        <aside className="space-y-4">
          {/* Resources Links */}
          <Typography variant="body-sm" className="text-primary">
            Resources
          </Typography>
          {resourcesLinks.map((links) => (
            <Link
              className="block space-y-4"
              key={links.text}
              href={`${links.href}`}
            >
              <NavLinks href={links.text} color="muted" />
            </Link>
          ))}
        </aside>

        <aside className="space-y-4">
          {/* Company Links */}
          <Typography variant="body-sm" className="text-primary">
            Company
          </Typography>
          {companyLinks.map((links) => (
            <Link
              className="block space-y-4"
              key={links.text}
              href={`${links.href}`}
            >
              <NavLinks href={links.text} color="muted" />
            </Link>
          ))}
        </aside>
      </div>

      <div className="text-center py-6">
        {/* Bottom footer text */}
        <Typography variant="label-sm" className="text-muted">
          © 2026 VibeCraft by TekAIDA Consulting Ltd
        </Typography>
      </div>
    </footer>
  );
}
