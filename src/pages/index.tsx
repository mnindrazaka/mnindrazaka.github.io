import { LandingScreen, LandingScreenProps } from "@/screens";
import { GetStaticProps } from "next";
import { fetchSubstackPosts } from "@/lib/substack";

export const getStaticProps: GetStaticProps<LandingScreenProps> = async () => {
  const posts = await fetchSubstackPosts();

  return {
    props: {
      posts: posts.map(({ title, href, date }) => ({ title, href, date })),
    },
  };
};

export default LandingScreen;
