"use client";
import CustomTabs from "@/components/custom/custom-tabs";
import { Button } from "@/components/ui/button";
import {
  ArchiveIcon,
  BrainIcon,
  CaretDownIcon,
  CaretUpIcon,
  DotsThreeVerticalIcon,
  HandPalmIcon,
  NotepadIcon,
  TrashIcon,
  TrayIcon,
  XIcon,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import AITrainingTemplate from "./ai-training/ai-training-template";
import MessagesTemplate from "./messages/messages-template";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import CustomDropdown from "@/components/custom/custom-dropdown";
import ProspectProfileTemplate from "./prospect-profile/prospect-profile-template";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProspectTemplateProps {
  onCloseSideMenu: () => void;
}
const ProspectTemplate: React.FC<ProspectTemplateProps> = ({
  onCloseSideMenu,
}) => {
  const tabs = [
    { label: "AI Training", value: "ai-training", icon: BrainIcon },
    { label: "Messages", value: "messages", icon: TrayIcon },
    { label: "Research", value: "research", icon: NotepadIcon },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const options = [
    { label: "Archive", value: "archive", icon: ArchiveIcon },
    { label: "Delete", value: "delete", icon: TrashIcon },
    { label: "Do Not Contact", value: "do-not-contact", icon: HandPalmIcon },
  ];

  return (
    <div className="p-3">
      <div className="flex items-center gap-x-1">
        <Button onClick={onCloseSideMenu} size="icon" variant="ghost">
          <XIcon />
        </Button>
        <Button size="icon" variant="outline">
          <CaretUpIcon />
        </Button>
        <Button size="icon" variant="outline">
          <CaretDownIcon />
        </Button>
        <div className="text-sm font-medium text-[#222222] ml-1">
          1 of 540 in{" "}
          <a href="#" className="underline">
            Valley Sales Strategy
          </a>
        </div>
        <CustomDropdown
          items={options}
          itemKey="value"
          itemLabel="label"
          align="end"
          contentClassName="w-[265px]"
          trigger={
            <Button variant="ghost" size="icon" className="ml-auto">
              <DotsThreeVerticalIcon className="size-5" />
            </Button>
          }
          customDropdownContent={
            <div className="flex flex-col">
              {options.map((option) => (
                <DropdownMenuItem key={option.value} className="font-medium">
                  <option.icon className="size-4" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </div>
          }
        />
      </div>
      <ScrollArea className="mt-3 bg-background w-full h-[calc(100vh-75px)] rounded overflow-hidden relative z-10">
        <div className="h-[142px] absolute w-full rounded-t -z-10">
          <div className="absolute w-full h-full backdrop-blur-2xl"></div>
          <div className="h-[20%] w-full bg-gradient-1"></div>
          <div className="h-full w-full bg-gradient-2"></div>
        </div>

        <div className="px-12">
          <div className="flex w-full">
            <div className="min-w-[620px] w-full">
              <div className="sticky top-0 z-20 w-full">
                <div className="w-full pt-12">
                  <div className="border-b">
                    <CustomTabs
                      tabs={tabs}
                      onTabChange={(tab) => setActiveTab(tab)}
                      variant="outline"
                      iconSize={20}
                      className="relative top-[1px]"
                    />
                  </div>

                  <div className="mt-3.5">
                    <div
                      className={
                        activeTab.value === "ai-training" ? "block" : "hidden"
                      }
                    >
                      <AITrainingTemplate />
                    </div>
                    <div
                      className={
                        activeTab.value === "messages" ? "block" : "hidden"
                      }
                    >
                      <MessagesTemplate />
                    </div>
                    <div
                      className={
                        activeTab.value === "research" ? "block" : "hidden"
                      }
                    >
                      <div className="text-center text-muted-foreground py-8">
                        Research content coming soon...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full pt-12 pb-5">
              <ProspectProfileTemplate />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProspectTemplate;
