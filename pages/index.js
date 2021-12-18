import HeadTag from "../components/HeadTag";
import Footer from "../components/Footer";
import { default as Navbar } from "../components/Header";
import SwiperTag from "../components/SwiperTag";
import VideoListsSection from "../components/VideoListsSection";

import { randomSelect5FromArray } from "../utils/utils";
import Pagination from "../components/Pagination";

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

        <div className="text-3xl text-white border-b -translate-y-6 mt-5 mx-2 sm:mx-6 md:mx-10 lg:mx-14">
          LATEST
        </div>

        {/* Video List Section */}
        <VideoListsSection videos={videos} />
      </main>

      {/* pagination */}
      <Pagination page={page} />

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
  // console.log(videos);

  const resTop250 = await fetch(
    `https://api.wmdb.tv/api/v1/top?type=Douban&skip=0&limit=200&lang=Cn`
  );
  const top250 = await resTop250.json();
  // console.log(top250);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      videos,
      page,
      top250,
    },
  };
}
