import Banner from "../../components/Banner";
// import Head from "next/head";
// import Footer from "../../components/Footer";
// import Header from "../../components/Header";
// import VideoList from "../../components/VideoList";
import { useState } from "react";
import { PlayIcon } from "@heroicons/react/solid";

import LineBreak from "../../components/LineBreak";

import PlayerWrapper from "../../components/PlayerWrapper";
import NextHeadSeo from "next-head-seo";
import { getVideoUrlsFromUrlStr } from "../../utils/utils";

import fetch from "isomorphic-unfetch";

function Detail({ detail, id }) {
  const videoList = getVideoUrlsFromUrlStr(detail.list[0]?.vod_play_url);

  // console.log("detail page", videoList);
  const [play, setPlay] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});

  // const getVideoListFromOtherApi = async () => {
  //   try {
  //     const res = await fetch(
  //       "/api/cors?url=https://m3u8.feisuzyapi.com/vod/?ac=detail"
  //     );
  //     const data = await res.json();
  //     return data;
  //   } catch (error) {
  //     console.log(error.toString());
  //   }
  // };

  // useEffect(() => {
  //   getVideoListFromOtherApi().then((res) => console.log(res));
  //   return () => {
  //     document.documentElement.style.overflowY = "auto";
  //     // console.log("cleaned up");
  //   };
  // }, []);

  return (
    <>
      <NextHeadSeo
        title={`${detail.list[0].vod_name} free to play - Taolix`}
        description={`${detail.list[0].vod_name} video users can play online for free.`}
        canonical={`https://www.taolix.com/detail/${id}}`}
        og={{
          title: `${detail.list[0].vod_name} free to play - Taolix`,
          description: `${detail.list[0].vod_name} video users can play online for free.`,
          image: detail.list[0].vod_pic,
          type: "video.movie",
          siteName: "Taolix",
        }}
      />
      {/* Main section */}
      <main
        className={`w-full h-full md:pb-8 max-w-screen-2xl mx-auto ${
          play && "pointer-events-none"
        }`}
      >
        {play && <PlayerWrapper url={url} setPlay={setPlay} />}
        {/* Player */}
        {/* {play && <Player url={url} setPlay={setPlay} />} */}

        <Banner detail={detail.list[0]} />
        {videoList ? (
          <div className="-translate-y-12 md:translate-y-0">
            <LineBreak title="PLAY LIST" />
            <div className="text-gray-400 text-sm my-3">
              ALL resources are from 3rd party website.
            </div>
            <div className="mt-1">
              {videoList.map((video) => {
                const { name, url } = video;
                return (
                  <a
                    key={name}
                    className="odd:bg-black first:border-t even:bg-gray-800 cursor-pointer overflow-hidden flex items-center py-3 border-b border-gray-400 text-gray-400 hover:text-white hover:border-white"
                    onClick={() => {
                      setPlay(true);
                      setUrl(url);
                      scroll(0, 0);
                      document.documentElement.style.overflowY = "hidden";
                    }}
                    // onClick={() => {
                    //   window.location.href = url;
                    // }}
                  >
                    <div>
                      <PlayIcon className="h-8 w-8 mr-4 text-blue-white" />
                    </div>
                    <div>{name}</div>
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="font-bold text-gray-300 text-3xl">No result found</p>
        )}
      </main>
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
