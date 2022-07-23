import {
  shuffle,
  gerVideoListFromDoubanApiHotList,
  fetchMovieListsFromSelectedGenreList,
  genresForIndexFetch,
  filterNeededVideoInfo,
  FulfilledAndRejectedResultsFromPromiseAllSettled,
  fetchMovieListsFromDouban,
} from "../utils/utils";
import HeroSwiper from "../components/HeroSwiper";
import LineBreak from "../components/LineBreak";
import GroupSwiper from "../components/GroupSwiper";
import { GetStaticProps } from "next";
import { DOUBAN_HOT_URLS } from "utils/const";

export default function Home({
  selectedVideosForHero,
  doubanHotMovieList,
  doubanHotTvList,
  doubanNewMovieList,
  videosNewCnTvShow,
  videosNewKrTvShow,
  videosNewUsTvShow,
  videosNewCnReality,
  videosNewJpAnime,
}) {
  return (
    <>
      {/* Main section */}
      <div className="mx-auto h-full w-full max-w-screen-2xl ">
        {/* Swiper section */}
        <HeroSwiper top5={selectedVideosForHero} />
        <div>
          {/* Line Break  */}
          <LineBreak title="WHATS ON MOVIES" />

          {/* Video List Section */}
          <GroupSwiper videos={doubanHotMovieList} />

          {/* Line Break  */}
          <LineBreak title="WHATS ON TV" />

          {/* Video List Section */}
          <GroupSwiper videos={doubanHotTvList} />

          {/* Line Break  */}
          <LineBreak title="NEW MOVIES" />

          {/* Video List Section */}
          <GroupSwiper videos={doubanNewMovieList} />

          {/* Line Break  */}
          <LineBreak title="CHINESE TV SHOWS" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewCnTvShow} />

          {/* Line Break  */}
          <LineBreak title="KOREAN TV SHOWS" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewKrTvShow} />

          {/* Line Break  */}
          <LineBreak title="AMERICAN TV SHOWS" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewUsTvShow} />

          {/* Line Break  */}
          <LineBreak title="JAPANESE ANIME" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewJpAnime} />

          {/* Line Break  */}
          <LineBreak title="CHINESE REALITY TV" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewCnReality} />
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  let resultsPromiseAllFromMovieApi;
  let resultsPromiseAllFromDouban;

  // All data fetching related to movie apis
  const dataFromFetchMovieListsWithSelectedGenres =
    fetchMovieListsFromSelectedGenreList(genresForIndexFetch);

  resultsPromiseAllFromMovieApi = await Promise.allSettled(
    dataFromFetchMovieListsWithSelectedGenres
  );

  const [successesFromMovieApi, failuresFromMovieApi] =
    FulfilledAndRejectedResultsFromPromiseAllSettled(
      resultsPromiseAllFromMovieApi
    );

  if (!failuresFromMovieApi || failuresFromMovieApi?.length !== 0)
    console.error(
      "index page fetching error from movie api",
      failuresFromMovieApi
    );

  const [
    videosNewCnTvShow = {},
    videosNewKrTvShow = {},
    videosNewUsTvShow = {},
    videosNewCnReality = {},
    videosNewJpAnime = {},
  ] = successesFromMovieApi;

  // All data fetching related to Douban apis
  const dataFromFetchMovieListsFromDouban = fetchMovieListsFromDouban();

  resultsPromiseAllFromDouban = await Promise.allSettled(
    dataFromFetchMovieListsFromDouban
  );

  const [successesFromDouban, failuresFromDouban] =
    FulfilledAndRejectedResultsFromPromiseAllSettled(
      resultsPromiseAllFromDouban
    );

  if (!failuresFromDouban || failuresFromDouban?.length !== 0)
    console.error(
      "index page fetching error from Douban api",
      failuresFromDouban
    );

  const [
    doubanHotMovieList = {},
    doubanHotTvList = {},
    doubanNewMovieList = {},
  ] = successesFromDouban;

  const selectedVideosForHero = shuffle([
    // ...doubanHotMovieList.list,
    ...doubanNewMovieList.list,
    ...doubanHotTvList.list,
  ]).slice(0, 16);

  return {
    props: {
      selectedVideosForHero,
      doubanHotMovieList,
      doubanHotTvList,
      doubanNewMovieList,
      videosNewCnTvShow,
      videosNewKrTvShow,
      videosNewUsTvShow,
      videosNewCnReality,
      videosNewJpAnime,
    },
    revalidate: 3500,
  };
};
