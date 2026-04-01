# NAAZUK 🚨
### *The Digital Autopsy Theater. No egos were harmed. (They were destroyed.)*

---

![Naazuk Banner](https://img.shields.io/badge/STATUS-CLINICALLY%20FRAGILE-red?style=for-the-badge&labelColor=000000)
![Built at](https://img.shields.io/badge/BUILT%20AT-THE%20STUPID%20HACKATHON-FFE500?style=for-the-badge&labelColor=000000)
![Stack](https://img.shields.io/badge/STACK-React%20%2B%20Groq%20%2B%20Supabase-7B5EA7?style=for-the-badge&labelColor=000000)

---

## What is Naazuk?

You describe an ego incident. The AI performs a full forensic autopsy on it. You get a pettiness score, a medical diagnosis, a villain arc, and a passive-aggressive response generator - all wrapped in the aesthetic of a classified government document.

Then you post it publicly so the internet can vote on the level of delusion.

**Inspired by a true story.** At a hackathon, a guy rejected our team's frontend, rebuilt it himself, disconnected all three of us on LinkedIn, and then had the audacity to ask "did you see my internship post?" - Naazuk was born that day.

---

## Features

### 🔬 The Autopsy Engine
Submit any ego incident and get a full AI-powered breakdown:

| Feature | What it does |
|---|---|
| **Medical Autopsy** | Clinical diagnosis of the ego incident with cause, symptoms, prognosis |
| **Ego Translator** | What they said vs. what they actually meant |
| **Red Flag Immigration Office** | Every red flag processed as a formal visa application (always approved) |
| **Smile & Stab Generator** | Passive-aggressive responses that sound like compliments |
| **Villain Arc** | Your 5-act Bollywood revenge story with background score |
| **Pettiness Score** | 0–100 meter of how petty the incident actually was |

### 🧠 Full Diagnosis
All 7 ego types scored in real-time against your specific incident:
- 👑 Main Character
- 🏃 Unsolicited Takeover
- 🧠 Fragile Genius
- 🏆 Credit Stealer
- 📱 LinkedIn Warrior
- 🤹 Pathetic Juggler
- 😴 Convenient Amnesia

### 🏛️ Hall of Shame
A public leaderboard of submitted ego incidents. Real people. Real incidents. Real delusion. Vote with 🥚 Fragile, 👶 So Mature, 🪞 Mirror Check, or 🏆 Elite Shame.

### 📁 Case Master
Export your dissection as a downloadable classified case file card. Customise the theme. Send it anonymously.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Tailwind CSS |
| Animation | Framer Motion |
| AI | Groq API (llama-3.3-70b-versatile) |
| Database | Supabase (PostgreSQL) |
| Auth / Sessions | Anonymous voter sessions via localStorage |
| Build Tool | Vite |
| Icons | Lucide React |

---

## Project Structure

```
Naazuk/
├── server/
│   └── server.ts          # Express server (optional proxy)
├── src/
│   ├── App.tsx            # Entire frontend — all screens, logic, components
│   ├── index.css          # Global styles, custom fonts, animations
│   └── main.tsx           # React entry point
├── .env                   # Environment variables (never commit this)
├── .env.example           # Template for environment variables
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Groq API key](https://console.groq.com) (free)
- A [Supabase](https://supabase.com) project (free tier is enough)

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/naazuk.git
cd naazuk
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Set up the Supabase database

Run this SQL in your Supabase **SQL Editor**:

```sql
-- Cases table
create table cases (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  case_id text,
  incident_text text,
  ego_type text,
  ego_emoji text,
  pettiness_score int,
  confidence int,
  verdict text,
  description text,
  summary text,
  medical_autopsy text,
  ego_translator text,
  red_flag_immigration text,
  smile_stab text,
  villain_arc text,
  evidence_a text,
  evidence_b text,
  evidence_c text,
  top_roast text,
  all_scores jsonb,
  is_public boolean default false
);

-- Votes table
create table votes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  case_id uuid references cases(id),
  reaction text,
  voter_session text
);

-- Row Level Security
alter table cases enable row level security;
alter table votes enable row level security;

create policy "Anyone can read public cases" on cases for select using (is_public = true);
create policy "Anyone can insert cases" on cases for insert with check (true);
create policy "Anyone can update cases" on cases for update using (true);
create policy "Anyone can insert votes" on votes for insert with check (true);
create policy "Anyone can read votes" on votes for select using (true);
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## How It Works

```
User types incident
        ↓
React sends text to Groq API (llama-3.3-70b)
        ↓
Single prompt returns full JSON:
  → ego type + confidence
  → all 7 type scores
  → medical autopsy
  → ego translator
  → red flag immigration
  → smile & stab responses
  → villain arc
  → pettiness score
  → top roast
        ↓
Result saved to Supabase (private)
        ↓
User views Evidence + Full Diagnosis
        ↓
User optionally submits to Hall of Shame
(is_public flipped to true in Supabase)
        ↓
Community votes in real-time
```

---

## The 7 Ego Types

| Type | Emoji | Description |
|---|---|---|
| Main Character | 👑 | Treats every conversation like their Netflix special |
| Unsolicited Takeover | 🏃 | Redoes your work because they simply cannot help themselves |
| Fragile Genius | 🧠 | Always ready to explain why you are wrong |
| Credit Stealer | 🏆 | Writing checks their talent can't cash |
| LinkedIn Warrior | 📱 | Weaponises professional platforms for personal drama |
| Pathetic Juggler | 🤹 | Keeping multiple people emotionally on the hook |
| Convenient Amnesia | 😴 | Forgets everything they said the moment it becomes inconvenient |

---

## Hall of Shame Tabs

| Tab | Logic |
|---|---|
| Most Fragile This Week | Cases from last 7 days, sorted by 🥚 votes |
| All Time Hall of Fame | All cases, sorted by 🏆 votes |
| Most Unnecessary LinkedIn Action | LinkedIn Warrior cases only, sorted by total votes |

---

## Environment Variables Reference

| Variable | Description | Where to get it |
|---|---|---|
| `VITE_GROQ_API_KEY` | Groq API key for LLM inference | [console.groq.com](https://console.groq.com) |
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous public key | Supabase Dashboard → Settings → API |

---

## Built At

**The Stupid Hackathon** - an inter-college competition where the goal isn't to change the world. It's to build the most brilliantly pointless technology imaginable.

> *"The more pointless your project, the better. The tech stack should be inversely proportional to its utility."*

Naazuk was built by a team of three best friends, powered by spite, Groq, and the memory of a guy who disconnected us on LinkedIn and then asked if we saw his post.

---

## The Origin Story

At our last hackathon, we had a team of four. We built the frontend. It looked great. Our fourth teammate looked at it, said "no, I'll make my own," rebuilt it from scratch, presented it, disconnected all three of us on LinkedIn immediately after, and then had the audacity to message asking "did you see my internship post?"

Naazuk is our autopsy report on that incident. It is also a gift to everyone who has ever dealt with someone whose ego outweighs their contribution.

---

## License

MIT - use it, roast with it, frame it and send it anonymously.

---

<div align="center">

**NAAZUK** • *The Digital Autopsy Theater*

© 2026 Naazuk. No egos were harmed in the making of this app.
*(They were destroyed.)*

</div>
