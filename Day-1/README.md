# Day 1 — Client-Server Architecture & Interactive Simulator

## Objective

Understand foundational web networking concepts and how browsers (clients) and remote hosts (servers) exchange information over the internet. The goal was to build an interactive, visual client-server simulation tool with real-time packet animation, HTTP method inspection, and status code verification.

## Technologies

- **HTML5:** Semantic document structuring and accessible layouts
- **CSS3:** Custom properties (CSS variables), CSS Grid, Flexbox, keyframe animations, and responsive breakpoints
- **JavaScript (Vanilla ES6+):** Asynchronous packet animation, DOM manipulation, event listeners, and simulated network latency
- **Networking Concepts:** DNS resolution, TCP three-way handshake, HTTP/HTTPS protocols, request/response headers, status codes (`200`, `404`, `500`)

## Features

- **Live Network Simulator:** Interactive packet movement illustrating request dispatch from client to server and server response return.
- **HTTP Method Testing:** Simulate `GET`, `POST`, `PUT`, and `DELETE` requests with dynamic header and payload inspection.
- **Status Code Feedback:** Visual indicators demonstrating successful responses (`200 OK`), client errors (`404 Not Found`), and server errors (`500 Internal Server Error`).
- **Comprehensive Explanations:** Deep breakdown of client roles, server roles, DNS lookup, IP routing, and SSL/TLS encryption.
- **Companion Infographic Link:** Connected to the root `client-server-communication.html` infographic and Day 2 HTML cheat sheet.

## Project Structure

```text
Day-1/
├── index.html        # Main interactive simulation and conceptual guide
├── style.css         # Modern dark-mode styling, network lanes, and animations
├── script.js         # Packet animation engine and simulator state controller
├── linkedin-post.md  # Day 1 LinkedIn learning draft
└── README.md         # Comprehensive project documentation
```

## How to Run

1. Open `Day-1/index.html` directly in any modern web browser:
   - Double-click `index.html` from File Explorer, or
   - Use VS Code Live Server extension.
2. Alternatively, run a local Python HTTP server from the repository root:
   ```bash
   python -m http.server 5500
   ```
   Navigate to `http://localhost:5500/Day-1/` in your browser.

## What I Learned

- How the 6-step request-response lifecycle works: URL input, DNS lookup, TCP/TLS handshake, HTTP request transmission, server processing, and client browser DOM rendering.
- The architectural difference between stateless HTTP connections and persistent sockets.
- The critical role of HTTPS in encrypting headers and payloads using TLS to prevent man-in-the-middle attacks.
- Designing interactive visual simulations using pure vanilla JavaScript without bulky third-party libraries.

## Challenges

- **Realistic Packet Timing:** Coordinating CSS transitions with JavaScript timeouts so packet animations accurately sync with log outputs and status badge transitions.
- **Mobile Responsive Network Lanes:** Maintaining the horizontal client-to-server data-lane visualization on narrow mobile viewports without causing horizontal scrollbars. Solved with responsive flex column wrap.

## Future Improvements

- Add WebSocket bidirectional streaming demonstration alongside HTTP request-response.
- Include a simulated cache hit/miss layer showing browser cache headers (`Cache-Control`, `ETag`).
- Introduce an interactive latency slider to test how network delay impacts perceived user experience.
