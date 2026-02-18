export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { text } = req.body;
  // Vercel Settings -> Environment Variables kısmına GEMINI_KEY eklemeyi unutma!
  const API_KEY = process.env.GEMINI_KEY; 
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: text }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
        return res.status(500).json({ answer: "Sir, bir hata oluştu: " + data.error.message });
    }

    const aiText = data.candidates[0].content.parts[0].text;
    res.status(200).json({ answer: aiText });
  } catch (error) {
    res.status(500).json({ answer: "Üzgünüm efendim, bağlantı çekirdeğinde bir sorun var." });
  }
}
