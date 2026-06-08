# pierredopa.github.io

Site personnel non indexé (carte de visite étendue, partagée depuis LinkedIn /
Instagram). Esprit "lived-in website" : sobre, honnête, pas de personal
branding sur-optimisé. Référence esthétique : nevinjojo.com.

Stack : HTML + CSS + JS vanilla, hébergé sur GitHub Pages, domaine custom
(Namecheap). Zéro CMS, zéro base de données, zéro dépendance externe. Les
articles sont en Markdown dans le repo, rendus côté navigateur.

## Structure

```
/assets/css/style.css        — variables, reset, typographie, layout, composants
/assets/js/layout.js         — injecte header/nav/footer communs (chargé partout)
/assets/js/markdown.js       — parseur Markdown maison (sous-ensemble minimal)
/assets/js/projects-data.js  — source unique des projets (case studies + outils)
/assets/js/projects.js       — affiche les listes de projets (data-project-list)
/assets/js/article.js        — charge et rend un case study Markdown
/articles/<slug>/            — un dossier par case study : index.html + contenu.md
/outils/<slug>/              — un dossier par outil IA : index.html + son JS propre
/projets/index.html          — page qui liste tous les projets
index.html                   — page d'accueil
```

## Conventions de layout

Toute page inclut :
- `<header id="site-header" class="site-header"></header>`
- `<footer id="site-footer" class="site-footer"></footer>`
- le script `/assets/js/layout.js` (en dernier, il se déclenche sur `DOMContentLoaded`)

`layout.js` remplit ces deux éléments avec une nav et un footer communs. Ne
pas dupliquer le HTML de la nav ailleurs — modifier `NAV_LINKS` dans
`layout.js` suffit pour changer la navigation partout.

Toute page doit aussi avoir `<meta name="robots" content="noindex, nofollow" />`
dans le `<head>` : le site n'est volontairement pas indexé.

## Ajouter un case study

1. Créer `/articles/<slug>/index.html` en copiant la coquille de
   `/articles/entretiens-structures/index.html` (changer juste le `<title>`).
2. Créer `/articles/<slug>/contenu.md` avec un front-matter :
   ```
   ---
   title: Titre de l'article
   status: en-construction   (ou "disponible")
   summary: Résumé en une phrase, affiché en haut de page et dans les listes.
   ---
   ```
   suivi du contenu en Markdown (titres `##`, listes, citations, blocs de
   code, liens, gras/italique — voir `assets/js/markdown.js` pour le détail
   du sous-ensemble supporté).
3. Ajouter une entrée dans `window.projects` (`assets/js/projects-data.js`)
   avec `type: "case-study"`, le `slug`, un `summary`, un `status`, et le
   `href` vers `/articles/<slug>/`.

Format du contenu, dans l'esprit "job-winning case study" : contexte →
résultat (en premier) → étapes clés → impact → enseignements. Honnête sur
les ratés, pas un tutoriel SEO.

## Ajouter un outil IA

1. Créer `/outils/<slug>/index.html` (header/footer/layout comme les autres
   pages) avec l'interface de l'outil et son propre script JS dans le même
   dossier.
2. L'outil appelle l'API Claude directement depuis le navigateur (pas de
   backend). Garder la clé API hors du repo — demander à l'utilisateur
   comment il souhaite la gérer côté client avant d'écrire ce code.
3. Écrire le case study correspondant dans `/articles/<slug>/` (voir
   ci-dessus) : comment l'outil a été construit, avec ses itérations.
4. Ajouter une entrée dans `projects-data.js` avec `type: "outil"`, et un
   `href` vers `/outils/<slug>/`.

## Statuts de projet

`status` dans `projects-data.js` est l'une de :
- `disponible` — utilisable / publié
- `en-construction` — visible mais pas terminé
- `vision` — pas encore commencé, idée long terme (mettre `href: null`)

Les libellés affichés sont définis dans `window.STATUS_LABELS`
(`projects-data.js`) — modifier là pour changer le texte affiché.

## Ce qui n'a pas sa place ici

Vie privée, projets makers personnels (impression 3D, domotique), tout ce
qui n'est pas directement lié à la pratique professionnelle (RH, recrutement,
outils IA).
