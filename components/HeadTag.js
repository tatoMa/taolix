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
      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </Head>
  );
};

export default HeadTag;
