import React from "react";
import { XIcon } from "@heroicons/react/solid";

import dynamic from "next/dynamic";
const Player = dynamic(() => import("./Player.js"));

export default function PlayerWrapper({ url, setPlay }) {
  // console.log(url);
  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    nativeControlsForTouch: true,
    techOrder: ["chromecast", "html5"], // You may have more Tech, such as Flash or HLS
    plugins: {
      chromecast: {
        buttonPositionIndex: -2,
      },
    },
    controlBar: {
      pictureInPictureToggle: true,
    },
    sources: [
      {
        src: url,
        type: "application/x-mpegURL",
      },
    ],
  };
  const handleKeyDown = (event) => {
    if (event.keyCode == 27) {
      setPlay(false);
      document.documentElement.style.overflowY = "auto";
    }
  };

  return (
    <div
      className="pointer-events-auto fixed top-0 left-0 z-50 flex h-full w-full items-center bg-black/60 "
      onKeyDown={handleKeyDown}
    >
      <div className="w-full">
        <XIcon
          className="text-blue-white pointer-events-auto absolute right-0 z-50 h-20 max-h-[8vw] w-20 max-w-[8vw] animate-fadeIn cursor-pointer bg-black/40 text-white hover:bg-white hover:text-black"
          onClick={() => {
            setPlay(false);
            document.documentElement.style.overflowY = "auto";
          }}
        />
        <Player options={videoJsOptions} />
      </div>
    </div>
  );
}
