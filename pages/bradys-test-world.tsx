import Calendar from "@components/calendar";
import DynamicGallery from "@components/dynamicImgGallery";
import importImages from "@components/dynamicImgGallery/import";
import Layout from "@components/layout";
import { GetServerSideProps } from "next";

export default function BradysTestWorld() {
  return (
    <Layout title="Brady's Test World">
      <h1 className="centeredText">Brady&apos;s Test World</h1>
      <p>This page is just for testing, you can ignore it</p>

      <h1>Active Tests: </h1>

      <h2>Calendar:</h2>
      <Calendar />

      <h2>Dynamic Picture Loader</h2>
      <DynamicGallery />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  await importImages();

  return {
    props: {},
  };
};
