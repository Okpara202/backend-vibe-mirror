import VibeCraftLogo from "@/components/ui/Logo";
import AuthIntroText from "./AuthIntroText";
import { Button } from "@/components/ui/button";
import GoogleIconSvg from "./GoogleIconSvg";
import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

interface LoginAndRegisterFormProps {
  mode: "Login" | "Register";
}

export default function LoginAndRegisterForm({
  mode,
}: LoginAndRegisterFormProps) {
  const login = mode === "Login";
  return (
    <form className="space-y-4 w-full">
      <div className="text-center">
        <VibeCraftLogo />
      </div>

      <AuthIntroText mode={mode} />

      <Button variant={"outline"} className="w-full flex items-center gap-4 ">
        <GoogleIconSvg />
        <span> Continue with Google</span>
      </Button>

      <div className="w-full flex items-center">
        <aside className="general-border flex-1" />
        <Typography variant="heading-h4" className="text-secondary px-5">
          or
        </Typography>
        <aside className="general-border flex-1" />
      </div>

      <Input
        className="w-full"
        label="Email address"
        type="email"
        placeholder="name@example.com"
      />

      <div className="space-y-1">
        <Input
          className="w-full"
          label="Password"
          placeholder="At least 8 characters"
          type="password"
        />
        {login && (
          <Link href="/forgot-password" className="auth-link">
            <Typography variant="caption-default" className="text-brand">
              Forgot password?
            </Typography>
          </Link>
        )}
      </div>

      <Button className="w-full">{login ? "Sign In" : "Sign Up"}</Button>

      <Typography variant="heading-h4" className="text-secondary text-left">
        {login ? "Don't have an account?" : "Already have an account?"}
        <Link href={login ? "/register" : "/login"} className="auth-link">
          {login ? " Sign Up" : " Sign In"}
        </Link>
      </Typography>
    </form>
  );
}
