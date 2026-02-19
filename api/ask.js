export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

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
          parts: [{ text: "You are J.A.R.V.I.S. Respond briefly and only in English. Always call me Sir. If I ask to open WhatsApp, you MUST include the keyword '[ACTION:OPEN_WHATSAPP]' in your response. User says: " + text }] 
        }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(200).json({ answer: "Sir, Google API error: " + data.error.message });
    
    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer: aiText });
  } catch (error) {
    res.status(200).json({ answer: "Sir, there is a connection error in the core." });
  }
}
