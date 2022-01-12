import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import NextHeadSeo from "next-head-seo";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextHeadSeo
        title={
          "Taolix - free online movies, tv shows and anime stream service."
        }
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
            "Taolix - free online movies, tv shows and anime stream service.",
          description:
            "Taolix is a open source website where users find and play movies, shows and anime from different countries for free.",
          image: "https://www.taolix.com/logo.png",
          type: "website",
          siteName: "Taolix",
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
