import TopBar from "@/components/topbar";
import { cn } from "@/lib/utils";
import React, { FC, ReactNode } from "react";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <TopBar />
      </header>
      <main
        className={cn(
          "lg:bg-gray-950 lg:overflow-hidden lg:pl-80 lg:pr-7 lg:py-7 [&:has([is-navbar-minimal])]:lg:pl-20" // khi phần tử con có class = is-navbar-minimal thì padding left = 20
        )}
      ></main>
      {children}
    </div>
  );
};

export default DashboardLayout;
