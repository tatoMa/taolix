import { useRouter } from "next/router";
import { useState } from "react";
import { filterHtmlTagsFromString } from "../utils/utils";

const Banner = ({ detail, index = 1 }) => {
  let {
    vod_name,
    vod_pic,
    vod_remarks,
    rate,
    vod_actor,
    vod_blurb,
    vod_director,
    vod_content,
    vod_tag,
    vod_time,
    vod_lang,
    vod_sub,
    mode,
  } = detail;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const goToDetailPageHandler = (e) => {
    if (mode === "homePage") {
      setIsLoading(true);
      router.push(`/detail/${detail.vod_id}`);
    }
  };

  return (
    <div
      className={`base-content relative aspect-[16/30] w-full md:aspect-[3/2] lg:aspect-[2/1] lg:max-h-[60vh] ${
        mode === "homePage" && "cursor-pointer px-4 md:px-6 lg:px-8"
      }`}
      onClick={goToDetailPageHandler}
    >
      {/* loading spinner */}
      {isLoading && (
        <div className="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/60 p-4 lg:p-64 ">
          <svg
            viewBox="-2 -2 42 42"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-10 aspect-square w-1/2 stroke-red-500"
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

      {/* background image section */}
      <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full">
        <img
          src={vod_pic}
          alt="vod_name"
          className="relative h-full w-full object-cover opacity-20 blur-sm"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="from-background absolute left-0 -bottom-1 h-1/4 w-full bg-gradient-to-t via-transparent to-transparent"></div>

      {/* main section */}
      <main className="group relative z-10 flex h-full w-full flex-col-reverse md:flex-row">
        <div className="z-20 flex -translate-y-10 items-center text-white md:w-1/2 md:translate-y-10 md:pr-4 lg:w-3/5">
          <div className="relative w-full overflow-hidden xl:w-[90%]">
            <div className="relative border-b border-red-500 bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text text-4xl font-extrabold text-transparent animate-in slide-in-from-left md:pr-0">
              <h1 className={`${mode !== "homePage" && "w-[calc(100%-6rem)]"}`}>
                {vod_name && vod_name}
              </h1>
              <h2 className="text-sm font-light text-red-700/60 delay-150 line-clamp-1 animate-in slide-in-from-left">
                {vod_sub && vod_sub}
              </h2>
            </div>
            <div className="absolute right-0 top-6 mt-4 text-sm text-base-content/75 delay-200 animate-in slide-in-from-left">
              {vod_lang && vod_lang}
            </div>

            <div className="mt-7 flex text-sm text-base-content/75">
              <div className="flex-1">{vod_remarks}</div>
              <div>{vod_time && vod_time.split(" ")[0]}</div>
            </div>

            <div className="mt-3 flex flex-nowrap">
              {vod_tag &&
                vod_tag.split(",").map((i) => (
                  <div
                    key={i}
                    className=" mr-2 inline-block whitespace-nowrap rounded-full bg-red-600 px-2 py-[0.12rem] text-xs text-white"
                  >
                    {i}
                  </div>
                ))}
            </div>

            <h2 className="mt-4 text-sm text-base-content/90 delay-300 line-clamp-1 animate-in fade-in">
              {vod_director && "Direct: " + vod_director}
            </h2>
            <h2 className="mt-1 text-sm text-base-content/90 delay-300 line-clamp-1 animate-in fade-in">
              {vod_actor && "Actor: " + vod_actor}
            </h2>

            <p className="mt-3 text-sm text-base-content opacity-90 delay-300 line-clamp-4 animate-in fade-in md:line-clamp-3 lg:line-clamp-5">
              {vod_blurb ? vod_blurb : filterHtmlTagsFromString(vod_content)}
            </p>
          </div>
        </div>

        {/* movie poster section */}
        <div className="relative aspect-[3/4] min-h-[60vh] w-full overflow-hidden md:min-h-full md:w-1/2 lg:w-2/5">
          <img
            src={vod_pic}
            alt="vod_name"
            className={`z-10 h-full w-full object-cover px-0 delay-150 animate-in slide-in-from-left sm:px-0  ${
              mode === "homePage" &&
              "duration-300 group-hover:scale-110 group-focus:scale-110 group-active:scale-110"
            }`}
            referrerPolicy="no-referrer"
          />
          {rate && (
            <div
              className={`absolute right-0 top-[4.1rem] z-10 rounded-l-full bg-black/70 py-[0.125rem] pl-2 pr-1 text-sm text-orange-400 md:top-[85%] md:right-2 md:scale-125 ${
                rate > 9
                  ? "text-red-500"
                  : rate > 7
                  ? "text-orange-400"
                  : rate > 5
                  ? "text-yellow-400"
                  : "text-yellow-300/75"
              }`}
            >
              {"豆瓣 " + rate + "★"}
            </div>
          )}
          <div className="from-background absolute bottom-0 h-1/6 w-full bg-gradient-to-t via-base-100/70 to-transparent"></div>
        </div>
      </main>
    </div>
  );
};
export default Banner;
