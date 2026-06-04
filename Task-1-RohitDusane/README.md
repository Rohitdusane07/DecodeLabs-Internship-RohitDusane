# AI Foundations Lab

A premium, modern, highly interactive AI education platform website inspired by Apple, OpenAI, and Stripe design principles. Built with a futuristic dark UI, 3D particle physics, and glassmorphism elements.

## 🚀 Features

*   **3D AI Hologram Hero**: An interactive WebGL-rendered double wireframe geodesic chatbot hologram that responds dynamically to mouse coordinate angles.
*   **Drifting Particle Background**: Full-screen 1000-particle node network shifting between professional cyan, purple, and blue hues.
*   **Live Chatbot Simulator**: A fully interactive terminal simulator utilizing rule-based keyword matching (Greetings, Python, Logic, Projects, Roadmap), custom response delay, and custom typing bubble states.
*   **Curriculum Roadmap**: Interactive vertical timeline showing Steps 1 through 6 of the AI Engineer syllabus path with scroll-revealing animations.
*   **Matrix Counters**: Live counter widgets that count up dynamically (1000+ Students, 50+ Projects) upon scrolling into viewport view.
*   **Skill Matrix & Showcase Grids**: Beautiful glassmorphism panels featuring gradient text borders, subtle animations, and hover-triggered details.
*   **Contact Console**: A next-gen transmission form with simulated secure payloads and custom focusing states.

---

## 🛠️ Tech Stack

*   **Framework**: React (Vite template)
*   **Styling**: Tailwind CSS
*   **Physics / 3D**: Three.js
*   **Animations**: Framer Motion
*   **Icons**: Lucide React

---

## 💻 Quick Start

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### Installation
1. Clone the repository or navigate to the project directory:
    ```bash
    cd C:\Users\HP\.gemini\antigravity\scratch\ai-foundations-lab
    ```
2. Install the node modules:
    ```bash
    npm install
    ```

### Run Locally
Start the development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### Build Production
To compile and optimize the client application for production:
```bash
npm run build
```

---

## 📁 File Structure

```text
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and local media
│   ├── components/
│   │   ├── ThreeBackground.jsx  # WebGL background particles
│   │   ├── Hologram3D.jsx       # 3D interactive hologram
│   │   ├── ChatbotDemo.jsx      # Live chatbot query console
│   │   └── RoadmapTimeline.jsx  # Curriculum roadmap steps
│   ├── App.jsx             # Main layout, sections, and counters
│   ├── index.css           # Global glassmorphic styles and tailwind directives
│   └── main.jsx            # React root mounting
├── index.html              # Core HTML structure and SEO meta tags
├── tailwind.config.js      # Custom theme presets and keyframes
├── postcss.config.js       # PostCSS processor configurations
├── vite.config.js          # Vite compiler settings
└── package.json            # Configuration and dependencies
```

## 👨‍💻 Developer

* Rohit Vijay Dusane

## Live website link
https://interactive-ai-education-platform.netlify.app/