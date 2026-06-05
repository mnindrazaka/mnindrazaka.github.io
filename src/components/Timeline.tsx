import React from "react";
import { Text, XStack, YStack } from "tamagui";
import NextImage from "next/image";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts } from "@/theme/tokens";

export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type TimelineProps = {
  entries: TimelineEntry[];
  imageSource?: string;
  imageAlt?: string;
};

export function Timeline({ entries, imageSource, imageAlt }: TimelineProps) {
  const { text, textMuted, border, accent } = useThemeTokens();

  return (
    <XStack
      gap="$10"
      alignItems="flex-start"
      flexDirection="column"
      $gtSm={{ flexDirection: "row" }}
    >
      {/* Timeline entries */}
      <YStack flex={1} gap="$0">
        {entries.map((entry, index) => (
          <YStack key={entry.year}>
            {/* Year row with horizontal divider */}
            <XStack alignItems="center" gap="$4" marginBottom="$4">
              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={26}
                fontWeight="700"
                color={accent}
                lineHeight={34}
              >
                {entry.year}
              </Text>
              <YStack flex={1} height={1} backgroundColor={border} />
            </XStack>

            {/* Content */}
            <YStack
              paddingLeft="$2"
              paddingBottom={index < entries.length - 1 ? "$10" : "$0"}
              gap="$2"
            >
              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={18}
                fontWeight="700"
                color={text}
                lineHeight={26}
              >
                {entry.title}
              </Text>
              <Text fontSize={15} color={textMuted} lineHeight={24}>
                {entry.description}
              </Text>
            </YStack>
          </YStack>
        ))}
      </YStack>

      {/* Optional side image */}
      {imageSource && (
        <YStack
          width="100%"
          maxWidth={360}
          flexShrink={0}
          borderRadius={20}
          overflow="hidden"
          borderWidth={1}
          borderColor={border}
          alignSelf="flex-start"
          $gtSm={{ width: 320 }}
        >
          <NextImage
            src={imageSource}
            alt={imageAlt ?? ""}
            width={360}
            height={500}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
        </YStack>
      )}
    </XStack>
  );
}
