# Web Development Training — Complete 13-Day Program

Welcome to the **Web Development Training — Complete 13-Day Program** repository. This repository encapsulates an intensive, project-driven engineering curriculum spanning foundational internet protocols, modern semantic HTML5 and CSS3 architecture, algorithmic JavaScript, Object-Oriented Programming, DOM event manipulation, React 19 single-page applications, Redux global state management, Java programming, and automated production build validation.

---

## 1. Program Overview

This curriculum bridges foundational front-end mechanics and modern component-driven full-stack thinking:
- **Phase 1: Web & JavaScript Core (Days 1–5):** Client-server protocols, semantic HTML5, responsive CSS3 design systems, algorithms, arrays, DOM events, OOP in JS, jQuery, AJAX, and complex interactive browser applications.
- **Phase 2: Portfolio Synthesis & React Core (Days 6–8):** Multi-project portfolio hub, React 18/19 mental models (Virtual DOM, JSX, components, unidirectional data flow, hooks), and reactive single-page portfolio applications.
- **Phase 3: State Management, Java & React Capstones (Days 9–13):** Redux Toolkit global state flow, algorithmic Java problem solving, and two independent production React applications (Focus Board and Pantry Ledger), culminating in a comprehensive repository audit.

---

## 2. Complete Day 1 to Day 13 Table

| Day | Topic | Key Projects / Deliverables | Status | Link |
|:---:|---|---|:---:|---|
| **01** | Client-Server Architecture & Networking | Interactive packet simulator, DNS/HTTP/HTTPS guide, companion infographic | ✅ Complete | [Day 1 Module](./Day-1/) |
| **02** | HTML5 & CSS3 Master Suite | 20-topic HTML cheat sheet, 22-topic CSS visualizer, NEXUS 2026 Summit website | ✅ Complete | [Day 2 Module](./Day-2/) |
| **03** | JavaScript Arrays, Functions & DOM | 26-topic JavaScript practice lab, runnable script modules, Exercise 1 pack | ⚠️ Partially Complete | [Day 3 Module](./Day-3/) |
| **04** | JavaScript OOP, jQuery & AJAX | Classes, private fields, jQuery UI, AJAX/Fetch, Tic-Tac-Toe AI Championship | ✅ Complete | [Day 4 Module](./Day-4/) |
| **05** | Restaurant Application | L'AURA Artisan Bistro: menu filters, live search, cart drawer, reservation modal | ✅ Complete | [Day 5 Module](./Day-5/) |
| **06** | Portfolio Hub & Synthesis | Synthesis portal, skills matrix, project showcases, weekly review template | ⚠️ Partially Complete | [Day 6 Module](./Day-6/) |
| **07** | React for Beginners & Portfolio | 16:9 interactive presentation, 3D atom simulation, self-designed React portfolio | ⚠️ Partially Complete | [Day 7 Module](./Day-7/) |
| **08** | React Foundations & State | JSX, props, state, event handlers, `useEffect` demo, retained Redux dashboard | ⚠️ Partially Complete | [Day 8 Module](./Day-8/) |
| **09** | Redux & JavaScript Exercises | Redux architecture guide, Exercises 2–5 (Budget, Books, RSVP Board, Study Planner) | ⚠️ Partially Complete | [Day 9 Module](./Day-9/) |
| **10** | Java Foundations & OOP | JVM lifecycle, primitive types, loops, arrays, classes, inheritance, polymorphism | ⚠️ Partially Complete | [Day 10 Module](./Day-10/) |
| **11** | Java Arrays & React Project 1 | 3 algorithmic Java array problems, Focus Board React task management app | ⚠️ Partially Complete | [Day 11 Module](./Day-11/) |
| **12** | React Project 2 (Pantry Ledger) | Pantry Ledger inventory app, expiry alerts, sorting, filtering, `localStorage` | ✅ Complete | [Day 12 Module](./Day-12/) |
| **13** | Final Verification & Audit | Evidence-based repository audit, quality checks, LinkedIn & B9 drafts | ⚠️ Partially Complete | [Day 13 Module](./Day-13/) |

*Note on Status: Items marked `⚠️ Partially Complete` reflect modules where code and tests exist locally, but external user actions (such as pushing untracked files to GitHub, personal profile information, or external LinkedIn posting) remain pending, or where local tool limitations (such as missing `javac`) prevent full compilation verification.*

---

## 3. Project Directory Structure

