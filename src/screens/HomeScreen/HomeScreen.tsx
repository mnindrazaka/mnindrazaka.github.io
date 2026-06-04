import React from "react";
import { Post } from "@/components";
import dynamic from "next/dynamic";
import { XStack, YStack } from "tamagui";
import { useRouter } from "next/router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { IconStat } from "@/components/IconStat";
import { useThemeTokens } from "@/theme/useThemeTokens";
import {
  Target,
  Building2,
  Layers,
  Zap,
  Users,
} from "@tamagui/lucide-icons";

export type HomeScreenProps = {
  posts: Post[];
};

const Portfolio = dynamic(
  () => import("tamakit").then((mod) => mod.Portfolio),
  { ssr: false }
);

const Blog = dynamic(() => import("tamakit").then((mod) => mod.Blog), {
  ssr: false,
});

export function HomeScreen(props: HomeScreenProps) {
  const router = useRouter();
  const { bg, accent } = useThemeTokens();

  const whyHireStats = [
    {
      icon: <Target size={20} color={accent} />,
      title: "Product Mindset",
      description:
        "I don't just implement specs — I ask why. I've owned products end-to-end and understand what makes features worth building.",
    },
    {
      icon: <Building2 size={20} color={accent} />,
      title: "Business Experience",
      description:
        "I've run a real business (Gatherloop), handling operations, finance, and marketing. That context shapes every technical decision I make.",
    },
    {
      icon: <Layers size={20} color={accent} />,
      title: "Full-Stack Ownership",
      description:
        "From database schema to pixel-perfect UI to CI/CD pipeline — I ship the whole thing. No handoffs, no silos.",
    },
    {
      icon: <Zap size={20} color={accent} />,
      title: "Move Fast & Iterate",
      description:
        "I've built and deployed real products under real constraints. I know how to ship fast without accumulating paralyzing debt.",
    },
    {
      icon: <Users size={20} color={accent} />,
      title: "Lead & Mentor",
      description:
        "I've led engineering teams, run code reviews, and mentored juniors. I make teams better, not just codebases.",
    },
  ];

  return (
    <YStack>
      <Navbar />

      <Hero />

      {/* Why founders hire me */}
      <Section backgroundColor={bg}>
        <SectionHeader
          kicker="WHY FOUNDERS HIRE ME"
          title="Why founders hire me"
        />
        <XStack flexWrap="wrap" gap="$4" rowGap="$8">
          {whyHireStats.map((stat) => (
            <YStack
              key={stat.title}
              flexBasis="100%"
              $gtXs={{ flexBasis: "48%" }}
              $gtSm={{ flexBasis: "31%" }}
              $gtMd={{ flex: 1, flexBasis: 0 }}
            >
              <IconStat
                icon={stat.icon}
                title={stat.title}
                description={stat.description}
              />
            </YStack>
          ))}
        </XStack>
      </Section>

      {/* Legacy sections — to be replaced in later phases */}
      <YStack marginVertical="$10" gap="$10" paddingHorizontal="$4">
        <YStack id="portfolio">
          <Portfolio
            title="Portfolio"
            subtitle="Explore my collection of projects that showcase my expertise in web development."
            items={[
              {
                title: "Point Of Sale",
                content:
                  "A custom Point of Sale (POS) system tailored for a coffee shop, supporting both web and mobile platforms, handles essential functions such as registering new menu items and recording customer transactions. It automates cost and profit calculations, streamlining financial management by allocating budgets for operational expenses, food costs, and profits, delivering a comprehensive and efficient solution for business operations.",
                imageSource: "/images/point-of-sale.png",
                onPress: () =>
                  router.push("https://github.com/gatherloop/gatherloop-pos"),
              },
              {
                title: "Tamakit",
                content:
                  "Tamakit, a UI kit powered by React Native Web and built with Tamagui, streamlines universal development for web and mobile by providing reusable, high-performance components from a single codebase. With a focus on consistency and scalability, it enables developers to efficiently build seamless, cross-platform applications while maintaining a unified codebase.",
                imageSource: "/images/tamakit.png",
                onPress: () =>
                  router.push("https://github.com/mnindrazaka/tamakit"),
              },
            ]}
          />
        </YStack>

        <YStack id="blog">
          <Blog
            title="Blog Posts"
            subtitle="Explore My Technical Blog for Insightful Reads"
            items={props.posts.map(
              ({ title, date, description, href, imageUrl }) => ({
                title,
                content: description,
                imageSource: imageUrl,
                categoryName: "Software Development",
                author: {
                  name: "M. Nindra Zaka",
                  imageSource: "/images/profile.jpg",
                },
                publishedAt: date,
                onPress: () => router.push(href),
              })
            )}
          />
        </YStack>
      </YStack>

      <Footer />
    </YStack>
  );
}
