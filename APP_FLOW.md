# APP FLOW — Portfolio

## 1. Plan du site

| Route | Contenu |
|---|---|
| `/` | Accueil : présentation, dernières expériences, compétences, centres d'intérêt |
| `/experiences` | Frise chronologique filtrable |
| `/projets` | Projets & Labs |
| `/contact` | Formulaire et coordonnées |
| `POST /api/contact` | Réception d'un message |

Navigation principale (en-tête) : **Accueil · Expériences · Projets & Labs · Contact**, avec l'onglet actif mis en évidence et la bascule de thème.

## 2. Parcours recruteur

```
Arrivée (lien CV / LinkedIn) ──► Accueil
   │ nom, titre « ingénieur cybersécurité », localisation, bio
   ├─► « Voir les expériences » ──► /experiences ──► filtre « alternance » ──► détails des missions
   ├─► « Projets & Labs » ──► /projets ──► infra Proxmox, CTF
   └─► « Me contacter » ──► /contact ──► formulaire ──► confirmation
```

## 3. Formulaire de contact

```
Saisie nom, e-mail, message ──► Envoyer
   état : idle ──► loading ──► success (formulaire réinitialisé, message de confirmation)
                         └──► error (message d'erreur, saisie conservée)
POST /api/contact ──► { ok: true }
```

## 4. Filtrage des expériences

```
/experiences ──► toutes les expériences (ordre antichronologique)
   ├─ filtre par type : alternance · stage · projet perso
   └─ filtre par tag : GRC, Pentest, SOC, EDR, Audit…
```

## 5. Thème

Bascule clair / sombre dans l'en-tête, mémorisée par `next-themes` ; sombre par défaut.
