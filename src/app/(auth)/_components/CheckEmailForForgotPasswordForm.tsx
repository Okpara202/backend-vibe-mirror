import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";

export default function CheckEmailForForgotPasswordForm() {
  return (
    <form className="space-y-4 w-full min-h-[calc(100vh-6rem)] flex flex-col justify-center lg:min-h-0 lg:block">
      <div className="space-y-1">
        <Typography
          variant="heading-h3"
          className="text-primary text-center lg:text-left"
        >
          Check your email
        </Typography>

        <Typography
          variant="heading-h4"
          className="text-secondary text-center lg:text-left block"
        >
          <Typography
            variant="label-md"
            className="text-secondary text-center lg:text-left block"
          >
            We sent a password reset link
          </Typography>
        </Typography>
      </div>

      <Typography
        variant="label-md"
        className="text-secondary text-center lg:text-left block"
      >
        Click the link in the email to reset your password. The link expires in
        60 minutes.
      </Typography>

      <Button className="w-full">Open Email App</Button>

      <div className="text-center">
        <Link href="/verify-mail" className="auth-link">
          <Typography variant="label-lg" className="text-brand ">
            I have the link
          </Typography>
        </Link>
      </div>

      <Typography
        variant="heading-h4"
        className="text-secondary text-center lg:text-left block"
      >
        Didn&apos;t recieve it?{" "}
        <Link className="auth-link" href="">
          Resend link
        </Link>
      </Typography>
    </form>
  );
}
