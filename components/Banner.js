import Image from "next/image";
import { PlayIcon, XIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const Banner = ({ detail }) => {
  console.log(detail);
  let vod_pic, vod_name, vod_blurb, vod_director, vod_actor, vod_class, url;
  url = "https://s1.yh5125.com/20211105/450FAdFS/index.m3u8";
  vod_pic = detail.vod_pic;
  vod_name = detail.vod_name;
  vod_blurb = detail.vod_blurb;
  vod_director = detail.vod_director;
  vod_actor = detail.vod_actor;
  vod_class = detail.vod_class;
  if (detail.mode !== "homePage") {
    url = detail.vod_play_url
      .split("$$$")[1]
      .split("#")
      .slice(-1)[0]
      .split("$")[1];
  } else {
    // fetch(
    //   `${process.env.MOVIE_API}/?ac=detail&wd=${vod_name}`
    // ).then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // const detail = await res.json();

    // const videoList = detail.list[0].vod_play_url.split("$$$")[1].split("#");
  }
  const [play, setPlay] = useState(false);

  return (
    <>
      {/* Player */}
      {play && (
        <div className="flex h-full w-full absolute top-0 left-0 items-center bg-black/50 z-10">
          <XIcon
            className="h-10 w-10 text-blue-white absolute right-4 top-12 bg-black cursor-pointer hover:bg-white hover:text-black animate-fadeIn z-50"
            onClick={() => setPlay(false)}
          />
          <VideoPlayer src={url} />
        </div>
      )}

      {/* <banner-skeleton v-if="isLoading" /> */}

      <div className="relative w-full h-full">
        {/* image section */}
        <div className="relative h-[85vh]">
          <Image
            src={
              vod_pic
                ? vod_pic
                : "https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
            }
            alt="banner"
            className="object-cover blur-sm relative brightness-50"
            layout="fill"
          />
          <div className="absolute h-[90%] w-[100%-7rem] top-[3.8rem] left-[0.5rem] right-[0.5rem] sm:left-[1.5rem] sm:right-[1.5rem] md:left-[2.5rem] md:right-[2.5rem] lg:left-[3.5rem] lg:right-[3.5rem]">
            <Image
              src={
                vod_pic
                  ? vod_pic
                  : "https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
              }
              alt="banner"
              className="object-cover"
              layout="fill"
            />
          </div>
        </div>

        {/* text section */}
        <div className=" absolute inset-0 flex items-center justify-between mx-2 sm:mx-10 md:mx-16 lg:mx-20 mt-16 border-x-2 border-gray-300/20">
          <div className="w-[70%] md:w-[60%] lg:w-[50%] space-y-6 backdrop-blur-md bg-black/40 p-1 md:p-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl line-clamp-2 text-white">
              {/* {{ banner.title || banner.name }} */}
              {vod_name ? vod_name : "The Walking Dead (2010)"}
            </h1>

            <p className="text-sm line-clamp-2 font-medium sm:line-clamp-3 md:line-clamp-4">
              {/* {{ banner.overview }} */}
              {vod_blurb
                ? vod_blurb
                : "Sheriff's deputy Rick Grimes awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies. He sets out to find his family and encounters many other survivors along the way."}
            </p>

            <div className="flex items-center space-x-2">
              <button
                className="text-black bg-white flex items-center space-x-3 px-10 sm:px-16 md:px-20 py-3 transition-colors duration-200 hover:bg-black hover:text-white border-2 "
                onClick={() => setPlay(true)}
              >
                <PlayIcon className="h-6 w-6 text-blue-white" />
                <p className="font-thin tracking-widest">Play</p>
              </button>
              <button
                className="flex items-center space-x-1 px-3 py-3 bg-black/30 text-white border-2 transition-colors duration-200 hover:bg-white hover:text-black shadow-lg"
                // onClick="handleMoreInfoClick"
              >
                <InformationCircleIcon className="h-6 w-6 text-blue-white" />

                <p className="text-bold hidden md:block">Info</p>
              </button>
            </div>
          </div>
          <div className="w-[40%] lg:w-[30%] h-full border-l-2 border-gray-300/20 text-white text-sm">
            <div className="h-full flex items-end pb-24">
              <div className="flex flex-col backdrop-blur-md bg-black/40 p-1 md:p-4">
                <div className="flex flex-col md:flex-row justify-between w-full mb-4">
                  <div>
                    <p className="text-gray-400">Director</p>
                    <p>{vod_director ? vod_director : "Frank Darabont"}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-gray-400">Stars</p>
                    {vod_actor ? (
                      vod_actor
                    ) : (
                      <div>
                        <p>Norman Reedus</p>
                        <p>Andrew Lincoln</p>
                        <p>Melissa McBride</p>
                        <p>Lauren Cohan</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Genre</p>

                  {vod_class
                    ? vod_class
                    : "Action & Adventure, Drama, Sci-Fi & Fantasy"}
                </div>
              </div>
            </div>
          </div>
          {/* </transition> */}
        </div>

        <div className="banner__overlay--down absolute bottom-0 h-32 w-full"></div>
      </div>

      <style jsx>{`
        .banner__overlay--down {
          background-image: linear-gradient(
            to bottom,
            transparent 10%,
            rgba(var(--background-color-rgb), 0.8),
            rgba(var(--background-color-rgb), 1)
          );
        }

        .banner__overlay {
          background-image: linear-gradient(
            77deg,
            rgba(0, 0, 0, 0.6) 25%,
            transparent 85%
          );
        }
      `}</style>
    </>
  );
};
export default Banner;
