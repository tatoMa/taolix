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
        <div className="md:translate-y-0 flex-1 first:ml-3 last:mr-3">
          <div className="text-gray-500 text-sm my-3">Source {index}.</div>
          <div className="mt-1">
            {videoList.map((video) => {
              const { name, url } = video;
              return (
                <a
                  key={name}
                  className="odd:bg-black first:border-t even:bg-gray-800 cursor-pointer overflow-hidden flex items-center py-3 border-b border-gray-400 text-gray-400 hover:text-white hover:border-white"
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
                    <PlayIcon className="h-8 w-8 mr-4 text-blue-white" />
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
