# IMPLEMENTATION PLAN — Portfolio

## Phases

| # | Phase | Contenu | Statut |
|---|---|---|---|
| 1 | Socle | Next.js 14, TypeScript, Tailwind, `next-themes` | ✅ Fait |
| 2 | Contenu | Modules `data/` typés (profil, formation, expériences, projets, compétences, loisirs) | ✅ Fait |
| 3 | Pages | Accueil, Expériences (frise + filtres), Projets & Labs, Contact | ✅ Fait |
| 4 | Refonte visuelle | Cartes « verre », animations, dégradés, responsive | ✅ Fait |
| 5 | Mise en conformité | Mentions légales, confidentialité, accessibilité, `security.txt`, `robots.txt`, CSP, page CV, tests axe-core | 🔀 Prête sur la branche `claude/portfolio-audit-compliance-j0ycar`, à fusionner |
| 6 | Contact réel | Validation serveur, anti-spam, envoi d'e-mail transactionnel | ⏳ À faire |
| 7 | Contenu à jour | Passer le titre en « ingénieur diplômé », ajouter les projets récents (Idea Forge, Study Copilot, ShadowWatch, Cori) | ⏳ À faire |
| 8 | Mise en ligne | Déploiement (Vercel ou auto-hébergé), domaine, HTTPS, analytics respectueux de la vie privée | ⏳ À faire |

## Critères de fin de phase

- [ ] `npm run build` sans erreur
- [ ] `npm run lint` sans erreur
- [ ] Rendu vérifié sur mobile et ordinateur, en thème clair et sombre
- [ ] Navigation clavier fonctionnelle

## Points d'attention

- Les phases 5 et 7 touchent les mêmes fichiers : fusionner la branche de conformité avant de mettre le contenu à jour.
- Vérifier quelles coordonnées personnelles (téléphone) doivent rester publiques.
