import React from "react";
import { Anchor, Button, Text, XStack, YStack } from "tamagui";
import NextImage from "next/image";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { Chip } from "@/components/Chip";
import { fonts } from "@/theme/tokens";
import { layout } from "@/theme/tokens";

export function Hero() {
  const { bg, text, textMuted, border, accent } = useThemeTokens();

  return (
    <YStack backgroundColor={bg} paddingVertical="$10" alignItems="center">
      <XStack
        width="100%"
        maxWidth={layout.maxWidth}
        paddingHorizontal={layout.containerPadding}
        gap="$12"
        alignItems="center"
        flexDirection="column"
        $gtSm={{ flexDirection: "row" }}
      >
        {/* Left: text content */}
        <YStack flex={1} gap="$5">
          <Chip label="FOUNDING ENGINEER" variant="accent" />

          {/* Headline with italic accent */}
          <Text
            style={{ fontFamily: fonts.display }}
            fontSize={50}
            lineHeight={60}
            fontWeight="800"
            color={text}
            $md={{ fontSize: 40, lineHeight: 50 }}
            $xs={{ fontSize: 32, lineHeight: 42 }}
          >
            Building products, businesses, and communities{" "}
            <Text
              style={{ fontFamily: fonts.display }}
              fontStyle="italic"
              color={accent}
            >
              that
            </Text>{" "}
            create real impact.
          </Text>

          {/* Body */}
          <Text color={textMuted} fontSize={16} lineHeight={27} maxWidth={540}>
            I&apos;m a software engineer and founder. I built a real business
            (Gatherloop), created a custom POS system for it from scratch, and
            ship end-to-end solutions that real teams rely on daily. I code,
            lead, and obsess over outcomes.
          </Text>

          {/* CTAs */}
          <XStack gap="$3" flexWrap="wrap" marginTop="$1">
            <Anchor href="/writing" textDecorationLine="none">
              <Button
                borderWidth={1.5}
                borderColor={text}
                backgroundColor="transparent"
                color={text}
                paddingHorizontal={22}
                borderRadius={100}
                fontSize={14}
                fontWeight="600"
                pressStyle={{ opacity: 0.7 }}
              >
                Read my writing
              </Button>
            </Anchor>
            <Anchor href="#what-ive-built" textDecorationLine="none">
              <Button
                backgroundColor={accent}
                borderWidth={0}
                color="white"
                paddingHorizontal={22}
                borderRadius={100}
                fontSize={14}
                fontWeight="600"
                pressStyle={{ opacity: 0.85 }}
              >
                Explore my work
              </Button>
            </Anchor>
          </XStack>

          {/* Openness note */}
          <Text color={textMuted} fontSize={13} marginTop="$1">
            Open to remote Founding Engineer opportunities (US / EU startups)
          </Text>
        </YStack>

        {/* Right: portrait */}
        <YStack
          alignSelf="center"
          width="100%"
          maxWidth={400}
          $gtSm={{ width: "38%" }}
          borderRadius={20}
          overflow="hidden"
          borderWidth={1}
          borderColor={border}
        >
          <NextImage
            src="/images/profile.jpg"
            alt="M. Nindra Zaka"
            width={400}
            height={500}
            priority
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
            }}
          />
        </YStack>
      </XStack>
    </YStack>
  );
}
