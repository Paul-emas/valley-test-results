import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton: React.FC = () => {
  return (
    <div className="bg-white ml-auto w-[341px] rounded-sm shadow-lg pb-1">
      {/* Header Section */}
      <div className="p-6 flex items-center">
        <div className="relative">
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="absolute w-8 h-5 rounded-full -bottom-2 left-1/2 -translate-x-1/2" />
        </div>
        <div className="ml-4 space-y-2 flex-1">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="px-6 mt-4 space-y-4 mb-6">
        {/* ICP-Fit */}
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="ml-auto w-[59px] h-6 rounded-sm" />
        </div>

        {/* Campaign */}
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="ml-auto w-32 h-6 rounded-sm" />
        </div>

        {/* Status */}
        <div className="flex items-center">
          <div className="flex items-center gap-1">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="ml-auto w-28 h-6 rounded-sm" />
        </div>

        {/* Tags Section */}
        <div className="border-y py-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center gap-1">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-8" />
            </div>
            <Skeleton className="ml-auto size-4" />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-18 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          {/* Privacy */}
          <div className="flex items-center">
            <div className="flex items-center gap-1 w-[96px]">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-4 w-20" />
          </div>

          {/* LinkedIn */}
          <div className="flex items-center">
            <div className="flex items-center gap-1 w-[96px]">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-14" />
            </div>
            <Skeleton className="ml-auto h-6 w-40 rounded-full" />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <div className="flex items-center gap-1 w-[96px]">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-6 w-36 rounded-full" />
          </div>

          {/* Address */}
          <div className="flex items-center">
            <div className="flex items-center gap-1 w-[96px]">
              <Skeleton className="size-4" />
              <Skeleton className="h-4 w-14" />
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>

      {/* Collapsible Sections */}
      {["Intent data", "Experience", "Education", "LinkedIn Bio"].map(
        (section, index) => (
          <div key={index} className="py-5 px-6 flex items-center border-t">
            <Skeleton className="size-4" />
            <Skeleton className="h-4 w-20 ml-1" />
            <Skeleton className="ml-auto size-4" />
          </div>
        )
      )}

      {/* Footer */}
      <div className="h-[106px] text-center flex items-center justify-center">
        <div className="space-y-5">
          <Skeleton className="h-3 w-24 mx-auto" />
          <Skeleton className="h-6 w-28 mx-auto rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
