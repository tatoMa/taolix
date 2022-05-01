export default async function handler(req, res) {
  const { id } = req.query;
  // console.log(id);
  try {
    const response =
      id[1] === "hd"
        ? await fetch(
            `${process.env.MOVIE_API_SOURCE_HD}?ac=detail&ids=${id[0]}`
          )
        : await fetch(`${process.env.MOVIE_API}/?ac=detail&ids=${id[0]}`);
    return res.status(200).json(await response.json());
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: `failed to load from video list api` });
  }
}
