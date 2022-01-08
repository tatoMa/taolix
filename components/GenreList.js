import Link from "next/link";

const GenreList = ({ t }) => {
  const genres = [
    { group: 6, type: 6, name: "adventure", classify: "movie" },
    { group: 6, type: 7, name: "romances", classify: "movie" },
    { group: 6, type: 8, name: "sci-fi", classify: "movie" },
    { group: 6, type: 9, name: "horror", classify: "movie" },
    { group: 6, type: 10, name: "crime", classify: "movie" },
    { group: 6, type: 11, name: "war", classify: "movie" },
    { group: 6, type: 20, name: "documentary", classify: "movie" },
    { group: 6, type: 21, name: "drama", classify: "movie" },
    { group: 6, type: 23, name: "comedy", classify: "movie" },
    { group: 6, type: 34, name: "historical", classify: "movie" },
    { group: 6, type: 35, name: "fantasy", classify: "movie" },
    { group: 6, type: 36, name: "animation", classify: "movie" },
    { group: 6, type: 37, name: "mystery", classify: "movie" },

    { group: 13, type: 13, name: "chinese", classify: "tv show" },
    { group: 13, type: 14, name: "hongkong", classify: "tv show" },
    { group: 13, type: 15, name: "american", classify: "tv show" },
    { group: 13, type: 16, name: "korean", classify: "tv show" },
    { group: 13, type: 22, name: "japanese", classify: "tv show" },
    { group: 13, type: 24, name: "taiwanese", classify: "tv show" },
    { group: 13, type: 25, name: "others", classify: "tv show" },

    { group: 26, type: 26, name: "chinese reality", classify: "reality show" },
    {
      group: 26,
      type: 27,
      name: "japan korea reality",
      classify: "reality show",
    },
    {
      group: 26,
      type: 28,
      name: "hongkong taiwan reality",
      classify: "reality show",
    },
    { group: 26, type: 29, name: "english reality", classify: "reality show" },

    { group: 31, type: 31, name: "japanese", classify: "anime" },
    { group: 31, type: 30, name: "chinese", classify: "anime" },
    { group: 31, type: 32, name: "english", classify: "anime" },
    { group: 31, type: 33, name: "other", classify: "anime" },
  ];
  const group = genres.filter((item) => item.type == t)[0];
  // console.log(group);
  return (
    <div className="px-2 sm:px-6 md:px-10 lg:px-14 w-full">
      <div className="text-white uppercase text-3xl border-b py-3 my-2">
        {group.classify}
      </div>
      <div className="flex justify-center flex-wrap border-b pb-2 mb-4">
        {genres
          .filter((item) => item.group == group.group)
          .map((genre) => (
            <Link key={genre.type} href={`/list?t=${genre.type}&page=1`}>
              <a
                className={`uppercase px-5 py-1 mx-1 my-2 rounded-full text-gray-900 bg-white text-sm flex align-center w-max cursor-pointer hover:bg-gray-600 hover:text-gray-100 transition duration-200 ease ${
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
