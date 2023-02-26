import Layout from "@components/layout";
import Link from "next/link";
import { IAuthOptions } from "types/component";

const auth: IAuthOptions = {
  accessLevel: "tm",
};

function TeamDashboard() {
  return (
    <Layout title="Team Dashboard" ignoreStandardContentStyle>
      <h1>Team Dashboard</h1>
      <Link href="/team/resources">Team Resources</Link>
      <Link href="/members/customize">Customize your Profile</Link>
    </Layout>
  );
}

TeamDashboard.auth = auth;

export default TeamDashboard;
export const TeamAuth = auth;
