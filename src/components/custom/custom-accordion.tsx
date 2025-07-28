"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface CustomAccordionItemProps {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface CustomAccordionProps {
  items: CustomAccordionItemProps[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  customTrigger?:
    | React.ReactNode
    | ((props: {
        isOpen: boolean;
        trigger: React.ReactNode;
      }) => React.ReactNode);
  customContent?:
    | React.ReactNode
    | ((props: {
        isOpen: boolean;
        content: React.ReactNode;
      }) => React.ReactNode);
}

const CustomAccordion = ({
  items,
  type = "single",
  collapsible = true,
  className,
  triggerClassName,
  contentClassName,
  itemClassName,
  defaultValue,
  value,
  onValueChange,
  customTrigger,
  customContent,
}: CustomAccordionProps) => {
  const renderTrigger = (item: CustomAccordionItemProps, isOpen: boolean) => {
    if (customTrigger) {
      if (typeof customTrigger === "function") {
        return customTrigger({
          isOpen,
          trigger: item.trigger,
        });
      }
      if (React.isValidElement(customTrigger)) {
        return React.cloneElement(
          customTrigger as React.ReactElement<Record<string, unknown>>,
          {
            "data-state": isOpen ? "open" : "closed",
          }
        );
      }
      return customTrigger;
    }

    return item.trigger;
  };

  const renderContent = (item: CustomAccordionItemProps, isOpen: boolean) => {
    if (customContent) {
      if (typeof customContent === "function") {
        return customContent({
          isOpen,
          content: item.content,
        });
      }
      if (React.isValidElement(customContent)) {
        return React.cloneElement(
          customContent as React.ReactElement<Record<string, unknown>>,
          {
            "data-state": isOpen ? "open" : "closed",
          }
        );
      }
      return customContent;
    }

    return item.content;
  };

  const [openValues, setOpenValues] = React.useState<string | string[]>(
    defaultValue || (type === "single" ? "" : [])
  );

  const currentValue = value !== undefined ? value : openValues;

  const isItemOpen = (itemValue: string) => {
    if (type === "single") {
      return currentValue === itemValue;
    }
    return Array.isArray(currentValue) && currentValue.includes(itemValue);
  };

  const renderAccordion = () => {
    if (type === "single") {
      return (
        <Accordion
          type="single"
          collapsible={collapsible}
          className={cn(className)}
          defaultValue={defaultValue as string}
          value={value as string}
          onValueChange={(newValue) => {
            setOpenValues(newValue);
            if (onValueChange) {
              (onValueChange as (value: string) => void)(newValue);
            }
          }}
        >
          {items.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className={cn(itemClassName)}
            >
              <AccordionTrigger className={cn(triggerClassName)}>
                {renderTrigger(item, isItemOpen(item.value))}
              </AccordionTrigger>
              <AccordionContent className={cn(contentClassName)}>
                {renderContent(item, isItemOpen(item.value))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      );
    }

    return (
      <Accordion
        type="multiple"
        className={cn(className)}
        defaultValue={defaultValue as string[]}
        value={value as string[]}
        onValueChange={(newValue) => {
          setOpenValues(newValue);
          if (onValueChange) {
            (onValueChange as (value: string[]) => void)(newValue);
          }
        }}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className={cn(itemClassName)}
          >
            <AccordionTrigger className={cn(triggerClassName)}>
              {renderTrigger(item, isItemOpen(item.value))}
            </AccordionTrigger>
            <AccordionContent className={cn(contentClassName)}>
              {renderContent(item, isItemOpen(item.value))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };

  return renderAccordion();
};

export default CustomAccordion;
