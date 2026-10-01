import React from "react";

function ProgressSummary({ total, open, completed }) {
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <section className="summary" aria-label="Task progress">
      <div className="summary-stat"><span>Total tasks</span><strong>{total}</strong></div>
      <div className="summary-stat"><span>To do</span><strong>{open}</strong></div>
      <div className="summary-stat"><span>Completed</span><strong>{completed}</strong></div>
      <div className="progress-stat">
        <div><span>Progress</span><strong>{completionRate}%</strong></div>
        <div className="progress-track" role="progressbar" aria-label="Task completion" aria-valuemin="0" aria-valuemax="100" aria-valuenow={completionRate}>
          <span style={{ width: `${completionRate}%` }}></span>
        </div>
      </div>
    </section>
  );
}

export default ProgressSummary;