# Day 6 — Portfolio Hub & Web Development Training Synthesis

## Objective

Consolidate the first six days of foundational web engineering into a unified portfolio showcase. Build an interactive central portal highlighting client-server networking, semantic HTML5/CSS3 references, the NEXUS 2026 Summit, JavaScript practice labs, Tic-Tac-Toe OOP, and the L'AURA Artisan Bistro application.

## Technologies

- **HTML5:** Semantic document architecture (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3:** Dark-mode glassmorphism, responsive CSS Grid matrices, flexbox navigation, custom properties
- **JavaScript (Vanilla):** Dynamic project card interactions, smooth scroll navigation, modal previews
- **Tooling & Version Control:** Git version control, GitHub workflows, Markdown documentation

## Features

- **Centralized Project Showcase:** Interactive cards linking directly to all projects from Days 1 through 5.
- **Skill Proficiency Matrix:** Visual summary of technologies mastered (HTML5, CSS3, ES6+, jQuery, AJAX, OOP, Git).
- **Responsive Layout:** Adaptive desktop multi-column grid transitioning gracefully to tablet and mobile single-column layouts.
- **Documentation Standards:** Clear project architecture reference outlining commit standards and code modularity.
- **LinkedIn Milestone Post Template:** Ready-to-use template for sharing week 1 milestones on LinkedIn.

## Project Structure

```text
Day-6/
├── index.html                  # Master Portfolio Hub & synthesis portal
├── style.css                   # Glassmorphic dark theme styles
├── script.js                   # Interactive portal controller
├── completion-checklist.md     # Milestone completion tracker
├── linkedin-post.md            # Day 6 LinkedIn post draft
└── README.md                   # Standardized Day 6 documentation
```

## How to Run

1. Open `Day-6/index.html` directly in your browser.
2. Or start a local server from the repository root:
   ```bash
   python -m http.server 5500
   ```
   Navigate to `http://localhost:5500/Day-6/`.
3. Click any project card to launch the corresponding day's application or reference suite.

## What I Learned

- How to structure a coherent portfolio hub that unifies disparate web projects under a consistent visual design system.
- Designing responsive cards with accessible contrast ratios, hover micro-interactions, and clear call-to-actions.
- Documenting multi-module engineering repositories for technical recruiters and peer reviewers.
- Applying git branching and clean commit workflows across multi-day coding sprints.

## Challenges

- **Navigation Consistency:** Ensuring relative links work correctly when accessed from both local file system paths (`file:///`) and localhost HTTP servers.
- **Unified Branding:** Bringing five distinct projects with varied aesthetics (gaming, fine dining, technical cheat sheets) into a single cohesive overview without clashing.

## Future Improvements

- Add live embedded iframe previews for each project directly inside the portfolio cards.
- Integrate automated Lighthouse performance and accessibility audits for all linked pages.
- Add personal profile customizations (custom avatar, personal bio, contact form backend).
