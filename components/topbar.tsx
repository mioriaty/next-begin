"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import { Menu } from "lucide-react";
import React from "react";

const TopBar = () => {
  const {handleOpenOrClose} = useSidebarStore();

  return (
    <div
      className={cn(
        "flex items-center p-4 justify-between sticky top-0 left-0 z-30",
        "lg:hidden"
      )}
    >
      <Logo />
      <Button variant={"ghost"} size="icon" onClick={handleOpenOrClose}>
        <Menu />
      </Button>
    </div>
  );
};

export default TopBar;
