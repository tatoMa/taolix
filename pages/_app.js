import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import NextHeadSeo from "next-head-seo";
import { useEffect } from "react";
// import { AnimateSharedLayout } from "framer-motion";
import { motion } from "framer-motion";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  useEffect(() => {
    document.documentElement.lang = "en-us";
  });
  return (
    <SessionProvider session={session}>
      <NextHeadSeo
        title={"TAOLIX: Free Online Movies, TV Shows And Anime Stream Service"}
        canonical={"https://www.taolix.com"}
        description={
          "Taolix is a open source website where users find and play movies, shows and anime from different countries for free."
        }
        customMetaTags={[
          {
            name: "keywords",
            content: "taolix, free, movie, show, anime, online",
          },
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
          {
            name: "author",
            content: "TATO",
          },
          {
            name: "theme-color",
            content: "black",
          },
        ]}
        og={{
          title:
            "TAOLIX: Free Online Movies, TV Shows And Anime Stream Service",
          description:
            "Taolix is a open source website where users find and play movies, shows and anime from different countries for free.",
          image: "https://www.taolix.com/logo.png",
          type: "website",
          siteName: "Taolix",
        }}
      />
      {/* <AnimateSharedLayout> */}
      <Layout>
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
          {console.log(router)}
          <Component {...pageProps} />
          {/* </AnimateSharedLayout> */}
        </motion.div>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
