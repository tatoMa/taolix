import { useState } from "react";
import { PlayIcon, XIcon } from "@heroicons/react/solid";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { useRouter } from 'next/router'

const VideoList = ({ name, type, pic, url, id }) => {
  const router = useRouter()
  const [play, setPlay] = useState(false);
  console.log(id, 'list id');
  function togglePlay() {
    setPlay(!play);
  }

  return (
    <>
      <div className="overflow-hidden bg-black cursor-pointer">
        {play && (
          <div className="flex h-full w-full absolute -translate-y-[48%] left-0 items-center bg-black/50 z-10">
            <XIcon
              className="h-10 w-10 text-blue-white absolute right-4 top-12 bg-black cursor-pointer hover:bg-white hover:text-black animate-fadeIn z-50"
              onClick={() => togglePlay()}
            />
            <VideoPlayer src={url} />
          </div>
        )}
        <div className="relative" onClick={() => router.push(`/detail/${id}`)}>
          {/* <img className="object-cover w-full h-40" src={pic} alt="avatar" /> */}
          
          <div className="h-40 relative">
          <Image
            src={pic}
            alt={name}
            className="object-cover"
            layout="fill"
          />
          
        </div>

          <div className="absolute bottom-0 left-0 bg-black/75">
            <div className="block text-xl font-bold text-white">
              {name}
            </div>
            <div className="text-xs text-white">{type}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoList;
