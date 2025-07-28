"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type CustomDropdownProps<T> = {
  label?: string;
  items?: T[];
  showSeparator?: boolean;
  itemKey?: Extract<keyof T, string>;
  itemLabel?: Extract<keyof T, string>;
  onItemClick?: (item: T) => void;
  trigger: React.ReactNode;
  customDropdownContent?: React.ReactNode;
  align?: "start" | "center" | "end";
  contentClassName?: string;
  isOpen?: boolean;
};

const CustomDropdown = <T extends object>({
  label,
  items,
  trigger,
  itemKey,
  itemLabel,
  align = "start",
  showSeparator = false,
  onItemClick,
  isOpen,
  customDropdownContent,
  contentClassName,
}: CustomDropdownProps<T>) => {
  function getDisplayText(obj: T): string {
    return String(obj[itemLabel!]);
  }

  function getItemKey(obj: T): string {
    return String(obj[itemKey!]);
  }

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align={align} className={cn(contentClassName)}>
        {label ? (
          <DropdownMenuLabel className="text-muted-foreground">
            {label}
          </DropdownMenuLabel>
        ) : null}
        {showSeparator ? <DropdownMenuSeparator /> : null}
        {!customDropdownContent ? (
          <>
            {items?.map((item) => (
              <DropdownMenuItem
                key={getItemKey(item)}
                onClick={() => (onItemClick ? onItemClick(item) : {})}
              >
                {getDisplayText(item)}
              </DropdownMenuItem>
            ))}
          </>
        ) : (
          customDropdownContent
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomDropdown;
