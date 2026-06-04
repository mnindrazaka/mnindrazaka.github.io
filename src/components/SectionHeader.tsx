import React from "react";
import { Anchor, Text, XStack, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts } from "@/theme/tokens";

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  viewAllHref?: string;
  viewAllLabel?: string;
};

export function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "left",
  viewAllHref,
  viewAllLabel = "View all →",
}: SectionHeaderProps) {
  const { text, textMuted, accent } = useThemeTokens();
  const isCenter = align === "center";

  return (
    <YStack
      gap="$2"
      marginBottom="$8"
      alignItems={isCenter ? "center" : "flex-start"}
    >
      {kicker && (
        <Text
          color={accent}
          fontSize={11}
          fontWeight="700"
          letterSpacing={2}
          textTransform="uppercase"
        >
          {kicker}
        </Text>
      )}

      <XStack
        width="100%"
        justifyContent={isCenter ? "center" : "space-between"}
        alignItems="flex-end"
        flexWrap="wrap"
        gap="$3"
      >
        <Text
          style={{ fontFamily: fonts.display }}
          fontSize={32}
          fontWeight="700"
          color={text}
          lineHeight={40}
          $sm={{ fontSize: 26, lineHeight: 34 }}
        >
          {title}
        </Text>

        {viewAllHref && (
          <Anchor href={viewAllHref} textDecorationLine="none">
            <Text
              color={accent}
              fontSize={14}
              fontWeight="600"
              cursor="pointer"
              hoverStyle={{ opacity: 0.75 }}
            >
              {viewAllLabel}
            </Text>
          </Anchor>
        )}
      </XStack>

      {subtitle && (
        <Text
          color={textMuted}
          fontSize={16}
          lineHeight={26}
          textAlign={isCenter ? "center" : "left"}
          maxWidth={600}
          marginTop="$1"
        >
          {subtitle}
        </Text>
      )}
    </YStack>
  );
}
