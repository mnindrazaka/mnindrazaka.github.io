import React from "react";
import Head from "next/head";
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
import { Target, Building2, Layers, Zap, Users } from "@tamagui/lucide-icons";

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
        "From database schema to pixel-perfect UI to CI/CD pipeline — I ship the whole thing.",
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
    <>
      <Head>
        <title>M. Nindra Zaka — Software Engineer &amp; Founder</title>
        <meta
          name="description"
          content="Building products, businesses, and communities that create real impact. Software Engineer open to remote opportunities at US/EU startups."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="M. Nindra Zaka — Software Engineer & Founder"
        />
        <meta
          property="og:description"
          content="Building products, businesses, and communities that create real impact. Software Engineer open to remote opportunities."
        />
        <meta property="og:image" content="/og/home.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mnindrazaka" />
        <meta
          name="twitter:title"
          content="M. Nindra Zaka — Software Engineer & Founder"
        />
        <meta
          name="twitter:description"
          content="Building products, businesses, and communities that create real impact."
        />
        <meta name="twitter:image" content="/og/home.svg" />
      </Head>
      <YStack>
        <Navbar />

        <Hero />

        {/* What I've Built */}
        <Section id="what-ive-built" backgroundColor={surface}>
          <SectionHeader kicker="PROJECTS" title="What I've Built" />
          <XStack flexWrap="wrap" gap="$5">
            <ProjectCard
              category="Business"
              categoryVariant="business"
              title="Gatherloop Cafe & Board Game"
              subtitle="A board game cafe that brings people together through the joy of tabletop gaming"
              description="Gatherloop started as a passion for bringing people together evolved into a board game cafe serving a growing community of customers. As the founder, I handled everything from business strategy and operations to marketing, events, and customer experience while continuously improving the business through experimentation and data-driven decisions."
              imageSource="/images/gatherloop.jpg"
              imageAlt="Gatherloop café"
              stats={[
                { value: "100+", label: "Daily Customers" },
                { value: "100+", label: "Board Games" },
                { value: "3+", label: "Years Operating" },
              ]}
              ctaLabel="Read the story"
              ctaHref="/business"
            />
            <ProjectCard
              category="Product"
              categoryVariant="product"
              title="Point Of Sale"
              subtitle="Built for my board game cafe - A POS that can track customer playtime and other daily operations"
              description="I designed and built a full-featured Point of Sale system from scratch to run Gatherloop's daily operations. Sales, inventory, expenses, financial reports — all in one product, built in-house."
              imageSource="/images/pos.png"
              imageAlt="POS System mockup"
              stats={[
                { value: "18.000+", label: "Transactions" },
                { value: "Web & Mobile", label: "Platform Support" },
                { value: "3+", label: "Years In Use" },
              ]}
              ctaLabel="Explore the case study"
              ctaHref="/pos-system"
            />
          </XStack>
        </Section>

        {/* Latest Writing */}
        <Section backgroundColor={bg}>
          <SectionHeader
            kicker="ARTICLES"
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

        {/* Why founders hire me */}
        <Section backgroundColor={bg}>
          <SectionHeader kicker="SKILLS" title="Why founders hire me" />
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

        {/* CTA Banner */}
        <CTABanner />

        <Footer />
      </YStack>
    </>
  );
}
