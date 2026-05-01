import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography } from "@/components/ui/Typography";
import { ActionBar } from "./shared/ActionBar";
import { ThinkingIndicator } from "../ThinkingIndicator";
import type { AssistantMessage as AssistantMessageType } from "@/types";

type TextMessage = Extract<AssistantMessageType, { type: "text" }>;

const markdownComponents: Components = {
  p: ({ children }) => (
    <Typography variant="body-sm" className="text-primary mb-3 last:mb-0 block">
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand underline wrap-break-word"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children, ...props }) => {
    const isInline = !("data-language" in props);
    if (isInline) {
      return (
        <code className="font-code text-xs bg-subtle text-primary px-1 py-0.5 rounded">
          {children}
        </code>
      );
    }
    return <code className="font-code text-xs">{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-[#1e1d1a] text-white font-code text-xs p-4 rounded-lg overflow-x-auto my-3">
      {children}
    </pre>
  ),
  h1: ({ children }) => (
    <Typography
      variant="heading-h1"
      className="text-left text-primary mb-2 mt-3 first:mt-0 block"
    >
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography
      variant="heading-h3"
      className="text-left text-primary mb-2 mt-3 first:mt-0 block"
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography
      variant="heading-h3"
      className="text-left text-primary mb-2 mt-3 first:mt-0 block"
    >
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography
      variant="heading-h4"
      className="text-left text-primary mb-1 mt-3 first:mt-0 block"
    >
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 my-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 my-2 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="font-sans text-sm leading-5 text-primary">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-subtle pl-3 my-2 text-secondary italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-subtle my-4" />,
};

export function TextRenderer({ message }: { message: TextMessage }) {
  if (message.status === "thinking") return <ThinkingIndicator />;

  return (
    <div className="bg-surface border border-subtle rounded-xl p-5 space-y-4">
      <div className="wrap-break-word">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {message.content.markdown}
        </ReactMarkdown>
      </div>
      <ActionBar
        messageId={message.id}
        textToCopy={message.content.markdown}
      />
    </div>
  );
}
