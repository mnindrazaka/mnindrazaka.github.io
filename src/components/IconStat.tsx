import React from "react";
import { Text, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts } from "@/theme/tokens";

export type IconStatProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function IconStat({ icon, title, description }: IconStatProps) {
  const { text, textMuted, surface, border } = useThemeTokens();

  return (
    <YStack gap="$3" paddingTop="$5" borderTopWidth={2} borderTopColor={border}>
      <YStack
        width={44}
        height={44}
        borderRadius={12}
        backgroundColor={surface}
        borderWidth={1}
        borderColor={border}
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </YStack>

      <Text
        style={{ fontFamily: fonts.display }}
        fontSize={17}
        fontWeight="700"
        color={text}
        lineHeight={24}
      >
        {title}
      </Text>

      <Text color={textMuted} fontSize={14} lineHeight={22}>
        {description}
      </Text>
    </YStack>
  );
}
