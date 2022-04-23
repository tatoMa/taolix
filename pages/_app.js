import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/index";
import GoogleAnalytics from "../components/Layout/GoogleAnalytic";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  useEffect(() => {
    document.documentElement.lang = "en-us";
  });
  return (
    // Auth session component
    <SessionProvider session={session}>
      {/* google analytics component */}
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
