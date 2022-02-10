import VideoItem from "../../components/VideoItem";
import NextHeadSeo from "next-head-seo";

import { useRouter } from "next/router";

function Detail({ detail, searchKey }) {
  // console.log(detail);
  const router = useRouter();
  if (detail.list.length == 1) {
    if (detail.list[0].vod_play_url) {
      const videoList = detail.list[0].vod_play_url?.split("#");
    } else {
      const videoList = detail.list[0].vod_play_url;
    }
  } else {
    const videoList = detail.list[0]?.vod_play_url.split("$$$")[1]?.split("#");
  }

  return (
    <>
      <NextHeadSeo
        title={`${searchKey}'s searching results - Taolix`}
        description={`Searching ${searchKey} results and play online for free.`}
        canonical={`https://www.taolix.com/search/${searchKey}`}
      />
      {/* Main section */}
      <main className="w-full h-full md:pb-8 max-w-screen-2xl mx-auto mt-16 text-white">
        <h1 className="text-3xl my-4 border-b-orange-600 border-b inline-block">
          Your search results:
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-4">
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
            <div className="text-2xl text-gray-400 mt-12">
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
  // console.log(params);
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(
    `${process.env.MOVIE_API}/?ac=detail&wd=${encodeURI(params.key)}`
  );
  const detail = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      detail,
      searchKey: params.key,
    },
  };
}
