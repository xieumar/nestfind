"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { Slot } from "radix-ui";

const variantHoverStyles: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: "transparent",
    color: "var(--primary)",
    boxShadow: "none",
    borderColor: "var(--primary)",
  },
  secondary: {
    backgroundColor: "transparent",
    color: "var(--secondary)",
    boxShadow: "none",
    borderColor: "var(--secondary)",
  },
  accent: {
    backgroundColor: "transparent",
    color: "var(--accent)",
    boxShadow: "none",
    borderColor: "var(--accent)",
  },
  outline: {
    backgroundColor: "var(--primary)",
    color: "var(--pearl-lusta)",
    borderColor: "var(--primary)",
  },
  ghost: {
    backgroundColor: "var(--muted)",
    color: "var(--foreground)",
    borderColor: "var(--border)",
  },
  destructive: {
    backgroundColor: "transparent",
    color: "var(--destructive)",
    boxShadow: "none",
    borderColor: "var(--destructive)",
  },
  link: {
    textDecoration: "underline",
  },
};

const hoverReset: React.CSSProperties = {
  backgroundColor: "",
  color: "",
  boxShadow: "",
  borderColor: "",
  textDecoration: "",
};

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border text-sm font-medium whitespace-nowrap transition-[background-color,color,box-shadow,border-color] duration-200 outline-none select-none cursor-pointer focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-pearl-lusta",
        secondary: "border-secondary bg-secondary text-[#1c260c]",
        accent: "border-accent bg-accent text-pearl-lusta",
        destructive: "border-destructive bg-destructive text-white",
        outline: "border-primary bg-transparent text-primary",
        ghost: "border-transparent bg-transparent text-foreground",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 px-6 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  onMouseEnter,
  onMouseLeave,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const s = variantHoverStyles[variant ?? "default"];
    if (s) Object.assign((e.currentTarget as HTMLElement).style, s);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    Object.assign((e.currentTarget as HTMLElement).style, hoverReset);
    onMouseLeave?.(e);
  };

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
