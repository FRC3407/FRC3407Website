import Calendar from "@components/calendar";
import DynamicGallery from "@components/dynamicImgGallery";
import importImages from "@components/dynamicImgGallery/import";
import Layout from "@components/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import * as fs from "fs/promises"
import path from "path";

export default function BradysTestWorld({ log }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(log)
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

export const getServerSideProps: GetServerSideProps<{ log: string[] }> = async () => {
  // const images = await importImages("gallery");

  // console.log(images)

  return {
    props: {
      log: await fs.readdir(path.join(process.cwd(), ".next", "routes-manifest.json"))
    },
  };
};
