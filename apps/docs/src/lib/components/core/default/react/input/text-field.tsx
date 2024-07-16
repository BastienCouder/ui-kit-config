"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Field, type FieldProps } from "./field";
import { InputRoot, Input, type inputStyles } from "./input";

const textFieldStyles = tv({
  base: "flex flex-col gap-2 items-start w-48",
});

type TextFieldProps = TextFieldRootProps &
  Omit<FieldProps, "children"> &
  VariantProps<typeof inputStyles> & {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    isLoading?: boolean;
    loaderPosition?: "prefix" | "suffix";
    placeholder?: string;
  };

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      size,
      placeholder,
      label,
      description,
      errorMessage,
      prefix,
      suffix,
      isLoading,
      loaderPosition = "suffix",
      necessityIndicator,
      contextualHelp,
      ...props
    },
    ref
  ) => {
    return (
      <div className={textFieldStyles({ className })}>
        <Field
          label={label}
          description={description}
          errorMessage={errorMessage}
          necessityIndicator={necessityIndicator}
          contextualHelp={contextualHelp}
        >
          <InputRoot
            size={size as "sm" | "md" | "lg" | undefined} // Explicit type assertion
            prefix={prefix}
            suffix={suffix}
            isLoading={isLoading}
            loaderPosition={loaderPosition}
          >
            <Input ref={ref} placeholder={placeholder} {...props} />
          </InputRoot>
        </Field>
      </div>
    );
  }
);
TextField.displayName = "TextField";

type TextFieldRootProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> & {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const TextFieldRoot = React.forwardRef<HTMLInputElement, TextFieldRootProps>(
  ({ className, size, ...props }, ref) => {
    return <input ref={ref} className={textFieldStyles({ className })} {...props} />;
  }
);
TextFieldRoot.displayName = "TextFieldRoot";

export type { TextFieldProps, TextFieldRootProps };
export { TextField, TextFieldRoot };
