import Image from "next/image";
import { PlayIcon, XIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";

const Banner = () => {
  const [play, setPlay] = useState(false);
  const url = "https://s1.yh5125.com/20211105/450FAdFS/index.m3u8"

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

      {/* Main section */}

      {/* <banner-skeleton v-if="isLoading" /> */}
      <div className="relative w-full h-full">
        {/* image section */}
        <div className="relative h-[85vh]">
          <Image
            src="https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
            alt="banner"
            className="object-cover blur-sm relative brightness-50"
            layout="fill"
          />
          <div className="absolute h-[90%] w-[100%-7rem] top-[3.8rem] left-[3.5rem] right-[3.5rem]">
            <p>test</p>
            <Image
              src="https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
              alt="banner"
              className="object-cover"
              layout="fill"
            />
          </div>
        </div>

        {/* text section */}
        <div className=" absolute inset-0 flex items-center justify-between mx-20 mt-16 border-x-2 border-gray-300/20">
          <div className="w-[50%] space-y-6">
            <h1 className="font-bold text-5xl line-clamp-2 text-white">
              {/* {{ banner.title || banner.name }} */}
              The Walking Dead (2010)
            </h1>

            <p className="text-sm line-clamp-4 font-medium">
              {/* {{ banner.overview }} */}
              Sheriff's deputy Rick Grimes awakens from a coma to find a
              post-apocalyptic world dominated by flesh-eating zombies. He sets
              out to find his family and encounters many other survivors along
              the way.
            </p>

            <div className="flex items-center space-x-2">
              <button
                className="text-black bg-white flex items-center space-x-3 px-20 py-3 hover:bg-black hover:text-white border-2"
                onClick={() => setPlay(true)}
              >
                <PlayIcon className="h-6 w-6 text-blue-white" />
                <p className="font-thin tracking-widest">Play</p>
              </button>
              <button
                className="
                flex items-center space-x-1 px-3 py-3 
                bg-black/30
                  text-white
                  border-2
                  hover:bg-white
                  hover:text-black
                  shadow-lg
                "
                // onClick="handleMoreInfoClick"
              >
                <InformationCircleIcon className="h-6 w-6 text-blue-white" />

                <p className="text-bold">Info</p>
              </button>
            </div>
          </div>
          <div className="w-[30%] h-full border-l-2 border-gray-300/20 text-white text-sm">
            <div className="h-full flex items-end pb-24">
              <div className="flex flex-col">
                <div className="flex justify-between w-full mb-4">
                  <div>
                    <p>Director</p>
                    <p>Frank Darabont</p>
                  </div>
                  <div className="text-right">
                    <p>Stars</p>
                    <p>Norman Reedus</p>
                    <p>Andrew Lincoln</p>
                    <p>Melissa McBride</p>
                    <p>Lauren Cohan</p>
                  </div>
                </div>
                <div>Action & Adventure, Drama, Sci-Fi & Fantasy</div>
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