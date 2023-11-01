"use client";

import { UserButton, useUser } from "@clerk/nextjs";

import Logo from "@/components/logo";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNT } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import SubscriptionButton from "../subscription-button";
import Navbar from "./navbar";
import SidebarToggle from "./sidebar-toggle";
import ThemeToggle from "./theme-toggle";

export interface SidebarProps {
  className?: string;
  isProPlan?: boolean;
  userLimitCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
  isProPlan = false,
  userLimitCount,
}) => {
  const { isMinimal } = useSidebarStore();
  const { user, isLoaded } = useUser();

  return (
    <div className={cn("dashboard-sidebar text-white h-full", className)}>
      <div className={cn("h-20 pl-7 pr-6", isMinimal && "w-fit")}>
        <div className="flex items-center justify-between w-full">
          {!isMinimal && <Logo />}
          <SidebarToggle />
        </div>
      </div>

      <div className="grow overflow-y-auto scroll-smooth scrollbar-none">
        <Navbar />
      </div>

      <div
        className={cn(
          "absolute bottom-16 left-0 pl-4 pr-4 w-full",
          "lg:left-0",
          isMinimal && "pl-2 pr-2 w-fit !left-[50%] -translate-x-1/2"
        )}
      >
        <div
          className={cn(
            "mb-4 p-4 rounded-lg bg-indigo-950",
            isMinimal && "p-2 bg-transparent"
          )}
        >
          <div className={cn("mb-4 flex items-center", isMinimal && "mb-0 justify-center")}>
            {isLoaded ? (
              <>
                <UserButton afterSignOutUrl="/" />
                {!isMinimal && (
                  <span className="text-sm ml-4">
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </span>
                )}
              </>
            ) : (
              <>
                <div className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-indigo-900" />
                <div className="w-full h-[32px] rounded-sm bg-indigo-900 ml-4"></div>
              </>
            )}
          </div>

          {!isMinimal && (
            <div className="border-t border-t-gray-950 pt-2">
              {!isProPlan && (
                <div className="mb-4">
                  <div className="text-center mb-2 text-zinc-400 font-semibold">
                    {userLimitCount}/{MAX_FREE_COUNT} Free Generations
                  </div>
                  <Progress
                    value={(userLimitCount / MAX_FREE_COUNT) * 100}
                    className="bg-gray-950 h-3"
                    indicatorClassName="gradient-btn"
                  />
                </div>
              )}
              <SubscriptionButton isPro={isProPlan} />
            </div>
          )}
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
