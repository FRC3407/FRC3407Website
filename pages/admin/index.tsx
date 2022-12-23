import Layout from "../../components/layout";
import type { IAuthOptions } from "../../types/component";

const auth: IAuthOptions = {
  accessLevel: "admin",
};

function AdminPage() {
  return (
    <Layout title="admin">
      <div>
        <h1>admin</h1>
      </div>
    </Layout>
  );
}

AdminPage.auth = auth;

export default AdminPage;
export const adminAuth = auth;
