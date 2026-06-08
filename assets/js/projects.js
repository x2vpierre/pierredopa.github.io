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

/* ---- format home : grille alternée avec frame ---- */
function projectGridCard(project, index) {
  var isReverse = index % 2 !== 0;
  var reverseClass = isReverse ? " reverse" : "";
  var statusLabel = window.STATUS_LABELS[project.status] || project.status;
  var imgSrc = project.image || "";

  var media = project.href
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

  var btn = project.href
    ? '<a class="btn" href="' + project.href + '">Voir le projet</a>'
    : '<span class="btn inactive">' + statusLabel + "</span>";

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
        '<span class="status-tag">' + statusLabel + "</span>" +
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
