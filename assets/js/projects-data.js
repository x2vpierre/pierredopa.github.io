/*
 * Source unique des projets affichés sur la page /projets/ et sur l'accueil.
 * `type` distingue les case studies (récits) des outils (applications IA).
 * `status` : "disponible" | "en-construction" | "vision".
 *
 * Pour ajouter un projet : ajouter une entrée ici, et créer le contenu
 * correspondant dans /articles/<slug>/ et, pour un outil, dans /outils/<slug>/.
 * Voir CLAUDE.md pour le détail de la procédure.
 */

window.projects = [
  {
    type: "case-study",
    slug: "entretiens-structures",
    title: "Construire des entretiens structurés",
    summary:
      "Comment j'ai conçu une grille d'entretien structurée pour le recrutement, étape par étape — avec ce qui a marché et ce qui n'a pas marché.",
    status: "en-construction",
    href: "/articles/entretiens-structures/",
  },
  {
    type: "outil",
    slug: "analyse-offre-emploi",
    title: "Analyse d'offre d'emploi (point de vue candidat)",
    summary:
      "On colle une offre d'emploi, l'outil produit un diagnostic sur trois axes : attractivité, légalité et inclusion, et risques d'auto-exclusion.",
    status: "en-construction",
    href: "/outils/analyse-offre-emploi/",
  },
  {
    type: "outil",
    slug: "assistant-entretien",
    title: "Assistant d'entretien en temps réel",
    summary:
      "Un copilote pour mener un entretien structuré : suggestions de relances, repérage des biais, prise de notes assistée.",
    status: "vision",
    href: null,
  },
  {
    type: "outil",
    slug: "ariane",
    title: "Ariane",
    summary: "Vision long terme — à préciser.",
    status: "vision",
    href: null,
  },
];

window.STATUS_LABELS = {
  disponible: "Disponible",
  "en-construction": "En construction",
  vision: "Vision long terme",
};
