import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getUrl } from "util/url";
import { DeveloperAuth } from ".";
import Layout from "../../components/layout";
import { getReports } from "../../db/metrics";
import { IReport } from "../../types/metrics";
import { domainRegex } from "../../util/regex";
//import { getReports } from "../../db/metrics"

function DevTools({
  reports,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout title="Developer Tools">
      <h1>Developer Tools</h1>
      {reports.map((report, index) => (
        <h1 key={index}>{report.id}</h1>
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<{
  reports: IReport[];
}> = async (content) => {
  const reports = getReports();

  console.log(reports);

  return {
    props: {
      reports,
    },
  };
};

DevTools.auth = DeveloperAuth;

export default DevTools;
