import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import { LoaderIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const buttonStyles = tv(
  {
    base: "inline-flex gap-2 cursor-pointer items-center justify-center whitespace-nowrap rounded-md leading-normal text-sm shrink-0 font-medium ring-offset-background transition-colors disabled:cursor-default disabled:bg-disabled disabled:text-disabled-fg",
    variants: {
      variant: {
        default:
          "bg-neutral hover:bg-neutral-hover pressed:bg-neutral-active text-neutral-fg",
        primary:
          "bg-primary hover:bg-primary-hover pressed:bg-primary-active text-primary-fg",
        secondary:
          "bg-secondary hover:bg-secondary-hover pressed:bg-secondary-active text-secondary-fg",
        quiet: "bg-transparent hover:bg-inverse/10 pressed:bg-inverse/20 text-fg",
        outline:
          "border border-border bg-transparent hover:bg-inverse/10 pressed:bg-inverse/20 text-fg disabled:border-disabled disabled:bg-transparent",
        accent:
          "bg-accent hover:bg-accent-hover pressed:bg-accent-active text-accent-fg",
        success:
          "bg-success hover:bg-success-hover pressed:bg-success-active text-success-fg",
        warning:
          "bg-warning hover:bg-warning-hover pressed:bg-warning-active text-warning-fg",
        danger:
          "bg-danger hover:bg-danger-hover pressed:bg-danger-active text-danger-fg",
      },
      size: {
        sm: "h-8 px-3 [&_svg]:w-4 [&_svg]:h-4",
        md: "h-9 px-4 [&_svg]:w-4 [&_svg]:h-4",
        lg: "h-10 px-5 [&_svg]:w-5 [&_svg]:h-5",
        icon: "h-10 w-10",
      },
      shape: {
        rectangle: "",
        square: "",
        circle: "rounded-full",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        shape: ["square", "circle"],
        className: "w-8 px-0",
      },
      {
        size: "md",
        shape: ["square", "circle"],
        className: "w-9 px-0",
      },
      {
        size: "lg",
        shape: ["square", "circle"],
        className: "w-10 px-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rectangle",
    },
  },
  {
    responsiveVariants: ["sm", "lg"],
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix'>,
    VariantProps<typeof buttonStyles> {
  asChild?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
  suffix?: React.ReactNode;
  href?: string;
  target?: string;
  prefix?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      isLoading,
      isDisabled,
      children,
      prefix,
      suffix,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const Element: React.ElementType = props.href ? "a" : Comp;

    return (
      <Element
        className={cn(buttonStyles({ variant, size, shape }), className)}
        ref={ref}
        disabled={isDisabled || isLoading}
        {...props}
      >
        {isLoading && <LoaderIcon aria-label="loading" className="animate-spin" />}
        {prefix}
        {typeof children === "string" ? <span className="truncate">{children}</span> : children}
        {suffix}
      </Element>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonStyles };
