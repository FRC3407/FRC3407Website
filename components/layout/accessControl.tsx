import { NextComponentType } from "next";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AuthOptions } from "../../types/component";
import { UserAccessLevelRolesEnum } from "../../util/enums";
import AccessControlledLoading from "../loading/accessControlLoading";

export default function AccessControlLayer({
  children,
}: {
  children: NextComponentType & { auth?: AuthOptions };
}): JSX.Element {
  const { data: session, status } = useSession({ required: true });
  const loggedInUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (
      ((children.auth?.requireSignIn ?? true) ||
        !!children.auth?.unauthorized) &&
      !loggedInUser
    )
      signIn();
  }, [status, loggedInUser, children]);

  if (
    loggedInUser &&
    (session.user as any).accessLevel ==
      UserAccessLevelRolesEnum[children.auth?.accessLevel ?? "tm"]
  )
    return <>{children}</>;
  else if (loggedInUser)
    window.location.replace(
      children.auth?.unauthorized ?? "/error/access-denied"
    );

  return (children.auth?.loading || AccessControlledLoading()) as JSX.Element;
}
