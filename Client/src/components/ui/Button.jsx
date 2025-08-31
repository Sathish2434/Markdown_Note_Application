import React from 'react';
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import Icon from '../AppIcon';

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        danger: "bg-error text-error-foreground hover:bg-error/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-8 rounded-md px-2 text-xs",
        xl: "h-12 rounded-md px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({
  className,
  variant,
  size,
  asChild = false,
  children,
  loading = false,
  iconName = null,     // supports string name (e.g. "Home")
  icon = null,         // also supports <Icon /> element
  iconPosition = 'left',
  iconSize = null,
  fullWidth = false,
  disabled = false,
  ...props
}, ref) => {
  const Comp = asChild ? Slot : "button";

  // Icon size mapping
  const iconSizeMap = {
    xs: 12,
    sm: 14,
    default: 16,
    lg: 18,
    xl: 20,
    icon: 16,
  };
  const calculatedIconSize = iconSize || iconSizeMap?.[size] || 16;

  // ✅ Fixed Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );

  const renderIcon = () => {
    if (icon) return icon;
    if (iconName) {
      return (
        <Icon
          name={iconName}
          size={calculatedIconSize}
          className={cn(
            children && iconPosition === 'left' && "mr-2",
            children && iconPosition === 'right' && "ml-2"
          )}
        />
      );
    }
    return null;
  };

  return (
    <Comp
      className={cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full"
      )}
      ref={ref}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {renderIcon() && iconPosition === 'left' && renderIcon()}
      {children}
      {renderIcon() && iconPosition === 'right' && renderIcon()}
    </Comp>
  );
});

Button.displayName = "Button";
export default Button;
