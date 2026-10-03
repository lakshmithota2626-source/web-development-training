# Day 7: Self-Designed React Learning Portfolio

## Objective

Build a responsive React portfolio page that presents verified training work and demonstrates React components, props, state, forms, lists, and conditional feedback.

## Features

- Responsive navbar with About, Skills, Projects, Journey, and Contact links.
- About section describing the training work without inventing personal biography.
- Skills list and learning journey rendered from arrays.
- Project cards linked to the existing GitHub repository.
- Controlled contact form with a success message; it does not send or store messages.
- Accessible labels, focus styles, semantic sections, and a responsive mobile layout.
- GitHub link uses the repository remote already configured for this workspace.

## Technologies

- React 19 and JSX
- JavaScript ES modules
- Vite
- CSS Grid, Flexbox, and media queries

## Folder Structure

```text
react-portfolio/
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── components/
    │   ├── ContactForm.jsx
    │   ├── ProjectCard.jsx
    │   ├── SiteFooter.jsx
    │   ├── SiteHeader.jsx
    │   └── SkillGroup.jsx
    └── styles/
        └── main.css
```

## Installation and Run

Install Node.js, open a terminal in this folder, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Build the static bundle with `npm run build`.

## How It Works

- `App` stores the page's data arrays and composes all portfolio sections.
- `SiteHeader` maps the anchor links into navigation.
- `SkillGroup` and `ProjectCard` receive content via props and render it with `map()`.
- `ContactForm` uses controlled state for inputs and conditional feedback after submit.
- `main.jsx` mounts the app and imports the responsive stylesheet.

## What I Learned

- Break a page into reusable components and pass content through props.
- Use arrays and `map()` to render repeated skills, projects, and journey entries.
- Keep form fields controlled with state and respond to submit events.
- Use conditional rendering for status feedback.
- Organize page layout with responsive CSS Grid and Flexbox.

## Future Improvements

- Add the owner's name, approved biography, LinkedIn URL, and preferred public contact.
- Connect the contact form to a real backend only after choosing a service.
- Add automated tests for the form and navigation.
- Add locally captured project screenshots after selecting which projects to feature.