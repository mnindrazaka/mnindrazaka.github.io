import React, { useEffect, useState } from "react";
import { useThemeSetting } from "@tamagui/next-theme";
import { Anchor, Button, Text, XStack, YStack } from "tamagui";
import NextImage from "next/image";

export function Hero() {
  const themeSetting = useThemeSetting();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && themeSetting.current === "dark";
  const bg = isDark ? "#15110E" : "#FAF7F2";
  const text = isDark ? "#F5EFE4" : "#1A1613";
  const textMuted = isDark
    ? "rgba(245,239,228,0.6)"
    : "rgba(26,22,19,0.6)";
  const imageBorder = isDark ? "#2A2420" : "#E8E0D5";

  return (
    <YStack backgroundColor={bg} paddingVertical="$10" alignItems="center">
      <XStack
        width="100%"
        maxWidth={1200}
        paddingHorizontal="$6"
        gap="$12"
        alignItems="center"
        flexDirection="column"
        $gtSm={{ flexDirection: "row" }}
      >
        {/* Left: text content */}
        <YStack flex={1} gap="$5">
          {/* Kicker chip */}
          <XStack
            alignSelf="flex-start"
            backgroundColor={isDark ? "rgba(184,137,58,0.15)" : "rgba(184,137,58,0.1)"}
            borderWidth={1}
            borderColor="rgba(184,137,58,0.35)"
            paddingHorizontal={14}
            paddingVertical={5}
            borderRadius={100}
          >
            <Text
              color="#B8893A"
              fontSize={11}
              fontWeight="700"
              letterSpacing={1.8}
            >
              FOUNDING ENGINEER
            </Text>
          </XStack>

          {/* Headline with italic accent */}
          <Text
            style={{ fontFamily: "'Fraunces', serif" }}
            fontSize={50}
            lineHeight={60}
            fontWeight="800"
            color={text}
            $md={{ fontSize: 40, lineHeight: 50 }}
            $xs={{ fontSize: 32, lineHeight: 42 }}
          >
            Building products, businesses, and communities{" "}
            <Text
              style={{ fontFamily: "'Fraunces', serif" }}
              fontStyle="italic"
              color="#B8893A"
            >
              that
            </Text>
            {" "}create real impact.
          </Text>

          {/* Body */}
          <Text
            color={textMuted}
            fontSize={16}
            lineHeight={27}
            maxWidth={540}
          >
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
                backgroundColor="#B8893A"
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
          borderColor={imageBorder}
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
