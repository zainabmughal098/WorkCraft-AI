# WorkCraft AI — Custom Workplace App Studio

> **Build, customize, and run AI apps tailored to your daily work.**  
> Built for the Google AI Studio lab: *"Build with AI: A custom app to help you at work"*.

[![Powered by Gemini](https://img.shields.io/badge/Model-Gemini%203.8%20Flash-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🌟 What is WorkCraft AI?

**WorkCraft AI** is an intelligent workplace app studio designed to eliminate repetitive, tedious tasks. Instead of manual drafting, data restructuring, and cross-channel formatting, WorkCraft AI lets anyone define a custom workplace tool using Google AI Studio's signature formula:

$$\text{“My app takes [inputs] and does [process] to create [output] that helps me [goal].”}$$

With one click, Gemini 3.8 Flash analyzes your context and generates:
1. **Executive Briefings & Deliverables:** Comprehensive, formatted documents, drafts, and copy.
2. **Spreadsheet-Ready Matrices:** Structured tables with a 1-click **"Copy for Spreadsheet"** button formatted for instant paste into Google Sheets and Microsoft Excel.
3. **Iterative Adjustments:** In-flight refinements using conversational instructions (*"Add 3 TikTok hooks"*, *"Make tone warmer"*, *"Add risk flags"*).

---

## 📋 Direct Lab Tasks Alignment

This application implements every step of the official Google AI Studio curriculum:

| Lab Task | Feature in App | Description |
| :--- | :--- | :--- |
| **Optional Step** | **Worksheet / Idea Workshop** | Input your role and daily challenges; Gemini brainstorms 4 high-value workplace app ideas following the exact formula. |
| **Step 1** | **Describe & Build App** | Paste or customize `I want to build an app that takes [inputs] and does [process] to create [output] that helps me [goal]`. The app automatically generates input fields and execution logic. |
| **Step 2** | **Iterate on Your App** | One-click **"Copy for Spreadsheet"** button (TSV/CSV clipboard copy), plus conversational prompt modifications (`Add [element] that [purpose]`). |
| **Step 3** | **Visual Styling** | Interactive visual theme customizer supporting the lab's **"Shades of Blue"** AI Studio theme, as well as Workspace Emerald, Modern Slate, Warm Amber, and Midnight Dark mode. |
| **Step 4** | **Share Your App** | Interactive **"Publish your app"** toggle switch, public link generator (`?standalone=true`), iframe embed code, and distraction-free teammate view. |

---

## 🚀 Pre-Configured Workplace Tools Included

WorkCraft AI ships with 4 production-grade workplace presets ready to test immediately with 1-click sample data:

### 1. 🎨 Holiday Campaign & Creative Visuals Hub *(Lab Reference Example)*
- **Role:** Social Media Manager
- **Inputs:** Holiday/occasion, brand niche, tone of voice, promotional offer.
- **Deliverables:** Multi-channel posts (Instagram caption + carousel concepts, LinkedIn thought leadership, X threads), 3 AI image generation prompts (photorealistic, vector graphic, lifestyle), and a spreadsheet calendar.

### 2. 📊 Executive Meeting Notes to Action Matrix
- **Role:** Project Manager / Chief of Staff
- **Inputs:** Raw meeting bullets or chaotic transcripts.
- **Deliverables:** Executive 3-bullet decision summary, prioritized Action Items Matrix (Task ID, Owner, Deadline, Priority, Status), and a copy-paste follow-up email draft.

### 3. 💬 Customer Inquiry & De-escalation Responder
- **Role:** Customer Support / Client Success Lead
- **Inputs:** Customer complaint text and internal company resolution policies.
- **Deliverables:** Emotional sentiment analysis, 3 tone variants (Warm Empathy, Direct Professional, Executive Concierge), internal ticket notes, and escalation risk rating.

### 4. 📈 Weekly Team Snippets & VP Status Synthesizer
- **Role:** Engineering & Operations Lead
- **Inputs:** Fragmented updates and blocker notes from individual team members.
- **Deliverables:** VP-level wins summary, blocker escalation flags, team kudos callouts, and next week's commitment matrix.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons.
- **Backend:** Node.js, Express, `tsx`.
- **AI Intelligence:** `@google/genai` TypeScript SDK (`gemini-3.8-flash`) executed strictly server-side for speed and security.
- **Build Tooling:** Vite 8.

```
├── server.ts                    # Express server + Gemini AI endpoints + Vite middleware
├── src/
│   ├── App.tsx                  # Main app controller, routing, and state
│   ├── components/
│   │   ├── Header.tsx           # Navigation bar, catalog dropdown & controls
│   │   ├── LabGuideBanner.tsx   # Interactive step-by-step lab companion
│   │   ├── AppRunner.tsx        # Dynamic input form, execution engine & iteration bar
│   │   ├── SpreadsheetTableView.tsx # Interactive table + "Copy for Spreadsheet"
│   │   ├── WorksheetBrainstormer.tsx# Step 0 idea generator
│   │   ├── CustomAppBuilderModal.tsx# Step 1 custom template parser
│   │   ├── VisualThemeModal.tsx # Step 3 color customizer (Shades of Blue)
│   │   ├── ShareModal.tsx       # Step 4 publish & distribute dialog
│   │   ├── HowToUseModal.tsx    # 30-second beginner guide
│   │   └── MarkdownView.tsx     # Clean deliverable renderer
│   ├── data/
│   │   ├── presets.ts           # Rich preset workplace tool blueprints
│   │   └── themes.ts            # Visual color schemes (Blue, Emerald, Slate, Amber, Dark)
│   └── types.ts                 # TypeScript interfaces
├── metadata.json                # AI Studio capability registry
└── index.html                   # Application entry point
```

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js 20+
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 2. Environment Setup
Create a `.env` file in the root directory (refer to `.env.example`):
```bash
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 💡 How to Use

1. **Pick a Tool:** Select any workplace preset from the top bar (e.g. *Holiday Campaign Hub*).
2. **Execute (1-Click):** Click **"Run Now"** (realistic sample data is already filled in).
3. **Copy to Spreadsheet:** Switch to the **Spreadsheet Table** tab and click **"Copy for Spreadsheet"** to paste directly into Google Sheets or Excel.
4. **Iterate:** Use the iteration bar to type changes like *"Add 3 short video hooks"* or *"Format as a Slack announcement"*.
5. **Publish:** Click **"Share"**, flip the **"Publish your app"** switch, and share the URL with your team.

---

## 📄 License
Apache-2.0 License. Built with Google AI Studio.
