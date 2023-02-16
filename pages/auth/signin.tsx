import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import styles from "styles/pages/Auth.module.scss";
import Button from "@mui/material/Button";
import Layout from "@components/layout";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import Alert from "@mui/material/Alert";

function SigninPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  if (providers === null) {
    router.push("/error/500/NoAuthProviders");
    return;
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
        {Object.values(providers).map((provider) => (
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
                src={`https://authjs.dev/img/providers/${provider.name.toLowerCase()}.svg`}
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

export const getServerSideProps: GetServerSideProps<{
  providers:
    | Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    | null
    | {};
}> = async (context) => {
  const session = await getServerSession(context.req, context.res, {});

  if (session)
    return { redirect: { destination: "/" }, props: { providers: null } };
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default SigninPage;
