# CLAUDE.md — LocAI Hackathon Project

This file gives Claude Code full context about the LocAI project so it can assist effectively across all tasks — design, AI integration, deployment, and pitch preparation.

---

## Project Overview

**App Name:** LocAI
**Type:** Mobile-first web app (React)
**Goal:** Connect foreign tourists with verified local guides at Lake Toba, Indonesia, with an AI chat assistant powered by real local guide knowledge.
**Context:** Built for a hackathon by a team of 3 NUS students with minimal coding experience. Priority is a clean, convincing demo — not a production-ready backend.

---

## The Problem We're Solving

Tourists visiting Lake Toba face:
- No reliable way to find and verify local guides
- Language barriers (guides speak Batak/Indonesian, tourists speak English)
- Outdated or inaccurate travel information online
- Risk of scams, overcharging, and unsafe situations
- No single trusted platform to book, chat, and confirm a guide

**Macro context:** Indonesia's rupiah is at historic lows. Tourism is one of Indonesia's largest sources of foreign exchange. Every bad tourist experience damages Indonesia's reputation and reduces foreign spending. LocAI directly addresses this by making Lake Toba accessible, trustworthy, and bookable for international visitors.

---

## The Solution

A mobile web app with:
1. Browse verified local guides (photo, bio, specialty, price, reviews)
2. View full guide profiles
3. Book a guide with date and duration selection
4. Chat with an AI assistant trained on real guide knowledge
5. Receive booking confirmation with guide contact details

**One-liner for judges:** *"It's Airbnb Experiences, but for Lake Toba, with an AI guide assistant trained on real local knowledge — not the internet."*

---

## Team Roles

| Person | Focus |
|---|---|
| Darren | Product, content, pitch story, guide outreach |
| Partner 2 | Design, frontend screens, demo video |
| Partner 3 | AI integration, API connection, deployment |

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| UI Building | Claude Code | Primary tool for building all React components |
| Frontend Framework | React | Generated via Claude Code |
| Styling | Tailwind CSS | Clean, fast, mobile-first |
| AI Chat | OpenAI API (gpt-4o-mini) | Conversational AI with injected guide knowledge |
| Knowledge Base | System prompt injection (RAG) | Guide answers fed into AI at query time |
| Data | Hardcoded JSON | No real database for hackathon demo |
| Hosting | Vercel | Free tier, auto-deploys on every GitHub push |
| Version Control | GitHub | Claude Code commits and pushes here on request |
| Backend | None | Skipped entirely for hackathon scope |

---

## Git & Deployment Workflow

### How it works
Claude Code writes code locally → pushed to GitHub → Vercel auto-deploys → live site updates in ~30 seconds.

### Claude Code git instructions
After every meaningful change or completed screen, run:
```
git add .
git commit -m "descriptive message of what was built"
git push
```

When I say "commit and push" or "ship it" or "deploy", always run those three commands automatically without asking.

### Commit message format
Use clear descriptions:
- `build: splash screen complete`
- `build: home screen with guide cards`
- `build: AI chat connected to OpenAI API`
- `fix: mobile layout on guide profile screen`
- `update: swap placeholder guide data with real data`

### Branch strategy
Keep everything on `main` for the hackathon. No feature branches needed.

### Never commit these
- `.env` file or any file containing `OPENAI_API_KEY`
- `node_modules/` folder
- Any hardcoded API keys anywhere in the code

### .gitignore must include
```
.env
node_modules/
.next/
dist/
```

---

## App Screens (6 Total — Mobile First, 375x812px)

### 1. Splash / Onboarding
- Full-screen Lake Toba hero image placeholder
- App name: LocAI
- Tagline: "Find a trusted local guide"
- Single CTA: "Get Started"
- Dark gradient overlay on image
- Color palette: deep teal, warm brown, off-white

