import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};
interface VideoItemProps {
  name: string;
  type: string;
  pic: string;
  id: number;
  remarks: string;
  rate: number;
  hd?: Boolean;
  resource?: number;
}
const VideoItem = ({
  name,
  type,
  pic,
  id,
  remarks = "",
  rate = 0,
  hd = false,
  resource = 0,
}: VideoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="aspect-[3/4]">
      {inView ? (
        <Link
          href={`/detail/${id}${`?resource=${resource}${
            name && "&name=" + name
          }`}`}
          prefetch
        >
          <a
            className="relative block w-full h-full overflow-hidden transition duration-500 cursor-pointer group rounded-xl hover:saturate-150"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 10000);
            }}
          >
            {isLoading && (
              <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-500/60">
                <svg
                  viewBox="-2 -2 42 42"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-1/2 mb-10 aspect-square stroke-red-500"
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
            <div className="w-full h-full">
              <img
                src={pic}
                alt=""
                className="object-cover w-full h-full duration-300 group-hover:scale-125 group-focus:scale-110 group-active:scale-110 md:h-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <section>
              <p className="absolute top-0 right-0 bg-base-300/80 pt-[3px] pr-[2px] text-sm ">
                {remarks}
              </p>
              <h2 className="absolute bottom-0 left-0 bg-base-300/90 pt-[1px] pb-[2px] pl-[2px] text-xl font-semibold text-accent-content line-clamp-3">
                {name}
                <span className="block pt-[1px] text-xs font-light text-base-content line-clamp-1">
                  {type}
                </span>
              </h2>
              {Number(rate) > 0 && (
                <div
                  className={`absolute top-0 left-0 bg-base-300/80 pt-[3px] pl-[2px] text-sm  ${
                    rate > 9
                      ? "text-red-500"
                      : rate > 7
                      ? "text-orange-400"
                      : rate > 5
                      ? "text-yellow-400"
                      : "text-yellow-300/75"
                  }`}
                >
                  ★ {rate}
                </div>
              )}
            </section>
          </a>
        </Link>
      ) : (
        <div className="aspect-[3/4] w-full animate-pulse rounded bg-slate-200 p-2"></div>
      )}
    </div>
  );
};

export default VideoItem;
