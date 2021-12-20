import { XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";

const Player = ({ url, setPlay }) => {
  return (
    <div className="flex h-full w-full absolute top-0 left-0 items-center bg-black/50 z-10 ">
      <XIcon
        className="h-10 w-10 text-blue-white absolute right-4 top-12 bg-black cursor-pointer hover:bg-white hover:text-black animate-fadeIn z-50"
        onClick={() => setPlay(false)}
      />
      <div className="w-full aspect-video">
        <ReactPlayer
          controls
          url={url}
          config={{
            file: {
              forceHLS: true,
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
