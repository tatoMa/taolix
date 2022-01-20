import dynamic from "next/dynamic";
import { XIcon } from "@heroicons/react/solid";
// import ReactPlayer from "react-player";
const ReactPlayer = dynamic(() => import("react-player/lazy"));

const Player = ({ url, setPlay }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode == 27) {
      setPlay(false);
      document.documentElement.style.overflowY = "auto";
    }
  };
  return (
    <div
      className="flex h-full w-full fixed top-0 left-0 items-center bg-black/50 z-10 pointer-events-auto "
      onKeyDown={handleKeyDown}
    >
      <div className="w-full aspect-video">
        <XIcon
          className="h-20 w-20 max-h-[8vw] max-w-[8vw] text-blue-white absolute right-0 text-white bg-black/40 cursor-pointer pointer-events-auto hover:bg-white hover:text-black animate-fadeIn z-50"
          onClick={() => {
            setPlay(false);
            document.documentElement.style.overflowY = "auto";
          }}
        />
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
