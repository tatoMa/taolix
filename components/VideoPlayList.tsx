import { PlayIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

const VideoPlayList = ({
  listOrderAsc,
  videoList,
  url,
  clickUrlButton,
  title = true,
  index,
  playedUrls,
}) => {
  return (
    <>
      {videoList && (
        <div className={`z-10`}>
          <div
            className={`my-2 mt-4 inline-block rounded-full  px-6 py-1 text-sm  ${
              index === "HD"
                ? " text-neutral-700 bg-yellow-400"
                : "bg-red-500 text-white"
            }`}
          >
            {index === "HD" ? "1080P " : `Source ${index}`}
            {index === "HD" && <span className="text-red-600 ">🚫 PRC IP</span>}
          </div>
          <div
            className={`mt-1 flex gap-x-2 gap-y-0 ${
              listOrderAsc ? "flex-col" : "flex-col-reverse"
            }`}
          >
            {videoList?.map((video) => {
              const { name, url } = video;
              return (
                <a
                  key={url}
                  className={`btn btn-outline btn-square btn-block justify-start rounded-none ${
                    index === "HD"
                      ? " border-y border-x-0 border-yellow-600 text-yellow-600"
                      : "border-y border-x-0 border-base-content"
                  }`}
                  onClick={() => {
                    if(index === "HD"){
                      window.open("https://dp.haiwaikan.com/index.html?url="+url, '_blank', 'noopener,noreferrer');
                    }
                    else{
                      clickUrlButton(url);
                      document.documentElement.style.overflowY = "hidden";
                    }
                  }}
                >
                  <div>
                    {playedUrls.includes(url) ? (
                      <CheckCircleIcon
                        className={`ml-1 mr-4 h-8 w-8 text-gray-500 duration-100 group-hover:translate-x-2 group-hover:text-white md:ml-2 ${
                          index === "HD" && "text-yellow-600 "
                        }`}
                      />
                    ) : (
                      <PlayIcon
                        className={`ml-1 mr-4 h-8 w-8 text-gray-500 duration-100 group-hover:translate-x-2 group-hover:text-white md:ml-2 ${
                          index === "HD" && "text-yellow-600 "
                        }`}
                      />
                    )}
                  </div>
                  <div className="font-light truncate">{name}</div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayList;
