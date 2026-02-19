export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { text } = req.body;
  const API_KEY = process.env.GEMINI_KEY; // Vercel Settings'teki isim
  
  // Model yolunu Gemini 3 Flash Preview olarak güncelledik
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "System: You are J.A.R.V.I.S. Respond only in English and call me Sir. User: " + text }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
        return res.status(200).json({ answer: "Sir, a connection issue occurred: " + data.error.message });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer: aiText });
  } catch (error) {
    res.status(200).json({ answer: "Sir, there is a core connection breakdown." });
  }
}
