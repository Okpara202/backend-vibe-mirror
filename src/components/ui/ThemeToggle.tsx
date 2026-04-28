"use client";
// Toggle light mode and dark mode
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        document.cookie = `theme=${next};path=/`;
      }}
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
