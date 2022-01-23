export const findResourceFromDoubanItem = async (item) => {
  try {
    let temp = await findMovieFromApiByTitle(item.title);
    if (temp && temp.list.length) {
      // temp = { ...temp.list[0], ...item };
      temp = {
        ...filterNeededVideoInfoForHero({ ...temp.list[0], ...item }),
      };
      if (temp.vod_id) return temp;
    }
  } catch (error) {}
};

export const filterHtmlTagsFromString = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};
export const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const getVideoUrlsFromUrlStr = (url) => {
  if (!url) return;
  return url
    ?.split("$$$")
    .filter((s) => s.includes("m3u8"))
    .toString()
    ?.split("#")
    .filter((s) => s.includes("m3u8"))
    .map((item) => {
      let temp = item?.split("$");
      return {
        name: temp[0],
        url: temp[1],
      };
    });
};

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

export const filterNeededVideoInfo = (
  { vod_id, vod_name, vod_class, vod_pic, vod_remarks } = {
    vod_id: 0,
    vod_name: "",
    vod_class: "",
    vod_pic: "",
    vod_remarks: "",
  }
) => {
  return { vod_id, vod_name, vod_class, vod_pic, vod_remarks };
};

export const filterNeededVideoInfoForHero = (
  {
    vod_id,
    vod_name,
    vod_class,
    vod_pic,
    vod_remarks,
    rate,
    type_name,
    url,
    vod_actor,
    vod_blurb,
    vod_director,
    vod_content,
    vod_pubdate,
    vod_tag,
    vod_time,
    vod_year,
    vod_writer,
  } = {
    vod_id: 0,
    vod_name: "",
    vod_class: "",
    vod_pic: "",
    vod_remarks: "",
    rate: "",
    type_name: "",
    url: "",
    vod_actor: "",
    vod_blurb: "",
    vod_director: "",
    vod_content: "",
    vod_pubdate: "",
    vod_tag: "",
    vod_time: "",
    vod_year: "",
    vod_writer: "",
  }
) => {
  return {
    vod_id,
    vod_name,
    vod_class,
    vod_pic,
    vod_remarks,
    rate,
    type_name,
    url,
    vod_actor,
    vod_blurb,
    vod_director,
    vod_content,
    vod_pubdate,
    vod_tag,
    vod_time,
    vod_year,
    vod_writer,
  };
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
