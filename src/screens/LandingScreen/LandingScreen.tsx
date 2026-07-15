import React from "react";
import Head from "next/head";
import { YStack } from "tamagui";
import { Post } from "@/components";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { HeroSection } from "./HeroSection";

export type LandingScreenProps = {
  posts: Post[];
};

export function LandingScreen(_props: LandingScreenProps) {
  const { bg } = useThemeTokens();

  return (
    <>
      <Head>
        <title>M. Nindra Zaka — Software Engineer &amp; Founder</title>
        <meta
          name="description"
          content="M. Nindra Zaka — Software Engineer &amp; Founder. Portfolio, work history, and writing."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="M. Nindra Zaka — Software Engineer & Founder"
        />
        <meta
          property="og:description"
          content="Portfolio, work history, and writing from M. Nindra Zaka."
        />
        <meta property="og:image" content="/og/home.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mnindrazaka" />
        <meta
          name="twitter:title"
          content="M. Nindra Zaka — Software Engineer & Founder"
        />
        <meta
          name="twitter:description"
          content="Portfolio, work history, and writing from M. Nindra Zaka."
        />
        <meta name="twitter:image" content="/og/home.svg" />
      </Head>
      <YStack backgroundColor={bg} minHeight="100vh" alignItems="center">
        <YStack
          width="100%"
          maxWidth={600}
          paddingHorizontal="$4"
          $gtXs={{ paddingHorizontal: 24 }}
          paddingVertical={64}
          gap={48}
        >
          <HeroSection />
        </YStack>
      </YStack>
    </>
  );
}
