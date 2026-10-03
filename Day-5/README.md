# Day 5 — L'AURA Artisan Bistro: Restaurant Menu Website

## Objective

Build a modern, luxury restaurant menu website with high-aesthetic branding, dynamic category filtering, real-time dish search, dietary preference toggles, an interactive slide-out ordering cart with live bill calculation, and a full table reservation workflow.

## Technologies

- **HTML5:** Semantic architecture (`header`, `nav`, `main`, `section`, `article`, `footer`, `dialog`/modals)
- **CSS3:** Luxury warm dark slate & gold color palette, Google Fonts (`Playfair Display` serif & `Plus Jakarta Sans`), CSS Grid, Flexbox, glassmorphism headers, drawer slide animations
- **JavaScript (Vanilla ES6+):** Dynamic DOM rendering from data arrays, live search/filter orchestration, cart state management (add, remove, quantity step, tax computation), modal dialog controllers

## Features

- **Luxury Brand Aesthetics:** Michelin-recognized artisan branding with elegant typography and smooth layout transitions.
- **Dynamic Category & Dietary Filtering:** Real-time filtering across categories (Starters, Chef's Mains, Woodfired & Pasta, Desserts, Cocktails) combined with dietary toggle pills (🌿 Vegetarian, 🌶️ Spicy, ⭐ Chef's Pick).
- **Instant Search:** As-you-type search bar matching dish names and ingredients instantly.
- **Slide-Out Shopping Cart Drawer:** Smooth slide animation from the right margin, quantity stepper controls (`+` / `-`), item removal, and real-time calculation of subtotal, 8% tax, and final total.
- **Table Reservation System:** Form collecting guest name, email, party size, reservation date/time, and seating preferences with validated text confirmation receipts.
- **100% Responsive Design:** Optimized layouts for mobile smartphones, tablets, and wide desktop screens.

## Project Structure

```text
Day-5/
├── index.html        # Semantic restaurant structure, menu cards, cart drawer, modals
├── style.css         # Luxury slate/gold theme, glassmorphism, responsive grid
├── script.js         # Menu filtering engine, cart manager, reservation modal logic
├── linkedin-post.md  # Day 5 LinkedIn post draft
└── README.md         # Standardized Day 5 documentation
```

## How to Run

1. Open `Day-5/index.html` directly in your web browser.
2. Or serve locally from the repository root:
   ```bash
   python -m http.server 5500
   ```
   Navigate to `http://localhost:5500/Day-5/`.
3. Try searching for dishes (e.g., "Truffle", "Risotto"), adding dishes to your order cart, testing quantity steppers, and filling out the table reservation form.

## What I Learned

- Designing rich e-commerce style client-side workflows without third-party frameworks.
- Structuring menu data as JavaScript object arrays and rendering UI cards dynamically using template literals and element cloning.
- Managing cart state synchronization across multiple independent UI components (cart badge count, drawer list, checkout modal).
- Implementing accessible modal dialogs with keyboard escape listeners and backdrop tap dismissal.

## Challenges

- **Real-Time Multi-Filter Combination:** Ensuring dishes are only displayed if they match BOTH the selected category, the active dietary pills, AND the current text search query. Solved with compound array filtering: `dishes.filter(d => matchesCategory(d) && matchesDietary(d) && matchesQuery(d))`.
- **Preventing XSS on Dynamic Receipts:** Safely rendering user-entered names and booking notes using `textContent` instead of raw `innerHTML`.

## Future Improvements

- Add persistent cart recovery using browser `localStorage`.
- Integrate Stripe Elements / PayPal sandbox for test payment gateway processing.
- Add multi-language localization (e.g., English, French, Italian) for the culinary menu.
