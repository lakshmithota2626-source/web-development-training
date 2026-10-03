import React from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import SkillGroup from "./components/SkillGroup.jsx";
import ContactForm from "./components/ContactForm.jsx";
import SiteFooter from "./components/SiteFooter.jsx";

const skills = [
  { title: "Web foundations", items: ["Semantic HTML", "Responsive CSS", "Accessibility basics"] },
  { title: "JavaScript", items: ["ES6+", "Arrays and functions", "DOM and events"] },
  { title: "React", items: ["JSX", "Components and props", "State and forms"] },
  { title: "Tools and concepts", items: ["Redux fundamentals", "Java basics", "Git and GitHub"] }
];

const projects = [
  {
    number: "01",
    title: "Focus Board",
    type: "React task manager",
    description: "Organize study, work, and personal tasks with status filters, priorities, and browser storage.",
    href: "https://github.com/lakshmithota2626-source/web-development-training/tree/main/Day-11/react-project-1",
    visual: "tasks"
  },
  {
    number: "02",
    title: "Pantry Ledger",
    type: "React inventory app",
    description: "Track pantry quantities, categories, stock levels, and best-before dates.",
    href: "https://github.com/lakshmithota2626-source/web-development-training/tree/main/Day-12/react-project-2",
    visual: "pantry"
  },
  {
    number: "03",
    title: "Restaurant Menu",
    type: "JavaScript web app",
    description: "A menu experience with search, dietary filters, cart updates, and table reservations.",
    href: "https://github.com/lakshmithota2626-source/web-development-training/tree/main/Day-5",
    visual: "menu"
  }
];

function App() {
  return (
    <div className="portfolio-shell">
      <SiteHeader />
      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Web development / learning portfolio</p>
            <h1>Learning by building useful things.</h1>
            <p className="hero-intro">A growing collection of projects and notes from a 13-day journey through web development, React, Redux, and Java.</p>
            <a className="primary-link" href="#projects">Explore selected work <span aria-hidden="true">↘</span></a>
          </div>
          <aside className="focus-note" aria-label="Current learning focus">
            <span className="note-index">CURRENT FOCUS / 01</span>
            <strong>Make each interaction explain the state.</strong>
            <p>Forms, filters, lists, and clear feedback are small details that make an interface easier to use.</p>
          </aside>
          <div className="hero-rule" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-label"><span>01</span><h2>About this portfolio</h2></div>
          <div className="about-copy">
            <p>This portfolio documents hands-on learning rather than a list of claims. Each entry links to code or project documentation in the training repository.</p>
            <p>The work spans browser fundamentals, JavaScript problem solving, React interfaces, Redux concepts, and introductory Java. Project notes also call out testing and personalization still to do.</p>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-label"><span>02</span><h2>Skills in practice</h2></div>
          <div className="skills-grid">
            {skills.map((group) => <SkillGroup key={group.title} group={group} />)}
          </div>
        </section>

        <section className="projects-band" id="projects">
          <div className="section projects-inner">
            <div className="section-label"><span>03</span><h2>Selected projects</h2></div>
            <p className="section-intro">A few examples from the repository. Project status and setup details live in each README.</p>
            <div className="project-grid">
              {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
            </div>
          </div>
        </section>

        <section className="section journey-section" id="journey">
          <div className="section-label"><span>04</span><h2>Learning journey</h2></div>
          <ol className="journey-list">
            <li><span>01-04</span><p>Web foundations, JavaScript, OOP, jQuery, and asynchronous requests.</p></li>
            <li><span>05-07</span><p>Browser applications, portfolio synthesis, and React foundations.</p></li>
            <li><span>08-09</span><p>React state patterns and Redux concepts with focused exercises.</p></li>
            <li><span>10-13</span><p>Java basics, array problems, React projects, and a final audit.</p></li>
          </ol>
        </section>

        <section className="section contact-section" id="contact">
          <div className="section-label"><span>05</span><h2>Contact</h2></div>
          <div className="contact-layout">
            <div className="contact-copy">
              <p>Use the form to try the controlled-input and submit states. This demo has no backend, so it does not send or save messages.</p>
              <a href="https://github.com/lakshmithota2626-source/web-development-training">View the training repository <span aria-hidden="true">↗</span></a>
              <p className="profile-pending">LinkedIn profile and public email are not included until the owner supplies those details.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;