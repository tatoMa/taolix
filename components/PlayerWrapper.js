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
      chromecast: {},
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
      className="flex h-full w-full fixed top-0 left-0 items-center bg-black/60 z-50 pointer-events-auto "
      onKeyDown={handleKeyDown}
    >
      <div className="w-full max-h-[100vh]">
        <XIcon
          className="h-20 w-20 max-h-[8vw] max-w-[8vw] text-blue-white absolute right-0 text-white bg-black/40 cursor-pointer pointer-events-auto hover:bg-white hover:text-black animate-fadeIn z-50"
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
