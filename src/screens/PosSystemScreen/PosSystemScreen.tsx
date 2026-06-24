import React from "react";
import Head from "next/head";
import Link from "next/link";
import NextImage from "next/image";
import { Text, XStack, YStack } from "tamagui";
import {
  ArrowLeft,
  ShoppingCart,
  Package,
  FileText,
  BarChart3,
  Users,
  Smartphone,
  Code2,
  Server,
  Database,
  Layers,
  Building2,
} from "@tamagui/lucide-icons";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { Chip } from "@/components/Chip";
import { Checklist } from "@/components/Checklist";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts, layout } from "@/theme/tokens";

const features = [
  { icon: ShoppingCart, label: "Sales & Orders" },
  { icon: Package, label: "Inventory Management" },
  { icon: FileText, label: "Expense Tracking" },
  { icon: BarChart3, label: "Financial Reports" },
  { icon: Users, label: "User & Role Management" },
  { icon: Smartphone, label: "Multi-platform" },
];

const techStack = [
  { icon: Code2, name: "React", color: "#61DAFB" },
  { icon: Smartphone, name: "React Native", color: "#61DAFB" },
  { icon: Server, name: "Node.js", color: "#68A063" },
  { icon: Code2, name: "TypeScript", color: "#3178C6" },
  { icon: Database, name: "PostgreSQL", color: "#336791" },
  { icon: Layers, name: "Nx Monorepo", color: "#143055" },
  { icon: Building2, name: "Clean Arch.", color: "#2563EB" },
];

const impactStats = [
  { headline: "Daily", label: "Used by my team" },
  { headline: "100%", label: "Built In-House" },
  { headline: "10 hrs", label: "Saved every week" },
  { headline: "Better", label: "Decisions with data" },
];

const problemPoints = [
  "No inventory tracking tailored to our menu and products",
  "Expense reporting required tedious manual data entry",
  "Financial reports took hours to compile each week",
  "No unified view of sales, stock, and daily operations",
];

const takeaways = [
  "Building for yourself means understanding the problem deeply — no user research shortcut.",
  "A clean architecture pays off: new features take days, not weeks, to add.",
  "Shipping to production early revealed dozens of edge cases no prototype could surface.",
  "Running the business while building the tool made every decision sharper and more intentional.",
  "A well-built internal tool is the foundation for a real product company.",
];

