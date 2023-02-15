import Layout from "@components/layout";
import Button from "@mui/material/Button"
import styles from "styles/pages/Auth.module.scss"
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Layout title="Sign Out">
      <div className={styles.signout}>
        <h1>Sign Out</h1>
        <Button variant="contained" onClick={async () => {
          await signOut({
            callbackUrl: "/"
          })
        }}>Sign Out</Button>
      </div>
    </Layout>
  );
}
