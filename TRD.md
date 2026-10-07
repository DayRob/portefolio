# TRD — Portfolio

## 1. Stack

| Élément | Choix |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Langage | TypeScript |
| UI | React 18, Tailwind CSS 3.4 (`darkMode: "class"`), PostCSS / Autoprefixer |
| Thème | `next-themes` (`ThemeProvider`) |
| Police | Inter (Google Fonts) |
| Données | Modules TypeScript typés dans `data/` |

## 2. Architecture

```
app/
├── layout.tsx              # ThemeProvider, SiteHeader, SiteFooter, métadonnées
├── page.tsx                # Accueil
├── experiences/page.tsx    # Frise + filtres
├── projets/page.tsx        # Projets & Labs
├── contact/page.tsx        # Formulaire (client)
└── api/contact/route.ts    # POST : réception du message
components/
├── layout/   SiteHeader, SiteFooter
├── theme/    ThemeProvider
└── ui/       ExperienceCard, SkillBadge, TagFilter, Timeline
data/         profile, education, experiences, projects, skills, hobbies
styles/       globals.css (classes utilitaires, animations)
```

Le contenu est séparé de la présentation : modifier le portfolio revient à éditer `data/*.ts`, sans toucher aux composants.

## 3. Contrat des données

Chaque fichier de `data/` exporte une interface TypeScript et un tableau typé (voir `BACKEND_SCHEMA.md`). Le compilateur garantit la cohérence entre données et composants.

## 4. API

`POST /api/contact` reçoit `{ name, email, message }` en JSON et répond `{ ok: true }`. Le message est actuellement journalisé côté serveur ; l'envoi d'e-mail réel est à brancher (voir le plan).

## 5. Build et exécution

```bash
npm install
npm run dev     # développement
npm run build   # NEXT_FORCE_WASM=1 next build
npm start
```

## 6. Exigences techniques à traiter

- **Validation** des champs du formulaire côté serveur (longueur, format d'e-mail) et protection anti-spam (honeypot ou limitation de débit).
- **En-têtes de sécurité** (CSP, HSTS, X-Content-Type-Options) et `security.txt` : présents dans la branche de refonte `claude/portfolio-audit-compliance-j0ycar`.
- **Accessibilité** : contrôles axe-core et navigation clavier (même branche).
- Respect de `prefers-reduced-motion` pour les animations décoratives.
