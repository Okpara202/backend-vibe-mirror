import { Button } from "@/components/ui/button";
import ChatPageBackground from "@/components/ui/ChatPageBackground";

import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-39.5"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>

        <Button>Start Making</Button>

        <Input label="Email address" />

        <ThemeToggle />

        <ChatPageBackground>
          <div>
            Content Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
            totam perferendis dolorum eaque. Cupiditate, nisi repudiandae minus
            aliquam iste dignissimos velit debitis molestiae vitae suscipit
            alias sunt. Sit voluptate minima quidem eum soluta labore beatae
            nobis eligendi ab quod numquam repudiandae modi qui vero quae nemo
            laboriosam delectus, dolor quasi perferendis laborum rem iste nam
            illum! Corporis molestiae ratione obcaecati quibusdam fugiat, ab
            tempora nisi vitae quidem quisquam odit illum aspernatur iste. Sed
            corporis impedit reprehenderit nemo, unde explicabo eaque provident
            rem minima quod, dolor aut. Suscipit molestiae nihil, sapiente id
            nisi distinctio saepe fugit omnis beatae accusantium possimus
            assumenda. lorem3000
          </div>
        </ChatPageBackground>
      </main>
    </div>
  );
}
