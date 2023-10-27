import { GetServerSideProps } from "next";
import Banner from "../../components/Banner";
import React, { useEffect, useState } from "react";
import LineBreak from "../../components/LineBreak";
import PlayerWrapper from "../../components/Player/PlayerWrapper";
import NextHeadSeo from "next-head-seo";
import {
  fetchMovieDetailFromDefaultApi,
  fetchMovieDetailsListFromAllApisByName,
  filterMovieDetailsListByMovieName,
  FulfilledAndRejectedResultsFromPromiseAllSettled,
  getIdAndNameFromQuery,
  getMovieNameFromFetchedDetailData,
  getVideoUrlsFromUrlStr,
  playedMovieInfoForSaveOnLocalStorage,
} from "../../utils/utils";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import VideoPlayList from "../../components/VideoPlayList";
import { Detail } from "utils/interfaces";
import useLocalStorage from "hooks/useLocalStorage";
import { FILTERSLIST } from "utils/const";

function Detail({
  id,
  resourceApiId,
  resourceMovieName,
  primaryMovieDetail,
  secondaryMovieDetailsList,
}) {
  const [play, setPlay] = useState(false);
  const [loadingStorage, setLoadingStorage] = useState(true);
  const [url, setUrl] = useState("");
  const [playedUrls, setPlayedUrls] = useLocalStorage("playedUrls", []);
  const [playedMovies, setPlayedMovies] = useLocalStorage("playedMovies", []);
  const [listOrderAsc, setListOrderAsc] = useLocalStorage(
    "listOrderAsc",
    false
  );

  const allMovieDetailsList = [
    ...secondaryMovieDetailsList,
    primaryMovieDetail,
  ];

  const getPlayListFromMovieDetailObject = (source) => {
    if (Object.keys(source).length > 0 && source?.list?.length > 0) {
      return getVideoUrlsFromUrlStr(source?.list[0]?.vod_play_url);
    }
  };

  const allVideoUrlLists = [
    ...secondaryMovieDetailsList.map((movieDetail) =>
      getPlayListFromMovieDetailObject(movieDetail)
    ),
    getVideoUrlsFromUrlStr(primaryMovieDetail.list[0]?.vod_play_url),
  ];

  const imageUrl = allMovieDetailsList.find(
    (detail) => detail?.list[0]?.vod_pic
  ).list[0].vod_pic;

  const handleButtonChangeOrder = () => {
    setListOrderAsc((prevValue) => !prevValue);
  };

  const handleClickUrlButton = (url) => {
    setUrl(url);
    setPlay(true);
  };

  const handlePlayedUrlsSaveOnLocalStorage = (url) => {
    const REMOVE_AFTER_ITEMS = 10000;
    setPlayedUrls((prevValue) => [
      url,
      ...prevValue.slice(0, REMOVE_AFTER_ITEMS),
    ]);
    setPlayedMovies((prevValue) => {
      // const playedMovie = `${primaryMovieDetail.list[0]?.vod_name} ${imageUrl}`;
      const playedMovie = playedMovieInfoForSaveOnLocalStorage(
        primaryMovieDetail.list[0]?.vod_name,
        imageUrl,
        id,
        resourceApiId
      );

      if (prevValue.includes(playedMovie)) return prevValue;
      return [playedMovie, ...playedMovies];
    });
  };

  useEffect(() => {
    setLoadingStorage(false);
  }, []);

  return (
    <React.Fragment>
      <NextHeadSeo
        title={`${primaryMovieDetail.list[0]?.vod_name} free to play - Taolix`}
        description={`${primaryMovieDetail.list[0]?.vod_name} video users can play online for free.`}
        canonical={`https://www.taolix.com/detail/${id}}`}
        og={{
          title: `${primaryMovieDetail.list[0]?.vod_name} free to play - Taolix`,
          description: `${primaryMovieDetail.list[0]?.vod_name} video users can play online for free.`,
          image: primaryMovieDetail.list[0]?.vod_pic,
          type: "website",
          siteName: "Taolix",
        }}
      />

      {/* Main section */}
      <main
        className={`mx-auto h-full w-full max-w-screen-2xl md:pb-8 ${
          play && "pointer-events-none"
        }`}
      >
        {/* Player */}
        {play && <PlayerWrapper url={url} setPlay={setPlay} />}

        <Banner detail={{ ...primaryMovieDetail.list[0], vod_pic: imageUrl }} />
        <LineBreak title="PLAY LIST" />
        <div className="flex items-center justify-between">
          <p className="flex-1 my-3 text-sm text-gray-400">
            ALL resources are from 3rd party sources. We do NOT store or save
            any video resources.
          </p>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleButtonChangeOrder}
          >
            Order:{" "}
            {listOrderAsc ? (
              <ChevronUpIcon className="inline-block w-5 h-5 " />
            ) : (
              <ChevronDownIcon className="inline-block w-5 h-5 " />
            )}
          </button>
        </div>
        {!loadingStorage && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            <h1 className="text-xl text-red-500">
              Due to copyright policy, we can not provide any sources and direct
              link to play these videos anymore. Please find all these videos
              from somewhere else and support legit copy. Thank you for all your
              support.
            </h1>
            {/* {allMovieDetailsList.map((movieInfo, index) => (
              <VideoPlayList
                key={index}
                index={movieInfo?.resource === 1 ? "HD" : movieInfo?.resource}
                title={false}
                videoList={allVideoUrlLists[index]}
                clickUrlButton={handleClickUrlButton}
                url={url}
                listOrderAsc={listOrderAsc}
                playedUrls={playedUrls}
                playedUrlsSaveOnLocalStorage={
                  handlePlayedUrlsSaveOnLocalStorage
                }
              />
            ))} */}
          </div>
        )}
      </main>
    </React.Fragment>
  );
}

export default Detail;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
  query,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=3600" // 600 seconds for fresh, 3600 seconds for stale and still using but fetch on background
  );

  // filer all sensitive info
  if (FILTERSLIST.includes(parseInt(params.id as string)))
    return { notFound: true };

  const { resourceApiId, resourceMovieName } = getIdAndNameFromQuery(query);

  // fetch the primary data
  let primaryMovieDetail: Detail = {};
  let videoName = "";

  if (!resourceApiId) {
    primaryMovieDetail = await fetchMovieDetailFromDefaultApi(params.id);
    videoName = getMovieNameFromFetchedDetailData(primaryMovieDetail);
  }

  const resultsPromiseAll = await fetchMovieDetailsListFromAllApisByName(
    resourceMovieName,
    videoName
  );
  const [successes, failures] =
    FulfilledAndRejectedResultsFromPromiseAllSettled(resultsPromiseAll);

  let secondaryMovieDetailsList = filterMovieDetailsListByMovieName(
    resourceMovieName,
    videoName,
    successes
  );

  // making the first matched resource as the primary data if source id provided
  if (resourceApiId) {
    primaryMovieDetail = secondaryMovieDetailsList.find(
      (item) => item?.list?.length > 0
    );
    secondaryMovieDetailsList = secondaryMovieDetailsList.filter(
      (item) => item?.resource !== primaryMovieDetail?.resource
    );
  }

  return {
    props: {
      id: params.id,
      resourceApiId,
      resourceMovieName,
      primaryMovieDetail,
      secondaryMovieDetailsList,
    },
  };
};
