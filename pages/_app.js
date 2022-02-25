import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/index";
import GoogleAnalytics from "../components/Layout/GoogleAnalytic";
import { motion } from "framer-motion";
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
        {/* global animated transition by changing url. Only for main section. Not including navbar and footer */}
        <motion.div
          key={router.asPath}
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
              x: -200,
            },
            animate: {
              opacity: 1,
              x: 0,
            },
          }}
        >
          {/* main section of all pages */}
          <Component {...pageProps} />
        </motion.div>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
