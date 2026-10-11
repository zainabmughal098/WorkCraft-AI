# WorkCraft AI ⚡

> **Custom Workplace App Studio powered by Google Gemini 3.8 Flash**  
> Build, customize, and run AI apps tailored to your daily workflow.

🌐 **Live Demo:** [work-craft-ai.vercel.app](https://work-craft-ai.vercel.app/)

---

## 🎯 What it Does

WorkCraft AI automates repetitive workplace tasks using the Google AI Studio formula:

> **“My app takes [inputs] and does [process] to create [output] that helps me [goal].”**

Instead of drafting everything manually, it generates ready-to-use documents and structured spreadsheet tables (with a 1-click **"Copy for Spreadsheet"** button formatted for Google Sheets and Excel).

---

## 🛠️ Tools & Tech Stack

### Frontend
- **React 19:** Modern functional component architecture & state management
- **TypeScript:** Strict type safety across UI blueprints and API responses
- **Tailwind CSS v4:** Styling, custom color palettes, and glassmorphism UI
- **Lucide React:** Iconography for tool categories and interactive controls
- **Vite 8:** Frontend build tool, local dev server, and asset bundler

### Backend
- **Node.js & Express 4:** REST API server handling request parsing and routing
- **@google/genai SDK:** Official Google GenAI TypeScript SDK running **Gemini 3.8 Flash**
- **tsx:** High-performance TypeScript execution engine for server scripts
- **dotenv:** Environment variable configuration

### Deployment
- **Vercel:** Hosting for the single-page application and serverless `/api` backend endpoints

---

## 💼 Built-In Workplace Apps

| App | Role | What it Generates |
| :--- | :--- | :--- |
| **Holiday Campaign Hub** | Social Media Manager | Multi-channel posts (Instagram, LinkedIn, X), image prompts, posting calendar |
| **Meeting Action Matrix** | Project Manager | Executive TL;DR, task matrix (owners & deadlines), follow-up email draft |
| **Customer Support Responder** | Support Lead | 3 tone-adjusted replies (Warm, Direct, VIP), escalation risk scores |
| **Weekly Snippets Synthesizer** | Team Operations | Executive wins briefing, team kudos callouts, weekly commitment tracker |

---

## 🚀 Key Features

- **💡 Idea Workshop:** Input your job role and challenges to brainstorm 4 custom app blueprints.
- **⚡ 1-Click Execution:** Realistic sample data pre-filled for immediate testing.
- **📊 Spreadsheet Integration:** Instant TSV/CSV clipboard copy formatted for Google Sheets and Excel.
- **🔄 Live Iteration:** Tweak results on the fly (*"Add 3 TikTok hooks"*, *"Make tone friendlier"*).
- **🎨 Visual Themes:** 5 custom palettes (including Google AI Studio's *Shades of Blue*).
- **🔗 Share & Publish:** Built-in public URL generator and distraction-free teammate view.

---

## 💻 Local Development

### 1. Clone & Install
```bash
git clone https://github.com/zainabmughal098/WorkCraft-AI.git
cd WorkCraft-AI
npm install
```

### 2. Configure Environment
Create `.env` in the project root:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
```

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

---

