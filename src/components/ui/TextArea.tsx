import { forwardRef } from "react";
import { type FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  error?: FieldError;
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// ─────────────────────────────────────────────
// Component
// forwardRef allows RHF to attach its ref to the textarea
// ─────────────────────────────────────────────

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, error, className, id, rows = 5, ...props }, ref) => {
    // Use provided id or fall back to label-based id for htmlFor to work
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-4 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              "font-sans font-medium text-[14px] leading-5 tracking-[0%]",
              error ? "text-[#D93B3B]" : "text-secondary",
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          placeholder={placeholder}
          className={cn(
            // Base styles
            "w-full bg-transparent rounded-lg px-4 py-3",
            "font-sans font-medium text-sm leading-5 tracking-[0%]",
            "text-muted",
            "outline-none transition-all",

            // Resize — vertical only, never below the rows-defined minimum
            "resize-y min-h-[125px]",

            // Border — 0.5px, color token (update in global.css later)
            "border-[0.5px] border-border-default",

            // Focus
            "focus:border-[#F27A1A] focus:border-[0.5px]",

            // Error
            error && "border-[#D93B3B] focus:border-[#D93B3B] focus:border",

            className,
          )}
          {...props}
        />

        {/* Error message */}
        {error && (
          <span className="text-[#D93B3B] font-sans font-normal text-xs leading-4">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";

export { TextArea };
