import Link from "next/link";
import React from "react";
import { H3, H5, Image, YStack, YStackProps } from "tamagui";

export type Post = {
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  date: string;
  category?: string;
};

export type BlogCardProps = Post & YStackProps;

export function BlogCard({
  href,
  imageUrl,
  title,
  date,
  ...yStackProps
}: BlogCardProps) {
  return (
    <YStack {...yStackProps}>
      <Link href={href} style={{ textDecoration: "none" }}>
        <YStack space="$3">
          <Image
            source={{ uri: imageUrl }}
            defaultSource={{ uri: imageUrl }}
            aspectRatio={1}
            width="100%"
            height="100%"
            alt={title}
            borderRadius="$5"
          />
          <H5 flex={1} textAlign="center" $gtXs={{ textAlign: "left" }}>
            {date}
          </H5>
          <H3 textAlign="center" $gtXs={{ textAlign: "left" }}>
            {title}
          </H3>
        </YStack>
      </Link>
    </YStack>
  );
}
