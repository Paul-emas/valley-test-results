import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { XIcon, PlusIcon } from "@phosphor-icons/react";
import { Icon } from "@phosphor-icons/react";

interface MultiSelectItem {
  value: string;
  label: string;
  icon?: Icon;
}

interface CustomMultiSelectProps {
  value: MultiSelectItem[];
  onChange: (values: MultiSelectItem[]) => void;
  label?: string;
  addButtonText?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  maxItems?: number;
  itemValidator?: (value: string) => { isValid: boolean; message?: string };
  availableItems?: MultiSelectItem[];
  allowCustomItems?: boolean;
}

const CustomMultiSelect = ({
  value,
  onChange,
  label = "",
  addButtonText = "Add Item",
  placeholder = "Enter item name",
  helperText,
  errorMessage,
  maxItems,
  itemValidator,
  availableItems = [],
  allowCustomItems = true,
}: CustomMultiSelectProps) => {
  const [newItemValue, setNewItemValue] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAddItem = () => {
    if (!newItemValue.trim()) return;

    // Check if maxItems is defined and if current length has reached the limit
    if (maxItems !== undefined && value.length >= maxItems) {
      setValidationError(`Maximum of ${maxItems} items allowed`);
      return;
    }

    // Prevent duplicates
    if (value.some((item) => item.value === newItemValue.trim())) {
      setValidationError("This item already exists");
      return;
    }

    // Custom validation if provided
    if (itemValidator) {
      const validation = itemValidator(newItemValue.trim());
      if (!validation.isValid) {
        setValidationError(validation.message || "Invalid input");
        return;
      }
    }

    // Clear any validation errors
    setValidationError(null);

    // Check if item exists in available items or create custom item
    const existingItem = availableItems.find(
      (item) => item.value === newItemValue.trim()
    );
    const newItem: MultiSelectItem = existingItem || {
      value: newItemValue.trim(),
      label: newItemValue.trim(),
    };

    // Add the new item
    onChange([...value, newItem]);
    setNewItemValue("");
  };

  const handleRemoveItem = (itemToRemove: MultiSelectItem) => {
    onChange(value.filter((item) => item.value !== itemToRemove.value));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        {label ? (
          <label className="text-sm font-medium text-neutral-700">
            {label}
            <span className="ml-1 text-xs text-neutral-500">
              ({value.length}{" "}
              {value.length === 1 ? label.toLowerCase() : label.toLowerCase()})
            </span>
          </label>
        ) : null}
        {errorMessage && (
          <span className="text-sm text-destructive">{errorMessage}</span>
        )}
      </div>

      <div className="relative rounded-md">
        <div className="absolute inset-0 rounded-md border-3 border-dashed border-white bg-gradient-to-b from-[#E9B97E] via-[#A1CDD3] to-[#E7A6AF] bg-clip-border"></div>
        <div className="relative rounded-md bg-background border-2 border-dashed border-transparent bg-clip-padding">
          <div className="flex min-h-10 flex-wrap gap-2 rounded-md bg-background p-1">
            {value.map((item) => (
              <div key={item.value} className="relative z-10">
                <div className="absolute inset-0 rounded-sm border-2 -z-10 border-transparent bg-gradient-to-b from-[#E9B97E] via-[#A1CDD3] to-[#E7A6AF] bg-clip-border"></div>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-2 py-1 bg-background border-1 border-dashed border-transparent bg-clip-padding text-muted-foreground rounded-sm"
                >
                  {item.icon && <item.icon size={14} />}
                  {item.label}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item)}
                    className="ml-1 rounded-full hover:bg-neutral-200 focus:outline-none"
                  >
                    <XIcon size={14} weight="bold" />
                  </button>
                </Badge>
              </div>
            ))}

            <div className="min-w-[200px] flex-1">
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-6 rounded-sm gap-x-2"
                    disabled={
                      maxItems !== undefined && value.length >= maxItems
                    }
                  >
                    <PlusIcon className="size-3.5" />
                    {addButtonText}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <div className="flex flex-col p-2">
                    {availableItems.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">
                          Available items:
                        </p>
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {availableItems
                            .filter(
                              (availableItem) =>
                                !value.some(
                                  (selectedItem) =>
                                    selectedItem.value === availableItem.value
                                )
                            )
                            .map((availableItem) => (
                              <button
                                key={availableItem.value}
                                type="button"
                                className="w-full flex items-center gap-2 px-2 py-1 text-sm text-left hover:bg-gray-100 rounded"
                                onClick={() => {
                                  onChange([...value, availableItem]);
                                  setPopoverOpen(false);
                                }}
                              >
                                {availableItem.icon && (
                                  <availableItem.icon size={14} />
                                )}
                                {availableItem.label}
                              </button>
                            ))}
                        </div>
                        {allowCustomItems && (
                          <div className="border-t my-2 pt-2">
                            <p className="text-xs text-muted-foreground mb-1">
                              Add custom item:
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    {allowCustomItems && (
                      <div className="flex">
                        <input
                          type="text"
                          value={newItemValue}
                          onChange={(e) => setNewItemValue(e.target.value)}
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder={placeholder}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddItem();
                            }
                          }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="ml-2"
                          onClick={() => {
                            handleAddItem();
                            if (!validationError) {
                              setPopoverOpen(false);
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                    {validationError && (
                      <p className="mt-1 text-xs text-destructive">
                        {validationError}
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};

export default CustomMultiSelect;
