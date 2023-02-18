import Layout from "@components/layout";
import Avatar from "@mui/material/Avatar";
import { GetStaticProps } from "next";
import { FileTypeIcons } from "util/images";
import getResources from "util/resources";
import styles from "styles/pages/Resources.module.scss"

export default function Resources({ resources }: { [key: string]: any[] }) {
  return (
    <Layout title="Team Resources" ignoreStandardContentStyle>
      <div>
        <h1>Team Resources</h1>
        <div>
          {resources.map((val, index) => 
            <div key={index} className={styles.resource}>
              <Avatar>
                {FileTypeIcons[val.type as "pdf"] ?? FileTypeIcons.default}
              </Avatar>
              <h1>{val.file}</h1>
              <h1>{val.meta?.title}</h1>
              <h1>{val.meta?.description}</h1>
          </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const resources = await getResources()

  return {
    props: {
      resources
    },
  };
};
