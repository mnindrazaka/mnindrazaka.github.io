import React from "react";
import { Text, XStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { accentRgb } from "@/theme/tokens";

export type ChipVariant =
  | "product"
  | "engineering"
  | "leadership"
  | "business"
  | "career"
  | "accent"
  | "default";

type ChipProps = {
  label: string;
  variant?: ChipVariant;
  size?: "sm" | "md";
};

export function Chip({ label, variant = "default", size = "md" }: ChipProps) {
  const tokens = useThemeTokens();

  const bgMap: Record<ChipVariant, string> = {
    product: tokens.chipProduct,
    engineering: tokens.chipEngineering,
    leadership: tokens.chipLeadership,
    business: tokens.chipBusiness,
    career: tokens.chipCareer,
    accent: tokens.isDark
      ? `rgba(${accentRgb},0.15)`
      : `rgba(${accentRgb},0.1)`,
    default: tokens.surface,
  };

  const colorMap: Record<ChipVariant, string> = {
    product: tokens.chipProductText,
    engineering: tokens.chipEngineeringText,
    leadership: tokens.chipLeadershipText,
    business: tokens.chipBusinessText,
    career: tokens.chipCareerText,
    accent: tokens.accent,
    default: tokens.textMuted,
  };

  const borderMap: Record<ChipVariant, string | undefined> = {
    product: undefined,
    engineering: undefined,
    leadership: undefined,
    business: undefined,
    career: undefined,
    accent: `rgba(${accentRgb},0.35)`,
    default: tokens.border,
  };

  const px = size === "sm" ? 10 : 14;
  const py = size === "sm" ? 3 : 5;
  const fs = size === "sm" ? 11 : 12;

  return (
    <XStack
      backgroundColor={bgMap[variant]}
      paddingHorizontal={px}
      paddingVertical={py}
      borderRadius={100}
      borderWidth={borderMap[variant] ? 1 : 0}
      borderColor={borderMap[variant] ?? "transparent"}
      alignSelf="flex-start"
    >
      <Text
        color={colorMap[variant]}
        fontSize={fs}
        fontWeight="700"
        letterSpacing={variant === "accent" ? 1.8 : 0.5}
      >
        {label}
      </Text>
    </XStack>
  );
}
