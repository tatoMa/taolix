import { randomSelect5FromArray } from "../utils/utils";

import HeadTag from "../components/HeadTag";
import Footer from "../components/Footer";
import { default as Navbar } from "../components/Header";
import SwiperTag from "../components/SwiperTag";
import VideoListsSection from "../components/VideoListsSection";
import Pagination from "../components/Pagination";
import LineBreak from "../components/LineBreak";

export default function Home({ videos, page, top250 }) {
  // console.log(videos);
  const top5 = randomSelect5FromArray(top250);
  return (
    <>
      {/* HTML Head Element */}
      <HeadTag />

      {/* Navigation component */}
      <Navbar />

      {/* Main section */}
      <main className="w-full h-full md:pb-8 max-w-screen-2xl mx-auto">
        {/* Swiper section */}
        <SwiperTag top5={top5} />

        {/* Line Break  */}
        <LineBreak title="NEW MOVIES" />

        {/* Video List Section */}
        <VideoListsSection videos={videos} />
      </main>

      {/* pagination */}
      <Pagination page={page} />

      {/* Line Break  */}
      <LineBreak title=" " />

      {/* Footer component */}
      <Footer className="max-w-screen-2xl" />
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${process.env.MOVIE_API}/?ac=detail&pg=${page}`);
  const videos = await res.json();

  const resTop250 = await fetch(
    `https://api.wmdb.tv/api/v1/top?type=Douban&skip=0&limit=200&lang=Cn`
  );
  const top250 = await resTop250.json();

  return {
    props: {
      videos,
      page,
      top250,
    },
  };
}
