import React from "react";

const SUMMARY_ITEMS = [
  { key: "total", label: "Items tracked", value: (summary) => summary.total, tone: "green" },
  { key: "low", label: "Running low", value: (summary) => summary.lowStock, tone: "gold" },
  { key: "soon", label: "Use soon", value: (summary) => summary.useSoon, tone: "coral" },
  { key: "expired", label: "Expired", value: (summary) => summary.expired, tone: "ink" }
];

function SummaryBar({ total, lowStock, useSoon, expired }) {
  const summary = { total, lowStock, useSoon, expired };

  return (
    <section className="summary-bar" aria-label="Pantry summary">
      {SUMMARY_ITEMS.map((item) => (
        <div className={`summary-item ${item.tone}`} key={item.key}>
          <span>{item.label}</span>
          <strong>{item.value(summary)}</strong>
        </div>
      ))}
    </section>
  );
}

export default SummaryBar;