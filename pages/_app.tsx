// DON'T MESS WITH THIS UNLESS YOU KNOW WHAT YOU ARE DOING
// Or not whatever you prefer

import "../styles/globals.scss";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "../components/errors";
import { Session } from "next-auth";
import { ExtendedComponent } from "../types/component";
import AccessControlLayer from "@components/layout/accessControl";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        <Head>
          <meta name="application-name" content="FRC Team 3407" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="PWA App" />
          <meta
            name="description"
            content="The Official Website of the Wild Cards (FRC Team 3407)"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href="/manifest.json" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://yourdomain.com" />
          <meta name="twitter:title" content="PWA App" />
          <meta
            name="twitter:description"
            content="Best PWA App in the world"
          />
          <meta
            name="twitter:image"
            content="https://yourdomain.com/icons/android-chrome-192x192.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="PWA App" />
          <meta property="og:description" content="Best PWA App in the world" />
          <meta property="og:site_name" content="PWA App" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta
            property="og:image"
            content="https://yourdomain.com/icons/apple-touch-icon.png"
          />
        </Head>
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
