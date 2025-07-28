"use client";
import { cn, splitStringByUnderscore } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@phosphor-icons/react";

interface Tab {
  label: string;
  icon?: Icon;
}

interface Props<K extends string | Tab> {
  tabs: readonly K[];
  defaultTab?: K;
  excludeTabs?: readonly K[];
  onTabChange?: (tab: K) => void;
  variant?: "default" | "outline";
  className?: string;
  iconSize?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const CustomTabs = <K extends string | Tab>({
  tabs,
  defaultTab,
  className,
  variant = "default",
  excludeTabs = [],
  onTabChange,
  iconSize = 16,
  size = "md",
  disabled = false,
}: Props<K>) => {
  const initialTab =
    defaultTab && tabs.includes(defaultTab) ? defaultTab : tabs[0];
  const [activeTab, setActiveTab] = useState<K>(initialTab);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    moveIndicatorToActive();
    window.addEventListener("resize", moveIndicatorToActive);

    return () => {
      window.removeEventListener("resize", moveIndicatorToActive);
    };
  }, [activeTab]);

  useEffect(() => {
    if (onTabChange) {
      onTabChange(activeTab);
    }
  }, [activeTab, onTabChange]);

  const handleClick = (tab: K) => {
    setActiveTab(tab);
  };

  // Helper functions to handle both string and Tab object types
  const getTabLabel = (tab: K): string => {
    if (typeof tab === "string") {
      return splitStringByUnderscore(tab);
    }
    return (tab as Tab).label;
  };

  const getTabIcon = (tab: K): Icon | undefined => {
    if (typeof tab === "string") {
      return undefined;
    }
    return (tab as Tab).icon;
  };

  const moveIndicatorToActive = () => {
    const tabsContainer = tabsContainerRef.current;
    if (!tabsContainer) return;
    const activeButton = tabsContainer.querySelector(
      "button.active"
    ) as HTMLButtonElement;
    if (!activeButton) return;

    const indicator = indicatorRef.current;
    if (!indicator) return;

    indicator.style.left = `${activeButton.offsetLeft}px`;
    indicator.style.width = `${activeButton.offsetWidth}px`;
  };

  const shouldRender = (key: K) => !excludeTabs.includes(key);

  // Size variants
  const getSizeClasses = () => {
    const sizeVariants = {
      sm: {
        container: "h-[34px]",
        button: "px-2 py-1 text-xs",
        outline: "pb-2 pt-1 text-xs",
      },
      md: {
        container: "h-10",
        button: "px-3 py-1.5 text-sm",
        outline: "pb-4 pt-2 text-sm",
      },
      lg: {
        container: "h-12",
        button: "px-4 py-2 text-base",
        outline: "pb-6 pt-3 text-base",
      },
    };
    return sizeVariants[size];
  };

  const sizeClasses = getSizeClasses();

  return (
    <div className={cn(className)}>
      {variant === "default" ? (
        <div className={cn("rounded-md bg-muted p-1", sizeClasses.container)}>
          <div
            ref={tabsContainerRef}
            className="relative flex h-full w-full items-center justify-center text-muted-foreground"
          >
            {tabs.map(
              (tab, idx) =>
                shouldRender(tab) && (
                  <button
                    key={idx}
                    disabled={disabled}
                    className={cn(
                      "relative z-[5] w-full cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium ring-offset-background transition-all first-letter:capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                      sizeClasses.button,
                      activeTab === tab && "active text-foreground"
                    )}
                    onClick={() => handleClick(tab)}
                  >
                    {(() => {
                      const TabIcon = getTabIcon(tab);
                      return TabIcon ? <TabIcon size={iconSize} /> : null;
                    })()}
                    {getTabLabel(tab)}
                  </button>
                )
            )}
            <span
              ref={indicatorRef}
              className="pointer-events-none absolute h-full rounded-sm bg-background text-foreground shadow-sm duration-300"
            ></span>
          </div>
        </div>
      ) : (
        <div>
          <div
            ref={tabsContainerRef}
            className="relative flex h-full w-full items-center gap-6 text-muted-foreground"
          >
            {tabs.map(
              (tab, idx) =>
                shouldRender(tab) && (
                  <button
                    key={idx}
                    disabled={disabled}
                    className={cn(
                      "relative z-[5] cursor-pointer flex items-center gap-2 whitespace-nowrap rounded-sm font-medium transition-all first-letter:capitalize disabled:pointer-events-none disabled:opacity-50 px-2",
                      sizeClasses.outline,
                      activeTab === tab && "active text-foreground"
                    )}
                    onClick={() => handleClick(tab)}
                  >
                    {(() => {
                      const TabIcon = getTabIcon(tab);
                      return TabIcon ? <TabIcon size={iconSize} /> : null;
                    })()}
                    {getTabLabel(tab)}
                  </button>
                )
            )}
            <span
              ref={indicatorRef}
              className="custom-duration pointer-events-none absolute bottom-0 h-0.5 rounded-md bg-primary text-foreground shadow-sm"
            ></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTabs;
