import Layout from "../../components/layout";
import { IAuthOptions } from "../../types/component";

const auth: IAuthOptions = {
  accessLevel: "tm",
};

function TeamDashboard() {
  return (
    <Layout title="Team Dashboard">
      <h1>Team Dashboard</h1>
    </Layout>
  );
}

TeamDashboard.auth = auth;

export default TeamDashboard;
export const TeamAuth = auth;
