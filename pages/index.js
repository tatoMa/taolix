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
  videosHotListDoubanFiltered,
  videosNewAll,
  videosNewAction,
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
      <div className="w-full h-full max-w-screen-2xl mx-auto ">
        {/* Swiper section */}
        <HeroSwiper top5={selectedVideosForHero} />
        <div className="-translate-y-9">
          {/* Line Break  */}
          <LineBreak title="WHATS HOT" />

          {/* Video List Section */}
          <GroupSwiper videos={videosHotListDoubanFiltered} />

          {/* Line Break  */}
          <LineBreak title="NEW ARRIVALS" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewAll} />

          {/* Line Break  */}
          <LineBreak title="ACTION MOVIES" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewAction} />

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
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  let videosNewAll = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/list`);
    videosNewAll = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  let videosNewAction = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/list/2`);
    videosNewAction = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  let videosNewCnTvShow = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/list/15`);
    videosNewCnTvShow = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  let videosNewKrTvShow = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/list/19`);
    videosNewKrTvShow = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  let videosNewUsTvShow = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/list/18`);
    videosNewUsTvShow = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  let videosNewCnReality = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/list/22`);
    videosNewCnReality = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  let videosNewJpAnime = {};
  try {
    let response = await fetch(`${process.env.SITE_URL}/api/list/28`);
    videosNewJpAnime = await response.json();
  } catch (e) {
    console.error("error: ", e);
  }

  // douban APIs
  const videosHotListDouban = await getVideosListFromDouban(
    `${process.env.DOUBAN_URL}${encodeURI(
      "/j/search_subjects?type=tv&tag=热门&sort=recommend&page_limit=50&page_start=0"
    )}`
  );
  const videosHotListDoubanFindResource = await Promise.all(
    videosHotListDouban.map(
      async (item) => await findResourceFromDoubanItem(item)
    )
  );

  const videosHotListDoubanFiltered = {};
  videosHotListDoubanFiltered.list =
    videosHotListDoubanFindResource.filter(Boolean);

  const selectedVideosForHero = shuffle([
    ...videosHotListDoubanFiltered.list,
  ]).slice(0, 6);

  return {
    props: {
      selectedVideosForHero,
      videosHotListDoubanFiltered,
      videosNewAll,
      videosNewAction,
      videosNewCnTvShow,
      videosNewKrTvShow,
      videosNewUsTvShow,
      videosNewCnReality,
      videosNewJpAnime,
    },
    revalidate: 3600,
  };
}
