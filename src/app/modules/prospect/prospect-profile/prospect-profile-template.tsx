"use client";
import CustomMultiSelect from "@/components/custom/custom-multiselect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TargetIcon,
  UserFocusIcon,
  LockIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
  XIcon,
  MapTrifoldIcon,
  CubeFocusIcon,
  CaretDownIcon,
  CrownIcon,
  GraduationCapIcon,
  TagIcon,
} from "@phosphor-icons/react";
import { ArrowsUpFromLine } from "lucide-react";
import React from "react";
import { useProfileData, AVAILABLE_TAGS } from "@/hooks/useProfileData";
import ProfileSkeleton from "@/components/ui/profile-skeleton";

const ProspectProfileTemplate = () => {
  const {
    data: profile,
    isLoading,
    error,
    refetch,
    updateTags,
  } = useProfileData();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white ml-auto w-[341px] rounded-sm shadow-lg pb-1 h-[calc(100vh-160px)] flex justify-center">
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <p className="text-muted-foreground mb-4">Failed to load profile</p>
          <Button variant="outline" size="sm" onClick={refetch}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white ml-auto w-[341px] rounded-sm shadow-lg pb-1 h-[calc(100vh-160px)] flex justify-center">
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <p className="text-muted-foreground">No profile data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-white ml-auto w-[341px] rounded-sm shadow-lg pb-1">
      <div className="p-6 flex items-center">
        <div className="relative">
          <Avatar className="size-14">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute w-8 h-5 bg-[#148158] border border-white rounded-full flex items-center justify-center font-bold text-sm text-white -bottom-2 left-1/2 -translate-x-1/2">
            {profile.score}
          </div>
        </div>
        <div className="ml-4">
          <div className="text-lg font-medium">{profile.name}</div>
          <div className="text-sm text-muted-foreground font-medium">
            {profile.title}
          </div>
        </div>
      </div>

      <div className="px-6 mt-4 space-y-4 mb-6">
        <div className="flex items-center">
          <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm">
            <UserFocusIcon className="size-4" />
            <span>ICP-Fit</span>
          </div>
          <div className="ml-auto w-[59px] justify-center h-6 bg-[#F6F6F6] border border-[#A7A7A7] border-dashed rounded-sm flex items-center gap-1 text-muted-foreground text-xs font-medium">
            <UserFocusIcon className="size-4" />
            {profile.icpFit}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm">
            <TargetIcon className="size-4" />
            <span>Campaign</span>
          </div>
          <div className="ml-auto px-1.5 justify-center h-6 bg-[#7171791A] border border-[#7171791A] rounded-sm flex items-center gap-1 text-muted-foreground text-xs font-medium">
            <div className="size-[7px] bg-[#7A7A7A] border-[1.8px] border-[#CCCCCC] rounded-full"></div>
            {profile.campaign}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm">
            <ArrowsUpFromLine className="size-3.5" />
            <span>Status</span>
          </div>
          <div
            className="ml-auto px-1.5 justify-center h-6 rounded-sm flex items-center gap-1 text-xs font-medium"
            style={{
              backgroundColor: profile.status.bgColor,
              border: `1px solid ${profile.status.bgColor}`,
              color: profile.status.color,
            }}
          >
            <div
              className="size-[7px] rounded-full"
              style={{
                backgroundColor: profile.status.dotColor,
                border: `1.8px solid ${profile.status.dotBorderColor}`,
              }}
            ></div>
            {profile.status.label}
          </div>
        </div>

        <div className="border-y py-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm">
              <TagIcon className="size-4" />
              <span>Tags</span>
            </div>
            <div className="text-neutral-400 ml-auto">
              <XIcon className="size-4" />
            </div>
          </div>
          <CustomMultiSelect
            value={profile.tags}
            onChange={updateTags}
            addButtonText=""
            placeholder="Enter tag name"
            maxItems={10}
            availableItems={AVAILABLE_TAGS}
            allowCustomItems={true}
            itemValidator={(value) => {
              if (value.length < 2) {
                return {
                  isValid: false,
                  message: "Tag must be at least 2 characters",
                };
              }
              if (value.length > 20) {
                return {
                  isValid: false,
                  message: "Tag must be less than 20 characters",
                };
              }
              return { isValid: true };
            }}
          />
        </div>

        <div className="flex items-center">
          <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm w-[96px]">
            <LockIcon className="size-4" />
            <span>Privacy</span>
          </div>
          <div className="text-sm font-medium">{profile.privacy}</div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm w-[96px]">
            <LinkedinLogoIcon className="size-4" />
            <span>Linkedin</span>
          </div>
          <div className="text-sm font-medium ml-auto">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Badge
                variant="secondary"
                className="border rounded-full border-[#2222221A] hover:underline"
              >
                <span className="truncate max-w-[185px]">
                  {profile.linkedin}
                </span>
              </Badge>
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm w-[96px]">
            <EnvelopeSimpleIcon className="size-4" />
            <span>Email</span>
          </div>
          <div className="text-sm font-medium">
            <a href={`mailto:${profile.email}`}>
              <Badge
                variant="secondary"
                className="border rounded-full border-[#2222221A] hover:underline"
              >
                <span className="truncate max-w-[185px]">{profile.email}</span>
              </Badge>
            </a>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex items-center text-neutral-400 gap-1 font-medium text-sm w-[96px]">
            <MapTrifoldIcon className="size-4" />
            <span>Address</span>
          </div>
          <div className="text-sm font-medium truncate">{profile.address}</div>
        </div>
      </div>

      <div className="py-5 px-6 flex items-center text-neutral-500 border-t">
        <CubeFocusIcon className="size-4" />
        <div className="text-sm font-medium ml-1">Intent data</div>
        <CaretDownIcon className="ml-auto size-4" />
      </div>
      <div className="py-5 px-6 flex items-center text-neutral-500 border-t">
        <CrownIcon className="size-4" />
        <div className="text-sm font-medium ml-1">Experience</div>
        <CaretDownIcon className="ml-auto size-4" />
      </div>
      <div className="py-5 px-6 flex items-center text-neutral-500 border-t">
        <GraduationCapIcon className="size-4" />
        <div className="text-sm font-medium ml-1">Education</div>
        <CaretDownIcon className="ml-auto size-4" />
      </div>
      <div className="py-5 px-6 flex items-center text-neutral-500 border-t">
        <LinkedinLogoIcon className="size-4" />
        <div className="text-sm font-medium ml-1">LinkedIn Bio</div>
        <CaretDownIcon className="ml-auto size-4" />
      </div>
      <div className="h-[106px] text-center flex items-center justify-center">
        <div>
          <div className="text-muted-foreground text-xs font-medium">
            Added on: {profile.addedDate}
          </div>
          <Badge variant="secondary" className="mt-5 font-medium rounded">
            Report Information
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ProspectProfileTemplate;
