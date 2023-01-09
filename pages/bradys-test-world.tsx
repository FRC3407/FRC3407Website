import Calendar from "@components/calendar";
import DynamicGallery from "@components/dynamicImgGallery";
import importImages from "@components/dynamicImgGallery/import";
import Layout from "@components/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import * as fs from "fs/promises";
import * as fss from "fs";
import path from "path";
import getConfig from "next/config";
import getImages from "@components/dynamicImgGallery/import";
const config = getConfig();

export default function BradysTestWorld({
  paths,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(paths);
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

  // console.log();
  

  return {
    props: {
      paths: await getImages("gallery"),
    },
  };
};

const tryCatch = (callback: Function, ...params: any[]) => {
  try {
    return callback(...params);
  } catch (error) {
    return null;
  }
};
