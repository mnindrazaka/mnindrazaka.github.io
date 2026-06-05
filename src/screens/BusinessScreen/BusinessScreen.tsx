import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Text, XStack, YStack } from "tamagui";
import {
  ArrowLeft,
  Settings,
  DollarSign,
  TrendingUp,
  Users,
  Heart,
} from "@tamagui/lucide-icons";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Chip } from "@/components/Chip";
import { IconStat } from "@/components/IconStat";
import { Timeline } from "@/components/Timeline";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts, layout } from "@/theme/tokens";

export function BusinessScreen() {
  const { bg, surface, border, text, textMuted, accent } = useThemeTokens();

  const whatILearned = [
    {
      icon: <Settings size={20} color={accent} />,
      title: "Operations",
      description:
        "Managing daily café operations taught me how to build reliable systems and keep processes running smoothly under real constraints.",
    },
    {
      icon: <DollarSign size={20} color={accent} />,
      title: "Finance",
      description:
        "Tracking real revenue, expenses, and margins made me ruthless about ROI. Every feature I build now has a measurable business case.",
    },
    {
      icon: <TrendingUp size={20} color={accent} />,
      title: "Marketing",
      description:
        "Growing Gatherloop's brand from zero gave me deep empathy for users who aren't engineers. Clear communication matters as much as code.",
    },
    {
      icon: <Users size={20} color={accent} />,
      title: "Leadership",
      description:
        "Hiring, managing, and motivating a small team taught me more about leadership than any management book ever could.",
    },
    {
      icon: <Heart size={20} color={accent} />,
      title: "Community",
      description:
        "Building a community of 1,000+ members showed me that software is nothing without the people who use it every day.",
    },
  ];

  const timelineEntries = [
    {
      year: "2022",
      title: "The Beginning",
      description:
        "Opened Gatherloop as a small café and event space. Built every process from scratch — supply chains, staffing, daily operations — learning entirely by doing.",
    },
    {
      year: "2023",
      title: "Community & Growth",
      description:
        "Organized 50+ events, grew to 1,000+ members, and ran our first profitable quarter. Marketing, community building, and operations all scaled together.",
    },
    {
      year: "2024",
      title: "Building for Ourselves",
      description:
        "Realized off-the-shelf tools weren't cutting it. Built a custom POS system tailored to Gatherloop's exact needs and deployed it to production.",
    },
  ];

  return (
    <YStack>
      <Navbar />

      {/* Hero */}
      <YStack backgroundColor={bg} paddingVertical="$10" alignItems="center">
        <YStack
          width="100%"
          maxWidth={layout.maxWidth}
          paddingHorizontal={layout.containerPadding}
          gap="$8"
        >
          {/* Back link */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <XStack alignItems="center" gap="$2" cursor="pointer">
              <ArrowLeft size={16} color={textMuted} />
              <Text color={textMuted} fontSize={14} fontWeight="500">
                Back to home
              </Text>
            </XStack>
          </Link>

          {/* Hero columns */}
          <XStack
            gap="$12"
            alignItems="center"
            flexDirection="column"
            $gtSm={{ flexDirection: "row" }}
          >
            {/* Left: text content */}
            <YStack flex={1} gap="$5">
              <Chip label="BUSINESS" variant="business" />

              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={48}
                lineHeight={58}
                fontWeight="800"
                color={text}
                $sm={{ fontSize: 36, lineHeight: 46 }}
              >
                Building Gatherloop
              </Text>

              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={20}
                fontWeight="600"
                color={textMuted}
                lineHeight={30}
                $sm={{ fontSize: 17, lineHeight: 26 }}
              >
                From a personal vision to a thriving community café and event
                space.
              </Text>

              <Text
                color={textMuted}
                fontSize={16}
                lineHeight={27}
                maxWidth={520}
              >
                In 2022, I turned an idea into a real business — Gatherloop, a
                community café and event space. I built and ran it end-to-end:
                operations, finance, marketing, leadership. Everything I learned
                there lives in every product I build today.
              </Text>
            </YStack>

            {/* Right: café image */}
            <YStack
              alignSelf="center"
              width="100%"
              maxWidth={480}
              $gtSm={{ width: "42%", maxWidth: 480 }}
              borderRadius={20}
              overflow="hidden"
              borderWidth={1}
              borderColor={border}
            >
              <NextImage
                src="/images/hero.png"
                alt="Gatherloop café"
                width={480}
                height={420}
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
      </YStack>

      {/* What I Learned */}
      <Section backgroundColor={surface}>
        <SectionHeader
          kicker="WHAT I LEARNED"
          title="What I Learned Running a Business"
        />
        <XStack flexWrap="wrap" gap="$4" rowGap="$8">
          {whatILearned.map((stat) => (
            <YStack
              key={stat.title}
              flexBasis="100%"
              $gtXs={{ flexBasis: "48%" }}
              $gtSm={{ flexBasis: "31%" }}
              $gtMd={{ flex: 1, flexBasis: 0 }}
            >
              <IconStat
                icon={stat.icon}
                title={stat.title}
                description={stat.description}
              />
            </YStack>
          ))}
        </XStack>
      </Section>

      {/* Pull Quote */}
      <Section backgroundColor={bg}>
        <YStack
          backgroundColor={surface}
          borderRadius={20}
          borderWidth={1}
          borderColor={border}
          paddingHorizontal="$10"
          paddingVertical="$10"
          alignItems="center"
          $sm={{ paddingHorizontal: "$6", paddingVertical: "$8" }}
        >
          <Text
            style={{ fontFamily: fonts.display, fontStyle: "italic" }}
            fontSize={26}
            lineHeight={40}
            color={text}
            textAlign="center"
            maxWidth={700}
            $sm={{ fontSize: 20, lineHeight: 32 }}
          >
            &ldquo;Running a business changed the way I build software. Every
            feature I ship now has a reason — a real user, a real problem, a
            real outcome.&rdquo;
          </Text>
          <Text
            fontSize={13}
            color={accent}
            fontWeight="700"
            letterSpacing={1.5}
            textTransform="uppercase"
            marginTop="$5"
          >
            M. Nindra Zaka — Founder, Gatherloop
          </Text>
        </YStack>
      </Section>

      {/* Timeline */}
      <Section backgroundColor={surface}>
        <SectionHeader kicker="THE JOURNEY" title="How Gatherloop Grew" />
        <Timeline
          entries={timelineEntries}
          imageSource="/images/hero.png"
          imageAlt="Gatherloop café interior"
        />
      </Section>

      <Footer />
    </YStack>
  );
}