```text
web-development-training/
├── index.html                    # Root Navigation Hub for all 13 Days
├── style.css                     # Root Hub Responsive Dark Theme
├── README.md                     # Master 13-Day Documentation
├── client-server-communication.html # Day 1 Companion Infographic
├── Day-1/                        # Networking Foundations & Client-Server Simulator
├── Day-2/                        # HTML5/CSS3 Master Suite & NEXUS 2026 Event Website
├── Day-3/                        # Modern JS Lab, Arrays, HOFs, DOM & Exercise 1
├── Day-4/                        # OOP Classes, jQuery, AJAX & Tic-Tac-Toe Game
├── Day-5/                        # L'AURA Artisan Bistro Web Application
├── Day-6/                        # Portfolio Synthesis Hub & Week 1 Summary
├── Day-7/                        # React Masterclass Deck & React Portfolio App
│   └── react-portfolio/          # Vite + React 19 Single Page App
├── Day-8/                        # React Foundations (react.html) & Redux Dashboard
├── Day-9/                        # Redux Architecture & JS Exercises 2 through 5
│   ├── redux.html
│   ├── exercise-2/               # Monthly Budget Summary
│   ├── exercise-3/               # Reading Tracker
│   ├── exercise-4/               # Workshop RSVP Board
│   └── exercise-5/               # Study Planner
├── Day-10/                       # Java Foundations, JVM Architecture & OOP Demos
│   └── java/                     # BasicsDemo, ArrayDemo, OopDemo source files
├── Day-11/                       # Java Array Algorithms & React Project 1
│   ├── java-array-problems/      # Array Rotation, Frequency Count, Merge Sorted
│   └── react-project-1/          # Focus Board React App (Vite + React 19)
├── Day-12/                       # React Project 2: Pantry Ledger
│   └── react-project-2/          # Pantry Ledger Inventory App (Vite + React 19)
└── Day-13/                       # Final Audit, Quality Assurance & Transition
```

---

## 4. Technologies Used Across the Training

- **Core Web:** HTML5 (Semantic landmarks, dialogs, media, tables, forms), CSS3 (Flexbox, CSS Grid, custom properties, cubic-bezier transitions, keyframe animations, media queries), JavaScript (ES6+ features, closures, promises, async/await, DOM APIs).
- **Libraries & Frameworks:** React 18 & 19 (`useState`, `useEffect`, `useMemo`, controlled components), Redux & Redux Toolkit (`configureStore`, `createSlice`), React-Redux, jQuery, jQuery UI.
- **Languages & Compilers:** JavaScript, JSX, Java (JDK 17+), Babel Standalone.
- **Build Tools & Environment:** Node.js (v24.x), npm (v11.x), Vite (v7.x).
- **Version Control & Quality:** Git, GitHub workflows, Markdown documentation.

---

## 5. How to Run Every Project

### A. Static Web Applications (Days 1–6, Day 8, Day 9, Day 10, Day 13)
All static web applications run directly in modern browsers without compilation. To serve them with proper HTTP header handling, launch the included local server from the repository root:
```bash
python -m http.server 5500
```
Then visit:
- Hub: `http://localhost:5500/`
- Day 1: `http://localhost:5500/Day-1/`
- Day 2: `http://localhost:5500/Day-2/`
- Day 3: `http://localhost:5500/Day-3/`
- Day 4: `http://localhost:5500/Day-4/`
- Day 5: `http://localhost:5500/Day-5/`
- Day 6: `http://localhost:5500/Day-6/`
- Day 8: `http://localhost:5500/Day-8/react.html`
- Day 9: `http://localhost:5500/Day-9/redux.html`
- Day 10: `http://localhost:5500/Day-10/java.html`

### B. React Vite Applications (Day 7, Day 11, Day 12)
Each React application is fully configured with Vite and its own dependencies:

1. **Day 7 React Portfolio:**
   ```bash
   cd Day-7/react-portfolio
   npm install
   npm run dev
   ```

2. **Day 11 Focus Board (React Project 1):**
   ```bash
   cd Day-11/react-project-1
   npm install
   npm run dev
   ```

3. **Day 12 Pantry Ledger (React Project 2):**
   ```bash
   cd Day-12/react-project-2
   npm install
   npm run dev
   ```

To validate production builds:
```bash
npm run build
npm run preview
```

### C. Java Programs (Day 10 & Day 11)
Requires a JDK (17+) installed on your machine:
```bash
# Day 10 Demos
cd Day-10
javac -d out java/basics/BasicsDemo.java java/arrays/ArrayDemo.java java/oop/OopDemo.java
java -cp out BasicsDemo
java -cp out ArrayDemo
java -cp out OopDemo

# Day 11 Array Problems
cd ../Day-11
javac -d out java-array-problems/Problem1RotateArray.java java-array-problems/Problem2FrequencyCount.java java-array-problems/Problem3MergeSortedArrays.java
java -cp out Problem1RotateArray
java -cp out Problem2FrequencyCount
java -cp out Problem3MergeSortedArrays
```

---

## 6. GitHub Repository Workflow

### Commit Conventions
Use descriptive, atomic commit messages following conventional commits:
- `feat: add Pantry Ledger inventory filtering and local storage persistence`
- `fix: resolve mobile viewport overflow in CSS cheatsheet`
- `docs: standardize Day 1-13 READMEs to 8-section layout`
- `refactor: extract reusable TaskItem component in Focus Board`

### Staging & Branching Workflow
1. Verify active branch and working directory cleanliness:
   ```bash
   git status
   ```
