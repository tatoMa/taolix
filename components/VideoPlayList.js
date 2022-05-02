import { PlayIcon } from "@heroicons/react/solid";
import LineBreak from "./LineBreak";

const VideoPlayList = ({
  videoList,
  url,
  setPlay,
  setUrl,
  title = true,
  index,
}) => {
  return (
    <>
      {videoList && (
        <div className="z-10">
          <div
            className={`my-2 mt-4 inline-block rounded-full  px-6 py-1 text-sm  ${
              index === "HD"
                ? " bg-yellow-400 text-neutral-700"
                : "bg-red-500 text-white"
            }`}
          >
            {index === "HD" ? "1080P " : `Source ${index}`}
            {index === "HD" && <span className=" text-red-600">🚫 PRC IP</span>}
          </div>
          <div className="mt-1 flex flex-col-reverse gap-x-2 gap-y-0">
            {videoList.map((video) => {
              const { name, url } = video;
              return (
                <a
                  key={name}
                  className={`group flex cursor-pointer items-center overflow-hidden border-y border-gray-400 bg-neutral-900 py-3 text-gray-400 hover:border-white hover:text-white hover:brightness-150 md:first:border-b-2 md:last:border-t-2 md:odd:bg-neutral-900 md:even:bg-neutral-800 ${
                    index === "HD" &&
                    " border-yellow-600 text-yellow-400 md:odd:bg-stone-900 md:even:bg-stone-800"
                  }`}
                  onClick={() => {
                    setPlay(true);
                    setUrl(url);
                    // scroll(0, 0);
                    document.documentElement.style.overflowY = "hidden";
                  }}
                  // onClick={() => {
                  //   window.location.href = url;
                  // }}
                >
                  <div>
                    <PlayIcon
                      className={`ml-1 mr-4 h-8 w-8 text-gray-500 duration-100 group-hover:translate-x-2 group-hover:text-white md:ml-2 ${
                        index === "HD" && "text-yellow-600 "
                      }`}
                    />
                  </div>
                  <div className="truncate">{name}</div>
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
