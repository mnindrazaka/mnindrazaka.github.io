import { createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import { lightColors, darkColors } from "./src/theme/tokens";

const appConfig = createTamagui({
  ...config,
  themes: {
    ...config.themes,
    light: {
      ...config.themes.light,
      // Semantic site tokens available as Tamagui theme variables ($bg, $surface, etc.)
      bg: lightColors.bg,
      surface: lightColors.surface,
      borderSite: lightColors.border,
      accent: lightColors.accent,
    } as typeof config.themes.light & {
      bg: string;
      surface: string;
      borderSite: string;
      accent: string;
    },
    dark: {
      ...config.themes.dark,
      bg: darkColors.bg,
      surface: darkColors.surface,
      borderSite: darkColors.border,
      accent: darkColors.accent,
    } as typeof config.themes.dark & {
      bg: string;
      surface: string;
      borderSite: string;
      accent: string;
    },
  },
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default appConfig;
