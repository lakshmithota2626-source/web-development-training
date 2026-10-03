import React from "react";

function SkillGroup({ group }) {
  return (
    <article className="skill-group">
      <h3>{group.title}</h3>
      <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
    </article>
  );
}

export default SkillGroup;