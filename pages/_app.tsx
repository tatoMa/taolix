import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/index";
import GoogleAnalytics from "../components/Layout/GoogleAnalytic";

import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps) {
  useEffect(() => {
    document.documentElement.lang = "en-us";
  });
  return (
    // Auth session component
    <SessionProvider session={session}>
      {/* google analytics component */}
      {/* @ts-ignore*/}
      <GoogleAnalytics Component pageProps />
      {/* layout of app */}
      <Layout>
        {/* main section of all pages */}
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
