export const randomSelect5FromArray = (arr) =>
  arr.sort(() => 0.5 - Math.random()).slice(-5);

export const getInfoFromApiToDetail = (info) => {
  console.log(info);
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

export const getInfoFromApiToIndex = ({
  vod_id,
  vod_name,
  vod_class,
  vod_pic,
}) => {
  return { vod_id, vod_name, vod_class, vod_pic };
};

export async function getVideosListFromApi(url) {
  const res = await fetch(url);
  const result = await res.json();
  result.list = result.list.map((i) => getInfoFromApiToIndex(i));
  // console.log(JSON.parse(JSON.stringify(result)));
  return result;
}
