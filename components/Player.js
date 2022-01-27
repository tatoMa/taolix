import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

require("@silvermine/videojs-chromecast")(videojs);
require("@silvermine/videojs-chromecast/dist/silvermine-videojs-chromecast.css");

export const VideoJS = (props) => {
  const { options, onReady } = props;

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // load the audio decoder lib
    require("videojs-contrib-hls.js");

    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      // initialize Video.js player
      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          userActions: {
            // hot keys for this player
            hotkeys: function (event) {
              // `space` key = pause
              if (event.which === 32) {
                // this.playing ? this.play() : this.pause();
                player.paused() ? player.play() : player.pause();
              }
              // left arror back forward
              if (event.which === 37) {
                player.currentTime(player.currentTime() - 10);
              }
              // right arror fast forward
              if (event.which === 39) {
                player.currentTime(player.currentTime() + 10);
              }
              // m key for mute and unmute
              if (event.which === 77) {
                player.muted() ? player.muted(false) : player.muted(true);
              }
              // up key for volume up
              if (event.which === 38) {
                player.volume(player.volume() + 0.1);
              }
              // down key for volume down
              if (event.which === 40) {
                player.volume(player.volume() - 0.1);
              }
            },
          },
        },
        () => {
          console.log("player is ready");
          onReady && onReady(player);
        }
      ));

      // auto focus on video player
      if (videoRef.current) {
        videoRef.current.focus();
      }
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player style={{ outline: "none" }}>
      <video
        ref={videoRef}
        style={{ outline: "none", maxHeight: "100vh" }}
        className="video-js vjs-big-play-centered"
      />
      <style global jsx>{`
        .vjs-chromecast-button .vjs-icon-placeholder {
          display: block;
          width: 100%;
          height: 60%;
        }
      `}</style>
    </div>
  );
};

export default VideoJS;
