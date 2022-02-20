export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(
      `${process.env.MOVIE_API}/?ac=detail&ids=${id}`
    );
    return res.status(200).json(await response.json());
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: `failed to load from video list api` });
  }
}
