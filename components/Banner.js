import Image from "next/image";
import { PlayIcon, XIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/outline";
import React from "react";
import VideoJS from "./Videojs";
import { useState } from "react";
const Banner = () => {
  const [play, setPlay] = useState(false);

  const playerRef = React.useRef(null);
  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://vd8.kanzy3.com/20211126/0NTrCHyR/index.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };
  // const videoJsOptions = {
  //   autoplay: false,
  //   controls: true,
  //   fluid: true,
  //   aspectRatio: "16:9",
  //   fill: true,
  //   sources: [
  //     {
  //       src: "https://vd8.kanzy3.com/20211126/0NTrCHyR/index.m3u8",
  //       type: "application/x-mpegURL",
  //     },
  //   ],
  // };
  return (
    <>
      {play && (
        <div
          className="flex h-full w-full absolute items-center bg-black/50 z-10"
        >
          <XIcon className="h-8 w-8 text-blue-white absolute right-0 top-28 z-50 cursor-pointer hover:bg-white hover:text-black animate-fadeIn" onClick={() => setPlay(false)}/>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
      )}
      <div className="w-full h-full">
        {/* <banner-skeleton v-if="isLoading" /> */}
        <div
          v-if="!isLoading"
          className="banner-container relative w-full h-full"
        >
          <div className="min-w-full min-h-full">
            <Image
              src="https://image.tmdb.org/t/p/original/5RMqFZdefnDwY7rdD1oJcTkWPdF.jpg"
              alt="banner"
              className="object-cover w-full h-full"
              width={1900}
              height={1100}
            />
          </div>

          <div className="banner__overlay absolute inset-0 flex items-center px-12">
            {/* <transition
          appear
          enter-active-className="animate__animated animate__slideInUp"
          leave-active-className="animate__animated animate__slideInDown"
          mode="out-in"
        > */}
            <div className="w-[40%] space-y-6">
              <h1 className="text-3xl font-bold line-clamp-2">
                {/* {{ banner.title || banner.name }} */}
                Diary of a Wimpy Kid
              </h1>

              <p className="text-lg line-clamp-4 font-medium">
                {/* {{ banner.overview }} */}
                Greg Heffley is a scrawny but ambitious kid with an active
                imagination and big plans to be rich and famous – he just has to
                survive middle school first.
              </p>

              <div className="flex items-center space-x-2">
                <button
                  className="text-black bg-white flex items-center space-x-3 px-6 py-2 rounded-md hover:bg-opacity-80"
                  onClick={() => setPlay(true)}
                >
                  <PlayIcon className="h-6 w-6 text-blue-white" />
                  <p className="text-bold">Play</p>
                </button>
                <button
                  className="
                flex items-center space-x-3 px-6 py-2 rounded-md
                  text-white
                  bg-secondary bg-opacity-60
                  hover:bg-opacity-40
                  shadow-lg
                "
                  // onClick="handleMoreInfoClick"
                >
                  <InformationCircleIcon className="h-6 w-6 text-blue-white" />

                  <p className="text-bold">More info</p>
                </button>
              </div>
            </div>
            {/* </transition> */}
          </div>

          <div className="banner__overlay--down absolute bottom-0 h-32 w-full"></div>
        </div>
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
