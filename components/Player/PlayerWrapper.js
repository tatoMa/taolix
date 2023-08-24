import React from "react";
import { XIcon } from "@heroicons/react/solid";

import dynamic from "next/dynamic";
const Player = dynamic(() => import("./Player.js"));

export default function PlayerWrapper({ url, setPlay }) {
  const videoJsOptions = {
    // lookup the options in the docs for more options
    playbackRates: [0.5, 1, 1.5, 2, 3],
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
      className="fixed top-0 left-0 z-50 flex items-center w-full h-full pointer-events-auto bg-black/60 "
      onKeyDown={handleKeyDown}
    >
      <div
        style={{
          width: "min(100%,calc(100vh/9*16))",
          position: "relative",
          margin: "auto",
        }}
      >
        <XIcon
          className="animate-fadeIn pointer-events-auto absolute right-0 z-50 h-20 max-h-[8vw] w-20 max-w-[8vw] cursor-pointer bg-black/20 text-white/50 duration-1000 hover:bg-white hover:text-black"
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
