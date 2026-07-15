import React from "react";
import { Anchor, Text, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";

export type LinkListItemProps = {
  title: string;
  description?: string;
  href: string;
  external?: boolean;
};

export function LinkListItem({
  title,
  description,
  href,
  external = false,
}: LinkListItemProps) {
  const { text, textMuted, border, accent } = useThemeTokens();

  return (
    <Anchor
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      textDecorationLine="none"
      display="block"
    >
      <YStack
        minHeight={44}
        justifyContent="center"
        gap="$1"
        paddingVertical="$2"
        borderBottomWidth={1}
        borderBottomColor={border}
        cursor="pointer"
        pressStyle={{ opacity: 0.7 }}
        hoverStyle={{ borderBottomColor: accent }}
        focusStyle={{
          outlineWidth: 2,
          outlineColor: accent,
          outlineStyle: "solid",
          outlineOffset: 2,
        }}
      >
        <Text fontSize={16} fontWeight="600" color={text} lineHeight={22}>
          {title}
        </Text>
        {description && (
          <Text fontSize={13} color={textMuted} lineHeight={19}>
            {description}
          </Text>
        )}
      </YStack>
    </Anchor>
  );
}
