import Link from "next/link";
import Layout from "../../components/layout";
import { IAuthOptions } from "../../types/component";

const auth: IAuthOptions = {
  accessLevel: ["dev", "adm"],
};

function DeveloperDashboard() {
  return (
    <Layout title="Developer Dashboard">
      <h1>Developer Dashboard</h1>
      <Link href={"/developer/documentation"}>Website Documentation</Link>
      <br />
      <Link href={"https://nextjs.org/docs"}>Next.JS Documentation</Link>
    </Layout>
  );
}

DeveloperDashboard.auth = auth;

export default DeveloperDashboard;
export const DeveloperAuth = auth;
