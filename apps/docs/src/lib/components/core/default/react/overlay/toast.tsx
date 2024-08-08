"use client";

import { X } from "lucide-react";
import type * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast"

export const ToastProvider = ToastPrimitives.Provider;

export function ToastTitle({ children }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>) {
  return <ToastPrimitives.Title className="text-sm font-semibold">{children}</ToastPrimitives.Title>;
}

export function ToastDescription({ children }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>) {
  return <ToastPrimitives.Description className="text-sm opacity-90">{children}</ToastPrimitives.Description>;
}

export function ToastViewport({ children }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>) {
  return (
    <ToastPrimitives.Viewport className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {children}
    </ToastPrimitives.Viewport>
  );
}

export function Toast({ children, variant }: { children?: React.ReactNode; variant: 'default' | 'error' | 'success' | 'warning' }) {
  let variantClasses = "";
  switch (variant) {
    case 'error':
      variantClasses = "border-danger/50 bg-danger-fg text-error";
      break;
    case 'success':
      variantClasses = "border-success/50 bg-success-fg text-success";
      break;
    case 'warning':
      variantClasses = "border-warning/50 bg-warning-fg text-warning";
      break;
    case 'default':
    default:
      variantClasses = "bg-background";
      break;
  }

  return (
    <ToastPrimitives.Root className={`group relative w-full space-x-4 pointer-events-auto overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${variantClasses}`}>
      {children}
    </ToastPrimitives.Root>
  );
}

export function ToastAction({ children, altText }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action> & { altText: string }) {
  return (
    <ToastPrimitives.Action className="hover:bg-secondary inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" altText={altText}>
      {children}
    </ToastPrimitives.Action>
  );
}

export function ToastClose({ children }: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>) {
  return (
    <ToastPrimitives.Close className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 hover:text-foreground opacity-0 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100">
      {children} <X className="size-4" />
    </ToastPrimitives.Close>
  );
}

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export type ToastVariants = {
  variant: 'default' | 'error' | 'success' | 'warning';
};

export type ToastProps = {
  icon?: React.ComponentType;
} & React.ComponentPropsWithoutRef<typeof Toast>;
