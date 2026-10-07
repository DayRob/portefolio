# PRD — Portfolio de Côme Villeroy de Galhau

> Product Requirements Document : le *quoi* et le *pourquoi*.

## 1. Résumé

Site vitrine personnel présentant le profil, le parcours, les expériences, les compétences et les projets de Côme Villeroy de Galhau, ingénieur en cybersécurité (CPE Lyon). Il sert de support de candidature et de point de contact pour les recruteurs.

## 2. Problème

Un CV PDF ne montre ni la profondeur des projets ni la personnalité technique. Les recruteurs veulent en quelques secondes : qui, quelle spécialité, quelles expériences, comment contacter.

## 3. Utilisateurs

| Persona | Besoin |
|---|---|
| Recruteur / RH | Comprendre le profil en moins d'une minute, contacter |
| Manager technique | Juger le niveau via les expériences, projets et compétences détaillées |
| Pair / école | Découvrir les projets et labs |

## 4. Objectifs

| Objectif | Mesure |
|---|---|
| Message clair dès l'accueil | Nom, titre, localisation et spécialités visibles sans scroller |
| Crédibilité | Expériences datées, missions concrètes, technologies |
| Conversion | Formulaire de contact fonctionnel et e-mail / LinkedIn accessibles |
| Image soignée | Design moderne, mode sombre, animations discrètes |

## 5. Fonctionnalités

1. **Accueil** : présentation (nom, titre, localisation, bio), dernières expériences, compétences, centres d'intérêt, appels à l'action.
2. **Expériences** : frise chronologique des alternances et stages, filtrage par type (alternance, stage, projet perso) et par tags.
3. **Projets & Labs** : infrastructure Proxmox, pratique CTF (Root Me, TryHackMe), créations, avec technologies.
4. **Contact** : formulaire (nom, e-mail, message) et coordonnées directes.
5. **Thème clair / sombre**.

## 6. Hors périmètre

- Blog, CMS, back-office.
- Comptes utilisateurs.

## 7. Exigences non fonctionnelles

- Responsive (mobile → grand écran).
- Performance : pages majoritairement statiques.
- Accessibilité et conformité légale (mentions légales, confidentialité) : traitées dans la refonte en cours.
- Données personnelles exposées limitées au strict nécessaire.
