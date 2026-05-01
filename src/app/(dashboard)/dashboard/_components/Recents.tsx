import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

const recents = [
  "The Star Fox’s Dream",
  "Create a simple game for me",
  "Design a website for my landing p..",
  "Publish a book for me about Africa..",
  "Social media banner for my brand...",
];

export default function Recents() {
  return (
    <div>
      <Typography variant="body-sm" className="text-secondary py-2 px-4">
        RECENTS
      </Typography>

      {recents.map((recent, idx) => (
        <Link
          key={idx}
          href="#"
          className="px-4  py-2 block text-sidebar-link-text hover:bg-sidebar-fill-active rounded-[8px] hover:text-sidebar-active-link"
        >
          <Typography variant="body-sm" className="line-clamp-1">
            {recent}
          </Typography>
        </Link>
      ))}
    </div>
  );
}
