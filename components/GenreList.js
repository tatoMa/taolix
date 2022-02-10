import Link from "next/link";
import { GENRES } from "../utils/const";

const GenreList = ({ t }) => {
  const group = GENRES.find((item) => item.type == t);
  // console.log(group);
  return (
    <div className="w-full">
      <div className="text-white uppercase text-3xl border-b py-3 my-2">
        {group.classify}
      </div>
      <div className="flex justify-center flex-wrap border-b pb-2 mb-4">
        {GENRES.filter((item) => item.group == group.group).map((genre) => (
          <Link key={genre.type} href={`/list/${genre.type}/1`}>
            <a
              className={`uppercase px-3 lg:px-5 py-[0.2rem] mx-1 my-2 rounded-full text-gray-900 bg-white text-xs lg:text-sm flex align-center w-max cursor-pointer hover:bg-gray-600 hover:text-gray-100 transition duration-200 ease ${
                genre.type == t
                  ? " bg-gray-500 cursor-default hover:text-gray-900 hover:bg-gray-500"
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
