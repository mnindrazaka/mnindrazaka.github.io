import React from "react";
import Head from "next/head";
import { Anchor, Text, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { SUBSTACK_ARCHIVE_URL } from "@/lib/substack";
import { HeroSection } from "./HeroSection";
import { LinkListItem } from "./LinkListItem";
import { SocialLinks } from "./SocialLinks";

export type BlogListItem = {
  title: string;
  href: string;
  date: string;
};

export type LandingScreenProps = {
  posts: BlogListItem[];
};

type PortfolioItem = {
  title: string;
  description: string;
  href: string;
  external: boolean;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Gatherloop Board Game Cafe",
    description:
      "The first board game cafe in Probolinggo, serving 100+ customers daily",
    href: "https://gatherloop.github.io",
    external: true,
  },
  {
    title: "Point of Sale",
    description: "POS built in-house to run Gatherloop's daily operations",
    href: "https://gatherloop.github.io/gatherloop-pos",
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
    company: "ADPList",
    role: "Software Engineer",
    href: "https://adplist.org",
  },
  {
    company: "Karirlab",
    role: "Lead Frontend Engineer",
    href: "https://www.linkedin.com/company/karirlab",
  },
  {
    company: "Ruangguru",
    role: "Frontend Engineer",
    href: "https://ruangguru.com/",
  },
  {
    company: "Feedloop",
    role: "Frontend Engineer",
    href: "https://feedloop.ai/",
  },
];

export function LandingScreen({ posts }: LandingScreenProps) {
  const { bg, text, textMuted } = useThemeTokens();

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

          {posts.length > 0 && (
            <YStack gap="$3">
              <Text
                fontSize={13}
                fontWeight="700"
                color={textMuted}
                textTransform="uppercase"
                letterSpacing={0.6}
              >
                Writing
              </Text>
              <YStack>
                {posts.map((post) => (
                  <LinkListItem
                    key={post.href}
                    title={post.title}
                    description={post.date}
                    href={post.href}
                    external
                  />
                ))}
              </YStack>
              <Anchor
                href={SUBSTACK_ARCHIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                textDecorationLine="none"
                alignSelf="flex-start"
              >
                <Text
                  fontSize={13}
                  color={textMuted}
                  hoverStyle={{ color: text }}
                >
                  Show all →
                </Text>
              </Anchor>
            </YStack>
          )}

          <SocialLinks />
        </YStack>
      </YStack>
    </>
  );
}
