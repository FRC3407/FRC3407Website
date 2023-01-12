import Calendar from "@components/calendar";
import DynamicGallery from "@components/dynamicImgGallery";
import Layout from "@components/layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import getImages from "@components/dynamicImgGallery/import";

export default function BradysTestWorld({
  paths,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(paths)
  return (
    <Layout title="Brady's Test World">
      <h1 className="centeredText">Brady&apos;s Test World</h1>
      <p>This page is just for testing, you can ignore it</p>

      <h1>Active Tests: </h1>

      <h2>Calendar:</h2>
      <Calendar />

      <h2>Dynamic Picture Loader</h2>
      <DynamicGallery images={paths} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      paths: await getImages("gallery"),
    },
  };
};
