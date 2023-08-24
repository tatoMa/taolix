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
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const goToDetailPageHandler = (e) => {
    if (mode === "homePage") {
      // setIsLoading(true);
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
      {/* background image section */}
      <div className="absolute top-0 left-0 z-0 w-full h-full pointer-events-none">
        <img
          src={vod_pic}
          alt="vod_name"
          className="relative object-cover w-full h-full opacity-20 blur-sm"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="absolute left-0 w-full from-background -bottom-1 h-1/4 bg-gradient-to-t via-transparent to-transparent"></div>

      {/* main section */}
      <main className="relative z-10 flex flex-col-reverse w-full h-full group md:flex-row">
        <div className="z-20 flex items-center text-white -translate-y-10 md:w-1/2 md:translate-y-10 md:pr-4 lg:w-3/5">
          <div className="relative w-full overflow-hidden xl:w-[90%]">
            <div className="relative text-4xl font-extrabold text-transparent border-b border-red-500 bg-gradient-to-br from-orange-600 to-red-600 bg-clip-text animate-in slide-in-from-left md:pr-0">
              <h1 className={`${mode !== "homePage" && "w-[calc(100%-6rem)]"}`}>
                {vod_name && vod_name}
              </h1>
              <h2 className="text-sm font-light delay-150 text-red-700/60 line-clamp-1 animate-in slide-in-from-left">
                {vod_sub && vod_sub}
              </h2>
            </div>
            <div className="absolute right-0 mt-4 text-sm delay-200 top-6 text-base-content/75 animate-in slide-in-from-left">
              {vod_lang && vod_lang}
            </div>

            <div className="flex text-sm mt-7 text-base-content/75">
              <div className="flex-1">{vod_remarks}</div>
              <div>{vod_time && vod_time.split(" ")[0]}</div>
            </div>

            <div className="flex mt-3 flex-nowrap">
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

            <h2 className="mt-4 text-sm delay-300 text-base-content/90 line-clamp-1 animate-in fade-in">
              {vod_director && "Direct: " + vod_director}
            </h2>
            <h2 className="mt-1 text-sm delay-300 text-base-content/90 line-clamp-1 animate-in fade-in">
              {vod_actor && "Actor: " + vod_actor}
            </h2>

            <p className="mt-3 text-sm delay-300 text-base-content opacity-90 line-clamp-4 animate-in fade-in md:line-clamp-3 lg:line-clamp-5">
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
          <div className="absolute bottom-0 w-full from-background h-1/6 bg-gradient-to-t via-base-100/70 to-transparent"></div>
        </div>
      </main>
    </div>
  );
};
export default Banner;
