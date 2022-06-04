import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import LineBreak from "../../components/LineBreak";
import PlayerWrapper from "../../components/Player/PlayerWrapper";
import NextHeadSeo from "next-head-seo";
import {
  getVideoUrlsFromUrlStr,
  removeAllSpecialCharactersFromString,
} from "../../utils/utils";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'

import VideoPlayList from "../../components/VideoPlayList";

function Detail({ id, detail, detail1, detail2, detail3, detail4, detailHD }) {
  // get primary video info
  const videoList = getVideoUrlsFromUrlStr(detail.list[0]?.vod_play_url);
  // get additional video play list
  const getPlayList = (source) => {
    if (Object.keys(source).length > 0 && source.list.length > 0) {
      return getVideoUrlsFromUrlStr(source?.list[0]?.vod_play_url);
    }
  };

  let videoList1 = getPlayList(detail1) || {};
  let videoList2 = getPlayList(detail2) || {};
  let videoList3 = getPlayList(detail3) || {};
  let videoList4 = getPlayList(detail4) || {};
  let videoListHD = getPlayList(detailHD) || {};

  // modified original pic url with hi-res pic if there is one
  if (detailHD?.list[0]?.vod_pic || detail4?.list[0]?.vod_pic || detail3?.list[0]?.vod_pic)
    detail.list[0].vod_pic = detailHD?.list[0]?.vod_pic || detail4?.list[0]?.vod_pic || detail3?.list[0]?.vod_pic;

  const [play, setPlay] = useState(false);
  const [listOrderAsc, setListOrderAsc] = useState(false);
  const [loadingStorage, setLoadingStorage] = useState(true);
  const [url, setUrl] = useState("");

  const handleButtonChangeOrder = () => { 
    localStorage.setItem('listOrderAsc', JSON.stringify(!listOrderAsc));
    setListOrderAsc(!listOrderAsc);
  }

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('listOrderAsc'));
    if (items) {
      setListOrderAsc(items);
    }
    setLoadingStorage(false);
  }, []);

