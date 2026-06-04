import React from "react";
import { Post } from "@/components";
import dynamic from "next/dynamic";
import { YStack } from "tamagui";
import { useRouter } from "next/router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Footer } from "@/components/site/Footer";

export type HomeScreenProps = {
  posts: Post[];
};

const Features = dynamic(() => import("tamakit").then((mod) => mod.Features), {
  ssr: false,
});

const Portfolio = dynamic(
  () => import("tamakit").then((mod) => mod.Portfolio),
  { ssr: false }
);

const Blog = dynamic(() => import("tamakit").then((mod) => mod.Blog), {
  ssr: false,
});

const TestimonialCentered = dynamic(
  () => import("tamakit").then((mod) => mod.TestimonialCentered),
  { ssr: false }
);

const PageHeader = dynamic(
  () => import("tamakit").then((mod) => mod.PageHeader),
  { ssr: false }
);

export function HomeScreen(props: HomeScreenProps) {
  const router = useRouter();
  return (
    <YStack>
      <Navbar />

      <Hero />

      {/* Legacy sections — to be replaced in later phases */}
      <YStack marginVertical="$10" gap="$10" paddingHorizontal="$4">
        <YStack id="skills">
          <Features
            title="My Skills"
            subtitle="Unlock your product potential with my comprehensive skills"
            items={[
              {
                title: "Frontend Development",
                subtitle:
                  "I excel in frontend development, creating scalable, maintainable, and intuitive web applications. With deep expertise in React, TypeScript, and Next.js, I focus on building responsive, high-performance interfaces that deliver exceptional user experiences.",
                imageSource: "/images/frontend.png",
              },
              {
                title: "Backend Development",
                subtitle:
                  "I have experience in backend development, building reliable and efficient server-side applications using Node.js and Go (Golang). I design and implement scalable APIs, optimize database interactions, and ensure seamless integration with frontend systems.",
                imageSource: "/images/backend.png",
              },
              {
                title: "Mobile Development",
                subtitle:
                  "I have expertise in mobile development, creating cross-platform applications with React Native and native Android apps using Java and Kotlin. I focus on delivering seamless user experiences with responsive interfaces and high-performance functionality.",
                imageSource: "/images/mobile.png",
              },
              {
                title: "Infrastructure",
                subtitle:
                  "I specialize in infrastructure management, including VPS, Linux, Git, Docker, and Kubernetes. I implement CI/CD pipelines to automate build, test, and deployment processes, ensuring efficient and reliable software delivery.",
                imageSource: "/images/infra.png",
              },
              {
                title: "Automated Testing",
                subtitle:
                  "I specialize in implementing automated testing for both frontend and backend applications. Using tools like Jest, React Testing Library, Cypress, and others, I ensure robust test coverage and maintain high-quality code.",
                imageSource: "/images/testing.png",
              },
              {
                title: "Clean Architecture",
                subtitle:
                  "I have expertise in implementing clean architecture for both frontend and backend applications. By structuring code into well-defined layers, I ensure scalability, maintainability, and ease of testing.",
                imageSource: "/images/clean-architecture.png",
              },
            ]}
          />
        </YStack>

        <YStack
          id="testimony"
          backgroundColor="$background"
          themeInverse
          position="relative"
          padding="$8"
          borderRadius="$5"
        >
          <PageHeader
            title="Testimony"
            subtitle="What People Say About Me"
            align="center"
          />
          <TestimonialCentered
            items={[
              {
                name: "Andri Purnomo",
                role: "Product Engineer at Zero One Group",
                content: `M. Nindra Zaka is an outstanding senior software engineer with exceptional frontend expertise. His clean, scalable code and creative problem-solving set him apart. A collaborative team player and great communicator, he consistently delivers high-quality solutions. I highly recommend him as a valuable asset to any company.`,
                logoImageSource:
                  "https://media.licdn.com/dms/image/v2/C510BAQHXNqgau7arKw/company-logo_200_200/company-logo_200_200/0/1630577608047?e=1740614400&v=beta&t=mgc9Iu6xb2TAXKFg0KDPFa67ckBh04aVtrG6RR8m9bI",
                profileImageSource:
                  "https://media.licdn.com/dms/image/v2/C4E03AQEQcZZxvFnUAg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1636299414406?e=1738195200&v=beta&t=wKd2wj8DiUA85DvfeAYr25EpxjKb-wjoRUX48jnOqQk",
              },
              {
                name: "Danny Dwi Cahyono",
                role: "Software Engineer at Hijra",
                content:
                  "M. Nindra Zaka (Aka) is a rare Senior Frontend Engineer who excels in technical expertise, mentorship, and leadership. His deep frontend knowledge impressed me, especially on projects like Skill Academy's shift to Next.js and managing HTTP Caching with the DevOps team. Aka's patient guidance, clear explanations, and ability to inspire others make him an exceptional mentor and team leader. Working with him has been an honor and a privilege.",
                logoImageSource:
                  "https://media.licdn.com/dms/image/v2/C560BAQEPugKXQMXE-w/company-logo_200_200/company-logo_200_200/0/1671620967302/hijrabyalamigroup_logo?e=1740614400&v=beta&t=TGNTwsyeHTQxca_UcsVQwEiO1UYxbPz_JDMZzPAtr58",
                profileImageSource:
                  "https://media.licdn.com/dms/image/v2/D5603AQEvsPZGhaPNDQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723091306568?e=1738195200&v=beta&t=l_GDkKXGVeoyML98QECqpc_vzkg7E0MJWWYOz6LaeGY",
              },
              {
                name: "Aditya Putra",
                role: "Frontend Engineer at Deloitte",
                content:
                  "I had the pleasure of working with M. Nindra Zaka as Lead Frontend Engineer, where his technical expertise, leadership, and dedication stood out. He solves complex problems while delivering scalable, user-friendly interfaces. A proactive and inspiring team player, Nindra is highly recommended for any challenging frontend role.",
                logoImageSource:
                  "https://media.licdn.com/dms/image/v2/C560BAQGNtpblgQpJoQ/company-logo_200_200/company-logo_200_200/0/1662120928214/deloitte_logo?e=1740614400&v=beta&t=D48dHdNYwQgILFyAf0wTW6JBgrAiRaxogcw2-O2EUbA",
                profileImageSource:
                  "https://media.licdn.com/dms/image/v2/D5603AQHbiI5udw8v5w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727686280821?e=1738195200&v=beta&t=aeqno94pfmkLzNcSo8LsYSGI91jz9W49tckEDm0Ys",
              },
            ]}
          />
        </YStack>

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
