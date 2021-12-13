import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      {/* HTML Head Element */}
      <Head>
        <title>TAOLIX - Free videos online</title>
        <meta charset="UTF-8"></meta>
        <meta name="keywords" content="movie, show, video, taolix"></meta>
        <meta
          name="description"
          content="Taolix, Your favorite movies and shows online"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="author" content="TATO"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header component */}
      <Header />

      {/* Main section */}
      <div className="min-h-screen">
        <main className="w-full h-full md:pb-44">
          <Banner />
        </main>
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
}
