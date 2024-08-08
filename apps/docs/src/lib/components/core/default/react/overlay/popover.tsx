"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

interface PopoverProps {
  children: React.ReactNode | string;
  content: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  delay?: number;
  shouldFlip?: boolean;
  arrow?: boolean;
  className?: string;
  flexContent?: 'start' | 'center' | 'end';
}

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  className,
  placement = "top",
  offset = 10,
  delay = 0,
  shouldFlip = true,
  arrow = false,
  flexContent = 'center',
  ...props
}) => {
  const wrappedChildren = typeof children === 'string' || typeof children === 'number'
    ? <>{children}</>
    : children;

  return (
    <PopoverPrimitive.Root {...props}>
      <PopoverTrigger asChild>{wrappedChildren}</PopoverTrigger>
      <PopoverContent
        placement={placement}
        offset={offset}
        shouldFlip={shouldFlip}
        arrow={arrow}
        delay={delay}
        flexContent={flexContent}
        className={className}
      >
        {content}
      </PopoverContent>
    </PopoverPrimitive.Root>
  );
};

const PopoverTrigger = PopoverPrimitive.Trigger;

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  shouldFlip?: boolean;
  arrow?: boolean;
  delay?: number;
  flexContent?: 'start' | 'center' | 'end';
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      placement = "top",
      offset = 10,
      shouldFlip = true,
      arrow = false,
      delay = 0,
      flexContent = 'center',
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        side={placement}
        sideOffset={offset}
        avoidCollisions={shouldFlip}
        onOpenAutoFocus={(event) => {
          if (delay > 0) {
            event.preventDefault();
            if (event.target instanceof HTMLElement) {
              setTimeout(() => {
                if (event.target instanceof HTMLElement) {
                  event.target.focus();
                }
              }, delay);
            }
          }
        }}
        className={cn(
          "flex z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          flexContent === 'start' && "justify-start",
          flexContent === 'center' && "justify-center",
          flexContent === 'end' && "justify-end",
          className
        )}
        {...props}
      >
        {props.children}
        {arrow && (
          <PopoverPrimitive.Arrow className="fill-current text-popover" />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
