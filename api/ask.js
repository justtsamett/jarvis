export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { text } = req.body;
  const API_KEY = process.env.GEMINI_KEY; //
  
  // En kararlı v1 sürümünü kullanıyoruz
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "System prompt: You are J.A.R.V.I.S. Respond only in English and address me as Sir. User says: " + text }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
        // Hata varsa tam sebebini J.A.R.V.I.S. sesli söylesin ki çözelim
        return res.status(200).json({ answer: "Sir, I have an issue. Google says: " + data.error.message });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer: aiText });
  } catch (error) {
    res.status(200).json({ answer: "Sir, there is a connection break in the core server." });
  }
}
