import { useEffect, useState } from "react";
import { useThemeSetting } from "@tamagui/next-theme";
import { lightColors, darkColors, ThemeColors } from "./tokens";

export type ThemeTokens = ThemeColors & { mounted: boolean; isDark: boolean };

export function useThemeTokens(): ThemeTokens {
  const themeSetting = useThemeSetting();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && themeSetting.current === "dark";
  const colors = isDark ? darkColors : lightColors;

  return { ...colors, mounted, isDark };
}
