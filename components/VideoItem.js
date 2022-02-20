import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const VideoItem = ({ name, type, pic, id, remarks, rate }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Link href={`/detail/${id}`}>
          <a
            className="block group overflow-hidden relative bg-black cursor-pointer hover:brightness-75"
            onClick={() => {
              setIsLoading(true);
            }}
          >
            {isLoading && (
              <div className="absolute z-10 top-0 left-0 h-full w-full flex items-center justify-center bg-gray-500/60">
                <svg
                  viewBox="-2 -2 42 42"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1/2 mb-10 aspect-square stroke-red-500"
                >
                  <g fill="none" fill-rule="evenodd">
                    <g transform="translate(1 1)" stroke-width="5">
                      <circle stroke-opacity=".4" cx="18" cy="18" r="18" />
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
            <div className="w-full aspect-[3/4]">
              <img
                src={pic}
                alt=""
                className="object-cover h-60 md:h-full w-full group-focus:scale-110 group-hover:scale-110 group-active:scale-110 duration-300"
                referrerPolicy="no-referrer"
              />
              {/* <Image
              unoptimized={true}
              src={
                pic ||
                "https://img3.doubanio.com/f/movie/5081e011b4b06f1a8c3735122b38e781bd852ab6/pics/movie/movie_default_medium.png"
              }
              alt={name}
              className="object-cover"
              layout="fill"
              referrerPolicy="no-referrer"
              loader={myLoader}
            /> */}
            </div>

            <div className="absolute bottom-0 left-0 bg-black/75 text-white line-clamp-3 text-xl font-bold">
              {name}
              <span className="block text-xs text-gray-400 line-clamp-1">
                {type}
              </span>
            </div>
            <div className="absolute top-0 right-0 bg-black/75 text-sm text-gray-300 pt-1">
              {remarks}
            </div>
            {rate && (
              <div className="absolute top-0 left-0 bg-black/75 text-sm text-orange-400 pt-1 pl-1">
                豆瓣{rate}★
              </div>
            )}
          </a>
        </Link>
      ) : (
        <div className="animate-pulse rounded bg-slate-200 w-full aspect-[3/4] p-2"></div>
      )}
    </div>
  );
};

export default VideoItem;
