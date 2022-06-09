import VideoItem from "../../components/VideoItem";
import NextHeadSeo from "next-head-seo";
const translate = require("@vitalets/google-translate-api");

function Detail({ 
  uniqueMovieList,
  searchKey })
  {
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
          
          {uniqueMovieList?.length > 0 && (
            uniqueMovieList?.map((movie) => (
              <VideoItem
                name={movie.vod_name}
                type={movie.vod_class}
                pic={movie.vod_pic}
                id={movie.vod_id}
                key={movie.vod_id}
                resource={movie.resource}
              />
            ))
          )} 
          
          {/* If no video found */}
          {uniqueMovieList?.length === 0 && (
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

  // fetch all search results from APIs
  let resultsPromiseAll;
  try {
    resultsPromiseAll = await Promise.allSettled([
      fetch(
        `${process.env.MOVIE_API}/?ac=detail&wd=${encodeURI(params.key)}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_2}/?ac=detail&wd=${encodeURI(
          params.key
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_3}/?ac=detail&wd=${encodeURI(
          params.key
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_4}/?ac=detail&wd=${encodeURI(
          params.key
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_5}/?ac=detail&wd=${encodeURI(
          params.key
        )}`
      ).then((res) => res.json()),
      fetch(
        `${process.env.MOVIE_API_SOURCE_6}/?ac=detail&wd=${encodeURI(
          params.key
        )}`
      ).then((res) => res.json())
    ]);
  } catch (error) {
    console.error(error);
  }
  resultsPromiseAll = resultsPromiseAll.map((res, index) => {
    res?.value?.resource = index;
    return res;
  });
  const successes = resultsPromiseAll
    .filter((x) => x.status === "fulfilled")
    .map((x) => x.value);

  const failures = resultsPromiseAll
    .filter((x) => x.status === "rejected")
    .map((x) => x.reason);
  if (!failures || failures?.length !== 0)
    console.error("search page fetching error", failures);
    
  const [
    searchResultsFromApi0,
    searchResultsFromApi1,
    searchResultsFromApi2,
    searchResultsFromApi3,
    searchResultsFromApi4,
    searchResultsFromApi5,
  ] = successes;
  
  // filter all results into one unique array of items
  const movieList = [...(searchResultsFromApi0?.list?.map(item=>{return {...item,resource:0}}) || []),
    ...(searchResultsFromApi1?.list?.map(item=>{return {...item,resource:1}}) || []),
    ...(searchResultsFromApi2?.list?.map(item=>{return {...item,resource:2}}) || []),
    ...(searchResultsFromApi3?.list?.map(item=>{return {...item,resource:3}}) || []),
    ...(searchResultsFromApi4?.list?.map(item=>{return {...item,resource:4}}) || []),
    ...(searchResultsFromApi5?.list?.map(item=>{return {...item,resource:5}}) || []),
  ]
  const uniqueMovieList = movieList.reduce((unique, o) => {
    if(!unique.some(obj => obj?.vod_name === o?.vod_name)) {
      unique.push(o);
    }
    return unique;
},[]);

  return {
    props: {
      uniqueMovieList,
      searchKey: params.key,
    },
  };
}
