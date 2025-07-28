import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  ChecksIcon,
  EnvelopeSimpleIcon,
  MeteorIcon,
  PencilLineIcon,
  SunIcon,
} from "@phosphor-icons/react";
import React from "react";

const MessageItem = () => {
  return (
    <div className="h-[256px] border border-input w-full rounded shadow-lg shadow-accent p-4">
      <div className="flex icons-center justify-between">
        <div className="flex items-center text-xs text-muted-foreground font-medium gap-1">
          <MeteorIcon className="size-4" />
          <span>Connect message</span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground font-medium gap-1">
          <SunIcon className="size-4" />
          <span>Justification</span>
          <Switch id="airplane-mode" />
          <div className="h-5 w-1 border-l mx-2"></div>
          <div>
            Score: <span className="text-[#DF1C41]">24</span>
          </div>
        </div>
      </div>
      <div className="py-4 text-xs font-medium leading-relaxed">
        Hey Crew, <br /> <br /> Hope you&apos;re doing awesome! 🌟 We&apos;ve
        got some juicy reads for you about self-custody and shaking off the
        chains of traditional finance. Check it out: <br /> <br />
        Cheers,
        <br />
        [Your Name]
      </div>
      <div className="flex items-center">
        <Button variant="outline" size="xs" className="size-6">
          <PencilLineIcon className="size-3.5" />
        </Button>
        <Button variant="outline" size="xs" className="size-6 ml-auto">
          <EnvelopeSimpleIcon className="size-3.5" />
        </Button>
        <div className="h-6 mx-3 w-1 border-l"></div>
        <Button size="xs" className="text-xs font-medium">
          <ChecksIcon className="size-3.5" />
          Approve
        </Button>
      </div>
    </div>
  );
};

export default MessageItem;
