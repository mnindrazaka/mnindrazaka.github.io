import React from "react";
import { Post } from "@/components";
import { XStack, YStack } from "tamagui";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { IconStat } from "@/components/IconStat";
import { ProjectCard } from "@/components/ProjectCard";
import { PostCard } from "@/components/PostCard";
import { CTABanner } from "@/components/CTABanner";
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

export function HomeScreen(props: HomeScreenProps) {
  const { bg, surface, accent } = useThemeTokens();

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

      {/* What I've Built */}
      <Section id="what-ive-built" backgroundColor={surface}>
        <SectionHeader kicker="WHAT I'VE BUILT" title="What I've Built" />
        <XStack flexWrap="wrap" gap="$5">
          <ProjectCard
            category="Business"
            categoryVariant="business"
            title="Building Gatherloop"
            subtitle="Turning a personal vision into a thriving community café and event space."
            description="Gatherloop started as a dream to create a space where people could gather, connect, and grow. I built and ran the business end-to-end — from operations and finance to marketing and community building."
            imageSource="/images/hero.png"
            imageAlt="Gatherloop café"
            stats={[
              { value: "Since 2022", label: "Founded" },
              { value: "1,000+", label: "Members" },
              { value: "50+", label: "Events" },
              { value: "∞", label: "Memories" },
            ]}
            ctaLabel="Read the story"
            ctaHref="/business"
          />
          <ProjectCard
            category="Product"
            categoryVariant="product"
            title="Custom POS System"
            subtitle="Built for my own business — because no off-the-shelf tool did the job."
            description="I designed and built a full-featured Point of Sale system from scratch to run Gatherloop's daily operations. Sales, inventory, expenses, financial reports — all in one product, built in-house."
            imageSource="/images/point-of-sale.png"
            imageAlt="POS System mockup"
            stats={[
              { value: "1", label: "Product" },
              { value: "Daily", label: "In Use" },
              { value: "100%", label: "Built In-House" },
              { value: "Always", label: "Improving" },
            ]}
            ctaLabel="Explore the case study"
            ctaHref="/pos-system"
          />
        </XStack>
      </Section>

      {/* Latest Writing */}
      <Section backgroundColor={bg}>
        <SectionHeader
          kicker="LATEST WRITING"
          title="Latest Writing"
          viewAllHref="/writing"
          viewAllLabel="View all articles →"
        />
        <XStack flexWrap="wrap" gap="$4" rowGap="$5">
          {props.posts.slice(0, 4).map((post) => (
            <YStack
              key={post.href}
              flexBasis="100%"
              $gtXs={{ flexBasis: "48%" }}
              $gtMd={{ flex: 1, flexBasis: 0 }}
            >
              <PostCard {...post} />
            </YStack>
          ))}
        </XStack>
      </Section>

      {/* CTA Banner */}
      <CTABanner />

      <Footer />
    </YStack>
  );
}
