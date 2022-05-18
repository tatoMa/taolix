export const GENRES = [
  { group: 1, type: 1, name: "crime", classify: "movie" },
  { group: 1, type: 2, name: "documentary", classify: "movie" },
  { group: 1, type: 3, name: "animation", classify: "movie" },
  { group: 1, type: 4, name: "adventure", classify: "movie" },
  { group: 1, type: 5, name: "comedy", classify: "movie" },
  { group: 1, type: 6, name: "romances", classify: "movie" },
  { group: 1, type: 7, name: "sci-fi", classify: "movie" },
  { group: 1, type: 8, name: "horror", classify: "movie" },
  { group: 1, type: 9, name: "drama", classify: "movie" },
  { group: 1, type: 10, name: "war", classify: "movie" },
  // { group: 1, type: 2, name: "drama", classify: "movie" },
  // { group: 1, type: 18, name: "fantasy", classify: "movie" },
  // { group: 6, type: 34, name: "historical", classify: "movie" },

  { group: 33, type: 33, name: "chinese", classify: "tv show" },
  { group: 33, type: 34, name: "korean", classify: "tv show" },
  { group: 33, type: 35, name: "hongkong", classify: "tv show" },
  { group: 33, type: 36, name: "american", classify: "tv show" },
  { group: 33, type: 37, name: "japanese", classify: "tv show" },
  { group: 33, type: 38, name: "other", classify: "tv show" },
  // { group: 13, type: 25, name: "others", classify: "tv show" },

  { group: 41, type: 41, name: "chinese reality", classify: "reality show" },
  {
    group: 41,
    type: 40,
    name: "korean japanese reality",
    classify: "reality show",
  },
  {
    group: 41,
    type: 42,
    name: "hongkong taiwan reality",
    classify: "reality show",
  },
  { group: 41, type: 43, name: "english reality", classify: "reality show" },

  { group: 46, type: 46, name: "japanese", classify: "anime" },
  { group: 46, type: 45, name: "chinese", classify: "anime" },
  { group: 46, type: 47, name: "english", classify: "anime" },
  { group: 46, type: 48, name: "other", classify: "anime" },
  // { group: 31, type: 33, name: "other", classify: "anime" },
];

export const MAJORS = [
  GENRES.find((item) => item.classify == "movie"),
  GENRES.find((item) => item.classify == "tv show"),
  GENRES.find((item) => item.classify == "reality show"),
  GENRES.find((item) => item.classify == "anime"),
];

// this is the genre for api.ylzy1.com
// export const genres = [
//   { group: 6, type: 6, name: "adventure", classify: "movie" },
//   { group: 6, type: 7, name: "romances", classify: "movie" },
//   { group: 6, type: 8, name: "sci-fi", classify: "movie" },
//   { group: 6, type: 9, name: "horror", classify: "movie" },
//   { group: 6, type: 10, name: "crime", classify: "movie" },
//   { group: 6, type: 11, name: "war", classify: "movie" },
//   { group: 6, type: 20, name: "documentary", classify: "movie" },
//   { group: 6, type: 21, name: "drama", classify: "movie" },
//   { group: 6, type: 23, name: "comedy", classify: "movie" },
//   { group: 6, type: 34, name: "historical", classify: "movie" },
//   { group: 6, type: 35, name: "fantasy", classify: "movie" },
//   { group: 6, type: 36, name: "animation", classify: "movie" },
//   { group: 6, type: 37, name: "mystery", classify: "movie" },

//   { group: 13, type: 13, name: "chinese", classify: "tv show" },
//   { group: 13, type: 14, name: "hongkong", classify: "tv show" },
//   { group: 13, type: 15, name: "american", classify: "tv show" },
//   { group: 13, type: 16, name: "korean", classify: "tv show" },
//   { group: 13, type: 22, name: "japanese", classify: "tv show" },
//   { group: 13, type: 24, name: "taiwanese", classify: "tv show" },
//   { group: 13, type: 25, name: "others", classify: "tv show" },

//   { group: 26, type: 26, name: "chinese reality", classify: "reality show" },
//   {
//     group: 26,
//     type: 27,
//     name: "japan korea reality",
//     classify: "reality show",
//   },
//   {
//     group: 26,
//     type: 28,
//     name: "hongkong taiwan reality",
//     classify: "reality show",
//   },
//   { group: 26, type: 29, name: "english reality", classify: "reality show" },

//   { group: 31, type: 31, name: "japanese", classify: "anime" },
//   { group: 31, type: 30, name: "chinese", classify: "anime" },
//   { group: 31, type: 32, name: "english", classify: "anime" },
//   { group: 31, type: 33, name: "other", classify: "anime" },
// ];
