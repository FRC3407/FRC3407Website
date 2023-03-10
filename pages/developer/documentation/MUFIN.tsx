import CodeBlock from "@components/codeBlock";
import Layout from "@components/layout";
import Link from "next/link";

export default function MUFIN() {
  return (
    <Layout title="MUFIN System">
      <h1>The MUFIN System</h1>
      <p>
        The MUFIN (Mark Up File Inital Renderer) system is a system that
        automatically renders .md files into pages through the use of the file
        system and an .md to .html compiler.
      </p>
      <p>
        An example of the MUFIN system can be seen in the Robot Profiles (
        <Link href="/developer/documentation/robot-profiles">
          Documentation
        </Link>
        )
      </p>

      <h4>Example Usage:</h4>
      <CodeBlock lang="tsx">
        {`
// pages/documentation/[theFile].tsx
import MUFIN from "@components/markUpFileInitalRenderer";
import getMD, { getMDFiles } from "@components/markUpFileInitalRenderer/import";
import Layout from "@components/layout";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

export default function MyReallyCreativeName({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={(data.meta as { [key: string]: string }).title}>
      {/* Display the HTML fetched by getServerSideProps */}
      <MUFIN data={data} />
    </Layout>
  );
}

// Gets the markdown data (statically)
export const getStaticProps: GetStaticProps<
  { data: Awaited<ReturnType<typeof getMD>> },
  { thePage: string }
> = async (content) => {
  return {
    props: {

      // Reads the data in public/static/md/mySuperCreativeFolder/{content.params?.thePage}
      data: await getMD("mySuperCreativeFolder/" + content.params?.thePage),
    },
  };
};

// Get the static paths for prerendering
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: (await getMDFiles("mySuperCreativeFolder")).map((file) => {
      return { params: { theFile: file } };
    }),
    fallback: false,
  };
};

                `}
      </CodeBlock>
    </Layout>
  );
}
