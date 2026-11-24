# Portfolio : Côme VILLEROY de GALHAU

Site vitrine d'un ingénieur cybersécurité. Il est **100 % statique** : Next.js (export statique), TypeScript, Tailwind CSS, polices IBM Plex hébergées localement. Aucun cookie, aucun traceur, aucun appel à un service tiers, aucun formulaire.

## Commandes

| Commande | Rôle |
|---|---|
| `npm ci` | Installe les dépendances (Node 20 ou plus) |
| `npm run dev` | Serveur de développement sur http://localhost:3000 |
| `npm run build` | Construit le site dans `out/` et génère la CSP et les en-têtes nginx dans `deploy/generated/` |
| `npm run serve` | Sert `out/` avec les mêmes en-têtes de sécurité que nginx (tests locaux) |
| `npm run typecheck` | Vérifie les types TypeScript |
| `npm run check:todo` | Liste les marqueurs `[À CONFIRMER]` et `[À COMPLÉTER]` restants. Avec `-- --strict`, échoue s'il en reste |
| `npm run check:a11y` | Contrôles automatiques (voir plus bas). Nécessite `npm run build` avant |

## Modifier le contenu

Tout le texte du site est dans `data/`. On n'a pas besoin de toucher au code des pages.

| Fichier | Contenu |
|---|---|
| `data/profile.ts` | Nom, titre, accroche, e-mail (découpé), LinkedIn, GitHub |
| `data/experiences.ts` | Expériences (l'ordre du tableau est l'ordre d'affichage) |
| `data/education.ts` | Formation |
| `data/skills.ts` | Compétences par domaine |
| `data/projects.ts` | Projets : contexte, outils, ce que j'ai fait, ce que j'en retiens |
| `data/hobbies.ts` | Centres d'intérêt |
| `app/mentions-legales/page.tsx`, `app/confidentialite/page.tsx`, `app/accessibilite/page.tsx` | Pages légales |

### Marqueurs « à confirmer »

Toute information non validée est écrite `[À CONFIRMER]` ou `[À COMPLÉTER]`. Ces marqueurs sont **volontairement visibles** sur le site (fond grisé, couleur d'alerte), pour qu'aucun ne passe inaperçu. Pour valider une information : remplacer la phrase, retirer le marqueur, puis relancer le build.

```bash
npm run check:todo            # liste fichier:ligne de chaque marqueur restant
npm run check:todo -- --strict  # code de sortie 1 s'il en reste (à lancer avant une mise en public)
```

### Ajouter ou mettre à jour les CV

1. Déposer les fichiers dans `public/cv/` avec **exactement** ces noms : `cv-fr.pdf` et `cv-en.pdf`.
2. Exporter les PDF **sans métadonnées inutiles** (auteur, logiciel, chemin de fichier) et avec le titre et la langue renseignés. Un PDF balisé (« tagged ») est préférable pour l'accessibilité.
3. Relancer `npm run build`.

Les boutons de téléchargement de la page `/cv/` apparaissent automatiquement quand le fichier existe. Tant qu'il est absent, la page affiche un message à compléter. La version HTML du CV (page `/cv/`) est générée depuis les fichiers `data/` : elle est l'équivalent accessible du PDF.

Le lien GitHub se règle dans `data/profile.ts` (champ `github`). Il n'est pas encore affiché dans l'interface : l'ajouter dans `components/layout/SiteFooter.tsx` quand l'URL est confirmée.

## Déploiement (auto-hébergé, derrière Cloudflare)

```bash
docker compose up -d --build     # construit l'image puis lance nginx sur 127.0.0.1:8080
```

L'image est construite en deux étapes : build du site, puis **nginx sans privilèges** qui ne sert que des fichiers statiques. Le conteneur est en lecture seule, sans capacité Linux ni élévation de privilèges. Il n'écoute que sur `127.0.0.1:8080` : c'est Cloudflare (tunnel ou reverse proxy) qui le joint.

> Le déploiement n'est jamais déclenché automatiquement. Aucune CI ne publie le site.

### Réglages Cloudflare à respecter

- **SSL/TLS : Full (strict)** et **Always Use HTTPS** (redirection HTTP vers HTTPS, exigée par Mozilla Observatory).
- **Désactiver** Rocket Loader, Auto Minify (HTML, JS, CSS) et les injections automatiques (Web Analytics, etc.). Ils modifient les scripts ou ajoutent des scripts, ce qui **invalide les hachages de la CSP** et fait apparaître des erreurs dans la console.
- **Cloudflare Access** (accès par jeton pendant la phase privée) : il dépose un cookie technique d'authentification, mentionné dans la politique de confidentialité. En phase publique, retirer l'accès restreint et mettre à jour cette page. `security.txt` n'est joignable de l'extérieur qu'à ce moment-là.
- Avec un proxy, l'adresse IP vue par nginx est celle de Cloudflare. Pour journaliser l'IP réelle, configurer `set_real_ip_from` avec les plages Cloudflare et `real_ip_header CF-Connecting-IP`. La durée de conservation des journaux est à renseigner dans la politique de confidentialité.

## Sécurité

### En-têtes HTTP

Ils sont générés au build (`scripts/generate-csp.mjs`) et posés par nginx sur chaque réponse :

| En-tête | Valeur |
|---|---|
| `Content-Security-Policy` | `default-src 'none'`, `script-src 'self'` + hachages SHA-256 des scripts en ligne **de la page servie**, `style-src 'self'`, `img-src 'self' data:`, `font-src 'self'`, `connect-src 'self'`, `base-uri 'none'`, `form-action 'none'`, `frame-ancestors 'none'`, `object-src 'none'`, `upgrade-insecure-requests`. Aucun `unsafe-inline`, aucun `unsafe-eval` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` (pas de `preload` : engagement difficile à défaire) |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` (en plus de `frame-ancestors 'none'`) |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | caméra, micro, géolocalisation, paiement, USB, capteurs désactivés |
| `Cross-Origin-Opener-Policy` / `Cross-Origin-Resource-Policy` | `same-origin` |

Le serveur n'annonce pas sa version (`server_tokens off`) et l'en-tête `X-Powered-By` est supprimé.

Pourquoi des hachages par page ? Next.js insère quelques scripts en ligne pour l'hydratation, dont le contenu change à chaque build. Le script de build les hache, et nginx associe à chaque page la liste exacte des siens (via un `map`). Résultat : une CSP stricte, sans nonce ni rendu dynamique. **Après toute modification du site, il faut reconstruire l'image** : les hachages sont recalculés automatiquement.

`.well-known/security.txt` (RFC 9116) est dans `public/.well-known/`. Sa date d'expiration (`Expires`) est à renouveler avant le 30 septembre 2027, et la ligne `Canonical` à compléter avec le domaine.

### Notes de scores

- **securityheaders.com** et **Mozilla Observatory** ne peuvent pas analyser un site derrière Cloudflare Access. Les scores ne sont donc **pas mesurés** à ce jour. Tous les en-têtes évalués par ces outils sont en place (vérifiés avec un vrai nginx, voir plus bas). À mesurer une fois le site public ; l'objectif est A+ sur les deux.
- Observatory demande aussi une redirection HTTP vers HTTPS et un HSTS d'au moins 6 mois : voir les réglages Cloudflare.

### Dépendances

`npm audit` : **0 vulnérabilité** (Next.js 15.5, React 19). Le `postcss` imbriqué dans Next est forcé à la version de premier niveau par `overrides` dans `package.json`. À relancer régulièrement : `npm audit`. Aucun secret dans le dépôt.

## Contrôles automatiques

`npm run check:a11y` (après `npm run build`) lance le site avec les mêmes en-têtes que nginx et vérifie, pour chaque page :

- **axe-core** (WCAG 2.0 et 2.1, niveaux A et AA, bonnes pratiques) en thème clair et sombre, à 320 px, 390 px et 1280 px, avec `prefers-reduced-motion` ;
- l'absence de débordement horizontal à 320 px ;
- le lien d'évitement, l'indicateur de focus visible et l'absence de piège clavier ;
- l'absence de violation de CSP, de requête hors du site, de cookie et de donnée dans le stockage du navigateur ;
- l'absence d'e-mail et de téléphone en clair dans le HTML.

Pour tester avec la vraie configuration nginx : `A11Y_BASE_URL=http://localhost:8080 npm run check:a11y`. Si Chromium n'est pas au chemin par défaut de Playwright, définir `CHROME_PATH`.

Lighthouse se lance à part, par exemple : `npx lighthouse http://localhost:8080/ --view`.

## Structure

```
app/                 pages (App Router), polices (app/fonts), icône
components/          en-tête, pied de page, composants
data/                contenu du site
deploy/nginx.conf    configuration nginx (en-têtes générés dans deploy/generated/)
public/              robots.txt, .well-known/security.txt, cv/
scripts/             CSP, serveur de test, contrôles, marqueurs
styles/globals.css   jetons de design, thèmes clair et sombre
```

Les polices IBM Plex sont distribuées sous licence SIL OFL 1.1 (`app/fonts/LICENSE-OFL.txt`).