### 2. Home / Discovery
- Greeting text + search bar at top
- Horizontal scrollable filter chips: All, Trekking, Cultural, Photography, Fishing
- 3 guide cards: photo, name, specialty tag, star rating, price/day, verified badge
- Bottom nav: Home, Search, Chat, Profile

### 3. Guide Profile
- Large hero photo (full width, ~40% screen height)
- Name + verified badge + location + star rating + review count
- Short bio paragraph
- Scrollable specialty tags
- "What's included" section with 3 bullet points
- 2 sample reviews
- Sticky bottom bar: price/day + "Chat with AI" (outlined) + "Book Now" (filled teal)

### 4. AI Chat
- Top bar: AI avatar + "LocAI Assistant" + online indicator
- WhatsApp-style chat bubbles
- Tourist messages: right, teal bubbles
- AI responses: left, light grey bubbles
- Typing indicator while waiting for API response
- Text input bar + send button + mic icon

### 5. Booking Screen
- "Book Your Guide" header with back arrow
- Selected guide mini-card (photo, name, specialty)
- Calendar date picker
- Duration toggle: 1 day / 2 days / 3 days
- Price breakdown: guide fee + service fee + total
- "Confirm Booking" CTA button (full width, teal)

### 6. Booking Confirmation
- Large checkmark circle (teal, animated)
- "Booking Confirmed!" heading
- Guide avatar, name, "Your guide is ready"
- Booking summary: date, duration, meeting point
- WhatsApp button + phone number
- "View My Trips" (filled) + "Back to Home" (outlined)

---

## Design Direction

