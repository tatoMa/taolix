import VideoItem from "../../components/VideoItem";
import NextHeadSeo from "next-head-seo";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const translate = require("@vitalets/google-translate-api");

function Detail({ detail, searchKey }) {
  useEffect(() => {
    console.log("useeffect");
  }, []);
  return (
    <>
      <NextHeadSeo
        title={`${searchKey}'s searching results - Taolix`}
        description={`Searching ${searchKey} results and play online for free.`}
        canonical={`https://www.taolix.com/search/${searchKey}`}
      />
      {/* Main section */}
      <main className="mx-auto mt-16 h-full w-full max-w-screen-2xl text-white md:pb-8">
        <h1 className="my-4 inline-block border-b border-b-orange-600 text-3xl">
          Your search results:
        </h1>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {detail.list[0] ? (
            detail.list.map((movie) => (
              <VideoItem
                name={movie.vod_name}
                type={movie.vod_class}
                pic={movie.vod_pic}
                // url={movie.vod_play_url
                //   .split("$$$")[1]
                //   .substring(movie.vod_play_url.split("$$$")[1].indexOf("h"))}
                id={movie.vod_id}
                key={movie.vod_id}
              />
            ))
          ) : (
            <div className="mt-12 text-2xl text-gray-400">
              Can't find this video
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Detail;

export async function getServerSideProps({ params }) {
  // detect if the input text is Chinese
  var re = /[^\u4e00-\u9fa5]/;
  if (re.test(params.key)) {
    // translate if the input English to Chinese
    try {
      const resTranslate = await translate(params.key, { to: "zh-CN" });
      params.key =
        resTranslate.from.language.iso === "en"
          ? resTranslate.text
          : params.key;
    } catch (error) {
      console.error(error);
    }
  }

  // fetch search results from API
  let res = {};
  try {
    res = await fetch(
      `${process.env.MOVIE_API}/?ac=detail&wd=${encodeURI(params.key)}`
    );
  } catch (error) {
    console.error(error);
  }

  const detail = await res.json();

  return {
    props: {
      detail,
      // detailHd,
      searchKey: params.key,
    },
  };
}
