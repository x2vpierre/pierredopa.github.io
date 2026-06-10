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
  var fog = "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0," + fogOpacity + ") 100%)";

  /* translateY négatif = remonte l'image → révèle la partie basse (le tableau) */
  var t3d = "translateY(-14%) perspective(600px) rotateX(" + c.depthY + "deg) rotateY(" + c.depthX + "deg) rotateZ(" + c.tiltAngle + "deg)";

  var imgHtml = c.screenshot
    ? '<img src="' + c.screenshot + '" alt="" style="' +
        'width:150%;height:150%;object-fit:cover;flex-shrink:0;' +
        'transform:' + t3d + ';transform-origin:center center' +
      '" />'
    : "";

  var windowHtml =
    '<div style="' +
      'width:' + c.windowSize + 'px;height:' + c.windowSize + 'px;' +
      'clip-path:url(#' + uid + ');overflow:hidden;' +
      'display:flex;align-items:center;justify-content:center;position:relative' +
    '">' +
      imgHtml +
      '<div style="position:absolute;inset:0;background:' + fog + ';pointer-events:none"></div>' +
    '</div>';

  /* --- Zone texte (withText) ------------------------------------------- */
  var textHtml = "";
  if (c.withText) {
    var title  = (c.title  || project.title).toUpperCase();
    var desc   = c.description || project.summary;
    var cta    = c.ctaLabel || "Lire →";
    var ctaHref = c.ctaHref || project.href || "#";

    textHtml =
      '<div style="padding:18px 22px 0;text-align:center;width:100%;">' +
        '<div style="font-family:Poppins,sans-serif;font-size:13px;font-weight:700;' +
             'letter-spacing:.08em;text-transform:uppercase;color:#fff;margin-bottom:8px;line-height:1.3;">' +
          title +
        '</div>' +
        '<p style="font-family:Mulish,sans-serif;font-size:13px;line-height:1.5;' +
           'color:rgba(255,255,255,.82);margin:0 0 16px;">' +
          desc +
        '</p>' +
        '<a href="' + ctaHref + '" style="display:inline-flex;align-items:center;gap:6px;' +
           'font-family:Poppins,sans-serif;font-size:13px;font-weight:600;' +
           'color:' + c.cardColor + ';background:#fff;border-radius:999px;' +
           'padding:9px 22px;text-decoration:none;">' +
          cta +
        '</a>' +
      '</div>';
  }

  var pad = c.withText ? "24px 24px 28px" : "32px";

  return (
    '<div class="tool-card" style="background:' + c.cardColor + ';border-radius:' + c.cardRadius + 'px;' +
         'padding:' + pad + ';flex-direction:column;">' +
      '<svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">' +
        '<defs>' +
          '<clipPath id="' + uid + '" clipPathUnits="objectBoundingBox">' +
            '<path d="' + blob + '"/>' +
          '</clipPath>' +
        '</defs>' +
      '</svg>' +
      windowHtml +
      textHtml +
    '</div>'
  );
}

/* ---- format home : grille alternée avec frame ou ToolCard ---- */
function projectGridCard(project, index) {
  var isReverse = index % 2 !== 0;
  var reverseClass = isReverse ? " reverse" : "";
  var imgSrc = project.image || "";

  /* Rendu du media */
  var media = "";
  if (project.card) {
    var cardHtml = renderToolCard(project);
    /* withText : la card est cliquable entière (le lien est à l'intérieur du textHtml),
       ou on l'enveloppe dans un <a> si c'est withText=false */
    media = (project.href && !project.card.withText)
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

  /* withText : carte autonome, pas de colonne texte à côté */
  if (project.card && project.card.withText) {
    return (
      '<div class="project wrap">' +
        '<div class="project-card-only">' + media + '</div>' +
      '</div>'
    );
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
