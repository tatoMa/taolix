import Link from "next/link";
import { GENRES } from "../utils/const";

const GenreList = ({ t, page }) => {
  const group = GENRES.find((item) => item.type == t);
  // console.log(group);
  return (
    <div className="w-full">
      <h1 className="m-auto my-2 border-b py-3 text-center text-2xl uppercase text-white">
        {group.classify} - page {page}
      </h1>
      <div className="mb-4 flex flex-wrap justify-center border-b pb-2">
        {GENRES.filter((item) => item.group == group.group).map((genre) => (
          <Link key={genre.type} href={`/list/${genre.type}/1`}>
            <a
              className={`align-center ease mx-1 my-2 flex w-max cursor-pointer rounded-full bg-white px-3 py-[0.2rem] text-xs uppercase text-gray-900 transition duration-200 hover:bg-gray-600 hover:text-gray-100 lg:px-5 lg:text-sm ${
                genre.type == t
                  ? " cursor-default bg-gray-500 hover:bg-gray-500 hover:text-gray-900"
                  : ""
              }`}
            >
              {genre.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreList;