// const allVideoLists = [videoList1?.list?.length!==0&&videoList1,videoList2?.list?.length!==0&&videoList2,videoList3?.list?.length!==0&&videoList3,videoList4?.list?.length!==0&&videoList4,videoListHD?.list?.length!==0&&videoListHD]
  return (
    <>
      <NextHeadSeo
        title={`${detail.list[0]?.vod_name} free to play - Taolix`}
        description={`${detail.list[0]?.vod_name} video users can play online for free.`}
        canonical={`https://www.taolix.com/detail/${id}}`}
        og={{
          title: `${detail.list[0]?.vod_name} free to play - Taolix`,
          description: `${detail.list[0]?.vod_name} video users can play online for free.`,
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
        <div className="flex justify-between items-center">
          <p className="my-3 text-sm text-gray-400 flex-1">
            ALL resources are from 3rd party sources. We do NOT store or save any
            video resources.
          </p>
          <button className="ml-4 pl-5 pr-3 py-1 text-gray-300 hover:bg-gray-500/50 duration-200 border border-gray-400/75" onClick={handleButtonChangeOrder}>
            Order: {" "}
            {
              listOrderAsc 
              ? <ChevronUpIcon className="inline-block h-5 w-5 " /> 
              : <ChevronDownIcon className="inline-block h-5 w-5 " />
            }

          </button>
        </div>
        {!loadingStorage && 
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {detailHD?.list?.length > 0 && (
              <VideoPlayList
                index={detailHD?.resource===5?"HD":detailHD?.resource}
                title={false}
                videoList={videoListHD}
                setPlay={setPlay}
                setUrl={setUrl}
                url={url}
                listOrderAsc={listOrderAsc}
              />
            )}
            {detail4?.list?.length > 0 && (
              <VideoPlayList
                index={detail4?.resource===5?"HD":5-detail4?.resource}
                title={false}
                videoList={videoList4}
                setPlay={setPlay}
                setUrl={setUrl}
                url={url}
                listOrderAsc={listOrderAsc}
              />
            )}
            {detail3?.list?.length > 0 && (
              <VideoPlayList
                index={detail3?.resource===5?"HD":5-detail3?.resource}
                title={false}
                videoList={videoList3}
                setPlay={setPlay}
                setUrl={setUrl}
                url={url}
                listOrderAsc={listOrderAsc}
              />
            )}
            {detail2?.list?.length > 0 && (
              <VideoPlayList
                index={detail2?.resource===5?"HD":5-detail2?.resource}
                title={false}
                videoList={videoList2}
                setPlay={setPlay}
                setUrl={setUrl}
                url={url}
                listOrderAsc={listOrderAsc}
              />
            )}
            {detail1?.list?.length > 0 && (
              <VideoPlayList
                index={detail1?.resource===5?"HD":5-detail1?.resource}
                title={false}
                videoList={videoList1}
                setPlay={setPlay}
                setUrl={setUrl}
                url={url}
                listOrderAsc={listOrderAsc}
              />
            )}
            {detail?.list?.length > 0 && (
              <VideoPlayList
                index={detail?.resource===5?"HD":5-detail?.resource}
                title={false}
                videoList={videoList}
                setPlay={setPlay}
                setUrl={setUrl}
                url={url}
                listOrderAsc={listOrderAsc}
              />
            )}
            

          </div>
        }
      </main>
    </>
  );
}

export default Detail;

export async function getServerSideProps({ params, req, res, query }) {
  // fetch the primary data
  let resourceId = 0;
  let resourceName = "";
  if (query.resource) {
    resourceId = query.resource;
    resourceName = query.name;
  }
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=3600"
  );
  const API_LIST = [
    process.env.MOVIE_API,
    process.env.MOVIE_API_SOURCE_2,
    process.env.MOVIE_API_SOURCE_3,
    process.env.MOVIE_API_SOURCE_4,
    process.env.MOVIE_API_SOURCE_HD,
  ];

  let detail = {};
  try {
    let response = await fetch(
      `${API_LIST[resourceId]}/?ac=detail&ids=${params.id}`
    );
    detail = await response.json();
  } catch (error) {
    console.error("error: ", error);
  }
  detail?.resource = 0

  // fetch the secondary data
  const videoName = removeAllSpecialCharactersFromString(
    detail?.list[0]?.vod_name
  ) || resourceName;
  let detail1 = {};
  let detail2 = {};
  let detail3 = {};
  let detail4 = {};
  let detailHD = {};
  let emptyReturnData = { list: [] };

  let resultsPromiseAll;

  try {
    resultsPromiseAll = await Promise.allSettled([
      fetch(
        `${process.env.MOVIE_API}/?ac=detail&wd=${encodeURI(videoName)}`
      ).then((res) => res.json()),
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

  // add resource id into result array
  resultsPromiseAll.map((item, index) => {
    let temp = item;
    temp?.value?.resource = index+1;
    return temp;
  });
  // handle promise allSettled returns successes and failures
  const successes = resultsPromiseAll
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failures = resultsPromiseAll
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);

  // map and filter results for return needed
  const filteredByName = successes.map((item) => {
    // if (item === undefined)
    //   return {
    //     list: [],
    //   };
    let temp = [];
    temp[0] = item.list.find(
      (item) =>
        removeAllSpecialCharactersFromString(item?.vod_name) === videoName
    );
    return { ...item, list: temp[0] !== undefined ? temp : [] };
  });

  // asign all return needed data
  [detail1, detail2, detail3, detail4, detailHD] = filteredByName;
  return {
    props: {
      id: params.id,
      detail,
      detail1: detail1 !== undefined ? detail1 : emptyReturnData,
      detail2: detail2 !== undefined ? detail2 : emptyReturnData,
      detail3: detail3 !== undefined ? detail3 : emptyReturnData,
      detail4: detail4 !== undefined ? detail4 : emptyReturnData,
      detailHD: detailHD !== undefined ? detailHD : emptyReturnData,
    },
  };
}
