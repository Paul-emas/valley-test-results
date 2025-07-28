"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

interface CustomSidePanelProps {
  side?: "left" | "right";
  show: boolean;
  canClose?: boolean;
  contentMaxWidth?: string;
  contentBackgroundColor?: string;
  zIndex?: number;
  onClosePanel: () => void;
  sidePanelContent: React.ReactNode;
  showCloseButton?: boolean;
}

const CustomSidePanel: React.FC<CustomSidePanelProps> = ({
  side = "right",
  show,
  canClose = true,
  contentMaxWidth = "449px",
  contentBackgroundColor = "#ffffff",
  zIndex = 50,
  onClosePanel,
  sidePanelContent,
  showCloseButton = true,
}) => {
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const closeSheet = () => {
    if (canClose) {
      onClosePanel();
    } else {
      const content = sheetContentRef.current;
      if (!content) return;
      content.classList.add("shake");
      content.onanimationend = () => {
        content.classList.remove("shake");
      };
    }
  };

  const animateSheet = (isEntering: boolean) => {
    const content = sheetContentRef.current;
    const backdrop = backdropRef.current;
    if (!content || !backdrop) return;

    const contentAnimation: gsap.TweenVars = {
      x: isEntering ? "0%" : side === "left" ? "-100%" : "100%",
    };
    const finalBackgroundColor = isEntering
      ? "rgba(0,0,0,0.75)"
      : "rgba(0,0,0,0)";

    const tl = gsap.timeline({
      onComplete: () => {
        if (isEntering) {
          content.addEventListener("keydown", closeOnESC);
          content.tabIndex = 0;
          content.focus();
        } else {
          content.removeEventListener("keydown", closeOnESC);
        }
      },
      paused: true,
      defaults: { duration: 0.2, ease: "none" },
    });

    if (isEntering) {
      tl.set(backdrop, { backgroundColor: "rgba(0,0,0,0)" });
      tl.set(content, { x: side === "left" ? "-100%" : "100%" });
    }

    tl.to(backdrop, { backgroundColor: finalBackgroundColor });
    tl.to(content, contentAnimation, "<");
    tl.play();
  };

  const closeOnESC = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeSheet();
    }
  };

  useEffect(() => {
    if (show) {
      document.body.classList.add("sidepanel-open");
      animateSheet(true);
    } else {
      document.body.classList.remove("sidepanel-open");
      animateSheet(false);
    }
  }, [show]);

  if (typeof document === "undefined") {
    return null;
  }

  return (
    <>
      {createPortal(
        <CSSTransition
          in={show}
          nodeRef={backdropRef}
          timeout={200}
          classNames="sidepanel"
          unmountOnExit
          onEnter={() => animateSheet(true)}
          onExit={() => animateSheet(false)}
        >
          <div
            style={{ zIndex }}
            className="fixed bottom-0 left-0 right-0 top-0"
          >
            <div
              ref={backdropRef}
              onClick={closeSheet}
              className="absolute -z-10 h-full w-full bg-black/50 backdrop-blur-sm"
            ></div>
            <div
              ref={sheetContentRef}
              style={{
                backgroundColor: contentBackgroundColor,
                maxWidth: contentMaxWidth,
              }}
              className={cn(
                "fixed z-50 h-full max-h-screen w-full overflow-hidden border-l border-[#F4F4F4] max-sm:w-full max-sm:max-w-full",
                side === "left" ? "left-0" : "right-0"
              )}
              tabIndex={1}
            >
              {showCloseButton ? (
                <div className="absolute right-6 top-5">
                  <Button
                    onClick={closeSheet}
                    variant="outline"
                    className="size-9 p-0"
                  >
                    <X size={20} />
                  </Button>
                </div>
              ) : null}
              {sidePanelContent && <>{sidePanelContent}</>}
            </div>
          </div>
        </CSSTransition>,
        document.body
      )}
    </>
  );
};

export default CustomSidePanel;
