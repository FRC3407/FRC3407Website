import Calendar from "@components/calendar";
import DynamicGallery from "@components/dynamicImgGallery";
import importImages from "@components/dynamicImgGallery/import";
import Layout from "@components/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import * as fs from "fs/promises"
import * as fss from "fs"
import path from "path";

export default function BradysTestWorld({ log, fpath }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(log, fpath)
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

export const getServerSideProps: GetServerSideProps = async () => {
  // const images = await importImages("gallery");

  // console.log(images)

  return {
    props: {
      log: (await fs.readdir(path.join(process.cwd(), ".next"))).map(fpath => {

        if (fpath.includes(".")) return fpath

        try {
          return fss.readdirSync(path.join(process.cwd(), ".next", fpath))
        } catch (err) {
          console.log(err)
        }
      }),
      paths: (await fs.readdir(path.join(process.cwd(), ".next")))
    },
  };
};
