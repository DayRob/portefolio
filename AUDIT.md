# AUDIT du portfolio — Côme VILLEROY de GALHAU

- **Date de l'audit** : 2026-10-01
- **Commit audité** : `8ef749d` (branche `main`)
- **Périmètre** : lecture seule du code, de l'historique git, build local, mesures axe-core et Lighthouse sur le build de production servi en local. Aucun fichier du site n'a été modifié.
- **Légende** : ✅ conforme · ⚠️ à corriger · ❌ manquant ou bloquant · `[À CONFIRMER]` information que je ne peux pas vérifier et que je n'invente pas.

---

## 0. Synthèse (à lire en premier)

| # | Constat | Gravité |
|---|---|---|
| 1 | **Next.js 14.2.3 : 1 faille critique et 2 hautes** (`npm audit`), dont deux exécutions de code à distance (Image Optimization avec AVIF ; serveurs Windows) et plusieurs empoisonnements de cache / SSRF. À mettre à jour avant toute mise en ligne, et incohérent pour un profil cyber. | Critique |
| 2 | **Le positionnement affiché est « étudiant, GRC et Pentest »**. Aucune mention de CGI, d'EBIOS RM, de recon-ng / crt.sh / Aquatone / OpenVAS / Defender EASM. Le titre « Étudiant ingénieur » est obsolète. | Haute |
| 3 | **Le formulaire de contact ne délivre rien** : le serveur écrit le message (nom, e-mail, texte) dans les logs et répond « ok ». L'utilisateur voit « Merci, le message a été transmis ». Les messages de recruteurs sont perdus. Aucune information RGPD, aucune validation (une requête non JSON provoque une erreur 500). | Haute |
| 4 | **Téléphone et e-mail en clair dans le pied de page de chaque page**, plus l'accueil et la page contact. | Haute |
| 5 | **Aucune page légale** : ni mentions légales, ni confidentialité, ni accessibilité. Aucun lien dans le pied de page. | Haute |
| 6 | **Le favicon (`favicon.ico`) est en réalité un PNG de 320×320 (76 Ko)** avec des métadonnées XMP Canva : identifiants d'utilisateur et de marque Canva, auteur « Teq'Shark », titre « égyptienne - 1 ». Licence de l'image `[À CONFIRMER]`. | Moyenne |
| 7 | **Aucun en-tête de sécurité**, `X-Powered-By: Next.js` exposé, pas de `security.txt`. Le HTML contient 6 scripts en ligne, ce qui rend une CSP sans `unsafe-inline` non triviale avec cette stack (voir §D). | Moyenne |
| 8 | **Aucun secret trouvé dans l'historique git.** Deux points mineurs : e-mail de l'école dans les métadonnées de commits, chemin Windows professionnel dans un ancien README (§B). | Info |
| 9 | **Hébergement non identifiable depuis le dépôt** : ni CI, ni CNAME, ni configuration d'hébergeur. Dockerfile, docker-compose et nginx ont été supprimés au dernier commit. | À trancher |

Bonne nouvelle : le site ne dépose **aucun cookie** et n'écrit **rien dans localStorage**, et ne contacte **aucun domaine tiers** (mesuré en navigateur sur les 4 pages). Il n'y a donc pas de bandeau cookies à prévoir pour l'état actuel.

---

## 1. Stack, build et hébergement

### Stack

| Élément | Valeur | Remarque |
|---|---|---|
| Framework | Next.js **14.2.3** (App Router) | Version épinglée, vulnérable (§B.4) |
| UI | React 18.2.0, TypeScript 5.4 (`strict`) | |
| Style | Tailwind CSS 3.4, PostCSS, Autoprefixer | Classes utilitaires et composants CSS dans `styles/globals.css` |
| Thème | `next-themes` 0.3, **forcé en sombre** (`forcedTheme="dark"`) | `prefers-color-scheme` ignoré, pas de mode clair |
| Linter | `next lint` déclaré, **aucune configuration ESLint** | Le script ne fait rien d'utile |
| Tests | Aucun | |
| Node / npm | Aucun champ `engines`, aucun `.nvmrc` | L'historique mentionne Node 18 puis 20 |

### Build

