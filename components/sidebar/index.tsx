"use client";

import Logo from "@/components/logo";
import SidebarToggle from "@/components/sidebar/sidebar-toggle";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNT } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { FC } from "react";

interface SidebarProps {
  className?: string;
  isProPlan?: boolean;
  userLimitCount: number;
}

const Sidebar: FC<SidebarProps> = ({
  className,
  isProPlan = false,
  userLimitCount,
}) => {
  const { isMinimal } = useSidebarStore();
  const { user } = useUser();

  return (
    <div className={cn("text-white", className)}>
      <div className="h-20 pl-7 pr-6">
        <div className="flex items-center justify-between w-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
        <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
          <Navbar />
        </div>
        <div
          className={cn(
            "fixed left-4 right-4 bottom-8",
            "lg:left-7 lg:right-auto",
            isMinimal && "lg:left-3"
          )}
        >
          <div className="mb-4 p-4 rounded-lg bg-gray-900">
            <div className="mb-4 flex items-center">
              <UserButton afterSignOutUrl="/" />
              {!isMinimal && (
                <span className="text-sm ml-4">
                  {user?.emailAddresses?.[0].emailAddress}
                </span>
              )}
            </div>
            {!isMinimal && (
              <div className="border-t border-t-gray-950 pt-2">
                {isProPlan && (
                  <div className="mb-4">
                    <div className="text-center mb-2 text-muted-foreground font-semibold">
                      {userLimitCount}/{MAX_FREE_COUNT} Free generations
                    </div>
                    <Progress
                      value={(userLimitCount / MAX_FREE_COUNT) * 100}
                      className="bg-gray-950 h-3"
                      indicatorClassName="gradient-btn"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
