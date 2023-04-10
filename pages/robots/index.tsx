import Layout from "@components/layout";
import getMD, { getMDFiles } from "@components/markUpFileInitalRenderer/import";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import styles from "styles/pages/Robots.module.scss";
import Image from "next/image";

export default function Robots({
  files,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Our Robots">
      <h1>Our Robots</h1>
      {files.map((robot) => (
        <div key={robot.meta["robot-id"]} className={styles.robotPreview}>
          <Image
            src={robot.meta.icon}
            alt={robot.meta.title}
            height={128}
            width={128}
            priority
          />
          <div className={styles.metaDataContainer}>
            <h4 className={styles.robotTitle}>{robot.meta.title}</h4>
            <p className={styles.robotYear}>
              The robot for the {robot.meta.year} season
            </p>
            <p className={styles.robotDescription}>{robot.meta.description}</p>
          </div>
        </div>
      ))}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{
  files: { meta: { [key: string]: any } }[];
}> = async (context) => {
  return {
    props: {
      files: await Promise.all(
        (
          await getMDFiles("robots")
        ).map(async (val) => await getMD(`robots/${val}`, true))
      ),
    },
  };
};
