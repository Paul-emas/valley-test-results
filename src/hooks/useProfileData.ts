"use client";
import { useState, useEffect } from "react";
import {
  HandPalmIcon,
  CalendarIcon,
  HandIcon,
  StarIcon,
  CheckIcon,
  WarningIcon,
  UserFocusIcon,
  HeartIcon,
  FireIcon,
  Icon,
} from "@phosphor-icons/react";

export interface ProfileTag {
  value: string;
  label: string;
  icon?: Icon;
}

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  avatar: string;
  score: number;
  icpFit: "High" | "Medium" | "Low";
  campaign: string;
  status: {
    label: string;
    color: string;
    bgColor: string;
    dotColor: string;
    dotBorderColor: string;
  };
  tags: ProfileTag[];
  privacy: string;
  linkedin: string;
  email: string;
  address: string;
  addedDate: string;
}

// Mock profile data
const MOCK_PROFILE_DATA: ProfileData = {
  id: "1",
  name: "Keshav Ketan Saini",
  title: "Senior Software Engineer",
  avatar: "https://github.com/paul-emas.png",
  score: 94,
  icpFit: "High",
  campaign: "Early Stage Founders",
  status: {
    label: "Approval Required",
    color: "#CA3A31",
    bgColor: "#CA3A311A",
    dotColor: "#DF1C41",
    dotBorderColor: "#F9D2D9",
  },
  tags: [
    { value: "stop-outreach", label: "Stop Outreach", icon: HandPalmIcon },
    {
      value: "meeting-scheduled",
      label: "Meeting Scheduled",
      icon: CalendarIcon,
    },
    { value: "human-handover", label: "Human Handover", icon: HeartIcon },
    { value: "interested", label: "Interested", icon: FireIcon },
  ],
  privacy: "Public Profile",
  linkedin: "https://www.linkedin.com/in/paul-emas",
  email: "paulemas02@gmail.com",
  address: "California, United States of America",
  addedDate: "Dec 3, 2018",
};

export const AVAILABLE_TAGS: ProfileTag[] = [
  { value: "stop-outreach", label: "Stop Outreach", icon: HandPalmIcon },
  {
    value: "meeting-scheduled",
    label: "Meeting Scheduled",
    icon: CalendarIcon,
  },
  { value: "human-handover", label: "Human Handover", icon: HandIcon },
  { value: "interested", label: "Interested", icon: StarIcon },
  { value: "qualified", label: "Qualified", icon: CheckIcon },
  { value: "follow-up", label: "Follow Up", icon: WarningIcon },
  { value: "not-interested", label: "Not Interested", icon: HandPalmIcon },
  { value: "decision-maker", label: "Decision Maker", icon: UserFocusIcon },
  { value: "budget-approved", label: "Budget Approved", icon: CheckIcon },
  { value: "competitor", label: "Competitor", icon: WarningIcon },
];

// Simulate API call
const fetchProfileData = async (): Promise<ProfileData> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Simulate potential error (uncomment to test error state)
  // if (Math.random() > 0.8) {
  //   throw new Error("Failed to fetch profile data");
  // }

  return MOCK_PROFILE_DATA;
};

interface UseProfileDataReturn {
  data: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  updateTags: (newTags: ProfileTag[]) => void;
}

export const useProfileData = (): UseProfileDataReturn => {
  const [data, setData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchProfileData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  const updateTags = (newTags: ProfileTag[]) => {
    if (data) {
      setData({ ...data, tags: newTags });
    }
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    updateTags,
  };
};
