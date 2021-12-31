import dynamic from "next/dynamic";
import { XIcon } from "@heroicons/react/solid";
// import ReactPlayer from "react-player";
const ReactPlayer = dynamic(() => import("react-player/lazy"));

const Player = ({ url, setPlay }) => {
  return (
    <div className="flex h-full w-full absolute top-0 left-0 items-center pb-14 bg-black/50 z-10 pointer-events-auto ">
      <XIcon
        className="h-10 w-10 text-blue-white absolute right-4 top-12 bg-black cursor-pointer pointer-events-auto hover:bg-white hover:text-black animate-fadeIn z-50"
        onClick={() => {
          setPlay(false);
          document.documentElement.style.overflowY = "auto";
        }}
      />
      <div className="w-full aspect-video">
        <ReactPlayer
          controls
          url={url}
          config={{
            file: {
              forceHLS: true,
              attributes: {
                autoPlay: true,
                // muted: true,
              },
            },
          }}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Player;
