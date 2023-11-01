"use client";

import Sidebar from "@/components/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebarStore } from "@/stores/sidebar.store";

import { FC } from "react";

interface MobileSidebarProps {
  isProPlan?: boolean;
  userLimitCount: number;
}

const MobileSidebar: FC<MobileSidebarProps> = ({
  userLimitCount,
  isProPlan = false,
}) => {
  const { isOpen } = useSidebarStore();

  return (
    <Sheet open={isOpen}>
      <SheetContent
        side={"left"}
        className="w-screen border-none bg-black p-0 pt-8"
      >
        <Sidebar userLimitCount={userLimitCount} isProPlan={isProPlan} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
