import LineBreak from "../../../components/LineBreak";
import VideoListsSection from "../../../components/VideoListsSection";
import Pagination from "../../../components/Pagination";
import GenreList from "../../../components/GenreList";
import NextHeadSeo from "next-head-seo";
import { GENRES } from "../../../utils/const";

export default function Home({ videos, page, t }) {
  const group = GENRES.find((item) => item.type == t);
  // console.log(group);
  return (
    <>
      <NextHeadSeo
        title={`All ${group.classify}s free to play - Taolix`}
        description={`All new ${group.classify}s users can play online for free.`}
        canonical={`https://www.taolix.com/list/${t}/1`}
      />
      {/* Main section */}
      <div className="w-full h-full md:pb-8 max-w-screen-2xl mx-auto mt-8 pt-6">
        {/* Line Break  */}

        <GenreList t={t} />

        {/* Video List Section */}
        <VideoListsSection videos={videos} />
      </div>

      {/* pagination */}
      <Pagination page={page} t={t} />
    </>
  );
}

export async function getStaticProps({ params: { type, page } }) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const api_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "${process.env.SITE_URL}";
  let res;
  try {
    res = await fetch(`${api_url}/api/list/${type}/${page}`);
  } catch (e) {
    console.error("error: ", e);
  }
  const videos = await res.json();

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
      { params: { type: "2", page: "1" } },
      { params: { type: "3", page: "1" } },
      { params: { type: "4", page: "1" } },
      { params: { type: "5", page: "1" } },
      { params: { type: "6", page: "1" } },
      { params: { type: "7", page: "1" } },
      { params: { type: "8", page: "1" } },
      { params: { type: "9", page: "1" } },
      { params: { type: "10", page: "1" } },
      { params: { type: "11", page: "1" } },
      { params: { type: "12", page: "1" } },
      { params: { type: "13", page: "1" } },

      { params: { type: "15", page: "1" } },
      { params: { type: "16", page: "1" } },
      { params: { type: "17", page: "1" } },
      { params: { type: "18", page: "1" } },
      { params: { type: "19", page: "1" } },
      { params: { type: "20", page: "1" } },

      { params: { type: "22", page: "1" } },
      { params: { type: "23", page: "1" } },
      { params: { type: "24", page: "1" } },
      { params: { type: "25", page: "1" } },

      { params: { type: "27", page: "1" } },
      { params: { type: "28", page: "1" } },
      { params: { type: "29", page: "1" } },
    ],
    fallback: "blocking", // See the "fallback" section below
  };
}
