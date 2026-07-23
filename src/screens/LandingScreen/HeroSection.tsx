import React from "react";
import NextImage from "next/image";
import { Text, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts } from "@/theme/tokens";

export function HeroSection() {
  const { text, textMuted, accent, border } = useThemeTokens();

  return (
    <YStack alignItems="center" gap="$3">
      <YStack
        width={96}
        height={96}
        borderRadius={48}
        overflow="hidden"
        borderWidth={1}
        borderColor={border}
      >
        <NextImage
          src="/images/avatar.jpg"
          alt="M. Nindra Zaka"
          width={96}
          height={96}
          priority
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </YStack>

      <YStack alignItems="center" gap="$2" marginTop="$2">
        <Text
          style={{ fontFamily: fonts.display }}
          fontSize={28}
          lineHeight={34}
          fontWeight="800"
          color={text}
          textAlign="center"
        >
          M. Nindra Zaka
        </Text>

        <Text
          fontSize={15}
          fontWeight="600"
          color={accent}
          textAlign="center"
        >
          Software Engineer &amp; Founder
        </Text>

        <Text
          color={textMuted}
          fontSize={14}
          lineHeight={22}
          textAlign="center"
          maxWidth={420}
        >
          Software Engineer by profession, board game cafe owner by passion. I write about software engineering, entrepreneurship, and the lessons I learn from building products
        </Text>
      </YStack>
    </YStack>
  );
}
