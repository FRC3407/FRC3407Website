import { InferGetStaticPropsType, GetStaticProps } from "next";
import { IReport } from "types/metrics";
import getDynamicPagePosts from "@components/dynamicPagePostLoader";
import test from "./test";

export const getStaticProps: GetStaticProps<{ reports: any[] }> = async () => {
  const pagePosts = await getDynamicPagePosts("/developer/tools");
  console.log("here", pagePosts);
  return {
    props: {
      reports: pagePosts,
    },
  };
};

export default function DevTools({
  reports,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(reports);
  return <h1>Hello</h1>;
}
