import { Typography } from "@/components/ui/Typography";

export default function AuthIntroText({
  mode,
}: {
  mode: "Login" | "Register";
}) {
  const login = mode === "Login";
  return (
    <div className="space-y-1">
      <Typography variant="heading-h3" className="text-primary text-left">
        {login ? "Welcome back!" : "Sign up to build"}
      </Typography>
      <Typography variant="heading-h4" className="text-secondary text-left">
        {login
          ? "Sign in to continue making"
          : "Your idea is saved. Pick up right where you left off."}
      </Typography>
    </div>
  );
}
