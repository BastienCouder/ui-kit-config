"use client";

import * as React from "react";
import { tv } from "tailwind-variants";

const separatorStyles = tv({
  base: "shrink-0 bg-border separator",
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type SeparatorProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  [key: string]: any;
};

const Separator = ({ orientation = "horizontal", className, ...props }: SeparatorProps) => {
  return <div {...props} className={separatorStyles({ orientation, className })} />;
};

export { Separator };
