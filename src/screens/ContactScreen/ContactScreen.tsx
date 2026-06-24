import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Text, XStack, YStack, Anchor } from "tamagui";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Twitter,
  MapPin,
  ArrowRight,
} from "@tamagui/lucide-icons";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/Section";
import { Chip } from "@/components/Chip";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { accentRgb, fonts, layout } from "@/theme/tokens";

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "mnindrazaka@gmail.com",
    href: "mailto:mnindrazaka@gmail.com",
    description: "Best way to reach me",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/mnindrazaka",
    href: "https://github.com/mnindrazaka",
    description: "See what I'm building",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/mnindrazaka",
    href: "https://linkedin.com/in/mnindrazaka",
    description: "Connect professionally",
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@mnindrazaka",
    href: "https://twitter.com/mnindrazaka",
    description: "Thoughts & updates",
  },
];

export function ContactScreen() {
  const { bg, surface, border, text, textMuted, accent } = useThemeTokens();

  return (
    <>
      <Head>
        <title>Contact — M. Nindra Zaka</title>
        <meta
          name="description"
          content="Let's talk. I'm open to Founding Engineer roles at early-stage US/EU startups and always happy to chat about products and engineering."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact — M. Nindra Zaka" />
        <meta
          property="og:description"
          content="Let's talk. I'm open to Founding Engineer roles at early-stage US/EU startups and always happy to chat about products and engineering."
        />
        <meta property="og:image" content="/og/home.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mnindrazaka" />
        <meta name="twitter:title" content="Contact — M. Nindra Zaka" />
        <meta
          name="twitter:description"
          content="Let's talk. I'm open to Founding Engineer roles at early-stage US/EU startups."
        />
        <meta name="twitter:image" content="/og/home.svg" />
      </Head>
      <YStack>
      <Navbar />

      {/* Page header */}
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

          <YStack gap="$5" maxWidth={680}>
            <Chip label="CONTACT" variant="accent" />

            <Text
              style={{ fontFamily: fonts.display }}
              fontSize={48}
              lineHeight={58}
              fontWeight="800"
              color={text}
              $sm={{ fontSize: 36, lineHeight: 46 }}
            >
              Let&apos;s Talk
            </Text>

            <Text color={textMuted} fontSize={17} lineHeight={28} maxWidth={520}>
              I&apos;m always open to interesting conversations — whether
              you&apos;re building something new, exploring a collaboration, or
              just want to say hello.
            </Text>
          </YStack>
        </YStack>
      </YStack>

      {/* Contact panel */}
      <Section backgroundColor={surface}>
        <XStack
          gap="$6"
          flexDirection="column"
          $gtSm={{ flexDirection: "row" }}
          alignItems="flex-start"
        >
          {/* Left: contact cards */}
          <YStack flex={1} gap="$4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, description }) => (
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
                  backgroundColor={bg}
                  borderWidth={1}
                  borderColor={border}
                  borderRadius={16}
                  padding="$5"
                  gap="$4"
                  alignItems="center"
                  cursor="pointer"
                  hoverStyle={{ borderColor: accent }}
                  pressStyle={{ opacity: 0.85 }}
                >
                  <YStack
                    width={48}
                    height={48}
                    borderRadius={12}
                    backgroundColor={`rgba(${accentRgb},0.1)`}
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Icon size={22} color={accent} />
                  </YStack>
                  <YStack flex={1} gap="$1">
                    <Text
                      fontSize={12}
                      fontWeight="700"
                      color={textMuted}
                      letterSpacing={1}
                      textTransform="uppercase"
                    >
                      {label}
                    </Text>
                    <Text fontSize={15} fontWeight="600" color={text} lineHeight={22}>
                      {value}
                    </Text>
                    <Text fontSize={13} color={textMuted}>
                      {description}
                    </Text>
                  </YStack>
                  <ArrowRight size={16} color={textMuted} />
                </XStack>
              </Anchor>
            ))}

            {/* Location */}
            <XStack
              backgroundColor={bg}
              borderWidth={1}
              borderColor={border}
              borderRadius={16}
              padding="$5"
              gap="$4"
              alignItems="center"
            >
              <YStack
                width={48}
                height={48}
                borderRadius={12}
                backgroundColor={`rgba(${accentRgb},0.1)`}
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <MapPin size={22} color={accent} />
              </YStack>
              <YStack flex={1} gap="$1">
                <Text
                  fontSize={12}
                  fontWeight="700"
                  color={textMuted}
                  letterSpacing={1}
                  textTransform="uppercase"
                >
                  Location
                </Text>
                <Text fontSize={15} fontWeight="600" color={text} lineHeight={22}>
                  Indonesia
                </Text>
                <Text fontSize={13} color={textMuted}>
                  GMT+7 · Available remotely
                </Text>
              </YStack>
            </XStack>
          </YStack>

          {/* Right: availability note */}
          <YStack
            width="100%"
            $gtSm={{ width: 340, flexShrink: 0 }}
            gap="$5"
          >
            <YStack
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
                Open to Work
              </Text>
              <Text color={textMuted} fontSize={15} lineHeight={26}>
                I&apos;m currently exploring{" "}
                <Text color={accent} fontWeight="600">
                  Founding Engineer
                </Text>{" "}
                roles at early-stage startups. If you&apos;re building something
                meaningful and need an engineer who thinks in products and
                outcomes, let&apos;s talk.
              </Text>
              <YStack gap="$3">
                {[
                  "Remote-first (US / EU timezones workable)",
                  "Full-stack engineering leadership",
                  "Product & technical strategy",
                  "0 → 1 product builds",
                ].map((item) => (
                  <XStack key={item} gap="$3" alignItems="flex-start">
                    <Text color={accent} fontSize={16} lineHeight={24} marginTop={1}>
                      ✓
                    </Text>
                    <Text color={textMuted} fontSize={14} lineHeight={24} flex={1}>
                      {item}
                    </Text>
                  </XStack>
                ))}
              </YStack>
              <Anchor href="mailto:mnindrazaka@gmail.com" textDecorationLine="none">
                <XStack
                  backgroundColor={accent}
                  borderRadius={100}
                  paddingHorizontal="$6"
                  paddingVertical="$3"
                  alignItems="center"
                  justifyContent="center"
                  gap="$2"
                  cursor="pointer"
                  hoverStyle={{ opacity: 0.9 }}
                  pressStyle={{ opacity: 0.8 }}
                >
                  <Mail size={16} color="#fff" />
                  <Text color="#fff" fontSize={14} fontWeight="700">
                    Send me an email
                  </Text>
                </XStack>
              </Anchor>
            </YStack>

            <YStack
              backgroundColor={bg}
              borderRadius={20}
              borderWidth={1}
              borderColor={border}
              padding="$6"
              gap="$3"
              $sm={{ padding: "$5" }}
            >
              <Text
                style={{ fontFamily: fonts.display, fontStyle: "italic" }}
                fontSize={16}
                lineHeight={26}
                color={textMuted}
              >
                &ldquo;I typically reply within 24 hours on weekdays. Looking
                forward to hearing from you.&rdquo;
              </Text>
              <Text
                fontSize={12}
                color={accent}
                fontWeight="700"
                letterSpacing={1.2}
                textTransform="uppercase"
              >
                M. Nindra Zaka
              </Text>
            </YStack>
          </YStack>
        </XStack>
      </Section>

      <Footer />
    </YStack>
    </>
  );
}
