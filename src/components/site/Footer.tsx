import React from "react";
import { Github, Linkedin, Mail, Twitter } from "@tamagui/lucide-icons";
import { Anchor, Text, XStack, YStack } from "tamagui";
import { footerColors } from "@/theme/tokens";
import { fonts } from "@/theme/tokens";

const {
  bg: BG,
  text: TEXT,
  textMuted: TEXT_MUTED,
  border: BORDER,
  accent: ACCENT,
} = footerColors;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/writing" },
  { label: "Business", href: "/business" },
  { label: "POS System", href: "/pos-system" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const TOPICS = ["Product", "Engineering", "Leadership", "Business", "Career"];

const SOCIAL = [
  {
    icon: Github,
    label: "mnindrazaka",
    href: "https://github.com/mnindrazaka",
  },
  {
    icon: Linkedin,
    label: "mnindrazaka",
    href: "https://linkedin.com/in/mnindrazaka",
  },
  {
    icon: Mail,
    label: "mnindrazaka@gmail.com",
    href: "mailto:mnindrazaka@gmail.com",
  },
];

export function Footer() {
  return (
    <YStack
      backgroundColor={BG}
      paddingTop="$12"
      paddingBottom="$6"
      alignItems="center"
    >
      <YStack width="100%" maxWidth={1200} paddingHorizontal="$6">
        {/* 4-column grid */}
        <XStack flexWrap="wrap" gap="$8" marginBottom="$10">
          {/* Brand */}
          <YStack flex={2} minWidth={200} gap="$4">
            <Text
              style={{ fontFamily: fonts.display }}
              color={TEXT}
              fontSize={20}
              fontWeight="700"
            >
              M. Nindra Zaka
            </Text>
            <Text
              color={TEXT_MUTED}
              fontSize={14}
              lineHeight={22}
              maxWidth={280}
            >
              Building product and business that create real impact.
            </Text>
            <XStack gap="$4" marginTop="$1">
              {SOCIAL.slice(0, 3).map(({ icon: Icon, href }) => (
                <Anchor
                  key={href}
                  href={href}
                  textDecorationLine="none"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon
                    color={TEXT_MUTED}
                    size={20}
                    hoverStyle={{ color: TEXT }}
                    cursor="pointer"
                  />
                </Anchor>
              ))}
            </XStack>
          </YStack>

          {/* Navigation */}
          <YStack flex={1} minWidth={130} gap="$3">
            <Text
              color={TEXT}
              fontSize={13}
              fontWeight="600"
              letterSpacing={0.8}
              textTransform="uppercase"
            >
              Navigation
            </Text>
            {NAV_LINKS.map((link) => (
              <Anchor
                key={link.href}
                href={link.href}
                textDecorationLine="none"
              >
                <Text
                  color={TEXT_MUTED}
                  fontSize={14}
                  cursor="pointer"
                  hoverStyle={{ color: TEXT }}
                >
                  {link.label}
                </Text>
              </Anchor>
            ))}
          </YStack>

          {/* Topics */}
          <YStack flex={1} minWidth={130} gap="$3">
            <Text
              color={TEXT}
              fontSize={13}
              fontWeight="600"
              letterSpacing={0.8}
              textTransform="uppercase"
            >
              Topics
            </Text>
            {TOPICS.map((topic) => (
              <Anchor key={topic} href="/writing" textDecorationLine="none">
                <Text
                  color={TEXT_MUTED}
                  fontSize={14}
                  cursor="pointer"
                  hoverStyle={{ color: TEXT }}
                >
                  {topic}
                </Text>
              </Anchor>
            ))}
          </YStack>

          {/* Connect */}
          <YStack flex={1} minWidth={160} gap="$3">
            <Text
              color={TEXT}
              fontSize={13}
              fontWeight="600"
              letterSpacing={0.8}
              textTransform="uppercase"
            >
              Let&apos;s Connect
            </Text>
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <Anchor
                key={href}
                href={href}
                textDecorationLine="none"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                <XStack gap="$2" alignItems="center">
                  <Icon color={TEXT_MUTED} size={15} />
                  <Text
                    color={TEXT_MUTED}
                    fontSize={13}
                    cursor="pointer"
                    hoverStyle={{ color: TEXT }}
                  >
                    {label}
                  </Text>
                </XStack>
              </Anchor>
            ))}
          </YStack>
        </XStack>

        {/* Copyright row */}
        <XStack
          borderTopWidth={1}
          borderTopColor={BORDER}
          paddingTop="$5"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="$3"
        >
          <Text color={TEXT_MUTED} fontSize={13}>
            © 2025 M. Nindra Zaka. All rights reserved.
          </Text>
          <XStack alignItems="center" gap="$1">
            <Text color={TEXT_MUTED} fontSize={13}>
              Built with{" "}
            </Text>
            <Anchor
              href="https://nextjs.org"
              textDecorationLine="none"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text color={ACCENT} fontSize={13} fontWeight="600">
                Next.js
              </Text>
            </Anchor>
            <Text color={TEXT_MUTED} fontSize={13}>
              {" "}
              +{" "}
            </Text>
            <Anchor
              href="https://tamagui.dev"
              textDecorationLine="none"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text color={ACCENT} fontSize={13} fontWeight="600">
                Tamagui
              </Text>
            </Anchor>
          </XStack>
        </XStack>
      </YStack>
    </YStack>
  );
}
