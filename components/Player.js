import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = (props) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const { options, onReady } = props;

  useEffect(() => {
    require("videojs-contrib-hls.js");

    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          userActions: {
            hotkeys: function (event) {
              // `space` key = pause
              if (event.which === 32) {
                // this.playing ? this.play() : this.pause();
                this.paused() ? this.play() : this.pause();
              }
              // left arror back forward
              if (event.which === 37) {
                this.currentTime(this.currentTime() - 10);
              }
              // right arror fast forward
              if (event.which === 39) {
                this.currentTime(this.currentTime() + 10);
              }
              // m key for mute and unmute
              if (event.which === 77) {
                this.muted() ? this.muted(false) : this.muted(true);
              }
            },
          },
        },
        () => {
          console.log("player is ready");
          onReady && onReady(player);
        }
      ));
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    // auto focus on video player
    if (videoRef.current) {
      videoRef.current.focus();
    }

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        style={{ outline: "none" }}
        className="video-js vjs-big-play-centered !outline-0 focus:outline-0 active:outline-0 hover:outline-0"
      />
    </div>
  );
};

export default VideoJS;
