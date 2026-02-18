export default async function handler(req, res) {
  const { text } = req.body;
  const API_KEY = process.env.GEMINI_KEY; //
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "You are J.A.R.V.I.S. Respond briefly and ONLY in English. Always call me Sir. User says: " + text }] }]
      })
    });
    const data = await response.json();
    
    if (data.error) {
        return res.status(200).json({ answer: "Sir, Google reported an error: " + data.error.message });
    }
    
    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer: aiText });
  } catch (error) {
    res.status(200).json({ answer: "Sir, I am unable to access the Gemini core right now." });
  }
}
