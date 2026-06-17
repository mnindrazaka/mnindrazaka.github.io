import React from "react";
import { Anchor, Image, Text, XStack, YStack } from "tamagui";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts, radii } from "@/theme/tokens";
import { Chip, ChipVariant } from "@/components/Chip";

export type ProjectStat = {
  value: string;
  label: string;
};

export type ProjectCardProps = {
  category: string;
  categoryVariant?: ChipVariant;
  title: string;
  subtitle: string;
  description: string;
  imageSource: string;
  imageAlt?: string;
  stats: ProjectStat[];
  ctaLabel: string;
  ctaHref: string;
};

export function ProjectCard({
  category,
  categoryVariant = "default",
  title,
  subtitle,
  description,
  imageSource,
  imageAlt = "",
  stats,
  ctaLabel,
  ctaHref,
}: ProjectCardProps) {
  const { surface, border, text, textMuted, accent } = useThemeTokens();

  return (
    <YStack
      flex={1}
      flexBasis="100%"
      $gtSm={{ flexBasis: "48%" }}
      backgroundColor={surface}
      borderRadius={radii.card}
      borderWidth={1}
      borderColor={border}
      overflow="hidden"
    >
      {/* Card image */}
      <YStack height={360} $sm={{ height: 200 }} overflow="hidden">
        <Image
          source={{ uri: imageSource }}
          alt={imageAlt}
          width="100%"
          height="100%"
          resizeMode="cover"
        />
      </YStack>

      {/* Card content */}
      <YStack padding="$6" gap="$4" flex={1} justifyContent="space-between">
        <YStack gap="$4">
          <Chip label={category} variant={categoryVariant} />

          <YStack gap="$2">
            <Text
              style={{ fontFamily: fonts.display }}
              fontSize={26}
              fontWeight="700"
              color={text}
              lineHeight={34}
              $sm={{ fontSize: 22, lineHeight: 30 }}
            >
              {title}
            </Text>
            <Text fontSize={15} color={textMuted} lineHeight={24}>
              {subtitle}
            </Text>
          </YStack>

          <Text fontSize={15} color={textMuted} lineHeight={24}>
            {description}
          </Text>
        </YStack>

        <YStack gap="$4">
          {/* Stat row */}
          <XStack
            borderTopWidth={1}
            borderTopColor={border}
            paddingTop="$4"
            flexWrap="wrap"
            gap="$0"
          >
            {stats.map((stat, i) => (
              <XStack
                key={stat.label}
                alignItems="stretch"
                flex={1}
                minWidth={80}
              >
                {i > 0 && (
                  <YStack
                    width={1}
                    backgroundColor={border}
                    marginHorizontal="$0"
                    alignSelf="stretch"
                  />
                )}
                <YStack
                  flex={1}
                  alignItems="center"
                  gap="$1"
                  paddingHorizontal="$2"
                >
                  <Text
                    style={{ fontFamily: fonts.display }}
                    fontSize={17}
                    fontWeight="700"
                    color={text}
                    lineHeight={24}
                    textAlign="center"
                  >
                    {stat.value}
                  </Text>
                  <Text
                    fontSize={11}
                    color={textMuted}
                    textAlign="center"
                    lineHeight={16}
                  >
                    {stat.label}
                  </Text>
                </YStack>
              </XStack>
            ))}
          </XStack>

          {/* CTA */}
          <Anchor href={ctaHref} textDecorationLine="none" marginTop="$2">
            <Text
              color={accent}
              fontSize={14}
              fontWeight="600"
              cursor="pointer"
              hoverStyle={{ opacity: 0.75 }}
            >
              {ctaLabel} →
            </Text>
          </Anchor>
        </YStack>
      </YStack>
    </YStack>
  );
}
