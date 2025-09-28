import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';
    
    const variants = {
      primary: 'bg-primary-400 text-shade-white hover:bg-primary-400/90 focus-visible:ring-primary-400',
      secondary: 'backdrop-blur-[10px] border border-secondary-400/30 text-shade-white hover:bg-secondary-400/20 focus-visible:ring-secondary-400',
      ghost: 'text-shade-white hover:bg-shade-white/10 focus-visible:ring-shade-white/20'
    };
    
    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-12 px-8 text-lg'
    };
    
    // Apply specific background for secondary variant
    const secondaryBgStyle = variant === 'secondary' ? {
      backgroundColor: 'rgba(225, 225, 225, 0.15)'
    } : {};
    
    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        style={secondaryBgStyle}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;