import { GENRES } from "./const";

export const genresForIndexFetch = [
  GENRES.find(
    (genre) => genre.name === "chinese" && genre.classify === "tv show"
  ),
  GENRES.find(
    (genre) => genre.name === "korean" && genre.classify === "tv show"
  ),
  GENRES.find(
    (genre) => genre.name === "american" && genre.classify === "tv show"
  ),
  GENRES.find(
    (genre) =>
      genre.name === "chinese reality" && genre.classify === "reality show"
  ),
  GENRES.find(
    (genre) => genre.name === "japanese" && genre.classify === "anime"
  ),
];

export const findResourceFromDoubanItem = async (item) => {
  try {
    let temp = await findMovieFromApiByTitle(item.title, process.env.MOVIE_API);
    if (temp && temp.list.length) {
      // temp = { ...temp.list[0], ...item };
      temp = {
        ...filterNeededVideoInfoForHero({
          ...temp.list[0],
          ...item,
          rate: item.rate,
        }),
      };
      if (temp.vod_id) return temp;
    }
  } catch (error) {}
};

export const filterHtmlTagsFromString = (str) => {
  return str?.replace(/<\/?[^>]+(>|$)/g, "");
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
  {
    vod_name,
    vod_class,
    vod_pic,
    vod_remarks,
    vod_id,
    rate,
    vod_douban_score,
  } = {
    vod_name: "",
    vod_class: "",
    vod_pic: "",
    vod_remarks: 0,
    vod_id: 0,
    rate: 0,
    vod_douban_score: 0,
  }
) => {
  return {
    vod_name,
    vod_class,
    vod_pic,
    vod_remarks,
    vod_id,
    rate: rate || vod_douban_score,
    vod_douban_score: rate || vod_douban_score,
  };
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
    // console.log(result);
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

export async function findMovieFromApiByTitle(title, api) {
  try {
    // console.log(`${process.env.MOVIE_API_SOURCE_2}/?ac=detail&wd=${title}`);
    const res = await fetch(`${api}/?ac=detail&wd=${encodeURI(title)}`);
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

export function removeAllSpecialCharactersFromString(str) {
  return str?.replace(
    /[`:_.~!@#$%^&amp;*() \+ =&lt;&gt;?"{}|, \/ ;' \\ [ \] ·~！@#￥%……&amp;*（）—— \+ ={}|《》？：“”【】、；‘’，。、-]/g,
    ""
  );
}

export const gerVideoListFromDoubanApiHotList = async (url) => {
  let videosHotListDouban = {};

  try {
    videosHotListDouban = await getVideosListFromDouban(
      `${process.env.DOUBAN_URL}${encodeURI(url)}`
    );
  } catch (e) {
    console.error("error: ", e);
  }
  // using Douban ranking video list fetch all individual resource from API
  let videosHotListDoubanFindResource = await Promise.allSettled(
    videosHotListDouban.map(async (item) => {
      try {
        const res = await findResourceFromDoubanItem(item);
        return res;
      } catch (e) {
        console.error("error: ", e);
      }
    })
  );

  // filter unnecessary items
  const videosHotListDoubanFiltered = {};
  videosHotListDoubanFiltered.list = videosHotListDoubanFindResource
    .filter(Boolean)
    .filter((item) => item.status === "fulfilled" && item.value !== undefined)
    .map((item) => item.value);
  return videosHotListDoubanFiltered;
};
