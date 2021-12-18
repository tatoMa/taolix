import Head from "next/head";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
// import VideoList from "../../components/VideoList";
import { useState } from "react";
import { PlayIcon, XIcon } from "@heroicons/react/solid";
import VideoPlayer from "../../components/VideoPlayer";

function Detail({ detail, id }) {
  // console.log(detail);
  // console.log(detail.list[0].vod_play_url.split("$$$"));
  const videoList = detail.list[0].vod_play_url.split("$$$")[1]?.split("#");
  // console.log(videoList);
  const [play, setPlay] = useState(false);
  const [url, setUrl] = useState("");

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
      <main className="w-full h-full md:pb-8 max-w-screen-2xl mx-auto">
        {play && (
          <div className="flex h-full w-full absolute top-0 left-0 items-center bg-black/50 z-10">
            <XIcon
              className="h-10 w-10 text-blue-white absolute right-4 top-12 bg-black cursor-pointer hover:bg-white hover:text-black animate-fadeIn z-50"
              onClick={() => setPlay(false)}
            />
            <VideoPlayer src={url} />
          </div>
        )}
        <Banner detail={detail.list[0]} />
        <div className=" text-3xl text-white border-b -translate-y-6 pb-2 mx-2 sm:mx-6 md:mx-10 lg:mx-14">
          DETAILS
        </div>
        {videoList &&
          videoList.map((video) => {
            const [name, url] = video.split("$");
            return (
              <a
                key={name}
                className="cursor-pointer overflow-hidden flex items-center py-3 px-2 sm:mx-6 md:mx-10 lg:mx-14 border-b border-gray-400 text-gray-400 hover:text-white hover:border-white"
                onClick={() => {
                  setPlay(true);
                  setUrl(url);
                  scroll(0, 0);
                }}
              >
                <div>
                  <PlayIcon className="h-8 w-8 mr-4 text-blue-white" />
                </div>
                <div>{name}</div>
              </a>
            );
          })}
      </main>

      {/* Footer component */}
      <Footer className="max-w-screen-2xl" />
    </>
  );
}

export default Detail;

export async function getServerSideProps({ params }) {
  // console.log(params);
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `${process.env.MOVIE_API}/?ac=detail&ids=${params.id}`
  );
  const detail = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      detail,
      id: params.id,
    },
  };
}
