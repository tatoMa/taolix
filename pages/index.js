import {
  randomSelect5FromArray,
  getVideosListFromApi,
  findMovieFromApiByTitle,
  filterNeededVideoInfo,
  getVideosListFromDouban,
} from "../utils/utils";
import HeroSwiper from "../components/HeroSwiper";
import LineBreak from "../components/LineBreak";
import GroupSwiper from "../components/GroupSwiper";

export default function Home({
  videosNewAll,
  selected5FromTop250,
  videosNewAction,
  videosNewHorror,
  videosNewCnTvShow,
  videosNewKrTvShow,
  videosNewUsTvShow,
  videosNewCnReality,
  videosNewJpAnime,
  videosNewCnAnime,
  videosHotListDoubanFiltered,
}) {
  // console.log(videosHotListDoubanFiltered);
  const top5 = selected5FromTop250;
  return (
    <>
      {/* Main section */}
      <div className="w-full h-full max-w-screen-2xl mx-auto ">
        {/* Swiper section */}
        <HeroSwiper top5={top5} />
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

          {/* Line Break  */}
          {/* <LineBreak title="CHINESE ANIME" /> */}

          {/* Video List Section */}
          {/* <GroupSwiper videos={videosNewCnAnime} /> */}

          {/* Line Break  */}
          {/* <LineBreak title="HORROR MOVIES" /> */}

          {/* Video List Section */}
          {/* <GroupSwiper videos={videosNewHorror} /> */}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const videosNewAll = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail`
  );

  const videosNewAction = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=6`
  );

  const videosNewHorror = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=9`
  );

  const videosNewCnTvShow = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=13`
  );

  const videosNewKrTvShow = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=16`
  );

  const videosNewUsTvShow = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=15`
  );

  const videosNewCnReality = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=26`
  );

  const videosNewJpAnime = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=31`
  );

  const videosNewCnAnime = await getVideosListFromApi(
    `${process.env.MOVIE_API}/?ac=detail&t=30`
  );
  const videosHotListDouban = await getVideosListFromDouban(
    `${process.env.DOUBAN_URL}${encodeURI(
      "/j/search_subjects?type=tv&tag=热门&sort=recommend&page_limit=30&page_start=0"
    )}`
  );
  const videosHotListDoubanFindResource = await Promise.all(
    videosHotListDouban.map(async (item) => {
      let temp = await findMovieFromApiByTitle(item.title);
      if (temp) {
        temp = { ...filterNeededVideoInfo(temp.list[0]), ...item };
      }
      return temp;
    })
  );

  const videosHotListDoubanFiltered = {};
  videosHotListDoubanFiltered.list =
    videosHotListDoubanFindResource.filter(Boolean);

  const resTop250 = await fetch(
    `https://api.wmdb.tv/api/v1/top?type=Douban&skip=0&limit=200&lang=Cn`
  );
  const top250 = await resTop250.json();

  const videosFoundBySearchingTop250List = await Promise.all(
    randomSelect5FromArray(top250).map(
      async (item) => await findMovieFromApiByTitle(item.data[0].name)
    )
  );

  // const found = await findMovieFromApiByTitle("一年一度喜剧大赛");
  const selected5FromTop250 = videosFoundBySearchingTop250List.map((item) => {
    if (item) return item.list[0];
  });

  return {
    props: {
      selected5FromTop250: selected5FromTop250.filter(Boolean).map((item) => {
        return {
          vod_pic: item.vod_pic,
          vod_name: item.vod_name,
          vod_blurb: item.vod_blurb,
          vod_director: item.vod_director,
          vod_actor: item.vod_actor,
          vod_class: item.vod_class,
          vod_play_url: item.vod_play_url,
          vod_id: item.vod_id,
        };
      }),
      videosNewAll,
      videosNewAction,
      videosNewHorror,
      videosNewCnTvShow,
      videosNewKrTvShow,
      videosNewUsTvShow,
      videosNewCnReality,
      videosNewJpAnime,
      videosNewCnAnime,
      videosHotListDoubanFiltered,
    },
    revalidate: 7200,
  };
}
