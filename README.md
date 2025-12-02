## Portefolio – Côme VILLEROY de GALHAU

Portefolio en ligne développé avec **Next.js 14 (App Router)**, **TypeScript** et **Tailwind CSS**, pensé pour être servi derrière **Nginx** (reverse proxy) et conteneurisé via **Docker**.

Dark mode par défaut, pages dédiées au parcours, aux projets et au contact, avec toutes les données du CV codées en dur dans des fichiers TypeScript.

---

## 1. Pré-requis

- **Node.js** 18+ (idéalement 20 LTS)
- **npm** (fourni avec Node)
- Optionnel pour la prod :
  - **Docker** et **docker-compose**
  - **Nginx** sur le serveur (si déploiement sans docker-compose)
  - Un compte GitHub / GitLab / autre

---

## 2. Installation locale

Dans ton dossier de projet (déjà créé) :

```bash
cd "C:\Users\cvilleroy-de-galhau\OneDrive - APSIDE ADVANCE\Documents\Code\Portefolio"

# Installation des dépendances
npm install
```

---

## 3. Lancement en développement

```bash
npm run dev
```

Puis ouvre `http://localhost:3000` dans ton navigateur.

Pages incluses :

- `/` : page d’accueil (hero, résumé, accès rapide aux sections).
- `/experiences` : timeline interactive + filtres (Tous | Alternance | Stage | Projets perso).
- `/projets` : projets & labs (cartes).
- `/contact` : formulaire de contact (POST sur `/api/contact`, **console.log** côté serveur uniquement).

Arrêt du serveur : `Ctrl + C` dans le terminal.

---

## 4. Build & lancement en production (sans Docker)

### 4.1 Build

```bash
npm run build
```

### 4.2 Lancement du serveur Next en mode production

```bash
npm run start
```

Par défaut, l’app écoute sur `http://localhost:3000`.

Pour un usage serveur Linux classique :

```bash
# Exemple (en root ou via sudo) :
NODE_ENV=production npm run start
```

Ensuite, tu peux mettre un reverse proxy Nginx devant (voir section Nginx).

---

## 5. Utilisation avec Git (GitHub en exemple)

### 5.1 Initialiser le dépôt

Dans le dossier du projet :

```bash
cd "C:\Users\cvilleroy-de-galhau\OneDrive - APSIDE ADVANCE\Documents\Code\Portefolio"

# Initialiser git si ce n’est pas déjà fait
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Portefolio Côme Villeroy de Galhau"
```

### 5.2 Créer un dépôt distant

1. Va sur GitHub (ou GitLab, etc.) et crée un **nouveau repository vide** (sans README, sans .gitignore si possible).  
   Par exemple : `come-villeroy-portfolio`.

2. Récupère l’URL du dépôt distant, par exemple :

   - `git@github.com:ton-compte/come-villeroy-portfolio.git` (SSH)
   - ou `https://github.com/ton-compte/come-villeroy-portfolio.git` (HTTPS)

3. Ajoute le remote et pousse :

```bash
# Exemple avec HTTPS
git remote add origin https://github.com/ton-compte/come-villeroy-portfolio.git

# Pousser la branche principale
git branch -M main
git push -u origin main
```

Après ça, ton code sera disponible sur GitHub.

---

## 6. Build & run avec Docker

### 6.1 Build de l’image

```bash
docker build -t come-portfolio .
```

### 6.2 Lancement du conteneur Next seul

```bash
docker run --name come-portfolio-web -p 3000:3000 come-portfolio
```

L’application sera accessible sur `http://localhost:3000`.

Arrêt/suppression :

```bash
docker stop come-portfolio-web
docker rm come-portfolio-web
```

---

## 7. Déploiement avec docker-compose (Next + Nginx)

Un fichier `docker-compose.yml` est fourni avec :

- un service **web** (Next.js buildé en production) exposé sur le port 3000 en interne,
- un service **nginx** qui fait reverse proxy vers `web:3000` et écoute sur le port 80.

### 7.1 Lancer les services

```bash
docker-compose up -d --build
```

Puis ouvre `http://localhost` (Nginx s’occupe du reverse proxy vers l’app Next).

### 7.2 Arrêter les services

```bash
docker-compose down
```

---

## 8. Configuration Nginx (exemple autonome, sans docker-compose)

Un fichier d’exemple `nginx.conf.example` est fourni.  
Scénario typique :

- Next.js écoute sur `http://localhost:3000` (ou sur `127.0.0.1:3000`).
- Nginx écoute sur `80` (et éventuellement `443` si tu ajoutes un certificat).

Exemple minimal (issu de `nginx.conf.example`) :

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com;

    # Compression gzip basique
    gzip on;
    gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Sécurité basique
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Sur ton serveur :

1. Place ce bloc dans `/etc/nginx/sites-available/ton-site` (ou équivalent).
2. Crée un lien symbolique dans `sites-enabled` (sur Debian/Ubuntu).
3. Teste la config : `sudo nginx -t`.
4. Recharge Nginx : `sudo systemctl reload nginx`.

---

## 9. Structure principale du projet

Important pour comprendre où modifier les données du CV :

- `src/app/layout.tsx` : layout global (header, footer, thème).
- `src/app/page.tsx` : page d’accueil.
- `src/app/experiences/page.tsx` : timeline + filtres des expériences.
- `src/app/projets/page.tsx` : projets & labs.
- `src/app/contact/page.tsx` : formulaire de contact.
- `src/app/api/contact/route.ts` : route API pour le formulaire (simple `console.log`).
- `src/data/profile.ts` : infos personnelles (nom, titre, contact, bio).
- `src/data/education.ts` : formation (timeline).
- `src/data/experiences.ts` : expériences (types, missions, tags, etc.).
- `src/data/projects.ts` : projets & labs.
- `src/data/skills.ts` : compétences par catégories.
- `src/data/hobbies.ts` : hobbies.
- `src/styles/globals.css` : styles globaux + utilitaires Tailwind custom.

Tu peux tout personnaliser en modifiant ces fichiers de données, sans backend externe.

---

## 10. Résumé des commandes utiles

- **Installer les dépendances** : `npm install`
- **Dev** : `npm run dev` (http://localhost:3000)
- **Build** : `npm run build`
- **Start prod** : `npm run start`
- **Docker (standalone)** :
  - `docker build -t come-portfolio .`
  - `docker run --name come-portfolio-web -p 3000:3000 come-portfolio`
- **docker-compose (Next + Nginx)** :
  - `docker-compose up -d --build`
  - `docker-compose down`
