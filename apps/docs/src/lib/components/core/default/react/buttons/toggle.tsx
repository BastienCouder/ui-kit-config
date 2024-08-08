"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";

const toggleStyles = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-md leading-normal text-sm font-medium ring-offset-background transition-colors disabled:cursor-default disabled:bg-bg-disabled disabled:text-fg-disabled",
  variants: {
    variant: {
      quiet: "bg-transparent hover:bg-bg-inverse/10 pressed:bg-bg-inverse/20 text-fg data-[state=on]:bg-bg-primary data-[state=on]:text-fg-onPrimary data-[state=on]:hover:bg-bg-primary-hover data-[state=on]:pressed:bg-bg-primary-active",
      outline: "border border-border-field bg-transparent hover:bg-bg-inverse/10 pressed:bg-bg-inverse/20 pressed:border-transparent text-fg data-[state=on]:bg-bg-primary data-[state=on]:border-transparent data-[state=on]:text-fg-onPrimary data-[state=on]:hover:bg-bg-primary-hover data-[state=on]:pressed:bg-bg-primary-active",
      accent: "border border-border-field bg-transparent hover:bg-bg-inverse/10 pressed:bg-bg-inverse/20 pressed:border-transparent text-fg data-[state=on]:bg-bg-accent data-[state=on]:border-transparent data-[state=on]:hover:bg-bg-accent-hover data-[state=on]:pressed:bg-bg-accent-active data-[state=on]:text-fg-onAccent",
    },
    size: {
      sm: "p-1.5 size-8 [&_svg]:w-4 [&_svg]:h-4",
      md: "p-2 size-9 [&_svg]:w-4 [&_svg]:h-4",
      lg: "p-4 size-10 [&_svg]:w-5 [&_svg]:h-5",
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
      shape: "rectangle",
      className: "px-3 w-auto",
    },
    {
      size: "md",
      shape: "rectangle",
      className: "px-4 w-auto",
    },
    {
      size: "lg",
      shape: "rectangle",
      className: "px-5 w-auto",
    },
  ],
  defaultVariants: {
    variant: "quiet",
    size: "md",
    shape: "square",
  },
});

interface ToggleProps extends Omit<React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>, 'prefix'>,
  VariantProps<typeof toggleStyles> {
  children: React.ReactNode;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  isDisabled?: boolean;
  defaultSelected?: boolean;
  isSelected?: boolean;
  onPressedChange?: (isSelected: boolean) => void;
}

const ToggleButton = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>((props: ToggleProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const { className, variant, size, shape, prefix, isDisabled, suffix, defaultSelected, isSelected, onPressedChange, ...restProps } = props;

  const handlePressedChange = React.useCallback(
    (pressed: boolean) => {
      if (onPressedChange) {
        onPressedChange(pressed);
      }
    },
    [onPressedChange]
  );

  return (
    <TogglePrimitive.Root
      ref={ref}
      disabled={isDisabled}
      className={cn(toggleStyles({ variant, size, shape, className }))}
      defaultPressed={defaultSelected}
      pressed={isSelected}
      onPressedChange={handlePressedChange}
      {...restProps}
    >
      {prefix && <span className="mr-2">{prefix}</span>}
      {props.children}
      {suffix && <span className="ml-2">{suffix}</span>}
    </TogglePrimitive.Root>
  );
});

ToggleButton.displayName = "ToggleButton";

type ToggleContextValue = VariantProps<typeof toggleStyles>;
const ToggleContext = React.createContext<ToggleContextValue>({});
const useToggleContext = () => {
  return React.useContext(ToggleContext);
};

export type { ToggleProps };
export { ToggleButton, toggleStyles, ToggleContext, useToggleContext };