import Link from "next/link";
import { GENRES } from "../utils/const";

const GenreList = ({ page, t }: { page: string; t: string }) => {
  const group = GENRES.find((item) => item.type.toString() === t);
  return (
    <section className="w-full">
      <h1 className="m-auto my-2 border-b py-3 text-center text-2xl uppercase ">
        {group.classify} - page {page}
      </h1>
      <div className="mb-4 flex flex-wrap justify-center border-b pb-2">
        {GENRES.filter((item) => item.group == group.group).map((genre) => (
          <Link key={genre.type} href={`/list/${genre.type}/1`}>
            <a
              className={`btn btn-outline btn-xs my-1 mx-1 rounded-full px-3 uppercase lg:mx-2 lg:px-5 lg:text-sm ${
                genre.type.toString() === t
                  ? "btn-secondary cursor-not-allowed"
                  : ""
              }`}
            >
              {genre.name}
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default GenreList;
