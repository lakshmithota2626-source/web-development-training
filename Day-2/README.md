# Day 2 — HTML5 & CSS3 Master Cheat Sheets + NEXUS 2026 Event Website

## Objective

Master modern HTML5 semantics, complete CSS3 design systems, and responsive layouts. Build three interconnected production-grade artifacts: a 20-topic HTML5 master reference, a 22-topic CSS3 interactive visualizer, and a full-featured capstone event landing page for "NEXUS 2026 Tech Summit".

## Technologies

- **HTML5:** Semantic landmark tags (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), media elements (`picture`, `video`, `audio`), form inputs, data tables
- **CSS3:** Flexbox (1D layouts), CSS Grid (2D layouts), positioning (`relative`, `absolute`, `sticky`), CSS variables, cubic-bezier transitions, keyframe animations, media queries
- **JavaScript (Vanilla):** Countdown timer engine, dynamic RSVP pass generation modal, live tag/property search filtering

## Features

- **20-Topic HTML5 Cheat Sheet (`html-cheatsheet.html`):** Complete syntax, real-world examples, and explanations covering Doctype, html, head, title, body, headings, paragraphs, links, images, lists, tables, forms, div, span, semantic HTML, classes, IDs, attributes, comments, and button/input types with live real-time search.
- **22-Topic CSS3 Master Visualizer (`css-cheatsheet.html`):** Side-by-side interactive demonstrations for selectors, colors, typography, box model, display, positioning, flexbox, grid, transitions, animations, pseudo-classes, pseudo-elements, media queries, borders/radius, gradients, opacity/visibility, overflow, z-index, CSS variables, units, cursors, and transforms.
- **NEXUS 2026 Event Website (`event-invitation.html`):** High-aesthetic dark glassmorphism event landing page featuring live countdown timer, 3D holographic VIP Pass, keynote speaker showcase, interactive multi-track agenda, venue directions, and dynamic RSVP modal with generated ticket credentials.
- **Unified Portal (`index.html`):** Central dashboard cleanly linking all Day 2 modules.

## Project Structure

```text
Day-2/
├── index.html            # Central navigation portal for Day 2
├── style.css             # Main portal styling
├── script.js             # Portal interactivity
├── html-cheatsheet.html  # Comprehensive 20-topic HTML5 cheat sheet
├── html-cheatsheet.css   # HTML cheat sheet styling
├── css-cheatsheet.html   # 22-topic CSS3 interactive visualizer
├── css-cheatsheet.css    # CSS visualizer styling
├── event-invitation.html # NEXUS 2026 Tech Summit landing page
├── event-invitation.css  # Event website styles with glassmorphism
├── event-invitation.js   # Countdown timer and ticket generator modal
├── linkedin-post.md      # Day 2 LinkedIn post draft
└── README.md             # Standardized Day 2 documentation
```

## How to Run

1. Open `Day-2/index.html` directly in any web browser.
2. From the portal, click into:
   - **HTML Cheat Sheet:** Explore the 20 syntax cards and use the filter search bar.
   - **CSS Cheat Sheet:** Test live interactive hover, active, focus, and animation states.
   - **Event Invitation:** View the countdown timer, fill out the RSVP form, and generate your VIP ticket.
3. Or launch via local HTTP server from repository root:
   ```bash
   python -m http.server 5500
   ```
   Navigate to `http://localhost:5500/Day-2/`.

## What I Learned

- Why semantic HTML improves web accessibility (a11y) and crawlability for search engine indexing.
- The CSS Box Model hierarchy (`content -> padding -> border -> margin`) and why `box-sizing: border-box` is an essential universal reset rule.
- Advanced layout orchestration combining Flexbox for 1D navigation alignment and CSS Grid for 2D responsive card matrices.
- Creating smooth micro-interactions using CSS `cubic-bezier()` transitions and hardware-accelerated transforms (`translate3d`, `scale`).

## Challenges

- **Mobile Viewport Overflow:** Large tables and code snippet blocks initially caused minor horizontal scrolling on screens under 380px. Solved with responsive CSS overflow wrappers and `minmax(0, 1fr)` grid definitions.
- **Timezone-Safe Countdown Timer:** Preventing UTC offset drift in the JavaScript event countdown timer by standardizing on ISO 8601 target timestamps.

## Future Improvements

- Add a dark/light theme toggle for the cheat sheet pages with persistent theme memory via `localStorage`.
- Add PDF ticket export functionality using browser print stylesheets for the generated RSVP pass.
- Expand CSS cheat sheet with Container Queries (`@container`) and subgrid demonstrations.
