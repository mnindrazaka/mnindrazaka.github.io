// Design token definitions — single source of truth for the palette.
// Components import from here; never hardcode raw hex values in UI files.

export const lightColors = {
  bg: "#FAF7F2",
  surface: "#F4EFE6",
  border: "#E8E0D5",
  text: "#1A1613",
  textMuted: "rgba(26,22,19,0.6)",
  accent: "#B8893A",
  // Category chip backgrounds
  chipProduct: "#F4EFE6",
  chipProductText: "#7A5020",
  chipEngineering: "#E4EDE4",
  chipEngineeringText: "#2D5A2D",
  chipLeadership: "#EDE8F4",
  chipLeadershipText: "#4A357A",
  chipBusiness: "#F4EAD8",
  chipBusinessText: "#7A4E18",
  chipCareer: "#F0E0D8",
  chipCareerText: "#7A3020",
} as const;

export const darkColors = {
  bg: "#15110E",
  surface: "#1E1915",
  border: "#2A2420",
  text: "#F5EFE4",
  textMuted: "rgba(245,239,228,0.6)",
  accent: "#B8893A",
  chipProduct: "#2A2318",
  chipProductText: "#C4A060",
  chipEngineering: "#1A2418",
  chipEngineeringText: "#7AB87A",
  chipLeadership: "#221A2A",
  chipLeadershipText: "#9A8ABA",
  chipBusiness: "#2A2018",
  chipBusinessText: "#C4A060",
  chipCareer: "#2A1A18",
  chipCareerText: "#C48070",
} as const;

// Always-dark footer tokens (footer stays dark in both modes per design)
export const footerColors = {
  bg: "#1A1613",
  surface: "#231E1A",
  border: "rgba(245,239,228,0.08)",
  text: "#F5EFE4",
  textMuted: "rgba(245,239,228,0.5)",
  accent: "#B8893A",
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
