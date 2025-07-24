import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@/assets/icons";

export function ThemeToggleSwitch() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const Icon = isDark ? SunIcon : MoonIcon;

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="grid size-12 place-items-center rounded-full text-black transition hover:bg-gray-200 dark:text-white dark:hover:bg-white/10"
    >
      <Icon />
    </button>
  );
}
