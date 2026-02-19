// api/ask.js
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
          parts: [{ text: "System: You are J.A.R.V.I.S. You have permission to control the user's tablet. If the user wants to open an app like WhatsApp, respond with '[ACTION:OPEN_APP:WhatsApp]' followed by a verbal confirmation. Respond in English and call me Sir. User: " + text }] 
        }]
      })
    });
    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer: aiText });
  } catch (error) {
    res.status(500).json({ answer: "Sir, there is a connection error." });
  }
}
