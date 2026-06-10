/*
 * Affiche les projets dans deux formats :
 *
 * [data-project-grid]   — cartes alternées avec image et frame, pour la home.
 *   Chaque projet pair est en .reverse (texte à gauche).
 *   Filtre : "all" | "case-study" | "outil"
 *
 * [data-project-list]   — liste simple avec statut, pour /projets/.
 *   Filtre : "all" | "case-study" | "outil"
 *
 * Dépend de window.projects et window.STATUS_LABELS (projects-data.js).
 */

/* ---- ToolCard : carte illustrée avec fenêtre blob masquée ---- */
function renderToolCard(project) {
  var c   = project.card;
  var uid = "blob-" + project.slug;

  /* Blob organique asymétrique (coordonnées objectBoundingBox 0-1) */
  var blob = "M 0.52 0.05 C 0.78 0.00 0.97 0.21 0.95 0.46 " +
             "C 0.93 0.69 0.76 0.92 0.55 0.94 " +
             "C 0.34 0.96 0.04 0.79 0.05 0.53 " +
             "C 0.06 0.27 0.22 0.08 0.52 0.05 Z";

  var fogOpacity = (c.fog / 100 * 0.85).toFixed(2);
  var fog = "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0," + fogOpacity + ") 100%)";
  var t3d = "perspective(600px) rotateX(" + c.depthY + "deg) rotateY(" + c.depthX + "deg) rotateZ(" + c.tiltAngle + "deg)";

  var imgHtml = c.screenshot
    ? '<img src="' + c.screenshot + '" alt="" style="' +
        'width:120%;height:120%;object-fit:cover;flex-shrink:0;' +
        'transform:' + t3d + ';transform-origin:center center' +
      '" />'
    : "";

  return (
    '<div class="tool-card" style="background:' + c.cardColor + ';border-radius:' + c.cardRadius + 'px">' +
      '<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
        '<defs>' +
          '<clipPath id="' + uid + '" clipPathUnits="objectBoundingBox">' +
            '<path d="' + blob + '"/>' +
          "</clipPath>" +
        "</defs>" +
      "</svg>" +
      '<div style="' +
        'width:' + c.windowSize + 'px;height:' + c.windowSize + 'px;' +
        'clip-path:url(#' + uid + ');overflow:hidden;' +
        'display:flex;align-items:center;justify-content:center;position:relative' +
      '">' +
        imgHtml +
        '<div style="position:absolute;inset:0;background:' + fog + ';pointer-events:none"></div>' +
      "</div>" +
    "</div>"
  );
}

/* ---- format home : grille alternée avec frame ou ToolCard ---- */
function projectGridCard(project, index) {
  var isReverse = index % 2 !== 0;
  var reverseClass = isReverse ? " reverse" : "";
  var imgSrc = project.image || "";

  var media = "";
  if (project.card) {
    var cardHtml = renderToolCard(project);
    media = project.href
      ? '<a href="' + project.href + '" style="display:block">' + cardHtml + "</a>"
      : cardHtml;
  } else if (imgSrc) {
    media = project.href
      ? '<a href="' + project.href + '">' +
          '<div class="frame">' +
            '<div class="frame-bar"><span></span><span></span><span></span></div>' +
            '<img src="' + imgSrc + '" alt="Aperçu — ' + project.title + '" />' +
          "</div>" +
        "</a>"
      : '<div class="frame">' +
          '<div class="frame-bar"><span></span><span></span><span></span></div>' +
          '<img src="' + imgSrc + '" alt="" />' +
        "</div>";
  }

  var btn = project.href
    ? '<a class="btn" href="' + project.href + '">Voir le projet</a>'
    : "";

  return (
    '<div class="project' + reverseClass + ' wrap">' +
      '<div class="project-grid">' +
        '<div class="project-media">' + media + "</div>" +
        '<div class="project-text">' +
          '<h2 class="project-title">' + project.title + "</h2>" +
          '<p class="project-desc">' + project.summary + "</p>" +
          btn +
        "</div>" +
      "</div>" +
    "</div>"
  );
}

/* ---- format listing : ligne simple avec statut ---- */
function projectListItem(project) {
  var statusLabel = window.STATUS_LABELS[project.status] || project.status;
  var typeLabel = project.type === "case-study" ? "Case study" : "Outil";

  var titleHtml = project.href
    ? '<a href="' + project.href + '">' + project.title + "</a>"
    : project.title;

  return (
    '<li class="project-item">' +
      "<div>" +
        '<div class="project-item__title">' + titleHtml + "</div>" +
        '<div class="project-item__desc">' + project.summary + "</div>" +
      "</div>" +
      '<div class="project-item__meta">' +
        '<span class="type-tag">' + typeLabel + "</span>" +
      "</div>" +
    "</li>"
  );
}

/* ---- rendu ---- */
function renderProjects() {
  /* Grille home */
  document.querySelectorAll("[data-project-grid]").forEach(function (container) {
    var filter = container.getAttribute("data-project-grid");
    var list = window.projects.filter(function (p) {
      return filter === "all" || p.type === filter;
    });
    container.innerHTML = list.map(projectGridCard).join("\n");
  });

  /* Liste simple */
  document.querySelectorAll("[data-project-list]").forEach(function (container) {
    var filter = container.getAttribute("data-project-list");
    var list = window.projects.filter(function (p) {
      return filter === "all" || p.type === filter;
    });
    container.innerHTML = list.map(projectListItem).join("\n");
  });
}

document.addEventListener("DOMContentLoaded", renderProjects);
