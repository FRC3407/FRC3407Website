import { InferGetStaticPropsType, GetStaticProps } from "next";
import getDynamicPagePosts from "@components/dynamicPagePostLoader";
import Layout from "@components/layout";
import { DeveloperAuth } from "..";
import RichButton from "@components/buttons/richButton";
import { IDynamicPagePostReturn } from "types";

export const getStaticProps: GetStaticProps<{
  reports: IDynamicPagePostReturn[];
}> = async () => {
  const pagePosts = await getDynamicPagePosts("/developer/tools");
  return {
    props: {
      reports: pagePosts,
    },
  };
};

export default function DevTools({
  reports,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Developer Tools">
      <h1 className="centeredText">Developer Tools</h1>
      <div className="">
        {reports.map((post, index) => (
          <RichButton
            title={post.name}
            description={post.description}
            href={"/developer/tools" + post.path}
            displayUrl={post.path}
            key={index}
          />
        ))}
      </div>
    </Layout>
  );
}

DevTools.auth = DeveloperAuth;
