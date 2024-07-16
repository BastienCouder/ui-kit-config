"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { LoaderIcon } from "@/lib/icons";


const chain = (...fns: any[]) => (...args: any) => {
  for (let fn of fns) {
    if (fn) fn(...args);
  }
};

const mergeRefs = (...refs: (((instance: HTMLTextAreaElement | null) => void) | React.RefObject<HTMLTextAreaElement> | null)[]) => (value: HTMLTextAreaElement | null) => {
  for (let ref of refs) {
    if (typeof ref === "function") {
      ref(value);
    } else if (ref != null && Object.prototype.hasOwnProperty.call(ref, "current")) {
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = value;
    }
  }
};

const useControlledState = (value: string | number | readonly string[] | undefined, defaultValue: any, onChange: { (): void; (arg0: any): void; }) => {
  const [state, setState] = React.useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : state;
  const setValue = React.useCallback(
    (newValue: any) => {
      if (!isControlled) {
        setState(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    },
    [isControlled, onChange]
  );

  return [currentValue, setValue];
};

const InputContext = React.createContext<{ ref: React.MutableRefObject<null> } | null>(null);
const TextAreaContext = React.createContext<{ ref: HTMLTextAreaElement | null } | null>(null);

const inputStyles = tv({
  slots: {
    root: [
      "w-full inline-flex justify-start items-center gap-2 px-2 transition-colors rounded-md border border-border-field bg-bg shadow-sm cursor-text text-fg-muted text-base sm:text-sm [&_svg]:size-4",
      "disabled:cursor-default disabled:border-border-disabled disabled:bg-bg-disabled disabled:text-fg-disabled",
      "invalid:border-border-danger focus-within:invalid:border-border",
    ],
    input: [
      "bg-transparent outline-none w-full h-full text-fg placeholder:text-fg-muted disabled:text-fg-disabled disabled:cursor-default",
    ],
  },
  variants: {
    size: {
      sm: { root: "h-8" },
      md: { root: "h-9" },
      lg: { root: "h-10" },
    },
    multiline: {
      true: {
        root: "h-auto flex-col items-stretch p-2",
        input: "min-h-14 resize-none overflow-auto",
      },
      false: {
        input: "flex-1",
      },
    },
  },
  defaultVariants: {
    size: "md",
    multiline: false,
  },
});

interface TextAreaInputProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  className?: string;
}
const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  ({ className, onChange, rows = 1, ...props }, forwardedRef) => {
    const { input } = inputStyles({ multiline: true });
    const [inputValue, setInputValue] = useControlledState(
      props.value,
      props.defaultValue ?? "",
      () => {}
    );
    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    const onHeightChange = React.useCallback(() => {
      if (inputRef.current) {
        const input = inputRef.current;
        const prevAlignment = input.style.alignSelf;
        const prevOverflow = input.style.overflow;
        const isFirefox = "MozAppearance" in input.style;
        if (!isFirefox) {
          input.style.overflow = "hidden";
        }
        input.style.alignSelf = "start";
        input.style.height = "auto";
        input.style.height = `${input.scrollHeight + (input.offsetHeight - input.clientHeight)}px`;
        input.style.overflow = prevOverflow;
        input.style.alignSelf = prevAlignment;
      }
    }, [inputRef]);

    React.useLayoutEffect(() => {
      if (inputRef.current) {
        onHeightChange();
      }
    }, [onHeightChange, inputValue, inputRef]);

    return (
      <textarea
        ref={mergeRefs(inputRef, forwardedRef)}
        className={input({ className })}
        onChange={chain(onChange, setInputValue)}
        rows={rows}
        {...props}
      />
    );
  }
);
TextAreaInput.displayName = "TextAreaInput";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "size"> {
  className?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const { input } = inputStyles();
  return <input ref={ref} className={input({ className })} {...props} />;
});
Input.displayName = "Input";

interface InputRootProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'prefix'>, VariantProps<typeof inputStyles> {
  asChild?: boolean;
  isLoading?: boolean;
  loaderPosition?: "prefix" | "suffix";
  children?: React.ReactNode;
  suffix?: React.ReactNode;
  href?: string;
  target?: string;
  prefix?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const InputRoot = ({
  className,
  prefix,
  suffix,
  isLoading,
  loaderPosition,
  size,
  multiline,
  ...props
}: InputRootProps) => {
  const { root } = inputStyles({ size, multiline });
  const inputContext = useSlottedContext(AriaInputContext);
  const textAreaContext = useSlottedContext(AriaTextAreaContext);
  const inputRef = React.useRef(null);
  const isDisabled = props.isDisabled || inputContext?.disabled || textAreaContext?.disabled;
  const isInvalid =
    props.isInvalid ||
    (!!inputContext?.["aria-invalid"] && inputContext["aria-invalid"] !== "false") ||
    (!!textAreaContext?.["aria-invalid"] && textAreaContext["aria-invalid"] !== "false");

  const inputRef = React.useRef(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("input, button, a")) return;
    const input = (inputRef as React.RefObject<HTMLInputElement | HTMLTextAreaElement>).current;
    if (!input) return;
    requestAnimationFrame(() => {
      input.focus();
    });
  };

  return (
    <div
      {...props}
      onPointerDown={handlePointerDown}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      className={root({ className })}
    >
      <InputContext.Provider value={{ ref: inputRef }}>
        <TextAreaContext.Provider value={{ ref: inputRef.current }}>
          {isLoading && loaderPosition === "prefix" ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            prefix
          )}
          {props.children}
          {isLoading && loaderPosition === "suffix" ? (
            <LoaderIcon className="animate-spin" />
          ) : (
            suffix
          )}
        </TextAreaContext.Provider>
      </InputContext.Provider>
    </div>
  );
};

export type { InputProps, InputRootProps, TextAreaInputProps };
export { Input, TextAreaInput, InputRoot, inputStyles };