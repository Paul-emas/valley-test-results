"use client";
import { useState, useEffect } from "react";
import {
  BrainIcon,
  PaperPlaneRightIcon,
  PencilLineIcon,
} from "@phosphor-icons/react";
import { AiTrainingItemData } from "@/app/modules/prospect/ai-training/ai-training-item";

// Mock data
const MOCK_TRAINING_DATA: AiTrainingItemData[] = [
  {
    id: "1",
    status: "completed",
    title: "Writing style updated",
    companyName: "Tech Innovations Inc",
    prospectName: "Sarah Chen",
    timestamp: "Tue, May 12, 9:14 AM ",
    content: {
      type: "accordion",
      icon: PencilLineIcon,
      title: "Manual changes",
      content: "Hello this is a test message",
    },
  },
  {
    id: "2",
    status: "completed",
    title: "Writing style updated",
    companyName: "Digital Solutions Ltd",
    prospectName: "John Snow",
    timestamp: "Tue, May 12, 9:14 AM (2 days ago)",
    content: {
      type: "accordion",
      icon: PaperPlaneRightIcon,
      title: "Custom message",
      content: "Hello this is a test message",
    },
  },
  {
    id: "3",
    status: "completed",
    title: "Message generated",
    companyName: "StartupCo",
    prospectName: "Emily Johnson",
    timestamp: "Tue, May 12, 7:32 AM",
    content: {
      type: "accordion",
      icon: BrainIcon,
      title: "Generated message",
      content: "Hello this is a test message",
    },
  },
  {
    id: "4",
    status: "completed",
    title: "Message rated",
    companyName: "Lex Corp",
    prospectName: "David Wilson",
    timestamp: "Tue, May 12, 6:18 AM",
    content: {
      type: "rating",
      icon: BrainIcon,
      title: "Generated message",
      content: "Hello this is a test message",
    },
  },
  {
    id: "5",
    status: "completed",
    customTitle:
      "James Laurensky and 45 others have been added to Performance tracking",
    title: "",
    companyName: "Enterprise Corp",
    prospectName: "David Wilson",
    timestamp: "Tue, May 12, 6:18 AM",
    content: {
      type: "avatar",
      icon: BrainIcon,
      title: "Generated message",
      content: "Hello this is a test message",
    },
  },
];

// Simulate API call
const fetchTrainingData = async (): Promise<AiTrainingItemData[]> => {
  // Simulate network delay 3sec
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return MOCK_TRAINING_DATA;
};

interface UseTrainingDataReturn {
  data: AiTrainingItemData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useTrainingData = (): UseTrainingDataReturn => {
  const [data, setData] = useState<AiTrainingItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchTrainingData();
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

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
