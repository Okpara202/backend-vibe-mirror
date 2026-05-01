import { Typography } from "@/components/ui/Typography";

interface SuccessBannerProps {
  message: string;
  subtext?: string;
}

export function SuccessBanner({ message, subtext }: SuccessBannerProps) {
  return (
    <div className="bg-hover rounded-xl p-6 text-center">
      <SparkIcon className="mx-auto mb-3 text-brand" />
      <Typography
        variant="display-section"
        className="text-brand font-serif italic"
      >
        {message}
      </Typography>
      {subtext && (
        <Typography variant="body-sm" className="text-brand mt-2">
          {subtext}
        </Typography>
      )}
    </div>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
