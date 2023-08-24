import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { HeartIcon } from "@heroicons/react/outline";

const VideoItem = ({ name, imageUrl, id, resource }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Link
          href={`/detail/${id}${
            resource && resource !== "0"
              ? `?resource=${1}${name && "&name=" + name}`
              : `?resource=${1}${name && "&name=" + name}`
          }`}
        >
          <a className="relative block overflow-hidden transition duration-500 cursor-pointer group hover:saturate-150">
            <div className="relative aspect-[16/10] w-full">
              <img
                src={imageUrl}
                alt=""
                className="object-cover w-full h-full duration-300 group-hover:scale-125 group-focus:scale-110 group-active:scale-110 md:h-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute bottom-0 left-0 text-xl font-semibold bg-base-300/80 text-base-content line-clamp-3">
              {name}
            </div>

            <HeartIcon
              className={`absolute top-1 right-0 h-8 w-8 text-accent-content duration-200 hover:text-secondary-focus`}
            />
          </a>
        </Link>
      ) : (
        <div className="aspect-[16/10] w-full animate-pulse rounded bg-slate-200 p-2"></div>
      )}
    </div>
  );
};

export default VideoItem;
