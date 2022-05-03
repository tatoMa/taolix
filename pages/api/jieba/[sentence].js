// from https://github.com/yanyiwu/nodejieba
export default async function handler(req, res) {
  const { sentence } = req.query;
  const formData = new URLSearchParams();
  formData.append("sentence", sentence);
  try {
    const response = await fetch("http://cppjieba-webdemo.herokuapp.com/", {
      method: "POST",
      body: formData,
    });
    const words = await response.json();
    return res.status(200).json(words);
  } catch (error) {
    console.error("error: ", error);
    res.status(500).json({ error: `failed to divide sentence to words` });
  }
}
