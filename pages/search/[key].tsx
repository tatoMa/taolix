import VideoItem from "../../components/VideoItem";
import NextHeadSeo from "next-head-seo";
import { GetServerSideProps } from "next";
import {
  fetchMovieDetailsListFromAllApisByName,
  FulfilledAndRejectedResultsFromPromiseAllSettled,
} from "utils/utils";
const translate = require("@vitalets/google-translate-api");

function Detail({ uniqueMovieList, searchKey }) {
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
          {uniqueMovieList?.length > 0 &&
            uniqueMovieList?.map((movie) => (
              <VideoItem
                name={movie.vod_name}
                type={movie.vod_class}
                pic={movie.vod_pic}
                id={movie.vod_id}
                key={movie.vod_id}
                remarks={movie.vod_remarks}
                resource={movie.resource}
                rate={
                  Number(movie.rate)
                    ? Number(movie.rate)
                    : Number(movie.vod_douban_score) != 0
                    ? Number(movie.vod_douban_score)
                    : 0
                }
              />
            ))}

          {/* If no video found */}
          {uniqueMovieList?.length === 0 && (
            <div className="mt-12 text-2xl text-gray-400">
              Can&apos;t find this video
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Detail;
interface Params {
  key: string;
}
export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=600" // 600 seconds for fresh, 3600 seconds for stale and still using but fetch on background
  );
  const input = params.key as string;
  // detect if the input text is Chinese, if not then translate to Chinese
  const checkAndTranslateEngToChn = async (input) => {
    const hasChnInputChecker = /[^\u4e00-\u9fa5]/;
    if (hasChnInputChecker.test(input)) {
      // translate if the input English to Chinese
      try {
        const resTranslate = await translate(input, { to: "zh-CN" });
        return resTranslate.from.language.iso === "en"
          ? resTranslate.text
          : input;
      } catch (error) {
        console.error(error);
      }
    }
  };
  const searchText = (await checkAndTranslateEngToChn(input)) || input;

  // fetch data from all apis by movie name
  const resultsPromiseAll = await fetchMovieDetailsListFromAllApisByName(
    searchText
  );
  const [successes, failures] =
    FulfilledAndRejectedResultsFromPromiseAllSettled(resultsPromiseAll);

  // map fetched list with resource id (-1 for hd resource)
  const movieList = [].concat
    .apply(
      [],
      successes.map((item, index) =>
        item?.list?.map((item) => {
          return { ...item, resource: index - 1 };
        })
      )
    )
    .filter((item) => item.resource !== -1);
  const uniqueMovieList = movieList.reduce((unique, o) => {
    if (!unique.some((obj) => obj?.vod_name === o?.vod_name)) {
      unique.push(o);
    }
    return unique;
  }, []);

  return {
    props: {
      uniqueMovieList,
      searchKey: searchText,
    },
  };
};
