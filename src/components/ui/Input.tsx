import { forwardRef } from "react";
import { type FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type InputProps = {
  label?: string;
  placeholder?: string;
  error?: FieldError;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

// ─────────────────────────────────────────────
// Component
// forwardRef allows RHF to attach its ref to the input
// ─────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, placeholder, error, className, id, type = "text", ...props },
    ref,
  ) => {
    // Use provided id or fall back to label-based id for htmlFor to work
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-4 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "font-sans font-medium text-[14px] leading-5 tracking-[0%]",
              error ? "text-[#D93B3B]" : "text-secondary",
            )}
          >
            {label}
          </label>
        )}

        {/* Input */}
        <input
          id={inputId}
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={cn(
            // Base styles
            "w-full bg-transparent rounded-lg px-4 py-3",
            "font-sans font-medium text-sm leading-5 tracking-[0%]",
            "text-muted",
            "outline-none transition-all",

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

Input.displayName = "Input";

export { Input };

// How to use
// ("use client");

// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function LoginForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data); // { email: "...", password: "..." }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Input
//         label="Email"
//         placeholder="Enter your email"
//         type="email"
//         error={errors.email}
//         {...register("email", { required: "Email is required" })}
//       />

//       <Input
//         label="Password"
//         placeholder="Enter your password"
//         type="password"
//         error={errors.password}
//         {...register("password", { required: "Password is required" })}
//       />

//       <Button type="submit">Login</Button>
//     </form>
//   );
// }
