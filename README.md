# eLearn Quiz Dashboard

Fully responsive Quiz Dashboard — **React 18 + Vite + Tailwind CSS**

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── Modal/
│   │   ├── InstructionsModal.jsx   ← Auto-shown on page load (instructions + agree checkbox)
│   │   └── index.js
│   ├── SignupModal/
│   │   ├── SignupModal.jsx         ← Opens on Signup click (form + success + start test)
│   │   └── index.js
│   ├── Navbar/
│   │   ├── Navbar.jsx              ← Clean nav: Signup→modal, Get Started→start test
│   │   └── index.js
│   ├── QuizHeader/
│   │   ├── QuizHeader.jsx          ← Breadcrumb + progress bar
│   │   └── index.js
│   ├── QuestionCard/
│   │   ├── QuestionCard.jsx        ← MCQ with feedback
│   │   ├── ResultsScreen.jsx       ← Score screen after quiz
│   │   └── index.js
│   ├── Timer/
│   │   ├── Timer.jsx               ← Circular SVG countdown (20 min)
│   │   └── index.js
│   ├── QuizProgress/
│   │   ├── QuizProgress.jsx        ← Sidebar question list with checkmarks
│   │   └── index.js
│   ├── Newsletter/
│   │   ├── Newsletter.jsx          ← Email subscription with validation
│   │   └── index.js
│   └── Footer/
│       ├── Footer.jsx              ← Clean dark footer
│       └── index.js
├── context/
│   └── QuizContext.jsx             ← All global state + actions
├── data/
│   └── quizData.js                 ← 10 questions with answers
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Setup

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 🏗️ Build

```bash
npm run build
npm run preview
```

---

## ✨ Features

| Feature | Detail |
|---|---|
| **Instructions Modal** | Shown on every page load. Must read + check "agree" to start |
| **Signup Modal** | Opens from Signup button. Form with validation → success → Start Test option |
| **Get Started button** | Directly starts the test |
| **Circular Timer** | 20 min countdown, turns amber→red when low |
| **Answer Feedback** | Green ✓ / Red ✗ after submit |
| **Auto-advance** | Next question 800ms after submit |
| **Results Screen** | Score % + per-question breakdown |
| **Restart Quiz** | Resets everything, shows instructions modal again |
| **Sidebar Progress** | Checkmarks update live |
| **Responsive** | Mobile, Tablet, Desktop |
