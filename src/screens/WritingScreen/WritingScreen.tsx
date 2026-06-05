import React, { useState } from "react";
import Link from "next/link";
import { Image, Text, XStack, YStack } from "tamagui";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/Section";
import { Chip, ChipVariant } from "@/components/Chip";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { fonts, radii } from "@/theme/tokens";
import { Post } from "@/components";

export type WritingScreenProps = {
  posts: Post[];
};

const CATEGORIES = ["All", "Product", "Engineering", "Leadership", "Business", "Career"] as const;
type Category = (typeof CATEGORIES)[number];

const categoryVariantMap: Record<string, ChipVariant> = {
  Product: "product",
  Engineering: "engineering",
  Leadership: "leadership",
  Business: "business",
  Career: "career",
};

function PostRow({
  title,
  description,
  href,
  imageUrl,
  date,
  category,
}: Post) {
  const { surface, border, text, textMuted, accent } = useThemeTokens();
  const cat = category ?? "Engineering";
  const chipVariant: ChipVariant = categoryVariantMap[cat] ?? "engineering";

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <XStack
        backgroundColor={surface}
        borderRadius={radii.card}
        borderWidth={1}
        borderColor={border}
        overflow="hidden"
        cursor="pointer"
        hoverStyle={{ borderColor: accent }}
        animation="quick"
        flexDirection="row"
        $sm={{ flexDirection: "column" }}
      >
        {/* Thumbnail */}
        <YStack
          width={200}
          minHeight={160}
          flexShrink={0}
          overflow="hidden"
          alignSelf="stretch"
          $sm={{ width: "100%", height: 200, alignSelf: "flex-start" }}
        >
          <Image
            source={{ uri: imageUrl }}
            alt={title}
            width="100%"
            height="100%"
            resizeMode="cover"
          />
        </YStack>

        {/* Content */}
        <XStack
          flex={1}
          padding="$5"
          gap="$4"
          alignItems="center"
          $sm={{ flexDirection: "column", alignItems: "flex-start", gap: "$3" }}
        >
          <YStack flex={1} gap="$2">
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
            <Text fontSize={12} color={textMuted} paddingTop="$1">
              {date}
            </Text>
          </YStack>

          {/* Chip — far right on desktop, inline on mobile */}
          <YStack flexShrink={0} $sm={{ display: "flex" }}>
            <Chip label={cat} variant={chipVariant} size="sm" />
          </YStack>
        </XStack>
      </XStack>
    </Link>
  );
}

export function WritingScreen({ posts }: WritingScreenProps) {
  const { bg, surface, border, text, textMuted, accent } = useThemeTokens();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => (p.category ?? "Engineering") === activeCategory);

  return (
    <YStack>
      <Navbar />

      {/* Hero */}
      <YStack
        backgroundColor={surface}
        paddingVertical="$16"
        paddingHorizontal="$6"
        alignItems="center"
        borderBottomWidth={1}
        borderBottomColor={border}
      >
        <YStack maxWidth={680} gap="$4" alignItems="center">
          <Text
            color={accent}
            fontSize={11}
            fontWeight="700"
            letterSpacing={2}
            textTransform="uppercase"
          >
            WRITING
          </Text>
          <Text
            style={{ fontFamily: fonts.display }}
            fontSize={40}
            fontWeight="700"
            color={text}
            lineHeight={52}
            textAlign="center"
            $sm={{ fontSize: 28, lineHeight: 38 }}
          >
            Thoughts on engineering, product, business, and life
          </Text>
          <Text
            fontSize={16}
            color={textMuted}
            lineHeight={26}
            textAlign="center"
            maxWidth={500}
          >
            I write about the things I build, the lessons I learn running a
            business, and the craft of software engineering.
          </Text>
        </YStack>
      </YStack>

      {/* Filter tabs */}
      <YStack backgroundColor={bg} borderBottomWidth={1} borderBottomColor={border}>
        <YStack width="100%" maxWidth={1200} paddingHorizontal="$6" alignSelf="center">
          <XStack
            flexWrap="wrap"
            gap="$0"
            paddingTop="$1"
          >
            {CATEGORIES.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <YStack
                  key={cat}
                  paddingHorizontal="$4"
                  paddingVertical="$3"
                  cursor="pointer"
                  borderBottomWidth={2}
                  borderBottomColor={isActive ? accent : "transparent"}
                  onPress={() => setActiveCategory(cat)}
                  pressStyle={{ opacity: 0.7 }}
                >
                  <Text
                    fontSize={14}
                    fontWeight={isActive ? "700" : "500"}
                    color={isActive ? accent : textMuted}
                  >
                    {cat}
                  </Text>
                </YStack>
              );
            })}
          </XStack>
        </YStack>
      </YStack>

      {/* Post list */}
      <Section backgroundColor={bg}>
        <YStack gap="$4">
          {filtered.length === 0 ? (
            <YStack paddingVertical="$10" alignItems="center">
              <Text fontSize={15} color={textMuted}>
                No posts in this category yet.
              </Text>
            </YStack>
          ) : (
            filtered.map((post) => <PostRow key={post.href} {...post} />)
          )}
        </YStack>

        {/* Bottom link */}
        <YStack alignItems="center" paddingTop="$8">
          <Link href="#" style={{ textDecoration: "none" }}>
            <Text
              color={accent}
              fontSize={14}
              fontWeight="600"
              cursor="pointer"
            >
              View all articles →
            </Text>
          </Link>
        </YStack>
      </Section>

      <Footer />
    </YStack>
  );
}
