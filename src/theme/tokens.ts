// Design token definitions — single source of truth for the palette.
// Components import from here; never hardcode raw hex values in UI files.
//
// Accent theme: Blue. Neutrals carry a subtle cool (blue) tint so the
// surfaces feel cohesive with the accent in both light and dark mode.
// Low-opacity accent overlays in components reference the shared blue
// RGB `59,130,246` (see `accentRgb` below).

// Shared accent RGB for translucent overlays/tints (matches blue-500).
// Kept mode-agnostic so subtle accent washes read correctly in light & dark.
export const accentRgb = "59,130,246" as const;

export const lightColors = {
  bg: "#F6F8FC",
  surface: "#EAF0F9",
  border: "#D7E0EE",
  text: "#0F1722",
  textMuted: "rgba(15,23,34,0.6)",
  accent: "#2563EB",
  // Category chip backgrounds
  chipProduct: "#E5EEFB",
  chipProductText: "#1D4FA0",
  chipEngineering: "#E3EDE6",
  chipEngineeringText: "#2D5A3D",
  chipLeadership: "#EAE8F6",
  chipLeadershipText: "#473A85",
  chipBusiness: "#DCEFF1",
  chipBusinessText: "#15616B",
  chipCareer: "#F3E2EA",
  chipCareerText: "#8A2B52",
} as const;

export const darkColors = {
  bg: "#0B1019",
  surface: "#141B27",
  border: "#243140",
  text: "#E9EFF7",
  textMuted: "rgba(233,239,247,0.6)",
  accent: "#5B9BFF",
  chipProduct: "#16243C",
  chipProductText: "#7FB2F7",
  chipEngineering: "#16241C",
  chipEngineeringText: "#7CC495",
  chipLeadership: "#1E1A2E",
  chipLeadershipText: "#A99AD0",
  chipBusiness: "#0F2A30",
  chipBusinessText: "#5FC7D2",
  chipCareer: "#2A1722",
  chipCareerText: "#E58BAB",
} as const;

// Always-dark footer tokens (footer stays dark in both modes per design)
export const footerColors = {
  bg: "#0C121C",
  surface: "#151D2A",
  border: "rgba(233,239,247,0.08)",
  text: "#E9EFF7",
  textMuted: "rgba(233,239,247,0.5)",
  accent: "#5B9BFF",
} as const;

export const fonts = {
  display: "sans-serif",
  body: "'Lato', system-ui, sans-serif",
} as const;

export const typography = {
  displayLg: 56,
  displayMd: 40,
  displaySm: 32,
  h2: 28,
  h2Sm: 24,
  body: 16,
  caption: 13,
} as const;

export const radii = {
  chip: 100,
  card: 20,
  button: 100,
} as const;

export const layout = {
  maxWidth: 1200,
  containerPadding: "$6",
} as const;

export type ThemeColors = { [K in keyof typeof lightColors]: string };
export type FooterColors = { [K in keyof typeof footerColors]: string };
