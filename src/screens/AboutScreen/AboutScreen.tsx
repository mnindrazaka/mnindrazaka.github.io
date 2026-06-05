import React from "react";
import Head from "next/head";
import Link from "next/link";
import NextImage from "next/image";
import { Text, XStack, YStack, Anchor } from "tamagui";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Twitter,
  MapPin,
  Briefcase,
} from "@tamagui/lucide-icons";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/Section";
import { Chip } from "@/components/Chip";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts, layout } from "@/theme/tokens";

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: "GitHub",
    handle: "mnindrazaka",
    href: "https://github.com/mnindrazaka",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "mnindrazaka",
    href: "https://linkedin.com/in/mnindrazaka",
  },
  {
    icon: Twitter,
    label: "Twitter",
    handle: "@mnindrazaka",
    href: "https://twitter.com/mnindrazaka",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "mnindrazaka@gmail.com",
    href: "mailto:mnindrazaka@gmail.com",
  },
];

export function AboutScreen() {
  const { bg, surface, border, text, textMuted, accent } = useThemeTokens();

  return (
    <>
      <Head>
        <title>About — M. Nindra Zaka</title>
        <meta
          name="description"
          content="Software engineer, founder of Gatherloop, and Founding Engineer. I build products that create real business outcomes."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content="About — M. Nindra Zaka" />
        <meta
          property="og:description"
          content="Software engineer, founder of Gatherloop, and Founding Engineer. I build products that create real business outcomes."
        />
        <meta property="og:image" content="/og/home.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mnindrazaka" />
        <meta name="twitter:title" content="About — M. Nindra Zaka" />
        <meta
          name="twitter:description"
          content="Software engineer, founder of Gatherloop, and Founding Engineer."
        />
        <meta name="twitter:image" content="/og/home.svg" />
      </Head>
      <YStack>
      <Navbar />

      {/* Hero — two-column */}
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

          {/* Two-column content */}
          <XStack
            gap="$12"
            alignItems="flex-start"
            flexDirection="column"
            $gtSm={{ flexDirection: "row" }}
          >
            {/* Left: bio */}
            <YStack flex={1} gap="$6">
              <Chip label="ABOUT" variant="accent" />

              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={48}
                lineHeight={58}
                fontWeight="800"
                color={text}
                $sm={{ fontSize: 36, lineHeight: 46 }}
              >
                M. Nindra Zaka
              </Text>

              <Text
                style={{ fontFamily: fonts.display }}
                fontSize={20}
                fontWeight="600"
                color={textMuted}
                lineHeight={30}
                $sm={{ fontSize: 17, lineHeight: 26 }}
              >
                Software engineer, founder, and community builder.
              </Text>

              <YStack gap="$4">
                <Text color={textMuted} fontSize={16} lineHeight={28}>
                  I&apos;m a full-stack software engineer with a decade of
                  experience building products that people actually use. My
                  background spans frontend, backend, mobile, and everything in
                  between — but what I care about most is shipping things that
                  create real outcomes, not just clean code.
                </Text>
                <Text color={textMuted} fontSize={16} lineHeight={28}>
                  In 2022, I co-founded Gatherloop — a community café and event
                  space in Indonesia. Running a real business taught me lessons
                  no engineering book ever could: how to manage cash flow, lead a
                  small team, market to real people, and build systems that
                  actually hold up under pressure. It made me a better engineer
                  and a better thinker.
                </Text>
                <Text color={textMuted} fontSize={16} lineHeight={28}>
                  I mentor other engineers, write about product and engineering,
                  and believe the best software is built by people who understand
                  the business behind it. I&apos;m currently open to remote
                  Founding Engineer roles at early-stage startups where I can
                  bring both technical depth and business perspective to the
                  table.
                </Text>
              </YStack>
            </YStack>

            {/* Right: headshot */}
            <YStack
              alignSelf="flex-start"
              width="100%"
              maxWidth={400}
              $gtSm={{ width: "38%", maxWidth: 400 }}
              borderRadius={20}
              overflow="hidden"
              borderWidth={1}
              borderColor={border}
              flexShrink={0}
            >
              <NextImage
                src="/images/profile.jpg"
                alt="M. Nindra Zaka"
                width={400}
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

      {/* Current Focus */}
      <Section backgroundColor={surface}>
        <XStack
          backgroundColor={bg}
          borderRadius={20}
          borderWidth={1}
          borderColor={border}
          padding="$8"
          gap="$5"
          alignItems="flex-start"
          flexDirection="column"
          $gtSm={{ flexDirection: "row", alignItems: "center" }}
          $sm={{ padding: "$6" }}
        >
          <YStack
            width={48}
            height={48}
            borderRadius={12}
            backgroundColor={`rgba(184,137,58,0.1)`}
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Briefcase size={22} color={accent} />
          </YStack>
          <YStack flex={1} gap="$2">
            <Text
              style={{ fontFamily: fonts.display }}
              fontSize={20}
              fontWeight="700"
              color={text}
              lineHeight={28}
            >
              Current Focus
            </Text>
            <Text color={textMuted} fontSize={15} lineHeight={26}>
              Open to remote{" "}
              <Text color={accent} fontWeight="600">
                Founding Engineer
              </Text>{" "}
              opportunities at US / EU early-stage startups. I bring full-stack
              technical depth, real business experience from running Gatherloop,
              and a track record of shipping products end-to-end.
            </Text>
          </YStack>
        </XStack>
      </Section>

      {/* Connect */}
      <Section backgroundColor={bg}>
        <YStack gap="$6">
          <YStack gap="$2">
            <Text
              color={accent}
              fontSize={11}
              fontWeight="700"
              letterSpacing={2}
              textTransform="uppercase"
            >
              LET&apos;S CONNECT
            </Text>
            <Text
              style={{ fontFamily: fonts.display }}
              fontSize={32}
              fontWeight="700"
              color={text}
              lineHeight={40}
              $sm={{ fontSize: 26, lineHeight: 34 }}
            >
              Find me online
            </Text>
          </YStack>

          <XStack flexWrap="wrap" gap="$4">
            {SOCIAL_LINKS.map(({ icon: Icon, label, handle, href }) => (
              <Anchor
                key={href}
                href={href}
                textDecorationLine="none"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                <XStack
                  backgroundColor={surface}
                  borderWidth={1}
                  borderColor={border}
                  borderRadius={16}
                  paddingHorizontal="$5"
                  paddingVertical="$4"
                  gap="$3"
                  alignItems="center"
                  cursor="pointer"
                  hoverStyle={{
                    borderColor: accent,
                  }}
                >
                  <YStack
                    width={38}
                    height={38}
                    borderRadius={10}
                    backgroundColor={`rgba(184,137,58,0.1)`}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon size={18} color={accent} />
                  </YStack>
                  <YStack gap="$1">
                    <Text fontSize={12} fontWeight="600" color={textMuted} letterSpacing={0.5}>
                      {label}
                    </Text>
                    <Text fontSize={14} fontWeight="600" color={text}>
                      {handle}
                    </Text>
                  </YStack>
                </XStack>
              </Anchor>
            ))}
          </XStack>

          <XStack alignItems="center" gap="$2" marginTop="$2">
            <MapPin size={15} color={textMuted} />
            <Text color={textMuted} fontSize={14}>
              Indonesia · GMT+7
            </Text>
          </XStack>
        </YStack>
      </Section>

      <Footer />
    </YStack>
    </>
  );
}
