export function ThinkingIndicator() {
  return (
    <div
      role="status"
      aria-label="Vibecraft is thinking"
      className="bg-surface border border-subtle rounded-xl px-4 py-3 inline-flex items-center gap-1.5"
    >
      <Dot delay="0ms" />
      <Dot delay="150ms" />
      <Dot delay="300ms" />
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      aria-hidden="true"
      className="w-2 h-2 rounded-full bg-muted animate-pulse motion-reduce:animate-none"
      style={{ animationDelay: delay }}
    />
  );
}