2. Stage specific day changes cleanly:
   ```bash
   git add Day-X/
   git commit -m "feat(Day-X): complete Day X deliverables"
   ```
3. Push to GitHub `main` branch:
   ```bash
   git push origin main
   ```

---

## 7. Selected Projects Highlights

### 💻 Client-Server Simulator (Day 1)
Real-time animated visualization of HTTP request-response transmission across network lanes with live method, header, and status code inspection.

### 🎫 NEXUS 2026 Tech Summit (Day 2)
High-aesthetic event landing page featuring live countdown timers, 3D holographic VIP Pass generator modal, interactive speaker grids, and schedule timeline.

### 🎮 Tic-Tac-Toe AI Championship (Day 4)
Modular OOP-based game engine featuring 2-player pass-and-play, an intelligent AI heuristic bot that detects win and block opportunities, and a persistent match scoreboard.

### 🍽️ L'AURA Artisan Bistro (Day 5)
Luxury fine dining menu application featuring instant dish search, multi-criteria dietary tags (vegan, spicy, chef pick), slide-out animated order drawer, and a table reservation workflow.

### 📋 Focus Board — React Project 1 (Day 11)
Productivity task manager built with React 19 and Vite featuring categorized task boards (Study, Work, Personal), priority pills, real-time status filtering, and `localStorage` persistence.

### 🥫 Pantry Ledger — React Project 2 (Day 12)
Household pantry inventory and food freshness management application featuring best-before date sorting, automatic expiry warnings (<72h), increment/decrement quantity steppers, and at-a-glance stock metrics.

---

## 8. Key Learning Outcomes

1. **Protocol & Architectural Understanding:** Thorough grasp of browser-server lifecycles, TCP/IP handshakes, TLS encryption, RESTful HTTP methods, and client-side rendering.
2. **Design & Responsive Mastery:** Ability to design accessible, pixel-perfect, dark-mode responsive layouts using vanilla CSS Grid and Flexbox without framework bloat.
3. **Algorithmic Problem Solving:** Strong competence in JavaScript ES6+ higher-order functions (`map`, `filter`, `reduce`), closure scopes, and array algorithms.
4. **Modern Component-Driven Development:** Deep understanding of React 19 state reconciliation, hooks lifecycle rules, controlled form patterns, and local storage synchronization.
5. **Clean Software Engineering Practices:** Writing modular, well-documented, Git-versioned code with transparent technical verification.

---

## 9. LinkedIn Learning Journey Content

Draft posts for every day of the training program are prepared and located within their respective folders:
- Day 1: [`Day-1/linkedin-post.md`](Day-1/linkedin-post.md)
- Day 2: [`Day-2/linkedin-post.md`](Day-2/linkedin-post.md)
- Day 3: [`Day-3/linkedin-post.md`](Day-3/linkedin-post.md)
- Day 4: [`Day-4/linkedin-post.md`](Day-4/linkedin-post.md)
- Day 5: [`Day-5/linkedin-post.md`](Day-5/linkedin-post.md)
- Day 6: [`Day-6/linkedin-post.md`](Day-6/linkedin-post.md)
- Day 7: [`Day-7/linkedin-post.md`](Day-7/linkedin-post.md)
- Day 8: [`Day-8/linkedin-post.md`](Day-8/linkedin-post.md)
- Day 9: [`Day-9/linkedin-post.md`](Day-9/linkedin-post.md)
- Day 10: [`Day-10/linkedin-post.md`](Day-10/linkedin-post.md)
- Day 11: [`Day-11/linkedin-post.md`](Day-11/linkedin-post.md)
- Day 12: [`Day-12/linkedin-post.md`](Day-12/linkedin-post.md)
- Day 13 (Final Wrap-up): [`Day-13/linkedin-post.md`](Day-13/linkedin-post.md)
- Week 2 WhatsApp/Cohort Submission: [`Day-13/b9-week-2-update.md`](Day-13/b9-week-2-update.md)

---

## 10. Final Verification Checklist

- [x] All 13 Day folders exist with runnable code and standard 8-section `README.md` files.
- [x] Root `index.html` navigation and Day 1–13 cards link cleanly to all modules.
- [x] Day 2 HTML cheat sheet covers all 20 required concepts with Syntax, Example, Explanation.
- [x] Day 2 CSS cheat sheet covers all 22 required CSS properties with live visual demos.
- [x] Day 7 React Portfolio production build passes (`npm run build`).
- [x] Day 11 React Focus Board production build passes (`npm run build`).
- [x] Day 12 React Pantry Ledger production build passes (`npm run build`).
- [x] Mobile responsive viewport verified with zero horizontal scroll overflow.
- [x] Input sanitization and XSS security practices verified on dynamic DOM outputs.
- [x] Git remote URL confirmed as `https://github.com/lakshmithota2626-source/web-development-training`.
- [ ] User action: Stage, commit, and push pending local files to `origin/main`.
- [ ] User action: Publish LinkedIn posts and submit cohort updates.
