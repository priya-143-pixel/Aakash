const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const API_KEY = process.env.GEMINI_API_KEY; // यह Step 1 वाली Key उठा लेगा

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: "You are Yama, a witty mentor. Answer in Hinglish: " + prompt }] }]
      })
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;

    return { statusCode: 200, body: JSON.stringify({ text }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server Error" }) };
  }
};