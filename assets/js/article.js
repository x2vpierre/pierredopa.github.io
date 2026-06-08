/*
 * Charge et affiche un case study écrit en Markdown.
 * La page hôte définit <main data-article-source="contenu.md"> et un
 * conteneur <div id="article-root">. Ce script va chercher le fichier,
 * sépare le front-matter (titre, statut, résumé...) du corps, puis
 * injecte le rendu HTML.
 *
 * Dépend de markdown.js (window.markdown), à charger avant ce script.
 */

async function renderArticle() {
  const root = document.getElementById("article-root");
  if (!root) return;

  const main = root.closest("main");
  const source = main ? main.getAttribute("data-article-source") : null;
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

  const statusLabel = window.STATUS_LABELS
    ? window.STATUS_LABELS[meta.status] || meta.status
    : meta.status;

  root.innerHTML = `
    <header class="article-header">
      ${statusLabel ? `<span class="tag">${statusLabel}</span>` : ""}
      <h1>${meta.title || ""}</h1>
      ${meta.summary ? `<p>${meta.summary}</p>` : ""}
    </header>
    <div class="article-body">${bodyHtml}</div>
  `;

  if (meta.title) {
    document.title = `${meta.title} — Pierre Dopavogui`;
  }
}

document.addEventListener("DOMContentLoaded", renderArticle);
