import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ActionBar } from "./shared/ActionBar";
import { ThinkingIndicator } from "../ThinkingIndicator";
import type { AssistantMessage as AssistantMessageType } from "@/types";

type TextMessage = Extract<AssistantMessageType, { type: "text" }>;

const markdownComponents: Components = {
  // ── Headings (Geist medium, design-system tokens) ──
  h1: ({ children }) => (
    <h1 className="font-sans font-medium text-[1.5rem] leading-[1.875rem] text-primary mt-4 mb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-sans font-medium text-[1.125rem] leading-[1.625rem] text-primary mt-4 mb-2 text-left">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-sans font-medium text-[0.9375rem] leading-[1.4rem] text-primary mt-3 mb-1 text-left">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="font-sans font-medium text-[0.9375rem] leading-[1.4rem] text-primary mt-3 mb-1 text-left">
      {children}
    </h4>
  ),

  // ── Inline ──
  p: ({ children }) => (
    <p className="font-sans font-normal text-[0.875rem] leading-[1.25rem] text-primary mb-2">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="font-medium text-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-secondary">{children}</em>,
  del: ({ children }) => (
    <del className="line-through text-muted">{children}</del>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand underline hover:opacity-80 wrap-break-word"
    >
      {children}
    </a>
  ),

  // ── Code (block via SyntaxHighlighter, inline as styled <code>) ──
  code({ className, children }) {
    const match = /language-(\w+)/.exec(className || "");
    if (!match) {
      return (
        <code className="font-code font-normal text-[0.75rem] leading-[1rem] bg-subtle px-1.5 py-0.5 rounded text-primary">
          {children}
        </code>
      );
    }
    return (
      <SyntaxHighlighter
        language={match[1]}
        style={oneDark}
        PreTag="div"
        customStyle={{
          background: "#1e1d1a",
          borderRadius: "0.75rem",
          padding: "1rem",
          fontSize: "0.75rem",
          fontFamily: "var(--font-jetbrains-mono)",
          margin: "0.5rem 0",
          overflowX: "auto",
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },

  // ── Lists ──
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="font-sans font-normal text-[0.875rem] leading-[1.25rem] text-primary">
      {children}
    </li>
  ),

  // ── Block elements ──
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-brand pl-3 italic text-secondary my-2">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-subtle my-4" />,
  table: ({ children }) => (
    <div className="overflow-x-auto my-2">
      <table className="w-full text-[0.875rem] border-collapse">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-subtle px-3 py-2 text-left font-medium text-primary bg-subtle">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-subtle px-3 py-2 text-primary">{children}</td>
  ),
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
