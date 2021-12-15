import { Router } from "next/router";
import Link from "next/link";

import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VideoList from "../components/VideoList";

export default function Home({ videos, page, t }) {
    console.log(t)
  return (
    <>
      {/* HTML Head Element */}
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

      {/* Header component */}
      <Header />

      {/* Main section */}
      {/* <div className="min-h-screen"> */}
      <main className="w-full h-full md:pb-8 max-w-screen-2xl mx-auto mt-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-6 md:px-10 lg:px-14">
          {videos.list.map((movie) => (
            <VideoList
              name={movie.vod_name}
              type={movie.vod_class}
              pic={movie.vod_pic}
              url={movie.vod_play_url
                .split("$$$")[1]
                .substring(movie.vod_play_url.split("$$$")[1].indexOf("h"))}
              key={movie.vod_id}
            />
          ))}
        </div>
      </main>

      {/* pagination */}
      <div className="w-full h-full max-w-screen-2xl mx-auto flex justify-center mt-8 md:mt-0 mb-2">
        <Link href={`/list/?t=${t}&page=${parseInt(page) - 1}`}>
          <a
            className={`px-4 py-2 mx-1 ${
              page == 1
                ? "text-gray-500 cursor-not-allowed bg-black border border-white"
                : "text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black"
            }`}
          >
            PREVIOUS
          </a>
        </Link>

        <Link href={`/list/?t=${t}&page=${parseInt(page) + 1}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            {parseInt(page) + 1}
          </a>
        </Link>
        <Link href={`/list/?t=${t}&page=${parseInt(page) + 2}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            {parseInt(page) + 2}
          </a>
        </Link>
        <Link href={`/list/?t=${t}&page=${parseInt(page) + 3}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            {parseInt(page) + 3}
          </a>
        </Link>

        <Link href={`/list/?t=${t}&page=${parseInt(page) + 1}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            NEXT
          </a>
        </Link>
      </div>

      {/* Footer component */}
      <Footer className="max-w-screen-2xl" />
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 , t} }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `https://m3u8.xiangkanapi.com/provide/vod/?ac=detail&t=${t}&pg=${page}`
  );
  const videos = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      videos,
      page,
      t,
    },
  };
}
