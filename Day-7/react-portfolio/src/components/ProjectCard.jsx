import React from "react";

function ProjectVisual({ variant }) {
  if (variant === "tasks") {
    return <div className="preview preview-tasks" aria-hidden="true"><span className="preview-top"></span><i></i><i></i><i></i></div>;
  }

  if (variant === "pantry") {
    return <div className="preview preview-pantry" aria-hidden="true"><span>OATS</span><span>GREENS</span><span>RICE</span><span>BEANS</span></div>;
  }

  return <div className="preview preview-menu" aria-hidden="true"><span>MENU</span><i></i><i></i><i></i></div>;
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <ProjectVisual variant={project.visual} />
      <div className="project-card-copy">
        <div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <a href={project.href} target="_blank" rel="noreferrer">Open repository <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  );
}

export default ProjectCard;