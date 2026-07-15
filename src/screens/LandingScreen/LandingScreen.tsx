import React from "react";
import Head from "next/head";
import { Text, YStack } from "tamagui";
import { Post } from "@/components";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { HeroSection } from "./HeroSection";
import { LinkListItem } from "./LinkListItem";

export type LandingScreenProps = {
  posts: Post[];
};

type PortfolioItem = {
  title: string;
  description: string;
  href: string;
  external: boolean;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Gatherloop Cafe & Board Game",
    description: "A board game cafe serving 100+ customers daily",
    href: "/business",
    external: false,
  },
  {
    title: "Point of Sale",
    description:
      "POS system built in-house to run Gatherloop's daily operations",
    href: "https://pos.gatherloop.com",
    external: true,
  },
];

type WorkHistoryItem = {
  company: string;
  role?: string;
  href: string;
};

// TODO: placeholder data — replace with real company history (PRD §8.5).
const workHistoryItems: WorkHistoryItem[] = [
  {
    company: "Company A",
    role: "Senior Frontend Engineer",
    href: "https://example.com/company-a",
  },
  {
    company: "Company B",
    role: "Software Engineer",
    href: "https://example.com/company-b",
  },
  {
    company: "Company C",
    role: "Frontend Engineer",
    href: "https://example.com/company-c",
  },
];

export function LandingScreen(_props: LandingScreenProps) {
  const { bg, textMuted } = useThemeTokens();

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

          <YStack gap="$3">
            <Text
              fontSize={13}
              fontWeight="700"
              color={textMuted}
              textTransform="uppercase"
              letterSpacing={0.6}
            >
              Portfolio
            </Text>
            <YStack>
              {portfolioItems.map((item) => (
                <LinkListItem
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  external={item.external}
                />
              ))}
            </YStack>
          </YStack>

          <YStack gap="$3">
            <Text
              fontSize={13}
              fontWeight="700"
              color={textMuted}
              textTransform="uppercase"
              letterSpacing={0.6}
            >
              Previously Work at
            </Text>
            <YStack>
              {workHistoryItems.map((item) => (
                <LinkListItem
                  key={item.company}
                  title={item.company}
                  description={item.role}
                  href={item.href}
                  external
                />
              ))}
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    </>
  );
}
