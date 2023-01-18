import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { UserAccessDashboardsEnum } from "util/enums";

function SigninPage({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: session, status } = useSession();

  if (providers === null) return;

  if (status === "authenticated")
    return window.location.replace(
      UserAccessDashboardsEnum[(session.user as any).accessLevel as 1]
    );

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}> = async (context) => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default SigninPage;
