// DON'T MESS WITH THIS UNLESS YOU KNOW WHAT YOU ARE DOING
// Or not whatever you prefer

import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "../components/errors";
import { Session } from "next-auth";
import { Component } from "react";
import { AuthComponent } from "../types/component";
import AccessControlLayer from "../components/layout/accessControl";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  console.log((Component as AuthComponent).auth, "this");
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        {(Component as AuthComponent).auth ? (
          <AccessControlLayer>
            {(<Component {...pageProps} />) as any}
          </AccessControlLayer>
        ) : (
          <Component {...pageProps} />
        )}
      </ErrorBoundary>
    </SessionProvider>
  );
}
