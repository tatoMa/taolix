import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { HeartIcon } from "@heroicons/react/outline";

const VideoItem = ({ name, imageUrl, id, resource }) => {
  const [isLoading, setIsLoading] = useState(false);
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
              ? `?resource=${resource}${name && "&name=" + name}`
              : ""
          }`}
        >
          <a
            className="group relative block cursor-pointer overflow-hidden transition duration-500 hover:saturate-150"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 10000);
            }}
          >
            {isLoading && (
              <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-gray-500/60">
                <svg
                  viewBox="-2 -2 42 42"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-5 aspect-square w-1/2 stroke-red-500"
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="5">
                      <circle strokeOpacity=".4" cx="18" cy="18" r="18" />
                      <path d="M36 18c0-9.94-8.06-18-18-18">
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 18 18"
                          to="360 18 18"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </g>
                  </g>
                </svg>
              </div>
            )}
            <div className="relative aspect-[16/10] w-full">
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover duration-300 group-hover:scale-125 group-focus:scale-110 group-active:scale-110 md:h-full"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute bottom-0 left-0 bg-base-300/80 text-xl font-semibold text-base-content line-clamp-3">
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
