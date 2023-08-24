import { useEffect, useRef, useState } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/index";
import GoogleAnalytics from "../components/Layout/GoogleAnalytic";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import LoadingAnimation from "components/Layout/Loading";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  let timer = useRef(null);
  useEffect(() => {
    document.documentElement.lang = "en-us";
  });
  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`);
      timer.current = setTimeout(() => {
        setLoading(true);
      }, 150);
    };

    const handleStop = (url: string) => {
      console.log(`Done: ${url}`);
      clearTimeout(timer.current);
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    // Auth session component
    <SessionProvider session={session}>
      {/* google analytics component */}
      {/* @ts-ignore*/}
      <GoogleAnalytics Component pageProps />
      {/* layout of app */}
      <Layout>
        <>
          {loading && <LoadingAnimation />}
          {/* main section of all pages */}
          <Component {...pageProps} />
        </>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
