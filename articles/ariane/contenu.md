---
title: Ariane — un assistant IA pour des recruteurs qui ne croient pas à l'IA
status: disponible
kicker: Étude de cas
date: Juin 2026
reading_time: 3 min de lecture
summary: J'ai construit Ariane pour des recruteurs qui n'ouvraient jamais ChatGPT. Ce que ça m'a appris sur l'adoption : la friction ne vient pas du modèle, elle vient de la page blanche.
---

## Contexte

J'utilise ChatGPT depuis sa sortie. En arrivant chez Harmonie Mutuelle, on m'a vite demandé de partager mes pratiques IA aux autres recruteurs. Prompts, bonnes pratiques, conseils. Ça n'a pas pris. Le sujet, au fond : comment faire adopter l'IA à des gens dont ce n'est pas le réflexe.

## Résultat

Ariane, un agent IA sous Gemini dédié au recrutement, déployé cette semaine. L'objectif que je me fixe : 25% des recruteurs qui l'utilisent régulièrement d'ici six mois. Le succès ne se mesure pas à la sophistication de l'outil, mais à l'adoption.

## Les étapes clés

Le déclic est venu d'Hippolyte, une solution achetée par l'entreprise. Un outil très limité. Et mes collègues se le sont bien plus approprié que tous mes conseils sur ChatGPT. J'ai compris quelque chose de contre-intuitif : son côté borné, que je trouvais frustrant, c'était exactement ce qui le rendait adoptable. La friction à l'adoption, ce n'est pas la qualité du modèle, c'est qu'il faut de l'imagination pour s'en servir.

J'ai construit Ariane sur cette leçon. J'ai commencé par les usages à plus forte valeur : comptes rendus, mails candidats, offres d'emploi. Puis j'ai ajouté les fonctions au fil des frictions, par essai-erreur.

## Le résultat concret

Deux décisions de conception structurent l'outil. Le menu d'abord : restreindre les fonctions, contre-intuitif, mais c'est ce qui rassure quelqu'un qui débute. On clique sur sa tâche au lieu d'affronter une page blanche. Les questions ensuite : les gens écrivent *« fais-moi un compte rendu »* et s'arrêtent là. Alors Ariane pose des questions, construit le bon prompt à la place de l'utilisateur sans qu'il s'en rende compte. Il croit demander un service, en réalité elle l'amène à formuler un bon brief.

En rencontrant le DPO, j'ai aussi intégré des garde-fous : RGPD, non-discrimination. Si une offre contient un élément discriminatoire, Ariane ne le reprend pas et ajoute un rappel pédagogique, jamais paternaliste. Cette dimension n'est pas venue de moi, elle est née de la contrainte. Elle est devenue un point fort.

## Impact

Le déploiement est imminent. Le vrai sujet n'est plus technique, il est humain. Avec une matrice à deux axes — la confiance dans sa capacité à utiliser l'outil, et la perception de son utilité — on a cartographié quatre profils de collègues, chacun demandant un accompagnement différent.

## Ce que j'en retiens, et la suite

La valeur d'un outil IA en entreprise ne se joue pas sur le modèle, mais sur la friction à l'entrée et l'accompagnement humain. Le plus dur n'est pas de faire un bon outil, c'est de le faire adopter.

La prochaine étape : repérer des early adopters dans chaque région pour qu'ils évangélisent leurs pairs, parce qu'en tant que collègue, pousser ces sujets soi-même passe mal.
