import * as React from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaAutosizeProps {
  errorMessage?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, errorMessage, ...props }, ref) => {
    return (
      <>
        <TextareaAutosize
          className={cn(
            "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            errorMessage
              ? "border-red-500 ring-0 focus-visible:ring-red-500"
              : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage ? (
          <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
        ) : null}
      </>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
