"use client";
import CustomCombobox from "@/components/custom/custom-combobox";
import CustomDropdown from "@/components/custom/custom-dropdown";
import CustomTabs from "@/components/custom/custom-tabs";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  CaretDownIcon,
  CopyIcon,
  FunnelIcon,
  NotePencilIcon,
  SignatureIcon,
} from "@phosphor-icons/react";
import React from "react";
import AiTrainingItem from "./ai-training-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import AiTrainingInput from "./ai-training-input";
import { useTrainingData } from "@/hooks/useTrainingData";
import TrainingItemSkeleton from "@/components/ui/training-item-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

const AITrainingTemplate = () => {
  const tabs = ["Included", "Excluded"];
  const { data: trainingData, isLoading, error, refetch } = useTrainingData();

  const options = [
    { label: "Custom messages", value: "Custom messages", helperText: "36" },
    { label: "Prompt", value: "Prompt", helperText: "33" },
    {
      label: "Regenerated messaging",
      value: "Regenerated messaging",
      helperText: "31",
    },
    { label: "Human edits", value: "Human edits", helperText: "31" },
    { label: "Feedback", value: "Feedback", helperText: "31" },
    { label: "Prospect added", value: "Prospect added", helperText: "31" },
    {
      label: "Updated datapoint",
      value: "Updated datapoint",
      helperText: "31",
    },
  ];

  const writingStyleOptions = [
    { label: "Edit", value: "formal", icon: NotePencilIcon },
    { label: "Duplicate", value: "informal", icon: CopyIcon },
  ];

  return (
    <div>
      <div className="flex items-center gap-1">
        <CustomTabs tabs={tabs} size="sm" disabled={isLoading} />

        <CustomCombobox
          options={options}
          trigger={({ selectedOption, placeholder }) => (
            <Button
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="border-dashed text-xs"
            >
              <FunnelIcon className="size-4" />
              {selectedOption ? selectedOption.label : placeholder}
            </Button>
          )}
          placeholder="Types"
          width="w-[265px]"
        />

        <CustomDropdown
          items={writingStyleOptions}
          itemKey="value"
          itemLabel="label"
          align="end"
          contentClassName="w-[265px]"
          trigger={
            <Button
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="ml-auto text-xs"
            >
              <SignatureIcon className="size-4" />
              Writing Style
              <CaretDownIcon className="size-4" />
            </Button>
          }
          customDropdownContent={
            <div className="flex flex-col">
              {writingStyleOptions.map((option) => (
                <DropdownMenuItem key={option.value} className="font-medium">
                  <option.icon className="size-4" />
                  {option.label}
                </DropdownMenuItem>
              ))}
            </div>
          }
        />
      </div>

      <ScrollArea className="mt-3.5 h-[calc(100vh-331px)] pb-5 px-4">
        {isLoading ? (
          <TrainingItemSkeleton count={5} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center ">
            <p className="text-muted-foreground mb-4">
              Failed to load training data
            </p>
            <Button variant="outline" size="sm" onClick={refetch}>
              Try Again
            </Button>
          </div>
        ) : trainingData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No training data available</p>
          </div>
        ) : (
          trainingData.map((item) => (
            <AiTrainingItem key={item.id} data={item} />
          ))
        )}
      </ScrollArea>

      {!isLoading ? (
        <AiTrainingInput />
      ) : (
        <div className="h-[100px] flex items-center justify-center">
          <Skeleton className="h-12 w-[560px] rounded-full border" />
        </div>
      )}
    </div>
  );
};

export default AITrainingTemplate;
