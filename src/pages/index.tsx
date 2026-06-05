import { HomeScreen, HomeScreenProps } from "@/screens";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const getStaticProps: GetStaticProps<HomeScreenProps> = async () => {
  const fileNames = fs.readdirSync(path.resolve("src", "contents"));

  const posts: HomeScreenProps["posts"] = [];

  for (const fileName of fileNames) {
    const content = await import(`../contents/${fileName}`);
    const meta = matter(content.default);

    posts.push({
      title: meta.data.title,
      description: meta.data.description,
      href: `/blog/${fileName.replace(".md", "")}`,
      imageUrl: meta.data.image,
      date: new Date(meta.data.date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: meta.data.category ?? "Engineering",
    });
  }

  return {
    props: {
      posts: posts.sort(
        (prevPost, nextPost) =>
          new Date(nextPost.date).getTime() - new Date(prevPost.date).getTime()
      ),
    },
  };
};

export default HomeScreen;
