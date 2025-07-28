import React, { forwardRef } from "react";

import { Label } from "@/components/ui/label";
import type { TextareaProps } from "@/components/ui/textarea";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export interface CustomTextareaProps extends TextareaProps {
  id?: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  loading?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  errorMessage?: string;
  helperText?: string;
  labelHelperText?: string;
  customContent?: React.ReactNode;
  forwardedRef?: React.RefObject<HTMLTextAreaElement>;
}

const CustomTextarea: React.FC<CustomTextareaProps> = forwardRef<
  HTMLTextAreaElement,
  CustomTextareaProps
>(
  (
    {
      className = "",
      id = Math.random().toString(),
      label = "",
      inputClassName = "",
      labelHelperText,
      helperText,
      errorMessage,
      customContent,
      leftContent,
      rightContent,
      forwardedRef,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative", className)}>
        {label ? (
          <Label
            id={id}
            className={cn(
              "mb-2 inline-flex w-full items-center justify-between",
              props.disabled && "opacity-50"
            )}
          >
            <span>{label}</span>
            {labelHelperText ? (
              <span className="text-xs font-medium text-muted-foreground">
                {labelHelperText}
              </span>
            ) : null}
          </Label>
        ) : null}
        <div className="relative">
          {customContent || null}
          {leftContent || null}
          <Textarea
            ref={forwardedRef || ref}
            className={cn(
              errorMessage &&
                "border-red-500 ring-0 focus-visible:ring-red-500",
              inputClassName
            )}
            {...props}
          />
          {rightContent || null}
        </div>
        {errorMessage ? (
          <div className="mt-2 w-full text-sm text-red-600 first-letter:capitalize">
            {errorMessage}
          </div>
        ) : null}
        {helperText && !errorMessage ? (
          <div
            className={cn(
              "mt-1.5 text-xs text-muted-foreground",
              props.disabled && "text-gray-400"
            )}
          >
            {helperText}
          </div>
        ) : null}
      </div>
    );
  }
);

CustomTextarea.displayName = "CustomTextarea";

export default CustomTextarea;
