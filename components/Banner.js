import Image from "next/image";
import { PlayIcon } from "@heroicons/react/solid";

import { useState } from "react";
import { useRouter } from "next/router";

import Player from "./Player";
import {
  filterHtmlTagsFromString,
  getVideoUrlsFromUrlStr,
} from "../utils/utils";

const Banner = ({ detail }) => {
  // console.log(detail);
  let {
    vod_id,
    vod_name,
    vod_class,
    vod_pic,
    vod_remarks,
    rate,
    type_name,
    vod_actor,
    vod_blurb,
    vod_director,
    vod_content,
    vod_pubdate,
    vod_tag,
    vod_time,
    vod_year,
    vod_writer,
    vod_lang,
    vod_sub,
  } = detail;
  const router = useRouter();
  const [play, setPlay] = useState(false);

  // find the latest episode of this video series
  const getLatestVideoUrlAndName = () => {
    if (detail.mode !== "homePage") {
      if (detail.vod_play_url) {
        let videoList = getVideoUrlsFromUrlStr(detail.vod_play_url);
        if (videoList) return videoList.slice(-1)[0];
      }
    }
    return { url: "", name: "" };
  };
  const { url, name: latestName } = getLatestVideoUrlAndName();

  // button handler
  const playButtonHandler = (e) => {
    // window.location.href = url;
    setPlay(true);
    scroll(0, 0);
    document.documentElement.style.overflowY = "hidden";
  };
  const indexButtonHandler = (e) => {
    if (detail.mode === "homePage") router.push(`/detail/${detail.vod_id}`);
  };

  return (
    <div
      className={`w-full md:aspect-[3/2] lg:aspect-[16/7] ${
        detail.mode === "homePage" &&
        "px-0 md:px-6 lg:px-8 cursor-pointer active:brightness-125 hover:brightness-110"
      }`}
      onClick={() => indexButtonHandler()}
    >
      {/* Player */}
      {play && <Player url={url} setPlay={setPlay} />}

      {/* background image section */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {/* <Image
          unoptimized={true}
          src={
            vod_pic
              ? vod_pic
              : "https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
          }
          alt="banner"
          className="object-cover blur-sm relative opacity-20"
          layout="fill"
          referrerPolicy="no-referrer"
          priority
        /> */}
        <img
          src={vod_pic}
          alt="vod_name"
          className="object-cover blur-sm relative opacity-20 h-full w-full"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* main section */}
      <main className="relative w-full h-full flex flex-col-reverse md:flex-row z-10">
        <div className="md:w-1/2 lg:w-3/5 text-white flex items-center md:pr-4 -translate-y-10 md:translate-y-10 z-20">
          <div className="overflow-hidden relative">
            <div className=" pr-28 md:pr-0 relative text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-red-600 border-b border-red-500">
              <h1>{vod_name && vod_name}</h1>
              <h2 className="text-sm font-light text-red-700/60 line-clamp-1">
                {vod_sub && vod_sub}
              </h2>
            </div>
            <div className="absolute right-0 top-6 text-sm mt-4 text-gray-200/75">
              {vod_lang && vod_lang}
            </div>

            {detail.mode !== "homePage" && (
              <button
                onClick={() => playButtonHandler()}
                className="absolute animate-bounce right-0 top-2 hover:animate-none text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-red-600 cursor-pointer flex items-center justify-end"
              >
                <PlayIcon className="h-8 w-8 text-orange-500 " />
                <a className="text-lg text-orange-500 z-10">
                  {detail.mode === "homePage"
                    ? "Details"
                    : url
                    ? `${latestName}`
                    : "Not found"}
                </a>
              </button>
            )}

            <div className="flex text-gray-400 text-sm mt-7">
              <div className="flex-1">{vod_remarks}</div>
              <div>{vod_time && vod_time.split(" ")[0]}</div>
            </div>

            <div className="flex mt-3 flex-nowrap">
              {vod_tag &&
                vod_tag.split(",").map((i) => (
                  <div
                    key={i}
                    className=" bg-red-600 text-white text-xs px-2 py-[0.12rem] mr-2 rounded-full inline-block whitespace-nowrap"
                  >
                    {i}
                  </div>
                ))}
            </div>

            <h2 className="text-sm mt-4 text-gray-200/90 line-clamp-1">
              {vod_director && "Direct: " + vod_director}
            </h2>
            <h2 className="text-sm mt-1 text-gray-200/90 line-clamp-1">
              {vod_actor && "Actor: " + vod_actor}
            </h2>

            <p className="text-sm mt-3 opacity-90 text-gray-400 line-clamp-4 md:line-clamp-3 lg:line-clamp-5">
              {vod_blurb ? vod_blurb : filterHtmlTagsFromString(vod_content)}
            </p>
          </div>
        </div>

        <div className="w-full min-h-[60vh] md:min-h-full md:w-1/2 lg:w-2/5 md:aspect-[3/4] relative">
          {/* <Image
            unoptimized={true}
            src={
              vod_pic
                ? vod_pic
                : "https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
            }
            alt="banner"
            className="object-cover z-0"
            layout="fill"
            referrerPolicy="no-referrer"
            // priority
          /> */}
          <img
            src={vod_pic}
            alt="vod_name"
            className="object-cover z-10 h-full w-full"
            referrerPolicy="no-referrer"
          />
          {rate && (
            <div className="absolute right-0 top-[4rem] md:top-[90%] bg-black/70 text-sm text-orange-400 pl-2 pr-1 py-[0.125rem] rounded-l-full">
              {"豆瓣 " + rate + "★"}
            </div>
          )}
          <div className="absolute w-full h-1/3 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
          {/* <div className="hidden md:block absolute left-0 z-20 w-1/6 h-full bg-gradient-to-r from-black/90 to-transparent"></div> */}
          <div className="absolute bottom-0 w-full h-1/6 bg-gradient-to-t md:hidden from-black via-black/70 to-transparent"></div>
          {/* <div>123</div> */}
        </div>
        {/* <div className="absolute w-full z-20 h-1/4 -bottom-1 bg-gradient-to-t from-black via-transparent to-transparent"></div> */}
      </main>
      {/* <Image
          unoptimized={true}
          src={
            vod_pic
              ? vod_pic
              : "https://www.themoviedb.org/t/p/original/wmv0oIun52Xeq65sBKfHiUkiBKc.jpg"
          }
          alt="banner"
          className="object-cover blur-sm relative opacity-10"
          layout="fill"
          referrerPolicy="no-referrer"
          priority
        /> */}
      {/* <div className="absolute h-[90%] w-[100%-7rem] top-[3.8rem] left-[0.5rem] right-[0.5rem] sm:left-[1.5rem] sm:right-[1.5rem] md:left-[2.5rem] md:right-[2.5rem] lg:left-[3.5rem] lg:right-[3.5rem]">
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
            priority
          />
        </div> */}

      {/* text section */}
      {/* <div className=" absolute inset-0 flex items-center justify-between mx-6 sm:mx-10 md:mx-16 lg:mx-20 mt-16 border-x-2 border-gray-300/20">
        <div className="w-[70%] md:w-[60%] lg:w-[50%] space-y-6 backdrop-blur-md bg-black/40 p-1 md:p-4">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl line-clamp-2 pb-2 text-white border-b-2 border-red-600">
            {vod_name}
          </h1>

          <p className="text-sm line-clamp-5 sm:line-clamp-4 md:line-clamp-3 text-gray-200">
            {vod_content
              ? vod_content
                  .split(/<[^/].*?>(.*?)<\/.*?>/g)
                  .filter((x) => x != "")
              : vod_blurb
              ? vod_blurb
              : ""}
          </p>

          <div className="flex items-center space-x-2">
            <button
              className="text-black bg-white flex items-center space-x-3 px-10 sm:px-16 md:px-20 py-3 transition-colors duration-200 hover:bg-black hover:text-white border-2 "
              onClick={() => playButtonHandler()}
            >
              {detail.mode !== "homePage" && url && (
                <PlayIcon className="h-7 w-7" />
              )}
              {detail.mode === "homePage" && <FilmIcon className="h-7 w-7" />}
              <p className="font-thin tracking-widest">
                {detail.mode === "homePage"
                  ? "Details"
                  : url
                  ? `${latestName}`
                  : "Not found"}
              </p>
            </button>
          </div>
        </div>
        <div className="w-[40%] lg:w-[30%] h-full border-l-2 border-gray-300/20 text-white text-sm">
          <div className="h-full flex items-end pb-24">
            <div className="flex flex-col backdrop-blur-md bg-black/40 p-1 md:p-4">
              <div className="flex flex-col md:flex-row justify-between w-full mb-4">
                <div>
                  <p className="text-gray-400">{vod_director && "Director"}</p>
                  <p className="whitespace-nowrap">{vod_director}</p>
                </div>
                <div className="pl-3 text-right hidden sm:block">
                  <p className="text-gray-400">{vod_actor && "Stars"}</p>
                  <p className="line-clamp-5">{vod_actor}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400">{vod_class && "Genre"}</p>
                {vod_class}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="banner__overlay--down absolute bottom-0 h-32 w-full"></div> */}

      {/* <style jsx>{`
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
      `}</style> */}
    </div>
  );
};
export default Banner;
