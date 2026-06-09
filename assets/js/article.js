/*
 * Charge et affiche un case study écrit en Markdown.
 * Le wrapper définit data-article-source="contenu.md".
 * Injecte le rendu complet (header, body, footer) dans #article-root.
 *
 * Front-matter supporté :
 *   title, status, kicker, date, reading_time, summary
 *
 * Dépend de markdown.js (window.markdown) et projects-data.js,
 * à charger avant ce script.
 */

async function renderArticle() {
  const root = document.getElementById("article-root");
  if (!root) return;

  const wrapper = document.querySelector("[data-article-source]");
  const source = wrapper ? wrapper.getAttribute("data-article-source") : null;
  if (!source) return;

  let text;
  try {
    const response = await fetch(source);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    text = await response.text();
  } catch (err) {
    root.innerHTML = "<p>Cet article n'a pas pu être chargé.</p>";
    return;
  }

  const { meta, body } = window.markdown.parseFrontMatter(text);
  const bodyHtml = window.markdown.parseMarkdown(body);

  const kicker     = meta.kicker       || "";
  const dateStr    = meta.date         || "";
  const readingTime = meta.reading_time || "";

  const metaHtml = (dateStr || readingTime) ? `
    <div class="art-meta">
      ${dateStr ? `<span>${dateStr}</span>` : ""}
      ${dateStr && readingTime ? `<span class="art-dot"></span>` : ""}
      ${readingTime ? `<span>${readingTime}</span>` : ""}
    </div>` : "";

  root.innerHTML = `
    <header class="art-head">
      ${kicker ? `<span class="art-kicker">${kicker}</span>` : ""}
      <h1 class="art-title">${meta.title || ""}</h1>
      ${metaHtml}
    </header>
    <div class="art-body">
      ${meta.summary ? `<p class="art-intro">${meta.summary}</p>` : ""}
      ${bodyHtml}
    </div>
    <footer class="art-foot">
      <p class="art-foot-cta">Envie d&rsquo;en parler ?&thinsp;<a href="mailto:bonjour@pierredopa.com">Écrivez-moi</a>.</p>
    </footer>
  `;

  if (meta.title) {
    document.title = `${meta.title} — Pierre Dopa`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderArticle);
} else {
  renderArticle();
}
