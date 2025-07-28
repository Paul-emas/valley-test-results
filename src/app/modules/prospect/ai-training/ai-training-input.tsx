import React from "react";
import CustomTextarea from "@/components/custom/custom-textarea";
import { Button } from "@/components/ui/button";
import { SparkleIcon } from "@phosphor-icons/react";

const AiTrainingInput = () => {
  return (
    <div className="h-[100px] w-full p-8 pt-5">
      <CustomTextarea
        placeholder="Prompt to train messaging style..."
        inputClassName="min-h-12! rounded-full pt-[13px] font-medium pl-5 resize-none pr-12 w-[560px]"
        leftContent={
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1.5 rounded-full"
          >
            <SparkleIcon />
          </Button>
        }
      />
    </div>
  );
};

export default AiTrainingInput;