- `npm run build` exécute `NEXT_FORCE_WASM=1 next build`. Résultat local : **succès** (exit 0), 8 pages générées.
- Sortie en **mode serveur Node** (pas d'export statique) : la présence de `app/api/contact/route.ts` impose un runtime.
- Poids : 87 ko de JS partagé, 101 ko de First Load JS sur l'accueil. L'accueil est un composant client (`"use client"`) sans nécessité : le contenu est statique.

### Hébergement et déploiement

- **Aucune CI** (`.github/` absent), **aucun** `CNAME`, `vercel.json`, `netlify.toml` ni `fly.toml`.
- Historique : un `Dockerfile` (Node 18, copie de `.next` et `node_modules` construits en local), un `docker-compose.yml` (service web + nginx sur le port 80, sans TLS) et un `nginx.conf.example` ont existé. **Ils ont été supprimés** au commit `8ef749d`.
- Aucun projet Vercel n'est rattaché au compte accessible depuis cet environnement. Je n'ai pas pu joindre d'URL publique.
- **Conclusion : hébergeur et URL publique `[À CONFIRMER]`.** Cette réponse conditionne l'étape 5 : les en-têtes HTTP (HSTS, CSP, `frame-ancestors`, Permissions-Policy) ne peuvent pas tous être posés sur GitHub Pages, alors qu'ils le sont sur Vercel, Netlify ou ton propre nginx sur le homelab. Elle fixe aussi le contenu des mentions légales (nom, adresse, téléphone de l'hébergeur).

---

## 2. Inventaire de ce qui est publié

### Pages et routes

| Route | Type | Contenu |
|---|---|---|
| `/` | Statique, composant client | Hero, formation, 3 expériences récentes, projets (3 cartes génériques), « À propos », centres d'intérêt |
| `/experiences` | Statique, composant client | 5 expériences filtrables (Tous / Alternance / Stage), modale de détail, formation |
| `/projets` | Statique | 3 projets : homelab Proxmox, CTF, création vidéo pour une association |
| `/contact` | Statique, composant client | Formulaire (nom, e-mail, message), coordonnées directes |
| `/api/contact` | **Dynamique** | Reçoit le JSON et l'écrit dans les logs serveur |
| `/_not-found` | Statique | Page 404 par défaut |
| `/.well-known/security.txt` | **Absent** (404) | |
| `robots.txt`, `sitemap.xml`, CV PDF | **Absents** | |

### Médias et fichiers statiques

- Un seul fichier dans `public/` : `favicon.ico` (voir §B.3). **Aucune autre image**, aucun PDF, aucun CV.
- Les icônes de l'interface sont des SVG en ligne, sans texte alternatif ni `aria-hidden`.

### Métadonnées (`app/layout.tsx`)

- `<title>` : « Portefolio – Côme VILLEROY de GALHAU » (**faute : « Portefolio »**, et le même mot sert de nom au dépôt).
- `description` : « étudiant ingénieur cybersécurité à CPE Lyon, spécialisé en audit, tests d'intrusion et protection des systèmes » → **obsolète** (diplômé) et non aligné sur le positionnement.
- `lang="fr"` ✅. Pas d'Open Graph, pas de balise canonique, pas de manifeste. Le titre est identique sur toutes les pages.

### Liens externes

- LinkedIn : `https://www.linkedin.com/in/c-villeroy` (`target="_blank"`, `rel="noreferrer"`, mais intitulé « LinkedIn » sans indication d'ouverture dans un nouvel onglet).
- `mailto:cmvilleroy@gmail.com` (en clair, sur chaque page via le pied de page).
- **Aucun lien GitHub**, aucun lien vers un CV.

### Scripts, polices, formulaires, cookies

| Élément | État | Mesure |
|---|---|---|
| Scripts tiers | Aucun | Requêtes observées sur les 4 pages : uniquement l'origine locale |
| Polices | `@import` Google Fonts (Inter) dans `styles/globals.css` | ⚠️ Présent dans le CSS compilé. Il est placé **après** les directives `@tailwind`, donc ignoré par les navigateurs (aucune requête sortante observée). Inter n'est donc **jamais chargée**, le site retombe sur la police système. À supprimer et à remplacer par IBM Plex hébergée en local. |
| Formulaire | `/contact` → `POST /api/contact` | Voir §B.2 |
| Cookies | Aucun | Liste vide sur les 4 pages |
| Stockage local | Aucun | `localStorage` vide (aucune clé `theme` écrite) |
| Mesure d'audience | Aucune | |
| Scripts en ligne | **6** par page | Données de rendu Next.js et script de `next-themes` ; une CSP stricte exige nonce ou hachages |

---

## A. Checklist de contenu

Source de vérité : ton contexte. Tout ce qui n'y figure pas et que le site affirme est marqué `[À CONFIRMER]`.

### A.1 Ce qui est présent et cohérent

- [x] Nom, ville (« Paris / Lyon »), LinkedIn.
- [x] CPE Lyon, cycle ingénieur ICS (Informatique et Cybersécurité).
- [x] Villeroy & Boch (stage, Mettlach).
- [x] Proxmox, SSH / TLS (via l'ancien stage Eternilab et le homelab).
- [x] Aucune certification offensive affichée (pas d'eJPT : bien).
- [x] Aucun nom de client, aucun extrait de dossier EBIOS, aucun livrable.

### A.2 Ce qui manque

- [ ] **CGI** n'apparaît nulle part. Le site dit « Apside » (« ex-Apside » doit être précisé, l'entreprise ayant été rachetée pendant l'alternance).
- [ ] **EBIOS RM (ANSSI)** : analyse de risque, rédaction de dossiers, préparation d'ateliers client, accompagnement à l'homologation SI.
- [ ] **Côté offensif** : reconnaissance passive et cartographie de surface d'attaque (recon-ng, crt.sh, Microsoft Defender EASM, Aquatone), puis scan actif OpenVAS.
- [ ] **Outils mis en avant** : recon-ng, crt.sh, Aquatone, OpenVAS, Defender EASM, EBIOS RM absents. Proxmox et SSH/TLS présents mais noyés dans des phrases.
- [ ] **Projet « culture cyber »** (veille ANSSI, CERT-FR, ENISA, NIST, MITRE ATT&CK, OWASP, CIS).
- [ ] **Projet « QG » Discord** (agents IA, un bot par agent, Claude via API, hébergé sur le homelab, **en cours de construction**).
- [ ] **CV téléchargeable FR et EN** (aucun CV sur le site). La version EN n'étant pas alignée, elle doit être mise à jour avant publication.
- [ ] **Annonce de la recherche** : poste technique, pentest ou conception d'infrastructure sécurisée.
- [ ] Lien GitHub `[À CONFIRMER]` (compte et dépôts à rendre publics ou non).
- [ ] Compétences groupées par domaine, avec les outils nommés (aujourd'hui : 3 phrases longues en badges sur l'accueil, aucune page dédiée).
- [ ] Python / Bash : niveau `[À CONFIRMER]` (le site n'affiche que PHP, C, Java).

### A.3 Ce qui est incohérent

| Où | Constat | Action proposée |
|---|---|---|
| `data/profile.ts` | Titre « Étudiant ingénieur cybersécurité » alors que tu es diplômé | Reformuler en « Ingénieur cybersécurité » avec le positionnement technique. Date d'obtention du diplôme `[À CONFIRMER]` |
| `data/education.ts` | CPE Lyon « 2024 – 2026 » | Date de fin `[À CONFIRMER]` |
| `data/experiences.ts` | Intitulés « **Cybersécurité GRC et Pentest** » (GRC en premier), mêlés à des missions qui ne mentionnent aucune des tâches décrites dans ton contexte | Rebaptiser « CGI (ex-Apside) », réécrire les missions autour de ce que tu as confirmé |
| Alternance | Période « Septembre 2024 – Septembre 2026 » | Date exacte de fin d'alternance `[À CONFIRMER]` |
| Alternance | Rôle « Alternant cybersécurité GRC et Pentest » | Intitulé exact du poste `[À CONFIRMER]` |
| Alternance | « Pratique de **VSA** lors de tests d'intrusion (scan de vulnérabilités) » : sigle non défini, et ne correspond pas au scan OpenVAS décrit | À réécrire avec OpenVAS, après confirmation |
| Alternance | « Déploiement d'infrastructure de sauvegarde sur le SI d'une entreprise » : absent de ton contexte | `[À CONFIRMER]` : à garder seulement si c'est exact |
| Stage Apside 2024 | Outil de veille automatisé, scraping du darknet pour suivre les mentions d'une entreprise | Absent de ton contexte. `[À CONFIRMER]` avant de le garder. Sensible : à formuler sans nom de client ni détail opérationnel |
| Ordre | Alternance, puis stage Apside 2024, puis **V&B 2025**, puis HarfangLab 2023, puis Eternilab 2022 : **ni chronologique, ni conforme à « CGI en premier, V&B ensuite »** | Regrouper les expériences CGI (alternance et stage) en premier, puis V&B, puis les stages plus anciens |
| `app/page.tsx` | Carte « Focus cybersécurité » : 3e puce « **Culture GRC**, investigation d'incidents et threat intelligence » | Reposer la GRC en compétence complémentaire (« comprendre le risque métier »), jamais dans les trois premières lignes |
| `app/page.tsx` | « Mon approche » : « profil polyvalent », « enjeux métiers », « pédagogie et accompagnement » | Positionnement « technique d'abord » : pentest et infrastructure sécurisée |
| `app/page.tsx` | Sous-titre Formation : « Parcours académique et **certifications** » alors qu'aucune certification n'est listée | Retirer le mot tant qu'aucune certification n'est confirmée |
| `app/contact/page.tsx` | « Une **alternance, un stage** ou un projet ? » | Obsolète : tu cherches un **poste** |
| `data/skills.ts` | « Audit de sécurité, tests d'intrusion, analyse de vulnérabilités : **Avancé** » | Niveau non confirmé et risqué sans certification offensive. Retirer les niveaux, ou `[À CONFIRMER]` |
| `data/skills.ts` | Niveaux (Débutant à Expert) définis mais jamais affichés | Supprimer le champ tant qu'il n'est pas validé |
| `data/projects.ts` | « **Cluster** Proxmox », « réseaux segmentés », « automatisation partielle des VMs et snapshots » | Ton contexte dit « homelab Proxmox » : cluster ou nœud unique, segmentation, automatisation `[À CONFIRMER]` |
| `data/projects.ts` | « Root Me : **plus de 500 points** » | Chiffre non vérifiable : `[À CONFIRMER]` ou le retirer |
| `data/projects.ts` | Projet « création visuelle et montage vidéo pour une association » | Hors positionnement : à reléguer en simple centre d'intérêt |
| `components/ui/TagFilter.tsx` | Filtre « Alternance / Stage » ; le type `projet-perso` existe mais aucune entrée ne l'utilise | Simplifier |
| `data/skills.ts` | « Anglais C1 (Cambridge) », « Allemand A2 », « Permis B depuis 2022 » | Présents dans le code mais **non repris dans ton contexte** : `[À CONFIRMER]` |
| Titre / dépôt | « Portefolio » | « Portfolio » |

### A.4 Ce qui est obsolète

- [ ] « Étudiant ingénieur » (titre, méta-description, hero).
- [ ] « Alternance, stage » dans la page de contact.
- [ ] Mention de CPE Lyon « à CPE Lyon » au présent dans la méta-description.
- [ ] README (supprimé de l'arbre courant) : le dépôt n'a plus de documentation.

### A.5 Positionnement GRC trop visible : lieux exacts

1. Intitulés des deux expériences Apside : « Cybersécurité **GRC** et Pentest » (`data/experiences.ts`, lignes 18, 21, 33, 36).
2. Étiquettes (« tags ») : `"GRC"` en premier dans l'alternance.
3. « Renforcement de la sécurité du SI dans une approche **GRC**/Pentest » (alternance).
4. Accueil : puce « Culture **GRC**, investigation d'incidents et threat intelligence ».
5. Accueil : « comprendre les enjeux métiers, identifier les risques » (« Mon approche »).

---

## B. Risques d'exposition

### B.1 Informations confidentielles de clients CGI

- ✅ **Rien trouvé** dans le code, les données ni l'historique : aucun nom de client, aucun extrait de dossier EBIOS, aucun livrable. Les missions sont décrites de façon générique (« le SI d'une entreprise »).
- ⚠️ **Risque futur** : l'ajout du contenu EBIOS RM, OpenVAS et Aquatone est le moment où une fuite peut se produire. Règles que j'appliquerai : décrire la **méthode** et les **outils**, jamais le client, le secteur identifiable, les domaines scannés, les résultats ni les captures. Tu devras valider les formulations avec ce que ton contrat te permet de dire `[À CONFIRMER]`.
- ⚠️ Le scraping du darknet « pour suivre les mentions d'une entreprise » : à formuler sans détail opérationnel (sources, forums) ni client.

### B.2 Données personnelles inutiles ou mal protégées

| Donnée | Où | Constat |
|---|---|---|
| **Téléphone** `+33 (0)6 49 29 10 88` | Pied de page (**toutes les pages**), accueil, `/contact` | ⚠️ En clair dans le HTML : collectable par les robots. Recommandation : retirer des pages publiques, le donner dans le CV ou à la demande |
| **E-mail** `cmvilleroy@gmail.com` | Pied de page (toutes les pages), accueil, `/contact` | ⚠️ En clair dans le HTML et en `mailto:`. Recommandation : lien `mailto:` obfusqué ou formulaire fonctionnel |
| Adresse postale, date de naissance | Nulle part | ✅ |
| Localisation | « Paris / Lyon, France » | ✅ Acceptable (ville seulement) |
| Établissements et codes postaux | `data/education.ts` : « St Germain en Laye 78100 », « Lyon 69005 », « Villeurbanne 69100 » | ⚠️ Inutile : la commune du lycée en dit beaucoup sur toi. Recommandation : garder établissement et diplôme, retirer les codes postaux |
| Formulaire de contact | `app/contact/page.tsx`, `app/api/contact/route.ts` | ❌ Voir ci-dessous |

**Formulaire de contact : défauts constatés (testés sur le build local)**

- ❌ **Les messages ne sont pas délivrés** : le serveur fait seulement `console.log(body)`. Le message de succès indique « simulé côté serveur ». Aucune notification, aucune boîte de réception.
- ❌ **Données personnelles dans les logs** : nom, e-mail et texte complet écrits en clair dans la sortie standard, sans durée de conservation maîtrisée.
- ❌ **Aucune information RGPD** sous le formulaire (finalité, base légale, durée, droits).
- ❌ **Aucune validation** : pas de contrôle de taille, de format ni de type ; `POST` avec un corps non JSON → **erreur 500**. Aucune limitation de débit, aucune protection anti-spam (pas de honeypot), pas de vérification d'origine.
- ⚠️ `autoComplete="off"` sur le formulaire : gêne les utilisateurs de gestionnaires de mots de passe et d'aide à la saisie (critère RGAA 11.13).
- **Décision à prendre (étape 3)** : mon avis est de **supprimer le formulaire et l'API** (suppression de la surface d'attaque et du traitement de données), et de proposer un `mailto:` obfusqué. Si tu préfères garder un formulaire, il faudra un envoi réel (SMTP ou service) et donc un sous-traitant à déclarer.

### B.3 Métadonnées de fichiers

`public/favicon.ico` : en réalité un **PNG 320×320 de 76 592 octets**, nommé `.ico`. Il contient un bloc XMP :

- Outil de création : **Canva** (« Renderer »), avec les identifiants `doc=DAG6Fg8P8KA`, `user=UAF1Rw9YGeg`, `brand=BAF1R1A_3MI`.
- Auteur : **« Teq'Shark »** (pseudonyme).
- Titre : « égyptienne - 1 ».
- Identifiants d'attribution : `Attrib:ExtId` et `Attrib:FbId`, date 2025-11-29.

Risques : fuite d'identifiants de compte Canva (corrélation de profil) et **licence de l'illustration à vérifier** : l'auteur affiché n'est pas toi et l'usage dans un favicon peut ne pas être couvert `[À CONFIRMER]`. Un favicon de 76 Ko est aussi 5 à 10 fois trop lourd. Recommandation : nouveau favicon SVG propre (monogramme) et suppression de ce fichier.

Aucun autre fichier binaire : aucun PDF, aucune photo, donc pas d'EXIF à nettoyer à ce jour. **À surveiller** : les deux CV (FR et EN) devront être exportés sans métadonnées (auteur, logiciel, chemin) et avec les propriétés de titre et de langue renseignées.

### B.4 Fichiers sensibles dans le dépôt et l'historique git

Méthode : `git log --all -p` filtré sur clés, secrets, jetons, clés privées, adresses RFC 1918, `.env` ; liste de tous les fichiers ayant existé ; relecture de tous les fichiers supprimés.

- ✅ **Aucun secret, jeton, clé privée, `.env` ni adresse IP interne** dans l'historique ni l'arbre courant. Aucune configuration de homelab. Le `.gitignore` exclut bien `.env*`.
- ⚠️ **Identité dans les commits** : deux identités d'auteur. `DayRob <cmvilleroy@gmail.com>` (15 commits) et `Come Villeroy de Galhau <come.villeroy-de-galhau@cpe.fr>` (**8 commits, adresse de l'école**). Si le dépôt est public, ces adresses sont lisibles. Visibilité du dépôt `[À CONFIRMER]`.
- ⚠️ **Ancien README** (commit `7e0de72`, supprimé en `71fe45f`) : contient `C:\Users\cvilleroy-de-galhau\OneDrive - APSIDE ADVANCE\Documents\Code\Portefolio`. Cela révèle la convention de nommage des comptes et le nom du tenant OneDrive de l'employeur. Ce n'est pas un secret, mais c'est une fuite d'information sur l'entreprise.
- ℹ️ L'ancien `nginx.conf.example` et l'ancien `docker-compose.yml` ne contiennent aucune IP ni secret.

**Procédure proposée (je ne réécris pas l'historique)** si tu veux purger le chemin Windows et/ou unifier l'adresse d'auteur :

1. Sauvegarder : `git clone --mirror <url> sauvegarde.git`.
2. Installer `git-filter-repo`.
3. Retirer la chaîne et réécrire les auteurs : `git filter-repo --replace-text expressions.txt --mailmap mailmap.txt` (fichiers préparés ensemble).
4. Pousser avec `git push --force-with-lease --all` puis `--tags`, après accord, car cela invalide tous les clones et les branches existantes.
5. Faire expirer les caches : demander à GitHub la purge des références orphelines et des anciennes vues de pull requests (support GitHub).

Mon avis : le gain est faible (aucun secret). À faire seulement si tu veux masquer l'adresse de l'école, sinon laisser tel quel.

**Dépendances (`npm audit --omit=dev`)**

| Paquet | Gravité | Détail |
|---|---|---|
| `next` 14.2.3 | **Critique** | 18 avis dont : RCE sur serveur hébergé sous Windows (GHSA-p293-qw3h-jr36) ; **RCE via l'API d'optimisation d'images avec AVIF (GHSA-2xp9-vwfh-vxw4)** ; SSRF (WebSocket, Server Actions, rewrites) ; empoisonnement de cache RSC ; XSS avec nonces CSP (GHSA-ffhc-5mcf-pf4q) ; déni de service ; divulgation de points d'entrée de Server Functions |
| `postcss` ≤ 8.5.22 (imbriqué dans `next`) | Haute | XSS à la sérialisation, lecture arbitraire de fichiers `.map` |

`npm audit fix --force` propose `next@14.2.35`, **hors de l'intervalle déclaré** (version épinglée). La plupart des avis sont corrigés seulement dans des versions plus récentes (branche 15 ou supérieure). Je validerai le meilleur correctif au moment de l'étape 5 ; si la montée de version est incompatible, c'est un argument de plus pour un export statique (sans runtime serveur, donc sans surface RCE).

---

## C. Conformité légale et accessibilité

### C.1 État légal actuel

| Exigence | État |
|---|---|
| Mentions légales (LCEN art. 6) | ❌ Absentes |
| Politique de confidentialité (RGPD) | ❌ Absente |
| Information au point de collecte (formulaire) | ❌ Absente |
| Lien vers les pages légales dans le pied de page | ❌ Aucun lien |
| Cookies et traceurs (CNIL) | ✅ Aucun traceur déposé (mesuré). Pas de bandeau nécessaire tant que cela reste vrai |
| Polices hébergées en local | ⚠️ `@import` Google Fonts à supprimer (inactif en pratique, mais latent) |
| Embeds tiers | ✅ Aucun |
| Données dans les logs du serveur | ⚠️ Message de contact logué. À supprimer avec le formulaire. Les logs d'accès de l'hébergeur (adresses IP) devront être mentionnés dans la politique de confidentialité |
| Droit d'auteur du favicon | ⚠️ `[À CONFIRMER]` (§B.3) |

Éléments à fournir pour les placeholders `[À COMPLÉTER]` : statut de l'éditeur (particulier), adresse ou domiciliation, directeur de publication (toi), hébergeur (nom, adresse, téléphone), contact de réclamation. Pour un particulier, la LCEN permet de protéger l'adresse personnelle en la confiant à l'hébergeur, à condition que celui-ci ait reçu l'identité complète : à étudier avec toi.

### C.2 Accessibilité : mesures sur le build actuel

Outils : axe-core 4 (règles WCAG 2.0/2.1 A et AA + bonnes pratiques) et Lighthouse 12, sur le build de production en local, Chromium headless.

| Page | Perf. mobile | Perf. bureau | Access. mobile | Access. bureau | Bonnes pratiques | SEO | Violations axe |
|---|---|---|---|---|---|---|---|
| `/` | 99 | 100 | **93** | 98 | 100 | 100 | 1 (`heading-order`) |
| `/experiences` | 99 | 100 | 95 | 100 | 100 | 100 | 0 |
| `/projets` | 100 | 100 | 95 | 100 | 100 | 100 | 0 |
| `/contact` | 100 | 100 | 95 | 100 | 100 | 100 | 0 |

Lighthouse signale en plus sur l'accueil : « liens sans nom explicite » (liens uniquement composés d'icônes ou de texte vide) et « ordre des titres ».

Les scores automatiques sont **bons mais trompeurs** : les outils détectent environ un tiers des problèmes RGAA. Constats manuels, par lecture du code :

| Critère (RGAA 4.1 / WCAG 2.1) | Constat | Lieu |
|---|---|---|
| Lien d'évitement (12.7 / 2.4.1) | ❌ Absent | `app/layout.tsx` |
| Landmarks et structure (9.2 / 1.3.1) | ⚠️ `header`, `main`, `footer` présents ; `nav` sans `aria-label` ; pas de `aria-current="page"` sur le lien actif | `SiteHeader.tsx` |
| Navigation mobile (12.x) | ❌ **Le menu est `hidden md:flex` : sous 768 px, il n'y a plus aucune navigation** | `SiteHeader.tsx` |
| Hiérarchie des titres (9.1 / 1.3.1) | ⚠️ L'accueil enchaîne `h1`, `h3` (« Focus cybersécurité »), `h2` : saut de niveau. Les cartes de la page Projets sont en `h2` sous un `h1`, correct | `app/page.tsx` |
| Alternatives textuelles (1.x / 1.1.1) | ❌ Dizaines de SVG décoratifs sans `aria-hidden="true"` : lus par les lecteurs d'écran | partout |
| Emojis (1.x) | ⚠️ Les centres d'intérêt utilisent des emojis lus à voix haute (« montre bracelet »...) sans `aria-hidden` | `app/page.tsx` |
| Focus visible (10.7 / 2.4.7) | ❌ Les champs de formulaire utilisent `outline-none` et seulement un changement de bordure ; aucun style `:focus-visible` global ; boutons et liens sans anneau défini | `contact/page.tsx`, `globals.css` |
| Clavier et modale (12.x, 7.x / 2.1.2, 2.4.3) | ❌ La modale d'expérience : pas de piège de focus, pas de fermeture à `Échap`, pas de retour du focus, pas de `aria-labelledby`, fond cliquable | `ExperienceCard.tsx` |
| Cartes interactives (7.x / 4.1.2) | ⚠️ Les `.card-glass` décoratives ont un effet `hover` d'échelle qui donne l'impression qu'elles sont cliquables | `globals.css` |
| Mouvement (13.8 / 2.3.3, 2.2.2) | ❌ Animations en continu (particules, gradient du bouton principal, `animate-glow`) sans `prefers-reduced-motion` | `globals.css`, `page.tsx` |
| Barre de progression (header) | ⚠️ Lit `window.scrollY` pendant le rendu (différence serveur/client, valeur figée faute d'écouteur de rendu) ; purement décorative | `SiteHeader.tsx` |
| Contrastes (3.2 / 1.4.3) | ⚠️ Axe ne signale rien, mais le texte `text-slate-500` sur fond sombre et les titres en dégradé transparent (`bg-clip-text`) sont à recalculer manuellement | `page.tsx`, `ExperienceCard.tsx` |
| Titres en dégradé (3.x / 1.4.3) | ⚠️ `text-transparent bg-clip-text` : illisible en mode contraste forcé (Windows) | `page.tsx` |
| Formulaires (11.1, 11.2, 11.10 / 3.3.2) | ⚠️ Étiquettes liées (`htmlFor`) ✅ ; mais aucune indication des champs obligatoires, messages d'état sans `role="status"` ni `aria-live`, erreur non associée aux champs | `contact/page.tsx` |
| Intitulés de liens (6.1 / 2.4.4) | ⚠️ « LinkedIn » ouvre un nouvel onglet sans le dire ; liens `mailto` via `next/link` | `page.tsx`, `SiteFooter.tsx` |
| Langue (8.3 / 3.1.1) | ✅ `lang="fr"` ; la version anglaise du CV et ses extraits devront porter `lang="en"` | |
| Titre de page (8.5 / 2.4.2) | ❌ Même `<title>` sur toutes les pages | `app/layout.tsx` |
| Redimensionnement et reflow (10.4, 10.11 / 1.4.4, 1.4.10) | ⚠️ Tailles en `text-xs` (12 px) très présentes, pastilles à `text-[11px]` | partout |
| Page « Accessibilité » | ❌ Absente | |
| CV accessible (PDF ou HTML) | ❌ Aucun CV | |

### C.3 Performance : points d'attention pour l'objectif ≥ 95

- Les scores sont déjà élevés, mais l'accueil mobile perd des points sur le LCP, le TBT et le JavaScript hérité (polyfills `noModule`). L'accueil est un composant client sans nécessité (animations conditionnées par `mounted` et fond fixe).
- Aucune image à optimiser aujourd'hui. Les futurs visuels devront être en WebP/AVIF avec dimensions explicites.
- Ne pas oublier que l'ajout d'IBM Plex hébergée en local pèse : subdiviser (latin, `font-display: swap`, préchargement des 2 graisses utiles).

---

## D. Sécurité du site (aperçu pour l'étape 5)

| Sujet | État actuel |
|---|---|
| En-têtes de sécurité (CSP, HSTS, `nosniff`, Referrer-Policy, Permissions-Policy, `frame-ancestors`) | ❌ Aucun |
| `X-Powered-By: Next.js` | ⚠️ Exposé (`poweredByHeader` non désactivé) |
| `/.well-known/security.txt` | ❌ Absent |
| Cache | `s-maxage=31536000, stale-while-revalidate` sur les pages : à revoir si l'hébergeur place un CDN |
| `robots.txt`, `sitemap.xml` | ❌ Absents |
| Dépendances | ❌ 1 critique, 2 hautes (§B.4) |
| Secrets dans le dépôt | ✅ Aucun |

**Point technique à trancher (stack)** : une CSP **sans `unsafe-inline`** exige que les 6 scripts en ligne de Next.js soient couverts par un nonce (ce qui impose un rendu dynamique pour chaque requête) ou par des hachages (variables à chaque build). Ton cahier des charges prévoit de garder la stack sauf si elle bloque la conformité. Options :

1. **Rester sur Next.js, export statique** (`output: 'export'`) : suppression de l'API de contact, puis génération des hachages SHA-256 des scripts en ligne par un script post-build. Fonctionne sur tout hébergeur statique, mais fragile à chaque montée de version de Next.
2. **Passer à Astro** (ou un générateur statique équivalent) : HTML statique, JavaScript quasi nul, CSP stricte triviale, Lighthouse 100 attendu, ce qui colle à l'objectif de sobriété. Le contenu (cinq pages quasi statiques) ne profite pas de React. Changement de stack, donc **à valider par toi avant que je le fasse**.

Mon avis : l'option 2 est plus robuste pour une vitrine sécurité, l'option 1 respecte la contrainte « garder la stack ». Je pars sur l'option 1 sauf si tu choisis l'option 2.

---

## E. Questions bloquantes pour toi

1. **Hébergeur et URL publique** : où est-ce servi (Vercel, GitHub Pages, homelab derrière nginx, autre) ? Pour les mentions légales et les en-têtes HTTP.
2. **Stack** : option 1 (Next.js en export statique) ou option 2 (Astro) ?
3. **Branche de travail** : ton cahier des charges demande `refonte-portfolio`, mais cette session est configurée pour pousser sur `claude/portfolio-audit-compliance-j0ycar`. Je n'ai donc poussé que cet audit sur cette dernière. Je continue sur laquelle ?
4. **Formulaire de contact** : le supprimer au profit d'un `mailto:` obfusqué (ma recommandation), ou le garder avec un vrai envoi ?
5. **Faits à confirmer** pour le contenu (jamais inventés) :
   - date de fin d'alternance, intitulé exact du poste, date d'obtention du diplôme ;
   - missions réelles de l'alternance et du stage chez CGI/Apside : sauvegarde, veille, scraping darknet, scan OpenVAS ;
   - niveaux (Python, Bash, PHP, C, Java, Linux, Windows), langues (C1, A2), permis ;
   - homelab : cluster ou nœud unique, segmentation, automatisation ;
   - score Root Me (« 500 points ») ;
   - lien GitHub à afficher ;
   - fichiers CV FR (à jour) et EN (à aligner) : à me fournir pour que j'en dérive les pages HTML équivalentes ;
   - licence de l'image du favicon, ou logo à utiliser à la place.
6. **Téléphone** : le retirer des pages publiques (ma recommandation) ?
7. **Historique git** : veux-tu masquer l'adresse de l'école et le chemin Windows (procédure en §B.4) ?

---

## F. Plan proposé pour la suite (après ta validation)

1. Contenu : recentrage « technique d'abord », données CGI, outils, projets, ordre, `[À CONFIRMER]` visibles dans le code (pas publiés).
2. Refonte visuelle : IBM Plex en local, thème clair/sombre selon `prefers-color-scheme`, mobile d'abord, page Projets détaillée, compétences par domaine, CV FR/EN.
3. Pages légales et accessibilité, pied de page avec liens, suppression du formulaire (si accepté).
4. Accessibilité : correctifs du §C.2, puis axe-core et Lighthouse à 0 erreur.
5. Sécurité : mise à jour des dépendances, en-têtes, `security.txt`, documentation dans le README.
6. Commits atomiques (Conventional Commits, en français), poussés sans fusion ni déploiement.
