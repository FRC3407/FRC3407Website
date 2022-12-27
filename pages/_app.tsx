// DON'T MESS WITH THIS UNLESS YOU KNOW WHAT YOU ARE DOING
// Or not whatever you prefer

import "../styles/globals.scss";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "../components/errors";
import { Session } from "next-auth";
import { ExtendedComponent } from "../types/component";
import AccessControlLayer from "@components/layout/accessControl";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        {(Component as ExtendedComponent).auth ? (
          <AccessControlLayer>
            {/* @ts-ignore-error */}
            <Component {...pageProps} />
          </AccessControlLayer>
        ) : (
          <Component {...pageProps} />
        )}
      </ErrorBoundary>
    </SessionProvider>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  fetch("/api/metrics/report", {
    body: JSON.stringify(metric),
    headers: { "content-type": "application/json" },
    method: "PUT",
  });
}
