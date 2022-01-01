import { randomSelect5FromArray } from "../utils/utils";

import HeadTag from "../components/HeadTag";
import Footer from "../components/Footer";
import { default as Navbar } from "../components/Header";
import HeroSwiper from "../components/HeroSwiper";
import VideoListsSection from "../components/VideoListsSection";
import Pagination from "../components/Pagination";
import LineBreak from "../components/LineBreak";
import GroupSwiper from "../components/GroupSwiper";

export default function Home({
  videosNewAll,
  top250,
  videosNewAction,
  videosNewHorror,
  videosNewCnTvShow,
  videosNewKrTvShow,
  videosNewUsTvShow,
  videosNewCnReality,
  videosNewJpAnime,
  videosNewCnAnime,
}) {
  // console.log(videosNewAll);
  const top5 = randomSelect5FromArray(top250);
  return (
    <>
      {/* HTML Head Element */}
      <HeadTag />

      {/* Navigation component */}
      <Navbar />

      {/* Main section */}
      <main className="w-full h-full max-w-screen-2xl mx-auto">
        {/* Swiper section */}
        <HeroSwiper top5={top5} />
        <div className="-translate-y-9">
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
          <LineBreak title="CHINESE REALITY TV" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewCnReality} />

          {/* Line Break  */}
          <LineBreak title="JAPANESE ANIME" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewJpAnime} />

          {/* Line Break  */}
          <LineBreak title="CHINESE ANIME" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewCnAnime} />

          {/* Line Break  */}
          <LineBreak title="HORROR MOVIES" />

          {/* Video List Section */}
          <GroupSwiper videos={videosNewHorror} />
        </div>
      </main>

      {/* Footer component */}
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const resNewAll = await fetch(`${process.env.MOVIE_API}/?ac=detail`);
  const videosNewAll = await resNewAll.json();

  const resNewAction = await fetch(`${process.env.MOVIE_API}/?ac=detail&t=6`);
  const videosNewAction = await resNewAction.json();

  const resNewHorror = await fetch(`${process.env.MOVIE_API}/?ac=detail&t=9`);
  const videosNewHorror = await resNewHorror.json();

  const resNewCnTvShow = await fetch(
    `${process.env.MOVIE_API}/?ac=detail&t=13`
  );
  const videosNewCnTvShow = await resNewCnTvShow.json();

  const resNewKrTvShow = await fetch(
    `${process.env.MOVIE_API}/?ac=detail&t=16`
  );
  const videosNewKrTvShow = await resNewKrTvShow.json();

  const resNewUsTvShow = await fetch(
    `${process.env.MOVIE_API}/?ac=detail&t=15`
  );
  const videosNewUsTvShow = await resNewUsTvShow.json();

  const resNewCnReality = await fetch(
    `${process.env.MOVIE_API}/?ac=detail&t=26`
  );
  const videosNewCnReality = await resNewCnReality.json();

  const resNewJpAnime = await fetch(`${process.env.MOVIE_API}/?ac=detail&t=31`);
  const videosNewJpAnime = await resNewJpAnime.json();

  const resNewCnAnime = await fetch(`${process.env.MOVIE_API}/?ac=detail&t=30`);
  const videosNewCnAnime = await resNewCnAnime.json();

  const resTop250 = await fetch(
    `https://api.wmdb.tv/api/v1/top?type=Douban&skip=0&limit=200&lang=Cn`
  );
  const top250 = await resTop250.json();

  return {
    props: {
      videosNewAll,
      top250,
      videosNewAction,
      videosNewHorror,
      videosNewCnTvShow,
      videosNewKrTvShow,
      videosNewUsTvShow,
      videosNewCnReality,
      videosNewJpAnime,
      videosNewCnAnime,
    },
    revalidate: 21600,
  };
}
