// from https://github.com/yanyiwu/nodejieba
export default async function handler(req, res) {
  try {
    const response = await fetch("http://ipwho.is/");
    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: `failed to check ip address` });
  }
}
