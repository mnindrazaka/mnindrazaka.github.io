import { LandingScreen, LandingScreenProps } from "@/screens";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getStaticProps: GetStaticProps<LandingScreenProps> = async () => {
  const fileNames = fs.readdirSync(path.resolve("src", "contents"));

  const posts: { title: string; href: string; rawDate: string }[] = [];

  for (const fileName of fileNames) {
    const content = await import(`../contents/${fileName}`);
    const meta = matter(content.default);

    posts.push({
      title: meta.data.title,
      href: `/blog/${fileName.replace(".md", "")}`,
      rawDate: meta.data.date,
    });
  }

  return {
    props: {
      posts: posts
        .sort(
          (prevPost, nextPost) =>
            new Date(nextPost.rawDate).getTime() -
            new Date(prevPost.rawDate).getTime()
        )
        .map(({ title, href, rawDate }) => ({
          title,
          href,
          date: new Date(rawDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        })),
    },
  };
};

export default LandingScreen;
