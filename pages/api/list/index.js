import { getVideosListFromApi } from "../../../utils/utils";
export default async function handler(req, res) {
  try {
    const response = await getVideosListFromApi(
      `${process.env.MOVIE_API}/?ac=detail`
    );
    // const result = response.json();
    return await res.status(200).json(response);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: `failed to load from video list api` });
  }
}
