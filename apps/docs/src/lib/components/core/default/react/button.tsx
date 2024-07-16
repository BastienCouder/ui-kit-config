import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";
import { LoaderIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const buttonStyles = tv(
  {
    base: "inline-flex gap-2 cursor-pointer items-center justify-center whitespace-nowrap rounded-md leading-normal text-sm shrink-0 font-medium ring-offset-background transition-colors disabled:cursor-default disabled:bg-bg-disabled disabled:text-fg-disabled",
    variants: {
      variant: {
        default:
          "bg-bg-neutral hover:bg-bg-neutral-hover pressed:bg-bg-neutral-active text-fg-onNeutral",
        primary:
          "bg-bg-primary hover:bg-bg-primary-hover pressed:bg-bg-primary-active text-fg-onPrimary",
        secondary:
          "bg-bg-secondary hover:bg-bg-secondary-hover pressed:bg-bg-secondary-active text-fg-onSecondary",
        quiet: "bg-transparent hover:bg-bg-inverse/10 pressed:bg-bg-inverse/20 text-fg",
        outline:
          "border border-border-field bg-transparent hover:bg-bg-inverse/10 pressed:bg-bg-inverse/20 text-fg disabled:border-border-disabled disabled:bg-transparent",
        accent:
          "bg-bg-accent hover:bg-bg-accent-hover pressed:bg-bg-accent-active text-fg-onAccent",
        success:
          "bg-bg-success hover:bg-bg-success-hover pressed:bg-bg-success-active text-fg-onSuccess",
        warning:
          "bg-bg-warning hover:bg-bg-warning-hover pressed:bg-bg-warning-active text-fg-onWarning",
        danger:
          "bg-bg-danger hover:bg-bg-danger-hover pressed:bg-bg-danger-active text-fg-onDanger",
      },
      size: {
        sm: "h-8 px-3 [&_svg]:size-4",
        md: "h-9 px-4 [&_svg]:size-4",
        lg: "h-10 px-5 [&_svg]:size-5",
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
