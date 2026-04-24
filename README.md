# 🪐 Jyotish Guru by Deoxys

Vedic Astrology AI — powered by **Google Gemini** (free, no credit card needed).
Users visit the site with zero setup — no API key field, no login.

---

## 🔑 Get a FREE Gemini API Key (2 minutes)

1. Go to → https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click **Create API Key**
4. Copy it — looks like `AIzaSy...`

**Free tier:** 15 requests/min, 1 million tokens/day — plenty for personal use.

---

## 🚀 Deploy to Railway (Free, Recommended)

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your repo
4. Go to **Variables** tab → Add:
   - `GEMINI_API_KEY` = your key from aistudio.google.com
5. Railway auto-deploys in ~60 seconds. Done!

---

## 🚀 Deploy to Render (Free)

1. [render.com](https://render.com) → New → Web Service → Connect GitHub repo
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Add Environment Variable: `GEMINI_API_KEY`
5. Deploy

---

## 🚀 Deploy to Fly.io

```bash
npm install -g flyctl
fly auth login
fly launch
fly secrets set GEMINI_API_KEY=AIzaSy...
fly deploy
```

---

## Run Locally

```bash
npm install
GEMINI_API_KEY=AIzaSy... npm start
# Open http://localhost:3000
```

Or create a `.env` file:
```
GEMINI_API_KEY=AIzaSy...
PORT=3000
```
Then run `npm start`.

---

## Features
- 🪐 Full Kundali (Birth Chart) — all 9 grahas, yogas, doshas
- 🔮 Predictions — Career, Relationships, Health, Personal Growth (short/medium/long)
- 💫 Kundali Matching — Ashta-Koota Guna Milan (score out of 36)
- 🌙 Dosha analysis & remedies
- ✨ Dark cosmic theme — users need zero setup
