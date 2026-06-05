import { Chip, ChipVariant } from "@/components";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { fonts, radii } from "@/theme/tokens";
import { useThemeTokens } from "@/theme/useThemeTokens";
import { ArrowLeft } from "@tamagui/lucide-icons";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Image, Text, XStack, YStack } from "tamagui";
import { MarkdownView } from "./MarkdownView";

export type BlogDetailScreenProps = {
  title: string;
  description: string;
  image: string;
  caption: string;
  content: string;
  date: string;
  category?: string | null;
};

const categoryVariantMap: Record<string, ChipVariant> = {
  Product: "product",
  Engineering: "engineering",
  Leadership: "leadership",
  Business: "business",
  Career: "career",
};

export function BlogDetailScreen({
  title,
  description,
  image,
  date,
  caption,
  content,
  category,
}: BlogDetailScreenProps) {
  const { bg, border, text, textMuted, accent } = useThemeTokens();
  const cat = category ?? "Engineering";
  const chipVariant: ChipVariant = categoryVariantMap[cat] ?? "engineering";

  return (
    <>
      <Head>
        <title>{`${title} | M. Nindra Zaka`}</title>
        <meta name="description" content={description} />
        <link rel="preload" as="image" href={image} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
      <YStack backgroundColor={bg} minHeight="100vh">
        <Navbar />

        {/* Article reading column — max 720 px, centered */}
        <YStack
          flex={1}
          maxWidth={720}
          alignSelf="center"
          width="100%"
          paddingHorizontal="$6"
          paddingVertical="$10"
          gap="$8"
        >
          {/* Back link */}
          <Link href="/writing" style={{ textDecoration: "none" }}>
            <XStack alignItems="center" gap="$2" cursor="pointer">
              <ArrowLeft size={16} color={textMuted} />
              <Text
                fontSize={14}
                color={textMuted}
                fontWeight="500"
                hoverStyle={{ color: accent }}
              >
                Back to writing
              </Text>
            </XStack>
          </Link>

          {/* Title + meta block */}
          <YStack gap="$4">
            <Chip label={cat} variant={chipVariant} size="sm" />
            <Text
              style={{ fontFamily: fonts.display }}
              fontSize={40}
              fontWeight="700"
              color={text}
              lineHeight={52}
              $sm={{ fontSize: 28, lineHeight: 38 }}
            >
              {title}
            </Text>
            <Text fontSize={13} color={textMuted} letterSpacing={0.3}>
              {date}
            </Text>
          </YStack>

          {/* Hero image + caption */}
          <YStack gap="$3">
            <Image
              source={{ uri: image }}
              defaultSource={{ uri: image }}
              aspectRatio={2 / 1}
              width="100%"
              alt={title}
              borderRadius={radii.card}
            />
            <YStack paddingHorizontal="$1">
              <MarkdownView content={caption} />
            </YStack>
          </YStack>

          {/* Article body */}
          <YStack borderTopWidth={1} borderTopColor={border} paddingTop="$8">
            <MarkdownView content={content} />
          </YStack>
        </YStack>

        <Footer />
      </YStack>
    </>
  );
}
