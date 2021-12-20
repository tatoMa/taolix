import { Router } from "next/router";
import Link from "next/link";

import HeadTag from "../components/HeadTag";
import { default as Navbar } from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VideoItem from "../components/VideoItem";
import LineBreak from "../components/LineBreak";
import VideoListsSection from "../components/VideoListsSection";
import Pagination from "../components/Pagination";

export default function Home({ videos, page, t }) {
  // console.log(t);
  return (
    <>
      {/* HTML Head Element */}
      <HeadTag />
      {/* Navigation component */}
      <Navbar />

      {/* Main section */}
      {/* <div className="min-h-screen"> */}
      <main className="w-full h-full md:pb-8 max-w-screen-2xl mx-auto mt-16 pt-6">
        {/* Line Break  */}
        <LineBreak title=" " />

        {/* Video List Section */}
        <VideoListsSection videos={videos} />
      </main>

      {/* pagination */}
      <Pagination page={page} />

      {/* Footer component */}
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query: { page = 1, t } }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `${process.env.MOVIE_API}/?ac=detail&t=${t}&pg=${page}`
  );
  const videos = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      videos,
      page,
      t,
    },
  };
}
