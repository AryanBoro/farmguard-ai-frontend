# 🌱 FarmGuard AI — Frontend

> Intelligent crop disease detection interface built with React, TypeScript, Tailwind CSS, and shadcn/ui.

![FarmGuard AI](https://img.shields.io/badge/FarmGuard-AI-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

---
"<img width="1458" height="813" alt="image" src="https://github.com/user-attachments/assets/6ef9a96e-d0f5-4a25-903d-940aba7d339a" />

## Overview

FarmGuard AI is a crop disease detection web app that lets farmers upload a leaf image and instantly receive AI-powered disease diagnosis, treatment recommendations, weather risk assessment, and crop history analytics.

This repo is the **frontend only**. All AI inference and data is served by the backend at:
```
https://borreooo-farmguard-ai.hf.space
```

---

## Screenshots
![apple black rot](https://github.com/user-attachments/assets/996dc74c-0066-45e4-8f14-dc612e174824)
![squash powdery mildew](https://github.com/user-attachments/assets/4f7079ba-16ab-4f4e-8a87-577dd961b483)
![potato early blight](https://github.com/user-attachments/assets/f34138e2-b692-4a8b-9d2d-cd6f3c4ee3bc)
![strawberry leaf scorch](https://github.com/user-attachments/assets/b38937be-ab3a-4844-88eb-08eece770d07)
![healthy strawberry](https://github.com/user-attachments/assets/5e3a3c7a-96b6-4f3a-8609-083d41c2ef42)
![tomatohealthy](https://github.com/user-attachments/assets/14337013-ce38-4810-bc6d-73c052521c90)
![pepper bacterial spot](https://github.com/user-attachments/assets/4228a404-5a4c-44bc-ad17-46a273e7edb7)

## Features

- 🔍 **Scan** — Upload a leaf image, select crop type, get instant disease diagnosis
- 💊 **Remedies** — Immediate actions, prevention tips, and organic treatment options
- 🌤️ **Weather Risk** — Real-time weather-based disease risk assessment
- 📊 **Dashboard** — Scan history, disease trends, and analytics
- 🌿 **History** — Full scan log with severity badges and crop filters

---

## Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** — glassmorphism design system
- **shadcn/ui** — component library
- **Three.js** — animated WebGL shader background
- **Recharts** — dashboard charts
- **lucide-react** — icons

---

## Design System

Dark glassmorphism aesthetic throughout:
- Background: `zinc-950`
- Cards: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl`
- Animations: `fadeSlideIn` on all cards
- Severity: green (healthy) → amber (moderate) → red (high) → purple (critical)

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/AryanBoro/farmguard-ai-frontend
cd farmguard-ai-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set environment variable
Create a `.env` file:
```
VITE_API_URL=https://borreooo-farmguard-ai.hf.space
```

### 4. Run locally
```bash
npm run dev
```

Open `http://localhost:5173`

---

## API

All data is fetched from the live backend. Zero mock data.

| Function | Method | Endpoint |
|---|---|---|
| getCrops() | GET | `/crops` |
| predict() | POST | `/predict` |
| getHistory() | GET | `/history` |
| getStats() | GET | `/history/stats` |
| getTrends() | GET | `/history/trends` |

---

## Deployment

Deployed on **Vercel**. Every push to `main` triggers an automatic redeploy.

[![Deploy with Vercel](https://vercel.com/button)](https://farmguard-ai-frontend.vercel.app/)

---

## Related

- 🔧 **Backend repo:** [farmguard-ai](https://github.com/AryanBoro/farmguard-ai) — FastAPI + PyTorch EfficientNet-B4
- 🤗 **Live API:** [HuggingFace Space](https://huggingface.co/spaces/borreooo/farmguard-ai)
