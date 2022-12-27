import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { getUrl } from "util/url";
import { DeveloperAuth } from ".";
import Layout from "../../components/layout";
import useSWR from "swr";
import { getReports } from "../../db/metrics";
import { IReport } from "../../types/metrics";
import { domainRegex } from "../../util/regex";
//import { getReports } from "../../db/metrics"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DevTools() {
  const { data, error } = useSWR<IReport[]>("/api/metrics", fetcher);

  if (error) {
    return <h1>{error}</h1>;
  }

  if (!data) {
    return <h1>loading</h1>;
  }

  return (
    <Layout title="Developer Tools">
      <h1>Developer Tools</h1>
      {data.map((report, index) => (
        <h1 key={index}>{report.id}</h1>
      ))}
    </Layout>
  );
}

DevTools.auth = DeveloperAuth;

export default DevTools;
