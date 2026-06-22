---
title: Kaizen — l'extension qui transforme le tri de CV
kicker: Étude de cas
status: disponible
date: Juin 2026
reading_time: 3 min de lecture
summary: J'ai construit une extension Chrome pour ne plus dépendre de l'ATS. Ce que ça m'a appris sur la puissance de construire ses propres outils — sans savoir lire le code.
---

## Contexte

J'ai toujours aimé les extensions Chrome, ces petits modificateurs qui changent une page web. Et j'avais un point de douleur précis : notre ATS rendait le tri de CV laborieux. Passer la souris d'un coin à l'autre de l'écran pour faire défiler un CV puis agir dessus, encore et encore. Les retours remontaient, mais je voyais bien que ça ne bougerait pas vite. Alors je me suis dit qu'une extension Chrome ferait la différence sans dépendre de personne. Pas besoin de permission, pas d'impact sur les délais candidats ni sur l'ATS.

## Résultat

Kaizen fait gagner environ 50 % de temps sur le tri de CV. Elle met aussi en surbrillance les candidatures internes, sur lesquelles nous avons un enjeu fort : leur traitement prioritaire est inscrit dans nos accords. Ne plus en louper, ce n'est pas du confort, c'est une obligation qu'on respecte mieux.

## Les étapes clés

Au départ elle s'appelait Flow, en référence à cet état de maîtrise et d'implication totale dans une tâche décrit par Csikszentmihalyi. C'était l'objectif : créer cet état chez quelqu'un qui trie des CV. On passe d'un CV à l'autre avec les flèches gauche-droite, on agit avec un raccourci sécurisé (Ctrl + flèche haut ou bas) pour faire avancer ou refuser une candidature. Le Ctrl est une sécurité volontaire : ça va vite, un mauvais clic est vite arrivé. Tout se pilote au clavier.

Côté technique, j'ai appris en faisant. Au début, des bouts de code demandés à ChatGPT, copiés-collés dans un fichier texte. Vraiment du bricolage. Plus tard, je suis passé à Claude Code pour les fonctions plus complexes.

## Le résultat concret

La v1 faisait l'essentiel : navigation au clavier, raccourcis sécurisés, surbrillance des candidatures internes. En v2, j'ai redistribué la page, ajouté un slider pour agrandir ou réduire le CV, et modifié le viewer pour scroller le document aussi aux flèches. Plus besoin de la molette.

Un point important : tout tourne dans le navigateur. C'est comme demander au navigateur de porter des lunettes roses. Ça ne change pas la réalité ni les données, juste ta perception et ta façon d'interagir avec une page qui existe déjà. Aucune donnée candidat ne sort, le respect du RGPD est total.

## Impact

Déployée la semaine dernière sur trois collègues, en plus de ma manager et d'une collègue qui testent depuis plus longtemps. Objectif : une présentation à tous les recruteurs Harmonie France avant juillet, libre à chacun de tester ou non.

## Ce que j'en retiens, et la suite

Ce projet m'a appris la vraie puissance de l'IA : pas te remplacer, mais t'augmenter et te permettre de construire tes propres outils. Je n'ai pas écrit de prompt de six pages. J'ai parlé à une IA comme je parlerais à un développeur, en disant les choses comme je les voyais. Je ne sais pas lire le code, je n'ai jamais repéré une erreur de syntaxe. Mais je voyais ce qui ne marchait pas, je demandais une analyse, des pistes, et j'orientais. C'est ça la bascule : passer du langage naturel à des fonctionnalités réelles.

C'est exactement ce qui m'a permis de construire le site sur lequel tu lis cet article, et les outils que je sortirai ensuite.
