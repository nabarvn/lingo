import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold tracking-wide uppercase ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white hover:bg-slate-100 text-slate-500 border-slate-200 border-2 border-b-4 active:border-b-2",

        defaultOutline:
          "bg-transparent hover:bg-slate-100 text-slate-500 border-transparent border-0",

        primary:
          "bg-sky-400 hover:bg-sky-400/90 text-primary-foreground border-sky-500 border-b-4 active:border-b-0",

        primaryOutline: "bg-transparent hover:bg-slate-100 text-sky-500",

        secondary:
          "bg-green-500 hover:bg-green-500/90 text-primary-foreground border-green-600 border-b-4 active:border-b-0",

        secondaryOutline: "bg-transparent hover:bg-slate-100 text-green-500",

        danger:
          "bg-rose-500 hover:bg-rose-500/90 text-primary-foreground border-rose-600 border-b-4 active:border-b-0",

        dangerOutline: "bg-transparent hover:bg-slate-100 text-rose-500",

        super:
          "bg-indigo-500 hover:bg-indigo-500/90 text-primary-foreground border-indigo-600 border-b-4 active:border-b-0",

        superOutline: "bg-transparent hover:bg-slate-100 text-indigo-500",

        sidebar:
          "bg-sky-500/15 hover:bg-sky-500/20 text-sky-500 border-sky-300 border-2 transition-none",

        sidebarOutline:
          "bg-transparent hover:bg-slate-100 text-slate-500 border-2 border-transparent transition-none",
      },
      size: {
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
        default: "h-11 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