- **Style:** Clean, warm, trustworthy — Airbnb meets Klook for Southeast Asia
- **Colors:** Deep teal (#0D7377), warm brown (#8B5E3C), off-white (#FAF7F2), light grey (#F0EDEA)
- **Typography:** Bold headings, clean body text, generous whitespace
- **Feel:** Premium but approachable, not generic tech app
- **References:** Airbnb Experiences (profile + booking), Klook (card layout), Gojek (confirmation state), WhatsApp (chat UI)

---

## AI Chat — How It Actually Works

**Architecture:** RAG (Retrieval Augmented Generation)

**Flow:**
1. Tourist types a question in the chat UI
2. Frontend sends question to `api/chat.js`
3. `api/chat.js` reads `guide-knowledge.txt` and injects it into the system prompt
4. OpenAI API (gpt-4o-mini) generates a local-specific answer
5. Answer returns to frontend → displays in chat bubble

**API endpoint:** `POST https://api.openai.com/v1/chat/completions`
**Model:** `gpt-4o-mini`

**System prompt structure:**
```
You are LocAI Assistant, a helpful AI guide for tourists visiting Lake Toba, Indonesia.
You answer questions using only the local knowledge provided below.
If you don't know the answer, say: "I don't have specific information on that —
I recommend asking your guide directly or checking with the local tourism office."
Never make up prices, schedules, or locations.

--- LOCAL GUIDE KNOWLEDGE ---
[CONTENTS OF guide-knowledge.txt INJECTED HERE AT RUNTIME]
---
```

**Fallback behavior:** When no specific answer exists in the knowledge base, AI directs tourist to ask their guide or the local tourism office. Never hallucinates facts.

---

## Placeholder Guide Data

Use this in `src/data/guides.json` until real guide info is collected.

```json
{
  "guides": [
    {
      "id": 1,
      "name": "Pak Budi Situmorang",
      "photo": "/images/guide-1.jpg",
      "specialty": ["Trekking", "Cultural"],
      "rating": 4.9,
      "reviewCount": 47,
      "pricePerDay": 350000,
      "verified": true,
      "bio": "Born and raised in Samosir Island. 8 years guiding experience. Specialist in Batak cultural tours and Sipiso-piso waterfall treks.",
      "languages": ["English", "Indonesian", "Batak"],
      "location": "Samosir Island",
      "whatsapp": "+62812XXXXXXXX"
    },
    {
      "id": 2,
      "name": "Bu Sari Nababan",
      "photo": "/images/guide-2.jpg",
      "specialty": ["Cultural", "Local Food"],
      "rating": 4.8,
      "reviewCount": 31,
      "pricePerDay": 300000,
      "verified": true,
      "bio": "Batak cultural expert with deep knowledge of traditional ceremonies, weaving, and authentic local cuisine. Born in Balige, guides in English and Indonesian.",
      "languages": ["English", "Indonesian"],
      "location": "Balige",
      "whatsapp": "+62813XXXXXXXX"
    },
    {
      "id": 3,
      "name": "Pak Reza Manurung",
      "photo": "/images/guide-3.jpg",
      "specialty": ["Photography", "Trekking"],
      "rating": 4.7,
      "reviewCount": 28,
      "pricePerDay": 400000,
      "verified": true,
      "bio": "Professional photographer and licensed guide. Knows every sunrise and golden hour spot around Lake Toba. Perfect for content creators and photographers.",
      "languages": ["English", "Indonesian"],
      "location": "Parapat",
      "whatsapp": "+62857XXXXXXXX"
    }
  ]
}
```

---

## Placeholder Guide Knowledge

Use this as the content of `src/knowledge/guide-knowledge.txt` until real guide input is collected.

```
=== LOCAI LOCAL KNOWLEDGE BASE ===
Status: Placeholder only — replace with real guide input before demo

GETTING THERE
- Medan to Parapat by bus: 4-5 hours, around 50,000-80,000 IDR
- Ferry Parapat to Tuk Tuk: runs throughout the day, 25,000 IDR, 30-45 min
- Ferry Parapat to Tomok: every 1-2 hours, 7AM-6PM, 25,000-30,000 IDR

MAIN ATTRACTIONS
- Sipiso-piso Waterfall: 120 meters tall, entry 20,000 IDR
- Tomok Village: traditional Batak tombs, entry 5,000-10,000 IDR
- Ambarita Stone Chairs: ancient meeting site, entry 5,000 IDR
- Tele Viewpoint: best panoramic view of Samosir Island

COMMON SCAMS
- Unofficial guides at ferry terminals quoting very high prices
- Motorbike rentals inflated 2-3x for tourists — always negotiate
- Buy ferry tickets only at the official dock counter

WHAT TO PACK
- Light jacket for evenings — altitude makes it cold after sunset
- Cash only — most of Samosir doesn't accept cards
- Minimum 500,000 IDR cash per person per day

SAFETY
- Generally very safe including for solo travelers
- Emergency number: 112
- Always trek with a guide on jungle or waterfall trails
```

---

## Demo Flow for Judges

1. Open app on phone → Splash screen
2. Tap "Get Started" → Home screen with 3 guides
3. Tap guide card → Guide profile (Pak Budi)
4. Tap "Chat with AI" → Chat screen opens
5. Type: *"How do I get to Samosir Island from Medan?"*
6. AI responds with real ferry info
7. Type: *"Is it safe to go alone as a woman?"*
8. AI responds with safety tips
9. Go back → Tap "Book Now" → Booking screen
10. Select dates → Confirm → Booking confirmation screen
11. Show guide's WhatsApp contact appears

Total demo time: 90 seconds max. Practice until smooth.

---

## Pitch Structure (For Darren)

1. **Hook (15 sec):** Tell Mei Ling's story — the tourist who came to Lake Toba and left disappointed
2. **Problem (30 sec):** No trusted way to find guides. Language barriers. Scams. Bad information.
3. **Solution (20 sec):** LocAI — browse, chat, book, confirmed.
4. **Live Demo (90 sec):** Walk through the 6 screens
5. **Tech (30 sec):** RAG architecture, OpenAI API, real guide knowledge base
6. **Impact (30 sec):** Indonesia macro angle — tourism, rupiah, foreign confidence
7. **Ask (15 sec):** What you need / next steps post-hackathon

**Key emotional line:**
*"Every tourist who has a great experience at Lake Toba tells ten friends. Every tourist who gets scammed tells a hundred. We're here to make sure every experience is worth sharing."*

**Key tech line:**
*"LocAI uses a RAG architecture — where real knowledge from local guides is injected into an LLM at query time — giving tourists hyper-local answers that no general AI can provide."*

---

## Honest Tech Claims for Judges

| Term | Can You Claim It? | Reason |
|---|---|---|
| LLM | ✅ Yes | You are genuinely using OpenAI API |
| RAG | ✅ Yes | You inject guide knowledge into context at query time |
| NLP | ✅ Yes | AI understands and responds to natural language |
| Conversational AI | ✅ Yes | Accurate description of the chat feature |
| Machine Learning | ❌ No | You are not training any model |
| Computer Vision | ❌ No | No image analysis in the app |
| Fine-tuning | ❌ No | You are prompting, not fine-tuning |

---

## What NOT to Build

Do not attempt any of the following for the hackathon:
- Real user authentication or login system
- Actual database (Supabase, Firebase, PostgreSQL)
- Real payment processing
- Live guide availability system
- Backend server or API routes
- Admin dashboard
- Real-time messaging between tourist and guide

Everything is either hardcoded or handled by the OpenAI API call.

---

## Environment Variables

```
OPENAI_API_KEY=your_key_here
```

Never commit this to GitHub. Add to Vercel dashboard under Project Settings → Environment Variables. Store locally in a `.env` file which is listed in `.gitignore`.

---

## File Structure

```
locai/
├── CLAUDE.md
├── .env                  ← API key lives here locally, never committed
├── .gitignore            ← must include .env and node_modules
├── package.json
├── vercel.json
├── public/
│   └── images/
│       ├── guide-1.jpg
│       ├── guide-2.jpg
│       └── guide-3.jpg
├── src/
│   ├── App.jsx
│   ├── data/
│   │   └── guides.json
│   ├── knowledge/
│   │   └── guide-knowledge.txt
│   ├── screens/
│   │   ├── Splash.jsx
│   │   ├── Home.jsx
│   │   ├── GuideProfile.jsx
│   │   ├── AIChat.jsx
│   │   ├── Booking.jsx
│   │   └── Confirmation.jsx
│   └── components/
│       ├── GuideCard.jsx
│       ├── BottomNav.jsx
│       └── ChatBubble.jsx
└── api/
    └── chat.js           ← OpenAI API call lives here, never in frontend
```

---

## Deployment Checklist

- [ ] All 6 screens render correctly on mobile (375px width)
- [ ] `.env` file created locally with `OPENAI_API_KEY`
- [ ] `.gitignore` includes `.env` and `node_modules`
- [ ] OpenAI API key added to Vercel environment variables
- [ ] GitHub repo created and connected to Vercel
- [ ] AI chat returns real responses from guide knowledge document
- [ ] Guide knowledge document replaced with real guide input
- [ ] Demo flow tested end-to-end 3+ times
- [ ] Demo video recorded as backup
- [ ] Vercel deployment live with shareable URL
- [ ] URL tested on actual phone before pitch day

---

## Claude Code Instructions

When using Claude Code to build this project:

- Always build mobile-first (375px base width)
- Use Tailwind CSS for all styling
- Keep all guide data in `src/data/guides.json`
- Keep all guide knowledge in `src/knowledge/guide-knowledge.txt`
- Read `guide-knowledge.txt` at runtime and inject into the OpenAI system prompt in `api/chat.js`
- The OpenAI API call must only happen server-side in `api/chat.js` — never expose the API key in frontend code
- Always read API keys from environment variables, never hardcode them
- Hardcode all demo data — do not attempt to build a real database
- Every screen should be a separate component in `src/screens/`
- Navigation between screens via React state (no router needed for demo)
- Test every screen at 375px width before considering it done
- When told to "commit and push", "ship it", or "deploy" — always run `git add .`, `git commit`, and `git push` automatically