import Banner from "../../components/Banner";
import { useState } from "react";

import LineBreak from "../../components/LineBreak";

import PlayerWrapper from "../../components/Player/PlayerWrapper";
import NextHeadSeo from "next-head-seo";
import { getVideoUrlsFromUrlStr } from "../../utils/utils";

import VideoPlayList from "../../components/VideoPlayList";

function Detail({ detail, id, detail2, detail3, detail4 }) {
  const videoList = getVideoUrlsFromUrlStr(detail.list[0]?.vod_play_url);
  let videoList2 = {};
  let videoList3 = {};
  let videoList4 = {};

  if (Object.keys(detail2).length > 0 && detail2.list.length > 0) {
    videoList2 = getVideoUrlsFromUrlStr(detail2?.list[0]?.vod_play_url);
  }
  if (Object.keys(detail3).length > 0 && detail3.list.length > 0) {
    videoList3 = getVideoUrlsFromUrlStr(detail3?.list[0]?.vod_play_url);
  }
  if (Object.keys(detail4).length > 0 && detail4.list.length > 0) {
    videoList4 = getVideoUrlsFromUrlStr(detail4?.list[0]?.vod_play_url);
  }

  const [play, setPlay] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});

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
        className={`mx-auto h-full w-full max-w-screen-2xl md:pb-8 ${
          play && "pointer-events-none"
        }`}
      >
        {play && <PlayerWrapper url={url} setPlay={setPlay} />}
        {/* Player */}
        {/* {play && <Player url={url} setPlay={setPlay} />} */}

        <Banner detail={detail.list[0]} />
        <LineBreak title="PLAY LIST" />
        <div className="my-3 text-sm text-gray-400">
          ALL resources are from 3rd party website.
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {detail.list.length > 0 && (
            <VideoPlayList
              index={1}
              videoList={videoList}
              setPlay={setPlay}
              setUrl={setUrl}
              url={url}
            />
          )}
          {detail2.list.length > 0 > 0 && (
            <VideoPlayList
              index={2}
              title={false}
              videoList={videoList2}
              setPlay={setPlay}
              setUrl={setUrl}
              url={url}
            />
          )}
          {detail3.list.length > 0 > 0 && (
            <VideoPlayList
              index={3}
              title={false}
              videoList={videoList3}
              setPlay={setPlay}
              setUrl={setUrl}
              url={url}
            />
          )}
          {detail4.list.length > 0 > 0 && (
            <VideoPlayList
              index={4}
              title={false}
              videoList={videoList4}
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
  // fetch the primary data
  res.setHeader("Cache-Control", "public, s-maxage=60");
  let detail = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/id/${params.id}`);
    detail = await response.json();
  } catch (error) {
    console.error("error: ", error);
  }

  // fetch the secondary data
  let detail2 = {};
  let detail3 = {};
  let detail4 = {};

  let resultsPromiseAll;

  try {
    resultsPromiseAll = await Promise.allSettled([
      fetch(
        `${process.env.MOVIE_API_SOURCE_2}/?ac=detail&wd=${encodeURI(
          detail.list[0].vod_name
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_3}/?ac=detail&wd=${encodeURI(
          detail.list[0].vod_name
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_4}/?ac=detail&wd=${encodeURI(
          detail.list[0].vod_name
        )}`
      ).then((res) => res.json()),
    ]);
  } catch (error) {
    console.error(error);
  }

  // handle promise allSettled returns successes and failures
  const successes = resultsPromiseAll
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failures = resultsPromiseAll
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);

  // map and filter results for return needed
  const filteredByName = successes.map((item) => {
    let temp = [];
    temp[0] = item.list.find(
      (item) => item.vod_name === detail.list[0].vod_name
    );
    return { ...item, list: temp[0] !== undefined ? temp : [] };
  });

  // asign all return needed data
  [detail2, detail3, detail4] = filteredByName;

  return {
    props: {
      detail,
      id: params.id,
      detail2,
      detail3,
      detail4,
    },
  };
}
