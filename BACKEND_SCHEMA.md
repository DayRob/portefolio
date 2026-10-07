# BACKEND SCHEMA — Portfolio

> Le portfolio n'a pas de base de données : le contenu est stocké dans des **modules TypeScript typés** (`data/`) et la seule route serveur est `POST /api/contact`.

## 1. `data/profile.ts`

| Champ | Type |
|---|---|
| `name`, `title`, `location` | string |
| `email`, `phone`, `linkedin` | string |
| `shortBio`, `secondaryBio` | string |

## 2. `data/education.ts` — `EducationItem[]`

| Champ | Type |
|---|---|
| `id` | string |
| `period` | string (« 2024 – 2026 ») |
| `title`, `school`, `location`, `level` | string |

## 3. `data/experiences.ts` — `Experience[]`

| Champ | Type |
|---|---|
| `id`, `title`, `company`, `role`, `period`, `location` | string |
| `type` | `"alternance" \| "stage" \| "projet-perso"` |
| `highlights` | string[] (réalisations) |
| `tags` | string[] (filtres) |

## 4. `data/projects.ts` — `Project[]`

| Champ | Type |
|---|---|
| `id`, `title`, `description` | string |
| `type` | `"infra" \| "ctf" \| "creation"` |
| `details` | string[] |
| `technologies` | string[] |

## 5. `data/skills.ts` — `SkillCategory[]`

| Champ | Type |
|---|---|
| `id`, `label` | string |
| `skills` | `{ name: string; level?: "Débutant" \| "Intermédiaire" \| "Avancé" \| "Expert"; description?: string }[]` |

## 6. `data/hobbies.ts` — `Hobby[]`

| Champ | Type |
|---|---|
| `id`, `label`, `emoji` | string |
| `description` | string, optionnel |

## 7. API

### `POST /api/contact`

Requête :
```json
{ "name": "string", "email": "string", "message": "string" }
```
Réponse `200` :
```json
{ "ok": true }
```

Comportement actuel : journalisation côté serveur. Évolution prévue : validation, anti-spam, envoi d'e-mail via un service transactionnel (clé en variable d'environnement).

## 8. Données personnelles

`profile.ts` contient un numéro de téléphone et un e-mail publiés dans un dépôt public : n'exposer que ce qui doit l'être sur le site.