export function PosSystemScreen() {
  const { bg, surface, border, text, textMuted, accent } = useThemeTokens();

  return (
    <>
      <Head>
        <title>Custom POS System Case Study — M. Nindra Zaka</title>
        <meta
          name="description"
          content="I built a fully custom POS system for Gatherloop when off-the-shelf tools couldn't keep up. Full-stack, cross-platform, running in production daily."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Custom POS System Case Study — M. Nindra Zaka" />
        <meta
          property="og:description"
          content="I built a fully custom POS system for Gatherloop when off-the-shelf tools couldn't keep up. Full-stack, cross-platform, running in production daily."
        />
        <meta property="og:image" content="/og/pos-system.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mnindrazaka" />
        <meta name="twitter:title" content="Custom POS System Case Study — M. Nindra Zaka" />
        <meta
          name="twitter:description"
          content="I built a fully custom POS system for Gatherloop when off-the-shelf tools couldn't keep up."
        />
        <meta name="twitter:image" content="/og/pos-system.svg" />
      </Head>
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
            {/* Left: text */}
            <YStack flex={1} gap="$5">
              <Chip label="CASE STUDY" variant="product" />

              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={48}
                lineHeight={58}
                fontWeight="800"
                color={text}
                $sm={{ fontSize: 36, lineHeight: 46 }}
              >
                Building a POS System for My Own Business
              </Text>

              <Text
                color={textMuted}
                fontSize={16}
                lineHeight={27}
                maxWidth={520}
              >
                When off-the-shelf tools couldn&apos;t keep up with
                Gatherloop&apos;s operations, I built a custom POS system from
                scratch — fully tailored, cross-platform, and running in
                production every single day.
              </Text>
            </YStack>

            {/* Right: product mockup */}
            <YStack
              alignSelf="center"
              width="100%"
              maxWidth={420}
              $gtSm={{ width: "42%", maxWidth: 420 }}
              borderRadius={20}
              overflow="hidden"
              borderWidth={1}
              borderColor={border}
            >
              <NextImage
                src="/images/point-of-sale.png"
                alt="Custom POS system built for Gatherloop"
                width={420}
                height={480}
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

      {/* Problem / Solution */}
      <Section backgroundColor={surface}>
        <SectionHeader
          kicker="THE CHALLENGE"
          title="Problem &amp; Solution"
        />
        <XStack
          gap="$5"
          flexDirection="column"
          $gtSm={{ flexDirection: "row" }}
        >
          {/* The Problem */}
          <YStack
            flex={1}
            backgroundColor={bg}
            borderRadius={20}
            borderWidth={1}
            borderColor={border}
            padding="$7"
            gap="$5"
            $sm={{ padding: "$5" }}
          >
            <Text
              style={{ fontFamily: fonts.display }}
              fontSize={22}
              fontWeight="700"
              color={text}
              lineHeight={30}
            >
              The Problem
            </Text>
            <Text color={textMuted} fontSize={15} lineHeight={26}>
              Off-the-shelf POS systems were either too expensive, too generic,
              or missing the features Gatherloop actually needed. We were
              juggling spreadsheets, multiple apps, and hours of manual work
              just to understand how the business was performing.
            </Text>
            <YStack gap="$3">
              {problemPoints.map((point) => (
                <XStack key={point} gap="$3" alignItems="flex-start">
                  <Text
                    color={accent}
                    fontSize={18}
                    lineHeight={24}
                    marginTop={1}
                  >
                    ×
                  </Text>
                  <Text color={textMuted} fontSize={14} lineHeight={24} flex={1}>
                    {point}
                  </Text>
                </XStack>
              ))}
            </YStack>
          </YStack>

          {/* The Solution */}
          <YStack
            flex={1}
            backgroundColor={bg}
            borderRadius={20}
            borderWidth={1}
            borderColor={border}
            padding="$7"
            gap="$5"
            $sm={{ padding: "$5" }}
          >
            <Text
              style={{ fontFamily: fonts.display }}
              fontSize={22}
              fontWeight="700"
              color={text}
              lineHeight={30}
            >
              The Solution
            </Text>
            <Text color={textMuted} fontSize={15} lineHeight={26}>
              A fully custom POS platform built for Gatherloop&apos;s exact
              workflows — from taking orders to generating financial reports.
              Cross-platform (web + mobile), clean architecture, and shipping
              real value from day one.
            </Text>
            <XStack flexWrap="wrap" gap="$2">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <XStack
                    key={f.label}
                    backgroundColor={surface}
                    borderWidth={1}
                    borderColor={border}
                    borderRadius={100}
                    paddingHorizontal="$3"
                    paddingVertical="$2"
                    alignItems="center"
                    gap="$2"
                  >
                    <Icon size={13} color={accent} />
                    <Text
                      fontSize={12}
                      fontWeight="600"
                      color={text}
                      letterSpacing={0.3}
                    >
                      {f.label}
                    </Text>
                  </XStack>
                );
              })}
            </XStack>
          </YStack>
        </XStack>
      </Section>

      {/* Tech Stack */}
      <Section backgroundColor={bg}>
        <SectionHeader kicker="HOW IT&apos;S BUILT" title="Tech Stack" />
        <XStack flexWrap="wrap" gap="$3">
          {techStack.map((tech) => {
            const TechIcon = tech.icon;
            return (
              <YStack
                key={tech.name}
                backgroundColor={surface}
                borderWidth={1}
                borderColor={border}
                borderRadius={16}
                paddingHorizontal="$5"
                paddingVertical="$5"
                gap="$3"
                alignItems="center"
                minWidth={90}
                flexGrow={1}
                flexBasis={90}
                $gtSm={{ flexGrow: 0, flexBasis: "auto" }}
              >
                <YStack
                  width={44}
                  height={44}
                  borderRadius={12}
                  alignItems="center"
                  justifyContent="center"
                  style={{ backgroundColor: tech.color + "20" }}
                >
                  <TechIcon size={22} color={tech.color} />
                </YStack>
                <Text
                  fontSize={12}
                  fontWeight="600"
                  color={text}
                  textAlign="center"
                  lineHeight={17}
                >
                  {tech.name}
                </Text>
              </YStack>
            );
          })}
        </XStack>
      </Section>

      {/* Impact Stats */}
      <Section backgroundColor={surface}>
        <SectionHeader kicker="RESULTS" title="Impact" />
        <XStack flexWrap="wrap" gap="$4">
          {impactStats.map((stat) => (
            <YStack
              key={stat.headline}
              flexBasis="47%"
              $gtMd={{ flex: 1, flexBasis: 0 }}
              backgroundColor={bg}
              borderRadius={20}
              borderWidth={1}
              borderColor={border}
              paddingHorizontal="$6"
              paddingVertical="$7"
              gap="$1"
            >
              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={42}
                fontWeight="800"
                color={accent}
                lineHeight={52}
                $sm={{ fontSize: 34, lineHeight: 42 }}
              >
                {stat.headline}
              </Text>
              <Text color={textMuted} fontSize={14} lineHeight={22}>
                {stat.label}
              </Text>
            </YStack>
          ))}
        </XStack>
      </Section>

      {/* Key Takeaways */}
      <Section backgroundColor={bg}>
        <SectionHeader kicker="LESSONS LEARNED" title="Key Takeaways" />
        <XStack
          gap="$12"
          flexDirection="column"
          $gtSm={{ flexDirection: "row" }}
          alignItems="flex-start"
        >
          <YStack flex={1}>
            <Checklist items={takeaways} />
          </YStack>

          <YStack
            width="100%"
            $gtSm={{ width: 280, flexShrink: 0 }}
            borderRadius={20}
            overflow="hidden"
            borderWidth={1}
            borderColor={border}
          >
            <NextImage
              src="/images/profile.jpg"
              alt="M. Nindra Zaka"
              width={280}
              height={360}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
              }}
            />
          </YStack>
        </XStack>

        {/* Closing italic line */}
        <YStack
          marginTop="$12"
          paddingTop="$10"
          borderTopWidth={1}
          borderTopColor={border}
          alignItems="center"
        >
          <Text
            style={{ fontFamily: fonts.display, fontStyle: "italic" }}
            fontSize={22}
            lineHeight={36}
            color={textMuted}
            textAlign="center"
            maxWidth={620}
            $sm={{ fontSize: 18, lineHeight: 30 }}
          >
            &ldquo;I&apos;m constantly improving the system and exploring new
            ideas. This is just the beginning.&rdquo;
          </Text>
        </YStack>
      </Section>

      <Footer />
    </YStack>
    </>
  );
}
