// import Image from "next/image";
import { PlayIcon } from "@heroicons/react/solid";

import { useState } from "react";
import { useRouter } from "next/router";

// import Player from "./Player";
import {
  filterHtmlTagsFromString,
  getVideoUrlsFromUrlStr,
} from "../utils/utils";
import PlayerWrapper from "./Player/PlayerWrapper";

const Banner = ({ detail, index = 1 }) => {
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
  const [isLoading, setIsLoading] = useState(false);

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
    if (detail.mode === "homePage") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
      router.push(`/detail/${detail.vod_id}`);
    }
  };

  return (
    <div
      className={`relative aspect-[4/7] w-full md:aspect-[3/2] lg:aspect-[16/7] ${
        detail.mode === "homePage" && "cursor-pointer px-0 md:px-6 lg:px-8"
      }`}
      onClick={() => indexButtonHandler()}
    >
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/60 p-4 lg:p-64 ">
          <svg
            viewBox="-2 -2 42 42"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-10 aspect-square w-1/2 stroke-red-500"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="5">
                <circle strokeOpacity=".4" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </div>
      )}

      {/* Player */}
      {play && <PlayerWrapper url={url} setPlay={setPlay} />}

      {/* background image section */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
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
          className="relative h-full w-full object-cover opacity-20 blur-sm"
          referrerPolicy="no-referrer"
          priority={`${index === 0}`}
        />
      </div>
      <div className="absolute left-0 -bottom-1 h-1/4 w-full bg-gradient-to-t from-black via-transparent to-transparent"></div>

      {/* main section */}
      <main className="group relative z-10 flex h-full w-full flex-col-reverse md:flex-row">
        <div className="z-20 flex -translate-y-10 items-center text-white md:w-1/2 md:translate-y-10 md:pr-4 lg:w-3/5">
          <div className="relative w-full overflow-hidden xl:w-[90%]">
            <div className="relative border-b border-red-500 bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-4xl font-extrabold text-transparent animate-in slide-in-from-left md:pr-0">
              <h1
                className={`${
                  detail.mode !== "homePage" && "w-[calc(100%-6rem)]"
                }`}
              >
                {vod_name && vod_name}
              </h1>
              <h2 className="text-sm font-light text-red-700/60 delay-150 line-clamp-1 animate-in slide-in-from-left">
                {vod_sub && vod_sub}
              </h2>
            </div>
            <div className="absolute right-0 top-6 mt-4 text-sm text-gray-200/75 delay-200 animate-in slide-in-from-left">
              {vod_lang && vod_lang}
            </div>

            {detail.mode !== "homePage" && (
              <button
                onClick={() => playButtonHandler()}
                className="absolute right-0 top-2 flex animate-bounce cursor-pointer items-center justify-end bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-transparent hover:animate-none"
              >
                <PlayIcon className="h-6 w-6 text-orange-500 " />
                <a className="text-md max-w-28 z-10 truncate text-orange-500">
                  {detail.mode === "homePage"
                    ? "Details"
                    : url
                    ? `${latestName}`
                    : "Not found"}
                </a>
              </button>
            )}

            <div className="mt-7 flex text-sm text-gray-400">
              <div className="flex-1">{vod_remarks}</div>
              <div>{vod_time && vod_time.split(" ")[0]}</div>
            </div>

            <div className="mt-3 flex flex-nowrap">
              {vod_tag &&
                vod_tag.split(",").map((i) => (
                  <div
                    key={i}
                    className=" mr-2 inline-block whitespace-nowrap rounded-full bg-red-600 px-2 py-[0.12rem] text-xs text-white"
                  >
                    {i}
                  </div>
                ))}
            </div>

            <h2 className="mt-4 text-sm text-gray-200/90 delay-300 line-clamp-1 animate-in fade-in">
              {vod_director && "Direct: " + vod_director}
            </h2>
            <h2 className="mt-1 text-sm text-gray-200/90 delay-300 line-clamp-1 animate-in fade-in">
              {vod_actor && "Actor: " + vod_actor}
            </h2>

            <p className="mt-3 text-sm text-gray-400 opacity-90 delay-300 line-clamp-4 animate-in fade-in md:line-clamp-3 lg:line-clamp-5">
              {vod_blurb ? vod_blurb : filterHtmlTagsFromString(vod_content)}
            </p>
          </div>
        </div>

        <div className="relative aspect-[3/4] min-h-[60vh] w-full overflow-hidden md:min-h-full md:w-1/2 lg:w-2/5">
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
            className={`z-10 h-full w-full object-cover px-6 delay-150 animate-in slide-in-from-left sm:px-0 ${
              detail.mode === "homePage" &&
              "duration-300 group-hover:scale-110 group-focus:scale-110 group-active:scale-110"
            }`}
            referrerPolicy="no-referrer"
            priority={`${index === 0}`}
          />
          {rate && (
            <div
              className={`absolute right-0 top-[4.1rem] z-10 rounded-l-full bg-black/70 py-[0.125rem] pl-2 pr-1 text-sm text-orange-400 md:top-[85%] md:right-2 md:scale-125 ${
                rate > 9
                  ? "text-red-500"
                  : rate > 7
                  ? "text-orange-400"
                  : rate > 5
                  ? "text-yellow-400"
                  : "text-yellow-300/75"
              }`}
            >
              {"豆瓣 " + rate + "★"}
            </div>
          )}
          {/* <div className="absolute w-full h-1/3 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div> */}
          {/* <div className="hidden md:block absolute left-0 z-20 w-1/6 h-full bg-gradient-to-r from-black/90 to-transparent"></div> */}
          <div className="absolute bottom-0 h-1/6 w-full bg-gradient-to-t from-black via-black/70 to-transparent"></div>
          {/* <div>123</div> */}
        </div>
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
