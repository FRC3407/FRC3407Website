import { NextComponentType } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AccessLevels, IAuthOptions } from "../../types/component";
import { UserAccessLevelRolesEnum } from "../../util/enums";
import Loading from "@components/loading";

export default function AccessControlLayer({
  children,
}: {
  children: NextComponentType & { auth?: IAuthOptions };
}): JSX.Element {
  const { data: session, status } = useSession({ required: true });
  const loggedInUser = !!session?.user;
  const auth = ((children as any).type.auth ?? {}) as IAuthOptions;
  const requiredSignIn = auth.requireSignIn || !!auth.unauthorized;
  auth.accessLevel = auth.accessLevel ?? "tm";
  useEffect(() => {
    if (status === "loading") return;
    if (requiredSignIn && !loggedInUser) signIn();
  }, [status, loggedInUser, requiredSignIn]);

  if (loggedInUser) {
    if (
      Array.isArray(auth.accessLevel) &&
      !auth.accessLevel.every(
        (accessLevel) =>
          UserAccessLevelRolesEnum[accessLevel] !== session.user.accessLevel
      )
    )
      return <>{children}</>;
    if (
      !Array.isArray(auth.accessLevel) &&
      (UserAccessLevelRolesEnum[auth.accessLevel as AccessLevels] <=
        session.user.accessLevel ||
        session.user.accessLevel === UserAccessLevelRolesEnum.dev) // So devs can see all pages
    )
      return <>{children}</>;
    window.location.replace(auth.unauthorized ?? "/error/access-denied");
  }

  return (auth.loading || Loading()) as JSX.Element;
}
