"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { toggleStyles } from "./toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleStyles>>({
  size: "md",
  variant: "outline",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleStyles>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

type ToggleGroupItemProps = {
  suffix?: React.ReactNode;
  isDisabled?: boolean;
  prefix?: React.ReactNode;
  defaultSelected?: boolean;
} & VariantProps<typeof toggleStyles> & React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(
  (
    {
      className,
      children,
      variant,
      size,
      prefix,
      suffix,
      shape,
      isDisabled,
      defaultSelected,
      ...props
    },
    ref
  ) => {
    const context = React.useContext(ToggleGroupContext);

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        disabled={isDisabled}
        className={cn(
          toggleStyles({
            variant: context.variant || variant,
            size: context.size || size,
            shape: shape,
          }),
          className
        )}
        {...props}
      >
        {prefix && <span className="mr-2">{prefix}</span>}
        {children}
        {suffix && <span className="ml-2">{suffix}</span>}
      </ToggleGroupPrimitive.Item>
    );
  }
);

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroupItem, ToggleGroup };