import {
  shuffle,
  gerVideoListFromDoubanApiHotList,
  genresForIndexFetch,
  filterNeededVideoInfo,
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
  // map from selected genre list to fetch promise list
  const fetchMovieListsFromSelectedGenreList = genresForIndexFetch.map(
    async (genre) => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await fetch(
            `${process.env.MOVIE_API}/?ac=detail&t=${genre.type}`
          );
          const result = await res.json();
          result.list = result?.list?.map((i) => filterNeededVideoInfo(i));
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
  );

  resultsPromiseAllFromMovieApi = await Promise.allSettled(
    fetchMovieListsFromSelectedGenreList
  );

  const successesFromMovieApi = resultsPromiseAllFromMovieApi
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failuresFromMovieApi = resultsPromiseAllFromMovieApi
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);
  if (!failuresFromMovieApi || failuresFromMovieApi?.length !== 0)
    console.error("index page fetching error", failuresFromMovieApi);

  console.time("douban");
  // assign all return needed data
  const [
    videosNewCnTvShow = {},
    videosNewKrTvShow = {},
    videosNewUsTvShow = {},
    videosNewCnReality = {},
    videosNewJpAnime = {},
  ] = successesFromMovieApi;

  const fetchMovieListsFromDouban = DOUBAN_HOT_URLS.map(async (doubanUrl) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await gerVideoListFromDoubanApiHotList(doubanUrl);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  });

  resultsPromiseAllFromDouban = await Promise.allSettled(
    fetchMovieListsFromDouban
  );

  const successesFromDouban = resultsPromiseAllFromDouban
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failuresFromDouban = resultsPromiseAllFromDouban
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);
  if (!failuresFromDouban || failuresFromDouban?.length !== 0)
    console.error("index page fetching error", failuresFromDouban);

  const [
    doubanHotMovieList = {},
    doubanHotTvList = {},
    doubanNewMovieList = {},
  ] = successesFromDouban;

  // get hot movie list from douban API
  // const doubanHotTvList = await gerVideoListFromDoubanApiHotList(
  //   "/j/search_subjects?type=tv&tag=热门&sort=recommend&page_limit=30&page_start=0"
  // );
  // const doubanHotMovieList = await gerVideoListFromDoubanApiHotList(
  //   "/j/search_subjects?type=movie&tag=热门&sort=recommend&page_limit=30&page_start=0"
  // );

  // const doubanNewMovieList = await gerVideoListFromDoubanApiHotList(
  //   "/j/search_subjects?type=movie&tag=最新&sort=recommend&page_limit=30&page_start=0"
  // );

  const selectedVideosForHero = shuffle([
    // ...doubanHotMovieList.list,
    ...doubanNewMovieList.list,
    ...doubanHotTvList.list,
  ]).slice(0, 16);
  console.timeEnd("douban");
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
