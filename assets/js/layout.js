/*
 * Injecte un en-tête et un pied de page communs dans les pages intérieures
 * (articles, outils, listing projets). La page d'accueil a son propre HTML
 * complet et ne dépend pas de ce script pour sa nav.
 *
 * Chaque page intérieure inclut :
 *   <header id="site-header"></header>
 *   <footer id="site-footer"></footer>
 *   <script src="/assets/js/layout.js">
 *
 * Pour modifier la navigation : changer NAV_LINKS ci-dessous.
 */

var NAV_LINKS = [
  { href: "/",        label: "Accueil"  },
  { href: "/#contact", label: "Contact" },
];

function buildHeader(currentPath) {
  var links = NAV_LINKS.map(function (link) {
    var isCurrent = link.href !== "/#contact" && currentPath === link.href;
    var attr = isCurrent ? ' aria-current="page"' : "";
    return '<a href="' + link.href + '"' + attr + '>' + link.label + "</a>";
  }).join("\n");

  return (
    '<div class="wrap nav-inner">' +
      '<a class="brand" href="/">Pierre Dopa</a>' +
      '<nav class="site-nav-links">' + links + "</nav>" +
    "</div>"
  );
}

function buildFooter() {
  var year = new Date().getFullYear();
  return (
    '<div class="wrap">' +
      "<p>Site personnel de Pierre Dopa.<br />" +
      "© " + year + " Tous droits réservés.</p>" +
    "</div>"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  var currentPath = window.location.pathname;

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "nav";
    header.innerHTML = buildHeader(currentPath);
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "footer";
    footer.innerHTML = buildFooter();
  }
});
