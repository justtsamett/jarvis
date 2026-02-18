export default async function handler(req, res) {
  const { text } = req.body;
  const API_KEY = process.env.GEMINI_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          role: "user", 
          parts: [{ text: "You are J.A.R.V.I.S., a highly sophisticated AI. Respond briefly and only in English. Always address me as 'Sir'. User says: " + text }] 
        }]
      })
    });
    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer: aiText });
  } catch (error) {
    res.status(500).json({ answer: "Sir, there is a core connection error." });
  }
}
