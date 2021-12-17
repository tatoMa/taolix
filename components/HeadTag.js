import Head from "next/head";

const HeadTag = () => {
  return (
    <Head>
      <title>TAOLIX - Free videos online</title>
      <meta charSet="UTF-8"></meta>
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
  );
};

export default HeadTag;
