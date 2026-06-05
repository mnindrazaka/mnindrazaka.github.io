import React from "react";
import { Text, XStack, YStack } from "tamagui";
import { Check } from "@tamagui/lucide-icons";
import { useThemeTokens } from "@/theme/useThemeTokens";

type ChecklistProps = {
  items: string[];
};

export function Checklist({ items }: ChecklistProps) {
  const { text, accent } = useThemeTokens();

  return (
    <YStack gap="$4">
      {items.map((item, i) => (
        <XStack key={i} gap="$3" alignItems="flex-start">
          <XStack
            width={24}
            height={24}
            borderRadius={100}
            backgroundColor="rgba(184,137,58,0.15)"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            marginTop={2}
          >
            <Check size={13} color={accent} />
          </XStack>
          <Text fontSize={15} color={text} lineHeight={26} flex={1}>
            {item}
          </Text>
        </XStack>
      ))}
    </YStack>
  );
}
