/*
 * Parseur Markdown minimal, sans dépendance.
 * Couvre le sous-ensemble nécessaire aux case studies du site :
 * titres, paragraphes, gras/italique/code inline, liens, listes,
 * citations et blocs de code. Pas de tableaux, pas d'images imbriquées.
 */

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(text) {
  let html = escapeHtml(text);

  // Code inline d'abord, pour ne pas toucher à son contenu
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  return html;
}

function parseMarkdown(source) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const html = [];

  let i = 0;
  let listType = null; // "ul" | "ol" | null
  let inCodeBlock = false;
  let codeBuffer = [];
  let paragraphBuffer = [];

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }

  function flushParagraph() {
    if (paragraphBuffer.length) {
      html.push(`<p>${renderInline(paragraphBuffer.join(" "))}</p>`);
      paragraphBuffer = [];
    }
  }

  while (i < lines.length) {
    const line = lines[i];

    // Blocs de code ```...```
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        closeList();
        inCodeBlock = true;
      }
      i++;
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      i++;
      continue;
    }

    const trimmed = line.trim();

    // Ligne vide : sépare les blocs
    if (trimmed === "") {
      flushParagraph();
      closeList();
      i++;
      continue;
    }

    // Titres
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Citations
    if (trimmed.startsWith("> ")) {
      flushParagraph();
      closeList();
      html.push(`<blockquote><p>${renderInline(trimmed.slice(2))}</p></blockquote>`);
      i++;
      continue;
    }

    // Listes non ordonnées
    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${renderInline(ulMatch[1])}</li>`);
      i++;
      continue;
    }

    // Listes ordonnées
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${renderInline(olMatch[1])}</li>`);
      i++;
      continue;
    }

    // Sinon, ligne de paragraphe
    closeList();
    paragraphBuffer.push(trimmed);
    i++;
  }

  flushParagraph();
  closeList();

  return html.join("\n");
}

/*
 * Sépare un éventuel front-matter YAML simple (clé: valeur) du corps.
 * Pas de support des structures imbriquées : suffisant pour des
 * métadonnées d'article (titre, date, statut, résumé).
 */
function parseFrontMatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: source };
  }

  const meta = {};
  for (const line of match[1].split("\n")) {
    const lineMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (lineMatch) {
      meta[lineMatch[1]] = lineMatch[2].trim();
    }
  }

  return { meta, body: match[2] };
}

window.markdown = { parseMarkdown, parseFrontMatter };
