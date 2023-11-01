import UpgradeProModal from "@/components/dashboard/upgrade-pro-modal";
import Sidebar from "@/components/sidebar";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import TopBar from "@/components/topbar";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const userLimitCount = 0;
  const isProPlan = false;

  return (
    <div className="dashboard-layout">
      <header>
        <TopBar />
      </header>
      <main
        className={cn(
          "lg:bg-slate-950 lg:overflow-hidden lg:pl-80 lg:pr-7 lg:py-7 [&:has([is-navbar-minimal])]:lg:pl-20" // khi phần tử con có class = is-navbar-minimal thì padding left = 20
        )}
      >
        <Sidebar
          userLimitCount={userLimitCount}
          isProPlan={isProPlan}
          className={cn(
            "fixed left-0 z-20 w-80 hidden [&:has([is-navbar-minimal])]:w-fit",
            "lg:block"
          )}
        />
        <MobileSidebar userLimitCount={userLimitCount} isProPlan={isProPlan} />
        <UpgradeProModal isProPlan={isProPlan} />
        <div
          className={cn(
            "bg-background h-[calc(100vh-56px)] relative",
            "lg:rounded-3xl lg:p-7"
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
