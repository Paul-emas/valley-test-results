import { Button } from "@/components/ui/button";
import { CaretDownIcon } from "@phosphor-icons/react";
import { CalendarClockIcon } from "lucide-react";
import React from "react";
import MessageItem from "./message-item";
import MessageInput from "./message-input";

const MessagesTemplate = () => {
  return (
    <div className="relative h-[calc(100vh-11.5rem)] w-full">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-muted-foreground">
          Version 2 - Most recent
        </div>
        <Button variant="outline" size="sm" className="ml-auto text-xs">
          <CalendarClockIcon className="size-4" />
          Sequence version history
          <CaretDownIcon className="size-4" />
        </Button>
      </div>
      <div className="mt-3.5">
        <MessageItem />
      </div>

      <div className="h-[140px] w-full absolute bottom-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default MessagesTemplate;
