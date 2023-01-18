import Layout from "../../components/layout";
import { IAuthOptions } from "../../types/component";

const auth: IAuthOptions = {
  accessLevel: ["dev", "adm"],
};

function DeveloperDashboard() {
  return (
    <Layout title="Developer Dashboard">
      <h1>Dev Page</h1>
    </Layout>
  );
}

DeveloperDashboard.auth = auth;

export default DeveloperDashboard;
export const DeveloperAuth = auth;
