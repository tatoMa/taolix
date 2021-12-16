import { Router } from "next/router";
import Link from "next/link";

import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VideoList from "../components/VideoList";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

export default function Home({ videos, page, top250 }) {
  console.log(videos);
  console.log(top250);
  top250.sort( () => .5 - Math.random() ).length=5
  return (
    <>
      {/* HTML Head Element */}
      <Head>
        <title>TAOLIX - Free videos online</title>
        <meta charSet="UTF-8"></meta>
        <meta name="keywords" content="movie, show, video, taolix"></meta>
        <meta
          name="description"
          content="Taolix, Your favorite movies and shows online"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="author" content="TATO"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header component */}
      <Header />

      {/* Main section */}
      {/* <div className="min-h-screen"> */}
      <main className="w-full h-full md:pb-8 max-w-screen-2xl mx-auto">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          autoPlay
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {top250.map((movie)=>(
            <SwiperSlide>
            <Banner detail={{vod_pic:movie.data[0].poster, vod_name:movie.data[0].name, vod_blurb:movie.data[0].description, vod_director:'', vod_actor:'', vod_class:movie.data[0].genre}}/>
          </SwiperSlide>
          ))}
          
          {/* <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide> */}
        </Swiper>
        <div className="text-3xl text-white border-b -translate-y-6 mt-5 mx-2 sm:mx-6 md:mx-10 lg:mx-14">
          LATEST
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-6 md:px-10 lg:px-14">
          {videos.list.map((movie) => (
            <VideoList
              name={movie.vod_name}
              type={movie.vod_class}
              pic={movie.vod_pic}
              url={movie.vod_play_url
                .split("$$$")[1]
                .substring(movie.vod_play_url.split("$$$")[1].indexOf("h"))}
              id={movie.vod_id}
              key={movie.vod_id}
            />
          ))}
        </div>
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
  const res = await fetch(
    `https://m3u8.xiangkanapi.com/provide/vod/?ac=detail&pg=${page}`
  );
  const videos = await res.json();

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
