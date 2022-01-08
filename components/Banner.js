import Image from "next/image";
import { PlayIcon } from "@heroicons/react/solid";
// import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRouter } from "next/router";

import Player  from "./Player";

const Banner = ({ detail }) => {
  const router = useRouter();

  // console.log(detail);
  let { vod_pic, vod_name, vod_blurb, vod_director, vod_actor, vod_class } =
    detail;
  let url = "";
  let latestName = ""
  if (detail.mode !== "homePage") {
    let latest = detail.vod_play_url
      .split("$$$")[1]?
      .split("#")
      .slice(-1)[0]
      .split("$");

    latestName= latest[0]
    url= latest[1]
  } else {
  }
  const [play, setPlay] = useState(false);
  const playButtonHandler = (e) => {
    if (detail.mode === "homePage") {
      router.push("/search/" + vod_name);
    } else {
        // window.location.href = url;
      setPlay(true);
      scroll(0,0)
      document.documentElement.style.overflowY = "hidden";

    }
  };

  return (
      <div className="relative w-full h-full">

      {/* Player */}
      {play && <Player url={url} setPlay={setPlay}/>}

        {/* image section */}
        <div className="relative h-[75vh] lg:h-[85vh] 2xl:h-[65vh]">
          <Image
            unoptimized={true}
            src={
              vod_pic
                ? vod_pic
                : "https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
            }
            alt="banner"
            className="object-cover blur-sm relative brightness-50"
            layout="fill"
            referrerPolicy="no-referrer"
          />
          <div className="absolute h-[90%] w-[100%-7rem] top-[3.8rem] left-[0.5rem] right-[0.5rem] sm:left-[1.5rem] sm:right-[1.5rem] md:left-[2.5rem] md:right-[2.5rem] lg:left-[3.5rem] lg:right-[3.5rem]">
            <Image
              unoptimized={true}
              src={
                vod_pic
                  ? vod_pic
                  : "https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
              }
              alt="banner"
              className="object-cover"
              layout="fill"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* text section */}
        <div className=" absolute inset-0 flex items-center justify-between mx-6 sm:mx-10 md:mx-16 lg:mx-20 mt-16 border-x-2 border-gray-300/20">
          <div className="w-[70%] md:w-[60%] lg:w-[50%] space-y-6 backdrop-blur-md bg-black/40 p-1 md:p-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl line-clamp-2 pb-2 text-white border-b-2 border-red-600">
              {/* {{ banner.title || banner.name }} */}
              {vod_name }
            </h1>

            <p className="text-sm line-clamp-5 sm:line-clamp-4 md:line-clamp-3 text-gray-200">
              {/* {{ banner.overview }} */}
              {vod_blurb}
            </p>

            <div className="flex items-center space-x-2">
              <button
                className="text-black bg-white flex items-center space-x-3 px-10 sm:px-16 md:px-20 py-3 transition-colors duration-200 hover:bg-black hover:text-white border-2 "
                onClick={() => playButtonHandler()}
              >
                {detail.mode !== "homePage" && url && (
                  <PlayIcon className="h-7 w-7" />
                )}
                <p className="font-thin tracking-widest">
                  {detail.mode === "homePage" ? "Find This" : url ? `${latestName}` : "Not found"}
                </p>
              </button>
              {/* <button
                className="flex items-center space-x-1 px-3 py-3 bg-black/30 text-white border-2 transition-colors duration-200 hover:bg-white hover:text-black shadow-lg"
                // onClick="handleMoreInfoClick"
              >
                <InformationCircleIcon className="h-6 w-6 text-blue-white" />

                <p className="text-bold hidden md:block">Info</p>
              </button> */}
            </div>
          </div>
          <div className="w-[40%] lg:w-[30%] h-full border-l-2 border-gray-300/20 text-white text-sm">
            <div className="h-full flex items-end pb-24">
              <div className="flex flex-col backdrop-blur-md bg-black/40 p-1 md:p-4">
                <div className="flex flex-col md:flex-row justify-between w-full mb-4">
                  <div>
                    <p className="text-gray-400">{vod_director && 'Director'}</p>
                    <p>{vod_director}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-gray-400">{vod_actor && 'Stars'}</p>
                    {vod_actor}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">{vod_class && 'Genre'}</p>
                  {vod_class}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="banner__overlay--down absolute bottom-0 h-32 w-full"></div>

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
      </div>

  );
};
export default Banner;
