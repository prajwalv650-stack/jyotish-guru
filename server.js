const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', keyConfigured: !!GEMINI_API_KEY });
});

// API route
app.post('/api/generate', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not set on server.' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'No prompt provided' });
  }

  // 🔥 Model fallback list
  const MODELS = [
    "gemini-2.5-flash",       // best
    "gemini-2.0-flash",       // stable fallback
    "gemini-2.5-flash-lite"   // lightweight fallback
  ];

  let lastError = null;

  for (const MODEL of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

      console.log(`🔄 Trying model: ${MODEL}`);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 4096,
            temperature: 0.7
          }
        })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        lastError = data.error?.message || `Error ${response.status}`;
        console.log(`❌ ${MODEL} failed: ${lastError}`);

        // wait 1 second before retrying next model
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

      console.log(`✅ Success with ${MODEL}`);
      return res.json({ result: text });

    } catch (err) {
      lastError = err.message;
      console.log(`❌ Exception with ${MODEL}: ${err.message}`);
    }
  }

  // If all models fail
  return res.status(500).json({
    error: lastError || "All models are currently overloaded. Please try again."
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🪐 Jyotish Guru running on http://localhost:${PORT}`);
  console.log(`🔑 Gemini Key: ${GEMINI_API_KEY ? 'Configured ✓' : 'NOT SET'}`);
});
