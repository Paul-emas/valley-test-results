"use client";
import CustomTextarea from "@/components/custom/custom-textarea";
import { Button } from "@/components/ui/button";
import {
  ArrowClockwiseIcon,
  BrainIcon,
  PaperPlaneRightIcon,
  TrayIcon,
} from "@phosphor-icons/react";
import React from "react";

const MessageInput = () => {
  const types = React.useMemo(
    () => [
      {
        label: "Custom message",
        value: "custom-message",
        icon: TrayIcon,
      },
      {
        label: "Regenerate",
        value: "regenerate",
        icon: ArrowClockwiseIcon,
      },
      {
        label: "Prompt",
        value: "prompt",
        icon: BrainIcon,
      },
    ],
    []
  );
  const [activeType, setActiveType] = React.useState<
    (typeof types)[number] | undefined
  >(types[0]);

  const handleTypeChange = React.useCallback(
    (value: string) => {
      setActiveType((prev) =>
        prev?.value === value ? undefined : types.find((v) => v.value === value)
      );
    },
    [types]
  );

  const [text, setText] = React.useState("");

  return (
    <div className="px-8 pt-5 ">
      <CustomTextarea
        placeholder="Write a custom message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        inputClassName="min-h-12! rounded-xl pt-[13px] font-medium pl-5 resize-none pr-14 w-[560px]"
        leftContent={
          <div className="flex items-center absolute right-2 top-1.5">
            <div className="w-1 h-5 border-l"></div>
            <Button variant="ghost" size="icon" disabled={!text}>
              <PaperPlaneRightIcon />
            </Button>
          </div>
        }
      />
      {types.length > 0 && (
        <div className="flex items-center gap-x-2 mt-4 justify-center">
          {types.map((type) => (
            <Button
              key={type.value}
              variant="outline"
              onClick={() => handleTypeChange(type.value)}
              className={`${
                activeType?.value === type.value ? "border-[#00B7C8]" : ""
              } rounded-full`}
              size="xs"
            >
              <type.icon />
              {type.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageInput;
