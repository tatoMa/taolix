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
  const api_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "${process.env.SITE_URL}";

  let resNewList;
  try {
    resNewList = await fetch(`${api_url}/api/list`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videosNewAll = await resNewList.json();

  let resNewAction;
  try {
    resNewAction = await fetch(`${api_url}/api/list/2/1`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videosNewAction = await resNewAction.json();

  let resNewCnShow;
  try {
    resNewCnShow = await fetch(`${api_url}/api/list/15/1`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videosNewCnTvShow = await resNewCnShow.json();

  let resNewKrShow;
  try {
    resNewKrShow = await fetch(`${api_url}/api/list/19/1`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videosNewKrTvShow = await resNewKrShow.json();

  let resNewUsShow;
  try {
    resNewUsShow = await fetch(`${api_url}/api/list/18/1`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videosNewUsTvShow = await resNewUsShow.json();

  let resNewCnReality;
  try {
    resNewCnReality = await fetch(`${api_url}/api/list/22/1`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videosNewCnReality = await resNewCnReality.json();

  let resNewJpAnime;
  try {
    resNewJpAnime = await fetch(`${api_url}/api/list/28/1`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videosNewJpAnime = await resNewJpAnime.json();

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
