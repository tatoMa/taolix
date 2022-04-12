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
          <div className="my-3 mt-6 text-sm text-red-500">Source {index}.</div>
          <div className="mt-1 grid grid-cols-2 gap-y-2 md:grid-cols-1 md:gap-y-0">
            {videoList.map((video) => {
              const { name, url } = video;
              return (
                <a
                  key={name}
                  className="group flex cursor-pointer items-center overflow-hidden border-b border-gray-400 bg-gray-800 py-3 text-gray-400 hover:border-white hover:text-white md:first:border-t md:odd:bg-black md:even:bg-gray-800"
                  onClick={() => {
                    setPlay(true);
                    setUrl(url);
                    scroll(0, 0);
                    document.documentElement.style.overflowY = "hidden";
                  }}
                  // onClick={() => {
                  //   window.location.href = url;
                  // }}
                >
                  <div>
                    <PlayIcon className="mr-4 h-8 w-8 text-white duration-100 group-hover:translate-x-2" />
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
