import {
  getVideosListFromDouban,
  shuffle,
  findResourceFromDoubanItem,
} from "../utils/utils";
import HeroSwiper from "../components/HeroSwiper";
import LineBreak from "../components/LineBreak";
import GroupSwiper from "../components/GroupSwiper";

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

export async function getStaticProps() {
  let resultsPromiseAll;
  try {
    resultsPromiseAll = await Promise.allSettled([
      // fetch(`${process.env.SITE_URL}/api/list`).then((res) => res.json()),
      // fetch(`${process.env.SITE_URL}/api/list/2`).then((res) => res.json()),
      fetch(`${process.env.SITE_URL}/api/list/15`).then((res) => res.json()),
      fetch(`${process.env.SITE_URL}/api/list/19`).then((res) => res.json()),
      fetch(`${process.env.SITE_URL}/api/list/18`).then((res) => res.json()),
      fetch(`${process.env.SITE_URL}/api/list/22`).then((res) => res.json()),
      fetch(`${process.env.SITE_URL}/api/list/28`).then((res) => res.json()),
    ]);
  } catch (error) {
    console.error(error);
  }

  const successes = resultsPromiseAll
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failures = resultsPromiseAll
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);

  // map and filter results for return needed
  // const filteredByName = successes.map((item) => {
  //   let temp = [];
  //   temp[0] = item.list.find(
  //     (item) =>
  //       removeAllSpecialCharactersFromString(item.vod_name) === videoName
  //   );
  //   return { ...item, list: temp[0] !== undefined ? temp : [] };
  // });

  // asign all return needed data
  const [
    videosNewCnTvShow,
    videosNewKrTvShow,
    videosNewUsTvShow,
    videosNewCnReality,
    videosNewJpAnime,
  ] = successes;

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  // let videosNewAll = {};
  // try {
  //   let response = await fetch(`${process.env.SITE_URL}/api/list`);
  //   videosNewAll = await response.json();
  // } catch (e) {
  //   console.error("error: ", e);
  // }

  // let videosNewAction = {};
  // try {
  //   let response = await fetch(`${process.env.SITE_URL}/api/list/2`);
  //   videosNewAction = await response.json();
  // } catch (e) {
  //   console.error("error: ", e);
  // }

  // let videosNewCnTvShow = {};
  // try {
  //   let response = await fetch(`${process.env.SITE_URL}/api/list/15`);
  //   videosNewCnTvShow = await response.json();
  // } catch (e) {
  //   console.error("error: ", e);
  // }

  // let videosNewKrTvShow = {};
  // try {
  //   let response = await fetch(`${process.env.SITE_URL}/api/list/19`);
  //   videosNewKrTvShow = await response.json();
  // } catch (e) {
  //   console.error("error: ", e);
  // }

  // let videosNewUsTvShow = {};
  // try {
  //   let response = await fetch(`${process.env.SITE_URL}/api/list/18`);
  //   videosNewUsTvShow = await response.json();
  // } catch (e) {
  //   console.error("error: ", e);
  // }

  // let videosNewCnReality = {};
  // try {
  //   let response = await fetch(`${process.env.SITE_URL}/api/list/22`);
  //   videosNewCnReality = await response.json();
  // } catch (e) {
  //   console.error("error: ", e);
  // }

  // let videosNewJpAnime = {};
  // try {
  //   let response = await fetch(`${process.env.SITE_URL}/api/list/28`);
  //   videosNewJpAnime = await response.json();
  // } catch (e) {
  //   console.error("error: ", e);
  // }

  // get hot movie list from douban API
  let videosHotListDouban = {};

  const gerVideoListFromDoubanApiHotList = async (url) => {
    try {
      videosHotListDouban = await getVideosListFromDouban(
        `${process.env.DOUBAN_URL}${encodeURI(url)}`
      );
    } catch (e) {
      console.error("error: ", e);
    }

    // using Douban ranking video list fetch all individual resource from API
    let videosHotListDoubanFindResource = await Promise.allSettled(
      videosHotListDouban.map(async (item) => {
        try {
          const res = await findResourceFromDoubanItem(item);
          return res;
        } catch (e) {
          console.error("error: ", e);
        }
      })
    );

    // filter unnecessary items
    const videosHotListDoubanFiltered = {};
    videosHotListDoubanFiltered.list = videosHotListDoubanFindResource
      .filter(Boolean)
      .filter((item) => item.status === "fulfilled" && item.value !== undefined)
      .map((item) => item.value);
    return videosHotListDoubanFiltered;
  };

  const doubanHotTvList = await gerVideoListFromDoubanApiHotList(
    "/j/search_subjects?type=tv&tag=热门&sort=recommend&page_limit=50&page_start=0"
  );
  const doubanHotMovieList = await gerVideoListFromDoubanApiHotList(
    "/j/search_subjects?type=movie&tag=热门&sort=recommend&page_limit=50&page_start=0"
  );

  const doubanNewMovieList = await gerVideoListFromDoubanApiHotList(
    "/j/search_subjects?type=movie&tag=最新&sort=recommend&page_limit=50&page_start=0"
  );

  const selectedVideosForHero = shuffle([
    ...doubanHotTvList.list,
    ...doubanHotMovieList.list,
  ]).slice(0, 6);

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
    revalidate: 3600,
  };
}
