import React from "react";
import { Github, Linkedin, Mail, Twitter } from "@tamagui/lucide-icons";
import { Anchor, Text, XStack, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/mnindrazaka",
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/mnindrazaka",
    external: true,
  },
  {
    icon: Twitter,
    label: "Twitter/X",
    href: "https://x.com/mnindrazaka",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:mnindrazaka@gmail.com",
    external: false,
  },
];

export function SocialLinks() {
  const { textMuted, accent } = useThemeTokens();

  return (
    <YStack alignItems="center" gap="$4">
      <XStack gap="$5">
        {SOCIAL_LINKS.map(({ icon: Icon, label, href, external }) => (
          <Anchor
            key={label}
            href={href}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            textDecorationLine="none"
          >
            <Icon
              color={textMuted}
              size={24}
              cursor="pointer"
              hoverStyle={{ color: accent }}
              focusStyle={{
                outlineWidth: 2,
                outlineColor: accent,
                outlineStyle: "solid",
                outlineOffset: 2,
              }}
            />
          </Anchor>
        ))}
      </XStack>
      <Text color={textMuted} fontSize={13} textAlign="center">
        © {new Date().getFullYear()} M. Nindra Zaka
      </Text>
    </YStack>
  );
}
