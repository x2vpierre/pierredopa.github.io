/*
 * Source unique des projets affichés sur la page d'accueil et sur /projets/.
 *
 * Champs :
 *   type    — "case-study" | "outil"
 *   slug    — identifiant URL
 *   title   — titre affiché
 *   summary — description courte (1-2 phrases)
 *   status  — "disponible" | "en-construction" | "vision"
 *   href    — URL cible (null si non encore disponible)
 *   image   — chemin vers l'image de la carte home (null = placeholder gris)
 *
 * Pour ajouter un projet : voir CLAUDE.md.
 */

window.projects = [
  {
    type: "case-study",
    slug: "entretiens-structures",
    title: "Entretiens structurés",
    summary: "Comment j'ai conçu une grille d'entretien structurée pour le recrutement — le raisonnement, les itérations, ce qui n'a pas marché.",
    status: "en-construction",
    href: "/articles/entretiens-structures/",
    image: null,
  },
  {
    type: "outil",
    slug: "analyse-offre-emploi",
    title: "Analyse d'offre d'emploi",
    summary: "On colle une offre, l'outil produit un diagnostic sur trois axes : attractivité, légalité et inclusion, risques d'auto-exclusion.",
    status: "en-construction",
    href: "/outils/analyse-offre-emploi/",
    image: null,
  },
  {
    type: "outil",
    slug: "assistant-entretien",
    title: "Assistant d'entretien en temps réel",
    summary: "Un copilote pour mener un entretien structuré : suggestions de relances, repérage des biais, prise de notes assistée.",
    status: "vision",
    href: null,
    image: null,
  },
  {
    type: "outil",
    slug: "ariane",
    title: "Ariane",
    summary: "Vision long terme — à préciser.",
    status: "vision",
    href: null,
    image: null,
  },
];

window.STATUS_LABELS = {
  "disponible":      "Disponible",
  "en-construction": "En construction",
  "vision":          "Vision long terme",
};
