import { useEffect, useRef, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/index";
import GoogleAnalytics from "../components/Layout/GoogleAnalytic";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import useRouterLoading from "hooks/useRouterLoading";
import LoadingAnimation from "components/Layout/Loading";

import { NextIntlClientProvider } from "next-intl";

type PageProps = {
  messages: IntlMessages;
  now: number;
  session: Session;
};

type Props = Omit<AppProps<PageProps>, "pageProps"> & {
  pageProps: PageProps;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  const [loading, setLoading] = useState(false);
  useRouterLoading(setLoading);

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

      <NextIntlClientProvider messages={pageProps.messages}>
        <Layout>
          <>
            {loading && <LoadingAnimation />}
            {/* main section of all pages */}
            <Component {...pageProps} />
          </>
        </Layout>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
