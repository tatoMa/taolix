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
        <div className="m-2 flex-1 first:ml-0 last:mr-0 md:translate-y-0">
          <div className="my-3 mt-6 text-sm text-gray-500">Source {index}.</div>
          <div className="mt-1">
            {videoList.map((video) => {
              const { name, url } = video;
              return (
                <a
                  key={name}
                  className="flex cursor-pointer items-center overflow-hidden border-b border-gray-400 py-3 text-gray-400 first:border-t odd:bg-black even:bg-gray-800 hover:border-white hover:text-white"
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
                    <PlayIcon className="text-blue-white mr-4 h-8 w-8" />
                  </div>
                  <div>{name}</div>
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
