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

import VideoPlayList from "../../components/VideoPlayList";

function Detail({ detail, id, detail2 }) {
  const videoList = getVideoUrlsFromUrlStr(detail.list[0]?.vod_play_url);
  let videoList2 = {};

  if (Object.keys(detail2).length > 0 && detail2.list.length > 0) {
    videoList2 = getVideoUrlsFromUrlStr(detail2.list[0]?.vod_play_url);
  }

  // console.log("detail page", videoList);
  const [play, setPlay] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});

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
        <LineBreak title="PLAY LIST" />
        <div className="text-gray-400 text-sm my-3">
          ALL resources are from 3rd party website.
        </div>
        <div className="flex flex-row-reverse">
          {Object.keys(detail2).length > 0 && (
            <VideoPlayList
              index={2}
              title={false}
              videoList={videoList2}
              setPlay={setPlay}
              setUrl={setUrl}
              url={url}
            />
          )}
          {Object.keys(detail).length > 0 && (
            <VideoPlayList
              index={1}
              videoList={videoList}
              setPlay={setPlay}
              setUrl={setUrl}
              url={url}
            />
          )}
        </div>
      </main>
    </>
  );
}

export default Detail;

export async function getServerSideProps({ params, req, res }) {
  res.setHeader("Cache-Control", "public, s-maxage=60");
  let detail = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/id/${params.id}`);
    detail = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  const res2 = await fetch(
    `${process.env.MOVIE_API_SOURCE_2}/?ac=detail&wd=${encodeURI(
      detail.list[0].vod_name
    )}`
  );
  const temp2 = await res2.json();

  let detail2 = {};
  if (temp2.total >= 1) {
    detail2.list = [];

    detail2.list[0] = temp2.list?.find(
      (item) => item.vod_name == detail.list[0].vod_name
    );
  }
  const result2 = JSON.parse(JSON.stringify(detail2));
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      detail,
      id: params.id,
      detail2: result2,
    },
  };
}
