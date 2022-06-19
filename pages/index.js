import { shuffle, gerVideoListFromDoubanApiHotList } from "../utils/utils";
import HeroSwiper from "../components/HeroSwiper";
import LineBreak from "../components/LineBreak";
import GroupSwiper from "../components/GroupSwiper";

export default function Home({
  selectedVideosForHero,
  doubanHotTvList,
  doubanHotMovieList,
  doubanNewMovieList,
  // videosNewCnTvShow,
  // videosNewKrTvShow,
  // videosNewUsTvShow,
  // videosNewCnReality,
  // videosNewJpAnime,
}) {
  // console.log(selectedVideosForHero);
  return (
    <>
      {/* Main section */}
      <div className="mx-auto h-full w-full max-w-screen-2xl ">
        {/* Swiper section */}
        <HeroSwiper top5={selectedVideosForHero} />
        <div className="-translate-y-9">
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
          {/* <LineBreak title="CHINESE TV SHOWS" /> */}

          {/* Video List Section */}
          {/* <GroupSwiper videos={videosNewCnTvShow} /> */}

          {/* Line Break  */}
          {/* <LineBreak title="KOREAN TV SHOWS" /> */}

          {/* Video List Section */}
          {/* <GroupSwiper videos={videosNewKrTvShow} /> */}

          {/* Line Break  */}
          {/* <LineBreak title="AMERICAN TV SHOWS" /> */}

          {/* Video List Section */}
          {/* <GroupSwiper videos={videosNewUsTvShow} /> */}

          {/* Line Break  */}
          {/* <LineBreak title="JAPANESE ANIME" /> */}

          {/* Video List Section */}
          {/* <GroupSwiper videos={videosNewJpAnime} /> */}

          {/* Line Break  */}
          {/* <LineBreak title="CHINESE REALITY TV" /> */}

          {/* Video List Section */}
          {/* <GroupSwiper videos={videosNewCnReality} /> */}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // let resultsPromiseAll;
  // try {
  //   resultsPromiseAll = await Promise.allSettled([
  //     fetch(`${process.env.MOVIE_API}/?ac=detail&t=33`).then((res) =>
  //       res.json()
  //     ),
  //     fetch(`${process.env.MOVIE_API}/?ac=detail&t=34`).then((res) =>
  //       res.json()
  //     ),
  //     fetch(`${process.env.MOVIE_API}/?ac=detail&t=36`).then((res) =>
  //       res.json()
  //     ),
  //     fetch(`${process.env.MOVIE_API}/?ac=detail&t=41`).then((res) =>
  //       res.json()
  //     ),
  //     fetch(`${process.env.MOVIE_API}/?ac=detail&t=46`).then((res) =>
  //       res.json()
  //     ),
  //   ]);
  // } catch (error) {
  //   console.error(error);
  // }

  // const successes = resultsPromiseAll
  //   .filter((x) => x.status === "fulfilled")
  //   .map((x) => x.value);

  // const failures = resultsPromiseAll
  //   .filter((x) => x.status === "rejected")
  //   .map((x) => x.reason);
  // if (!failures || failures?.length !== 0)
  //   console.error("index page fetching error", failures);

  // // asign all return needed data
  // const [
  //   videosNewCnTvShow = {},
  //   videosNewKrTvShow = {},
  //   videosNewUsTvShow = {},
  //   videosNewCnReality = {},
  //   videosNewJpAnime = {},
  // ] = successes;

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
  ]).slice(0, 6);

  return {
    props: {
      selectedVideosForHero,
      doubanHotTvList,
      doubanHotMovieList,
      doubanNewMovieList,
      // videosNewCnTvShow,
      // videosNewKrTvShow,
      // videosNewUsTvShow,
      // videosNewCnReality,
      // videosNewJpAnime,
    },
    revalidate: 3500,
  };
}
