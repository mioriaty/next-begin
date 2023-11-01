import { THEME_MODES } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar.store";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const { isMinimal } = useSidebarStore();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={cn(
        "p-2 rounded-lg flex items-center bg-indigo-950 w-fit cursor-pointer",
        isMinimal && "w-14 h-14 justify-center"
      )}
      onClick={handleToggle}
    >
      {isMinimal ? (
        <span>{theme === "dark" ? <Moon /> : <Sun />}</span>
      ) : (
        THEME_MODES.map(({ label, value }) => (
          <span
            className={cn(
              "flex items-center justify-center p-2 rounded-lg cursor-pointer",
              theme === value && "bg-gray-950 shadow text-white"
            )}
            key={value}
          >
            {value === "dark" ? <Moon /> : <Sun />}
            <span className="ml-2">{label}</span>
          </span>
        ))
      )}
    </div>
  );
};

export default ThemeToggle;
