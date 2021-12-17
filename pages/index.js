import { Router } from "next/router";
import Link from "next/link";

import HeadTag from "../components/HeadTag";
import Footer from "../components/Footer";
import { default as Navbar } from "../components/Header";
import SwiperTag from "../components/SwiperTag";
import VideoListsSection from "../components/VideoListsSection";

import {randomSelect5FromArray} from "../utils/utils"

export default function Home({ videos, page, top250 }) {
  console.log(videos)
  const top5 = randomSelect5FromArray(top250)
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
      <div className="w-full h-full max-w-screen-2xl mx-auto flex justify-center mt-8 md:mt-0 mb-2">
        <Link href={`/?page=${parseInt(page) - 1}`}>
          <a
            className={`px-4 py-2 mx-1 ${
              page == 1
                ? "text-gray-500 cursor-not-allowed bg-black border border-white"
                : "text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black"
            }`}
          >
            PREVIOUS
          </a>
        </Link>

        <Link href={`/?page=${parseInt(page) + 1}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            {parseInt(page) + 1}
          </a>
        </Link>
        <Link href={`/?page=${parseInt(page) + 2}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            {parseInt(page) + 2}
          </a>
        </Link>
        <Link href={`/?page=${parseInt(page) + 3}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            {parseInt(page) + 3}
          </a>
        </Link>

        <Link href={`/?page=${parseInt(page) + 1}`}>
          <a className="px-4 py-2 mx-1 text-white transition-colors duration-200 transform bg-black border border-white hover:bg-white hover:text-black">
            NEXT
          </a>
        </Link>
      </div>

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
  console.log(videos)


  const resTop250 = await fetch(
    `https://api.wmdb.tv/api/v1/top?type=Douban&skip=0&limit=100&lang=Cn`
  );
  const top250 = await resTop250.json();
  console.log(top250);

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
