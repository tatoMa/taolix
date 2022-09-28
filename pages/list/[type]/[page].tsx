import VideoListsSection from "../../../components/VideoListsSection";
import Pagination from "../../../components/Pagination";
import GenreList from "../../../components/GenreList";
import NextHeadSeo from "next-head-seo";
import { GENRES } from "../../../utils/const";
import { GetStaticProps } from "next";
import { IVideosResponse } from "utils/interfaces";

export default function Home({
  videos,
  page,
  t,
}: {
  videos: IVideosResponse;
  page: string;
  t: string;
}) {
  const group = GENRES.find((item) => item.type.toString() === t);
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
      <div className="mx-auto h-full w-full max-w-screen-2xl pt-12 md:pb-8">
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

export const getStaticProps: GetStaticProps = async ({
  params: { type, page },
}: {
  params: { type: string; page: string };
}) => {
  let videos = {};

  if (
    (parseInt(page) > 0 && parseInt(type) > 1 && parseInt(type) < 14) ||
    (parseInt(type) > 14 && parseInt(type) < 21) ||
    (parseInt(type) > 21 && parseInt(type) < 26) ||
    (parseInt(type) > 26 && parseInt(type) < 30)
  ) {
    try {
      let response = await fetch(
        `${process.env.SITE_URL}/api/list/${type}/${page}`
      );
      videos = (await response.json()) as IVideosResponse;
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
};
const paths = GENRES.map((item) => {
  return { params: { type: item.type.toString(), page: "1" } };
});
export async function getStaticPaths() {
  return {
    paths,
    fallback: "blocking",
  };
}
