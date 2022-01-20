export const randomSelect5FromArray = (arr) =>
  arr.sort(() => 0.5 - Math.random()).slice(-5);

export const getInfoFromApiToDetail = (info) => {
  // console.log(info);
  const {
    vod_id,
    vod_name,
    vod_class,
    vod_pic,
    vod_tag,
    vod_actor,
    vod_director,
    vod_remarks,
    vod_area,
    vod_lang,
    vod_year,
    vod_hits_month,
    vod_score,
    vod_content,
    vod_play_url,
  } = info;
  return {
    vod_id,
    vod_name,
    vod_class,
    vod_pic,
    vod_tag,
    vod_actor,
    vod_director,
    vod_remarks,
    vod_area,
    vod_lang,
    vod_year,
    vod_hits_month,
    vod_score,
    vod_content,
    vod_play_url,
  };
};

export const filterNeededVideoInfo = ({
  vod_id,
  vod_name,
  vod_class,
  vod_pic,
  vod_remarks,
}) => {
  return { vod_id, vod_name, vod_class, vod_pic, vod_remarks };
};

export async function getVideosListFromApi(url) {
  try {
    const res = await fetch(url);
    const result = await res.json();
    result.list = result.list.map((i) => filterNeededVideoInfo(i));
    return result;
  } catch (error) {
    console.log(error);
  }
  // console.log(JSON.parse(JSON.stringify(result)));
}
export async function getVideosListFromDouban(url) {
  try {
    const res = await fetch(url);
    const result = await res.json();
    if (res.status !== 200) {
      console.error(json);
      throw new Error("Failed to fetch API");
    }
    // result.list = result.subjects.map((i) => filterNeededVideoInfo(i));
    return result.subjects;
  } catch (error) {
    console.log(error);
  }
  // console.log(JSON.parse(JSON.stringify(result)));
}

export async function findMovieFromApiByTitle(title) {
  try {
    // console.log(`${process.env.MOVIE_API}/?ac=detail&wd=${title}`);
    const res = await fetch(
      `${process.env.MOVIE_API}/?ac=detail&wd=${encodeURI(title)}`
    );
    const result = await res.json();
    if (res.status !== 200) {
      console.error(json);
      throw new Error("Failed to fetch API");
    }
    if (!result.total) return false;
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const genres = [
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
