"use client";

import * as React from "react";
import { ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxOption {
  value: string;
  label: string;
  helperText?: string; // Optional helper text for additional information
}

interface CustomComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  itemClassName?: string;
  contentClassName?: string;
  width?: string;
  disabled?: boolean;
  contentAlign?: "start" | "center" | "end";
  trigger?:
    | React.ReactNode
    | ((props: {
        open: boolean;
        selectedOption?: ComboboxOption;
        placeholder: string;
      }) => React.ReactNode);
}

const CustomCombobox = ({
  options,
  value = "",
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No option found.",
  className,
  itemClassName,
  contentClassName,
  width = "w-[200px]",
  disabled = false,
  contentAlign = "start",
  trigger,
}: CustomComboboxProps) => {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value);

  // Update internal value when external value changes
  React.useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleValueChange = (newValue: string) => {
    const updatedValue = newValue === internalValue ? "" : newValue;
    setInternalValue(updatedValue);
    onValueChange?.(updatedValue);
    setOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === internalValue
  );

  // Render custom trigger or default trigger
  const renderTrigger = () => {
    if (trigger) {
      if (typeof trigger === "function") {
        return trigger({
          open,
          selectedOption,
          placeholder,
        });
      }
      // If trigger is a React element, clone it and pass props
      if (React.isValidElement(trigger)) {
        return React.cloneElement(
          trigger as React.ReactElement<Record<string, unknown>>,
          {
            role: "combobox",
            "aria-expanded": open,
            disabled,
          }
        );
      }
      return trigger;
    }

    // Default trigger
    return (
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn(width, "justify-between", className)}
        disabled={disabled}
      >
        {selectedOption?.label || placeholder}
        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
      <PopoverContent className={cn(width, "p-0", contentClassName)} align={contentAlign}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleValueChange}
                  className={cn("font-medium", itemClassName)}
                >
                  <Checkbox
                    checked={internalValue === option.value}
                    className="mr-2.5 pointer-events-none"
                  />
                  {option.label}
                  {option.helperText && (
                    <span className="ml-auto text-muted-foreground text-xs font-medium">
                      {option.helperText}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CustomCombobox;
