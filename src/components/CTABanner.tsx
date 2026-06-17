import React from "react";
import { Anchor, Text, YStack } from "tamagui";
import { fonts, footerColors, layout, radii } from "@/theme/tokens";

function MountainWithCup({ flip }: { flip?: boolean }) {
  return (
    <svg
      width="280"
      height="300"
      viewBox="0 0 280 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* Mountain silhouettes — layered for depth */}
      <polygon points="-30,300 80,110 190,300" fill="rgba(255,255,255,0.03)" />
      <polygon points="40,300 155,65 270,300" fill="rgba(255,255,255,0.055)" />
      <polygon points="100,300 230,95 360,300" fill="rgba(255,255,255,0.03)" />

      {/* Coffee cup — sits above the mountain peaks */}
      {/* Cup body */}
      <rect
        x="64"
        y="14"
        width="74"
        height="56"
        rx="8"
        stroke="rgba(184,137,58,0.32)"
        strokeWidth="2.5"
        fill="rgba(184,137,58,0.06)"
      />
      {/* Handle */}
      <path
        d="M138 28 C162 28 162 60 138 60"
        stroke="rgba(184,137,58,0.32)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Saucer arc */}
      <path
        d="M50 74 Q101 86 152 74"
        stroke="rgba(184,137,58,0.22)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Steam — left wave */}
      <path
        d="M82 12 C82 3 89 3 89 12 C89 21 96 21 96 12"
        stroke="rgba(184,137,58,0.22)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* Steam — right wave */}
      <path
        d="M106 8 C106 -1 113 -1 113 8 C113 17 120 17 120 8"
        stroke="rgba(184,137,58,0.22)"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CTABanner() {
  const bannerBg = "#26190F";
  const textColor = "#F5EFE4";
  const textMuted = "rgba(245,239,228,0.62)";
  const accent = footerColors.accent;

  return (
    <YStack
      backgroundColor={bannerBg}
      paddingVertical="$20"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      {/* Left decoration — hidden on narrow screens */}
      <YStack
        position="absolute"
        left={0}
        bottom={0}
        display="none"
        $gtSm={{ display: "flex" }}
      >
        <MountainWithCup />
      </YStack>

      {/* Right decoration — hidden on narrow screens */}
      <YStack
        position="absolute"
        right={0}
        bottom={0}
        display="none"
        $gtSm={{ display: "flex" }}
      >
        <MountainWithCup flip />
      </YStack>

      {/* Centered content */}
      <YStack
        maxWidth={560}
        width="100%"
        alignItems="center"
        paddingHorizontal={layout.containerPadding}
        gap="$5"
        zIndex={1}
      >
        <Text
          style={{ fontFamily: fonts.display }}
          fontSize={38}
          fontWeight="700"
          color={textColor}
          lineHeight={50}
          textAlign="center"
          $sm={{ fontSize: 28, lineHeight: 38 }}
        >
          Let&apos;s build something great together
        </Text>

        <Text
          fontSize={16}
          color={textMuted}
          lineHeight={27}
          textAlign="center"
        >
          Open to remote Software Engineer opportunities with early-stage
          startups. Building something meaningful? Let&apos;s talk — I&apos;d
          love to hear about it.
        </Text>

        <Anchor href="mailto:mnindrazaka@gmail.com" textDecorationLine="none">
          <YStack
            backgroundColor={accent}
            paddingHorizontal="$7"
            paddingVertical="$3"
            borderRadius={radii.button}
            cursor="pointer"
            hoverStyle={{ opacity: 0.85 }}
            animation="quick"
          >
            <Text
              color="#FFFFFF"
              fontSize={15}
              fontWeight="700"
              letterSpacing={0.3}
            >
              Let&apos;s talk →
            </Text>
          </YStack>
        </Anchor>
      </YStack>
    </YStack>
  );
}
