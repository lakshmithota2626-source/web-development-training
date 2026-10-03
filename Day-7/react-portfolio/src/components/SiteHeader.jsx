import React from "react";

const NAV_ITEMS = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Journey", "#journey"],
  ["Contact", "#contact"]
];

function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home"><span className="wordmark-mark" aria-hidden="true">LP</span><span>Learning Portfolio</span></a>
      <nav aria-label="Main navigation">
        {NAV_ITEMS.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>
    </header>
  );
}

export default SiteHeader;