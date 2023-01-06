import Layout from "../../components/layout";
import { IAuthOptions } from "../../types/component";

const auth: IAuthOptions = {
  accessLevel: "col",
};

function ColeadDashboard() {
  return (
    <Layout title="Colead Dashboard">
      <h1>Colead Dashboard</h1>
    </Layout>
  );
}

ColeadDashboard.auth = auth;

export default ColeadDashboard;
export const ColeadAuth = auth;
