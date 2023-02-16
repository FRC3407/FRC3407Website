import Layout from "@components/layout";
import Button from "@mui/material/Button";
import styles from "styles/pages/Auth.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import Loading from "@components/loading";

export default function SignOut() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") return <Loading />;

  if (status === "unauthenticated") {
    router.push("./signin");
    return null;
  }

  return (
    <Layout title="Sign Out">
      <div className={styles.signout}>
        <h1>Sign Out</h1>
        <p>You will be signed out of all pages, your progress will be saved</p>
        <Button
          variant="contained"
          className={styles.signOutButton}
          onClick={async () => {
            await signOut({
              callbackUrl: "/",
            });
          }}
        >
          Sign Out
        </Button>
      </div>
    </Layout>
  );
}
