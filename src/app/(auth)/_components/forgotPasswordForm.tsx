import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

export default function ForgotPasswordForm() {
  return (
    <form className="space-y-4 w-full min-h-[calc(100vh-6rem)] flex flex-col justify-center lg:min-h-0 lg:block">
      <div>
        <Typography
          variant="heading-h3"
          className="space-y-1 text-primary text-center lg:text-left"
        >
          Forgot Your Password?
        </Typography>
        <Typography
          variant="heading-h4"
          className="text-secondary text-center lg:text-left"
        >
          No worries. Enter your email and we&apos;ll send you a reset link.
        </Typography>
      </div>
      <Input
        label="Email address"
        placeholder="name@example.com"
        type="email"
      />{" "}
      <Button className="w-full">
        <Link href={"/check-email-for-forgot-password"}>Send Reset Link</Link>
      </Button>
      <Typography
        variant="heading-h4"
        className="text-secondary text-center lg:text-left"
      >
        Remembered it?{" "}
        <Link href="/login" className="auth-link">
          Back to Sign In
        </Link>
      </Typography>
    </form>
  );
}
