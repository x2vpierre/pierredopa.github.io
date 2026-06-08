/*
 * Affiche la liste des projets (case studies + outils) dans tout élément
 * portant l'attribut [data-project-list]. Lit window.projects, rempli par
 * projects-data.js, qui doit être chargé avant ce script.
 *
 * data-project-list="all" affiche tout, "case-study" ou "outil" filtre.
 */

function projectCard(project) {
  const statusLabel = window.STATUS_LABELS[project.status] || project.status;
  const typeLabel = project.type === "case-study" ? "Case study" : "Outil";

  const titleMarkup = project.href
    ? `<h3><a href="${project.href}">${project.title}</a></h3>`
    : `<h3>${project.title}</h3>`;

  return `
    <li class="project-card">
      <div class="project-card__header">
        ${titleMarkup}
        <span class="tag">${statusLabel}</span>
      </div>
      <p>${typeLabel} — ${project.summary}</p>
    </li>
  `;
}

function renderProjectLists() {
  const containers = document.querySelectorAll("[data-project-list]");

  containers.forEach((container) => {
    const filter = container.getAttribute("data-project-list");
    const projects = window.projects.filter(
      (project) => filter === "all" || project.type === filter
    );

    container.innerHTML = projects.map(projectCard).join("\n");
  });
}

document.addEventListener("DOMContentLoaded", renderProjectLists);
