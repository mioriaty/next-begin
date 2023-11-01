"use client";

import { NAVIGATION } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { handleClose, isMinimal } = useSidebarStore();
  const pathName = usePathname();

  return (
    <div className="px-4">
      {NAVIGATION.map(({ icon, title, url, slug }) => (
        <div key={slug} className="mb-2">
          <Link href={url} onClick={handleClose}>
            <div
              className={cn(
                "flex items-center py-1 rounded-lg px-5 opacity-70",
                "hover:opacity-100",
                isMinimal && "px-1 w-fit",
                pathName.includes(url) && "transition-colors bg-slate-900  opacity-100"
              )}
            >
              <div className="flex items-center p-2">
                <div>
                  <Image width={24} height={24} src={icon} alt={title} />
                </div>
                {!isMinimal && <span className="ml-4 text-sm">{title}</span>}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
