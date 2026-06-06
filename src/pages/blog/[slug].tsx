import { GetStaticPaths, GetStaticProps } from "next";
import { BlogDetailScreen, BlogDetailScreenProps } from "@/screens";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const fileNames = fs.readdirSync(path.resolve("src", "contents"));
  return {
    paths: fileNames.map((fileName) => ({
      params: { slug: fileName.replace(".md", "") },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  BlogDetailScreenProps,
  Params
> = async (context) => {
  const content = await import(`../../contents/${context.params?.slug}.md`);
  const meta = matter(content.default);
  return {
    props: {
      content: meta.content,
      caption: meta.data.caption,
      image: meta.data.image,
      title: meta.data.title,
      description: meta.data.description,
      category: meta.data.category ?? null,
      date: new Date(meta.data.date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
  };
};

export default BlogDetailScreen;
