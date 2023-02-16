import {
  getProviders,
  signIn,
} from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import styles from "styles/pages/Auth.module.scss";
import Button from "@mui/material/Button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import Loading from "@components/loading";

function SigninPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  if (!providers) {
    return <Loading />;
  }

  const ErrorMessage = () => {
    if (router?.query?.error) {
      if (router.query.error === "SessionRequired") {
        return (
          <Alert
            severity="info"
            sx={{
              width: "80%",
            }}
            variant="filled"
          >
            Please Sign In to Access that Page
          </Alert>
        );
      }
      return (
        <Alert
          severity="error"
          sx={{
            width: "80%",
          }}
          variant="filled"
        >
          There was an Error: {router.query.error}
        </Alert>
      );
    }

    return null;
  };

  return (
    <Layout title="Sign In">
      <div className={styles.signIn}>
        <ErrorMessage />
        <h1>Sign in</h1>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <Button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl:
                    (router?.query?.redirect as string) ??
                    router?.query?.callbackUrl,
                })
              }
              variant={"contained"}
              className={styles.signInButton}
            >
              <Avatar
                src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                className={styles.signInButtonImage}
              />
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default SigninPage;
