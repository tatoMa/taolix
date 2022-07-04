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

export default function Home({
  selectedVideosForHero,
  doubanHotTvList,
  doubanHotMovieList,
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
  let resultsPromiseAll;

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

  try {
    resultsPromiseAll = await Promise.allSettled(
      fetchMovieListsFromSelectedGenreList
    );
  } catch (error) {
    console.error(error);
  }

  const successes = resultsPromiseAll
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failures = resultsPromiseAll
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);
  if (!failures || failures?.length !== 0)
    console.error("index page fetching error", failures);

  // asign all return needed data
  const [
    videosNewCnTvShow = {},
    videosNewKrTvShow = {},
    videosNewUsTvShow = {},
    videosNewCnReality = {},
    videosNewJpAnime = {},
  ] = successes;

  // get hot movie list from douban API
  const doubanHotTvList = await gerVideoListFromDoubanApiHotList(
    "/j/search_subjects?type=tv&tag=热门&sort=recommend&page_limit=30&page_start=0"
  );
  const doubanHotMovieList = await gerVideoListFromDoubanApiHotList(
    "/j/search_subjects?type=movie&tag=热门&sort=recommend&page_limit=30&page_start=0"
  );

  const doubanNewMovieList = await gerVideoListFromDoubanApiHotList(
    "/j/search_subjects?type=movie&tag=最新&sort=recommend&page_limit=30&page_start=0"
  );

  const selectedVideosForHero = shuffle([
    ...doubanNewMovieList.list,
    ...doubanHotTvList.list,
  ]).slice(0, 16);

  return {
    props: {
      selectedVideosForHero,
      doubanHotTvList,
      doubanHotMovieList,
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