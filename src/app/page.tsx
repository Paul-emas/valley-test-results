"use client";
import CustomSidePanel from "@/components/custom/custom-sidepanel";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hooks/useDisclosure";
import ProspectTemplate from "./modules/prospect/prospect-template";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

export default function Home() {
  const { sideMenuIsOpen, onOpenSideMenu, onCloseSideMenu } =
    useDisclosure("sideMenu");
  return (
    <>
      <div className="p-6 min-h-screen flex items-center justify-center">
        <Button onClick={onOpenSideMenu}>
          Open sidebar <ArrowSquareOutIcon />
        </Button>
      </div>

      <CustomSidePanel
        contentMaxWidth="1133px"
        show={sideMenuIsOpen}
        onClosePanel={onCloseSideMenu}
        showCloseButton={false}
        contentBackgroundColor="#F8F8F8"
        sidePanelContent={
          <ProspectTemplate onCloseSideMenu={onCloseSideMenu} />
        }
      />
    </>
  );
}
