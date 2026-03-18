import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, style, ...props },
    ref,
  ) => {
    const isDark = useIsDark();

    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      primary: "focus-visible:ring-primary-400",
      secondary:
        "backdrop-blur-[10px] border border-secondary-400/30 text-shade-white hover:bg-secondary-400/20 focus-visible:ring-secondary-400",
      ghost:
        "text-shade-white hover:bg-shade-white/10 focus-visible:ring-shade-white/20",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-12 px-8 text-lg",
    };

    const secondaryBgStyle =
      variant === "secondary"
        ? {
            backgroundColor: "rgba(225, 225, 225, 0.15)",
          }
        : {};

    const primaryStyle =
      variant === "primary"
        ? {
            backgroundColor: "var(--color-accent)",
            color: isDark ? "#1a1a1a" : "#ffffff",
          }
        : {};

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        style={{ ...secondaryBgStyle, ...primaryStyle, ...style }}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
