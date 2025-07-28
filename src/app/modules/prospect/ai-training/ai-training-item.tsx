import CustomAccordion from "@/components/custom/custom-accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckIcon,
  Icon,
  StarHalfIcon,
  StarIcon,
  XIcon,
} from "@phosphor-icons/react";
import React from "react";

export interface AiTrainingItemData {
  id: string;
  status: "completed" | "pending" | "error";
  title: string;
  customTitle?: string;
  companyName: string;
  prospectName: string;
  timestamp: string;
  content?: {
    type: "accordion" | "avatar" | "rating";
    icon: Icon;
    title: string;
    content: string;
  };
}

interface AiTrainingItemProps {
  data: AiTrainingItemData;
}

const AiTrainingItem = ({ data }: AiTrainingItemProps) => {
  const getStatusIcon = () => {
    switch (data.status) {
      case "completed":
        return <CheckIcon className="size-1.5" weight="bold" />;
      case "pending":
        return <div className="size-1 bg-white rounded-full animate-pulse" />;
      case "error":
        return <XIcon className="size-1.5" weight="bold" />;
      default:
        return <CheckIcon className="size-1.5" weight="bold" />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case "completed":
        return "bg-[#00A2B1]";
      case "pending":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-[#00A2B1]";
    }
  };

  return (
    <div className="flex w-full relative pb-6 z-10">
      {data.content && !data.customTitle ? (
        <div className="w-1 h-full border-l absolute left-[4.5px] -z-10 top-1"></div>
      ) : null}
      <div
        className={`${getStatusColor()} size-[11.2px] rounded flex items-center justify-center text-white mt-0.5`}
      >
        {getStatusIcon()}
      </div>
      <div className="ml-5 w-full">
        <div className="text-muted-foreground text-xs font-medium flex items-center gap-x-1">
          {data.customTitle ? (
            <>{data.customTitle}</>
          ) : (
            <>
              {" "}
              <div>
                {data.title} from{" "}
                <a href="#" className="text-[#222222] hover:underline">
                  {data.companyName}
                </a>
                {` `}
                via {` `}
                <a href="#" className="text-[#222222] hover:underline">
                  {data.prospectName}
                </a>
              </div>
              <div className="size-1 mx-1 rounded-full bg-neutral-300"></div>
              <div className="text-neutral-500">{data.timestamp}</div>
            </>
          )}
        </div>

        {data.content ? (
          <>
            {data.content.type === "accordion" ? (
              <CustomAccordion
                items={[
                  {
                    value: data.content.title,
                    trigger: data.content.title,
                    content: data.content.content,
                  },
                ]}
                className="w-full border rounded-sm shadow-xs mt-2.5"
                itemClassName="border-none px-4 pt-0"
                triggerClassName="hover:no-underline text-xs font-medium text-muted-foreground py-4 font-medium"
                customTrigger={({ trigger }) => {
                  const IconComponent = data.content?.icon;
                  return (
                    <span className="flex gap-1">
                      {IconComponent && (
                        <IconComponent className="size-4 text-muted-foreground" />
                      )}
                      {trigger}
                    </span>
                  );
                }}
                contentClassName="text-xs font-medium"
                customContent={() => (
                  <div className="flex flex-col">
                    Hey Crew, <br />
                    <br />
                    Hope you&apos;re having a great week so far! 🌟 We&apos;ve
                    got some juicy reads for you about self-custody and shaking
                    off the chains of traditional finance. Check it out:
                    <br />
                    <br />
                    Best regards, <br /> Andrew
                  </div>
                )}
              />
            ) : null}
            {data.content.type === "rating" ? (
              <div className="w-full border rounded-sm shadow-xs mt-2.5 h-12 p-4 flex items-center gap-x-2.5 text-muted-foreground text-xs">
                4.5{" "}
                <div className="flex items-center gap-1">
                  <StarIcon weight="fill" />
                  <StarIcon weight="fill" />
                  <StarIcon weight="fill" />
                  <StarIcon weight="fill" />
                  <StarHalfIcon weight="fill" />
                </div>
              </div>
            ) : null}
            {data.content.type === "avatar" ? (
              <div className="flex items-center gap-x-2.5 mt-2.5">
                <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/paul-emas.png"
                      alt="@paul-emas"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/leerob.png"
                      alt="@leerob"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/evilrabbit.png"
                      alt="@evilrabbit"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com//i-am-zaidali.png"
                      alt="@/i-am-zaidali"
                    />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default AiTrainingItem;
