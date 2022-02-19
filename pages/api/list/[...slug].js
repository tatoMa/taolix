import { getVideosListFromApi } from "../../../utils/utils";
export default async function handler(req, res) {
  const { slug } = req.query;
  try {
    const response = await getVideosListFromApi(
      `${process.env.MOVIE_API}/?ac=detail&t=${slug[0]}&pg=${slug[1]}`
    );
    // const result = response.json();
    return res.status(200).json(response);
  } catch (error) {
    console.error("error: ", error);
    res
      .status(500)
      .json({ error: `failed to load from api by genre ${genre}` });
  }
}
