/*
 * Injecte un en-tête et un pied de page communs dans toutes les pages.
 * Chaque page place un <header id="site-header"></header> et
 * <footer id="site-footer"></footer> vides ; ce script les remplit,
 * pour ne maintenir la nav qu'à un seul endroit.
 */

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/projets/", label: "Projets" },
  { href: "/#contact", label: "Contact" },
];

function buildHeader(currentPath) {
  const links = NAV_LINKS.map((link) => {
    const isCurrent = link.href !== "/#contact" && currentPath === link.href;
    const current = isCurrent ? ' aria-current="page"' : "";
    return `<a href="${link.href}"${current}>${link.label}</a>`;
  }).join("\n");

  return `
    <a class="site-header__name" href="/">Pierre Dopavogui</a>
    <nav class="site-nav">${links}</nav>
  `;
}

function buildFooter() {
  const year = new Date().getFullYear();
  return `<p>© ${year} Pierre Dopavogui</p>`;
}

function renderLayout() {
  const currentPath = window.location.pathname;

  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = buildHeader(currentPath);
  }

  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML = buildFooter();
  }
}

document.addEventListener("DOMContentLoaded", renderLayout);
