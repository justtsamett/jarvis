from flask import Flask, render_template_string, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# J.A.R.V.I.S. Zekası (Gemini 2.0 Flash)
GEMINI_KEY = "AIzaSyAVL6WbHqTRlkK_RMBF7pq9VaWOgnyMyPE"
genai.configure(api_key=GEMINI_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')

# J.A.R.V.I.S. Arayüzü (Dairesel Tasarım)
html_code = """
<!DOCTYPE html>
<html lang="en">
<head>
    <title>J.A.R.V.I.S.</title>
    <style>
        body { background: #050505; color: #00d4ff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; }
        .circle { width: 220px; height: 220px; border: 4px solid #00d4ff; border-radius: 50%; box-shadow: 0 0 40px #00d4ff, inset 0 0 20px #00d4ff; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite; cursor: pointer; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        h1 { letter-spacing: 4px; margin-top: 25px; text-shadow: 0 0 10px #00d4ff; font-size: 1.5rem; }
    </style>
</head>
<body>
    <div class="circle" onclick="askJarvis()"><h2>J.A.R.V.I.S.</h2></div>
    <h1>ONLINE, SIR</h1>
    <script>
        function askJarvis() {
            const q = prompt("Waiting for your command, Sir:");
            if (q) {
                fetch('/ask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: q })
                })
                .then(r => r.json())
                .then(data => alert("J.A.R.V.I.S.: " + data.answer));
            }
        }
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(html_code)

@app.route('/ask', methods=['POST'])
def ask():
    user_text = request.json['text']
    # J.A.R.V.I.S. Kişiliği ve İngilizce Talimatı
    prompt = f"Respond in English as J.A.R.V.I.S. Call the user 'Sir' and be polite. Question: {user_text}"
    response = model.generate_content(prompt)
    return jsonify({"answer": response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
