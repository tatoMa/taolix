import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import LineBreak from "../../components/LineBreak";
import PlayerWrapper from "../../components/Player/PlayerWrapper";
import NextHeadSeo from "next-head-seo";
import {
  getVideoUrlsFromUrlStr,
  removeAllSpecialCharactersFromString,
} from "../../utils/utils";

import VideoPlayList from "../../components/VideoPlayList";

function Detail({ detail, id, detail2, detail3, detail4, detailHD }) {
  // get primary video info
  const videoList = getVideoUrlsFromUrlStr(detail.list[0]?.vod_play_url);

  // get additional video play list
  const getPlayList = (source) => {
    if (Object.keys(source).length > 0 && source.list.length > 0) {
      return getVideoUrlsFromUrlStr(source?.list[0]?.vod_play_url);
    }
  };

  let videoList2 = getPlayList(detail2) || {};
  let videoList3 = getPlayList(detail3) || {};
  let videoList4 = getPlayList(detail4) || {};
  let videoListHD = getPlayList(detailHD) || {};

  // modified original pic url with hi-res pic if there is one
  if (detailHD?.list[0]?.vod_pic)
    detail.list[0].vod_pic = detailHD?.list[0]?.vod_pic;

  const [play, setPlay] = useState(false);
  const [url, setUrl] = useState("");
  // const [country, setCountry] = useState("");

  // useEffect(async () => {
  //   // check if the ip is from China
  //   const response = await fetch("http://ipwho.is/");
  //   const res = await response.json();
  //   setCountry(res.country);
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
          ALL resources are from 3rd party sources. We do NOT store or save any
          video resources.
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {detailHD.list.length > 0 > 0 && (
            <VideoPlayList
              index={"HD"}
              title={false}
              videoList={videoListHD}
              setPlay={setPlay}
              setUrl={setUrl}
              url={url}
            />
          )}
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
  const videoName = removeAllSpecialCharactersFromString(
    detail.list[0].vod_name
  );
  let detail2 = {};
  let detail3 = {};
  let detail4 = {};
  let detailHD = {};
  let emptyReturnData = { list: [] };

  let resultsPromiseAll;

  try {
    resultsPromiseAll = await Promise.allSettled([
      fetch(
        `${process.env.MOVIE_API_SOURCE_2}/?ac=detail&wd=${encodeURI(
          videoName
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_3}/?ac=detail&wd=${encodeURI(
          videoName
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_4}/?ac=detail&wd=${encodeURI(
          videoName
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_HD}?ac=list&wd=${encodeURI(videoName)}`
      )
        .then((res) => res.json())
        .then((res) => {
          let tempList = res.list.map((item) => item.vod_id).join(",");
          return fetch(
            `${process.env.MOVIE_API_SOURCE_HD}?ac=detail&ids=${tempList}`
          ).then((res) => res.json());
        }),
    ]);
  } catch (error) {
    console.error(error);
  }
  // console.log(resultsPromiseAll);
  // handle promise allSettled returns successes and failures
  const successes = resultsPromiseAll
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failures = resultsPromiseAll
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);
  // console.log(successes);

  // map and filter results for return needed
  const filteredByName = successes.map((item) => {
    // if (item === undefined)
    //   return {
    //     list: [],
    //   };
    let temp = [];
    temp[0] = item.list.find(
      (item) =>
        removeAllSpecialCharactersFromString(item.vod_name) === videoName
    );
    return { ...item, list: temp[0] !== undefined ? temp : [] };
  });

  let tessss;

  // asign all return needed data
  [detail2, detail3, detail4, detailHD] = filteredByName;
  return {
    props: {
      detail,
      id: params.id,
      detail2: detail2 !== undefined ? detail2 : emptyReturnData,
      detail3: detail3 !== undefined ? detail3 : emptyReturnData,
      detail4: detail4 !== undefined ? detail4 : emptyReturnData,
      detailHD: detailHD !== undefined ? detailHD : emptyReturnData,
    },
  };
}
