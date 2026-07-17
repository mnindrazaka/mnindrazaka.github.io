// Design token definitions — single source of truth for the palette.
// Components import from here; never hardcode raw hex values in UI files.
//
// Accent theme: Blue. Neutrals carry a subtle cool (blue) tint so the
// surfaces feel cohesive with the accent in both light and dark mode.

export const lightColors = {
  bg: "#F6F8FC",
  surface: "#EAF0F9",
  border: "#D7E0EE",
  text: "#0F1722",
  textMuted: "rgba(15,23,34,0.6)",
  accent: "#2563EB",
} as const;

export const darkColors = {
  bg: "#0B1019",
  surface: "#141B27",
  border: "#243140",
  text: "#E9EFF7",
  textMuted: "rgba(233,239,247,0.6)",
  accent: "#5B9BFF",
} as const;

export const fonts = {
  display: "sans-serif",
  body: "'Lato', system-ui, sans-serif",
} as const;

export const radii = {
  card: 20,
} as const;

export type ThemeColors = { [K in keyof typeof lightColors]: string };
