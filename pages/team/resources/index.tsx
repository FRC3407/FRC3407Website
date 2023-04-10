import Layout from "@components/layout";
import { GetStaticProps } from "next";
import { FileTypeIcons } from "util/images";
import getResources from "util/resources";
import styles from "styles/pages/Resources.module.scss";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";

export default function Resources({ resources }: { [key: string]: any[] }) {
  return (
    <Layout title="Team Resources" ignoreStandardContentStyle>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Team Resources</h1>
        <div className={styles.resources}>
          {resources.map((val, index) => (
            <div key={index} className={styles.resource}>
              <h1>
                {FileTypeIcons[val.type as "pdf"] ?? FileTypeIcons.default}
              </h1>
              <h3>
                {typeof val.url === "string" ||
                ((val.meta?.link ?? true) && val.meta?.link !== "false") ? (
                  <Link
                    target={"_blank"}
                    href={val.url ?? `/static/resources/${val.file}`}
                  >
                    {val.title ?? val.url ?? val.file}
                  </Link>
                ) : (
                  val.file
                )}
              </h3>
              {(val.meta?.download ?? true) &&
              val.meta?.download !== "false" &&
              typeof val.url !== "string" ? (
                <h3 className={styles.download}>
                  <Link
                    className={styles.download}
                    target={"_blank"}
                    href={`/static/resources/${val.file}`}
                    download
                  >
                    <DownloadIcon />
                  </Link>
                </h3>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //const resources = await getResources();

  return {
    props: {
      resources: [],
    },
  };
};
