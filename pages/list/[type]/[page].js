import VideoListsSection from "../../../components/VideoListsSection";
import Pagination from "../../../components/Pagination";
import GenreList from "../../../components/GenreList";
import NextHeadSeo from "next-head-seo";
import { GENRES } from "../../../utils/const";

export default function Home({ videos, page, t }) {
  const group = GENRES.find((item) => item.type == t);
  // console.log(videos);
  return (
    <>
      <NextHeadSeo
        title={`All ${group ? group.classify : "video"}s free to play - Taolix${
          page ? ` - page${page}` : ""
        }`}
        description={`All new ${
          group ? group.classify : "video"
        }s users can play online for free. ${group ? group.classify : "video"}${
          page ? ` - page${page}` : ""
        }`}
        canonical={`https://www.taolix.com/list/${t}/1`}
      />
      {/* Main section */}
      <div className="mx-auto mt-8 h-full w-full max-w-screen-2xl pt-6 md:pb-8">
        {Object.keys(videos).length !== 0 ? (
          <>
            <GenreList t={t} page={page} />
            <VideoListsSection videos={videos} />
          </>
        ) : (
          <div className=" mt-10 text-center text-2xl text-red-500">
            Fetching error. Please use another link or go back. <br />
            Cannot find page {page} with genre {t}.
          </div>
        )}
      </div>

      {/* pagination */}
      {Object.keys(videos).length !== 0 && <Pagination page={page} t={t} />}
    </>
  );
}

export async function getStaticProps({ params: { type, page } }) {
  let videos = {};

  if (
    (parseInt(type) > 0 && parseInt(type) < 11) ||
    (parseInt(type) > 32 && parseInt(type) < 39) ||
    (parseInt(type) > 40 && parseInt(type) < 44) ||
    (parseInt(type) > 44 && parseInt(type) < 49)
  ) {
    try {
      let response = await fetch(
        `${process.env.SITE_URL}/api/list/${type}/${page}`
      );
      videos = await response.json();
    } catch (e) {
      console.error("error: ", e);
    }
  }

  return {
    props: {
      videos,
      page,
      t: type,
    },
    revalidate: 7200,
  };
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { type: "1", page: "1" } },
      { params: { type: "2", page: "1" } },
      { params: { type: "3", page: "1" } },
      { params: { type: "4", page: "1" } },
      { params: { type: "5", page: "1" } },
      { params: { type: "6", page: "1" } },
      { params: { type: "7", page: "1" } },
      { params: { type: "8", page: "1" } },
      { params: { type: "9", page: "1" } },
      { params: { type: "10", page: "1" } },

      { params: { type: "33", page: "1" } },
      { params: { type: "34", page: "1" } },
      { params: { type: "35", page: "1" } },
      { params: { type: "36", page: "1" } },
      { params: { type: "37", page: "1" } },
      { params: { type: "38", page: "1" } },

      { params: { type: "41", page: "1" } },
      { params: { type: "40", page: "1" } },
      { params: { type: "42", page: "1" } },
      { params: { type: "43", page: "1" } },

      { params: { type: "46", page: "1" } },
      { params: { type: "45", page: "1" } },
      { params: { type: "47", page: "1" } },
      { params: { type: "48", page: "1" } },
    ],
    fallback: "blocking",
  };
}
