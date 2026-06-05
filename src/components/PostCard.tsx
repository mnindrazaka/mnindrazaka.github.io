import React from "react";
import Link from "next/link";
import { Image, Text, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts, radii } from "@/theme/tokens";
import { Chip, ChipVariant } from "@/components/Chip";

export type PostCardProps = {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  date: string;
  category?: string;
};

const categoryVariantMap: Record<string, ChipVariant> = {
  Product: "product",
  Engineering: "engineering",
  Leadership: "leadership",
  Business: "business",
  Career: "career",
};

export function PostCard({
  title,
  description,
  href,
  imageUrl,
  date,
  category,
}: PostCardProps) {
  const { surface, border, text, textMuted } = useThemeTokens();
  const cat = category ?? "Engineering";
  const chipVariant: ChipVariant = categoryVariantMap[cat] ?? "engineering";

  return (
    <Link href={href} style={{ textDecoration: "none", flex: 1, display: "flex" }}>
      <YStack
        flex={1}
        backgroundColor={surface}
        borderRadius={radii.card}
        borderWidth={1}
        borderColor={border}
        overflow="hidden"
        cursor="pointer"
        pressStyle={{ opacity: 0.9 }}
        hoverStyle={{ borderColor: text }}
        animation="quick"
      >
        {/* Thumbnail */}
        <YStack height={180} overflow="hidden">
          <Image
            source={{ uri: imageUrl }}
            alt={title}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
        </YStack>

        {/* Content */}
        <YStack padding="$5" gap="$3" flex={1}>
          <Chip label={cat} variant={chipVariant} size="sm" />

          <Text
            style={{ fontFamily: fonts.display }}
            fontSize={18}
            fontWeight="700"
            color={text}
            lineHeight={26}
          >
            {title}
          </Text>

          <Text fontSize={14} color={textMuted} lineHeight={22}>
            {description}
          </Text>

          <Text fontSize={12} color={textMuted} paddingTop="$2">
            {date}
          </Text>
        </YStack>
      </YStack>
    </Link>
  );
}
