# DESIGN BRIEF — Portfolio

## 1. Personnalité

**Technique, moderne, maîtrisé** : l'univers visuel évoque la cybersécurité (fond sombre, accent cyan lumineux) sans tomber dans le cliché « hacker ».

## 2. Principes

1. **Le profil d'abord** : nom et titre en très grand dans un hero qui occupe presque tout l'écran.
2. **Lisibilité** des parcours : frise chronologique, cartes, badges de compétences.
3. **Mouvement discret** : particules et formes géométriques flottantes, apparitions en glissé ; jamais au détriment du contenu.
4. **Cohérence** : un accent principal (cyan), des accents secondaires pour différencier catégories et tags.

## 3. Couleurs (Tailwind)

| Jeton | Valeur | Usage |
|---|---|---|
| `brand` | `#22d3ee` (dark `#0891b2`, light `#67e8f9`) | Accent principal, liens, survols |
| `slate-950` → `slate-50` | `#020617` → `#f8fafc` | Fonds et textes |
| `accent.purple` | `#a855f7` | Dégradés, décor |
| `accent.pink` | `#ec4899` | Décor |
| `accent.blue` | `#3b82f6` | Décor |
| `accent.emerald` | `#10b981` | Décor, succès |
| `accent.orange` | `#f97316` | Mise en avant |

Fond : dégradé `slate-950 → slate-900 → slate-950`, fixe.

## 4. Typographie

- **Inter** (300 à 900).
- Titre hero : 4xl → 7xl, dégradé de texte clair ; titre de rôle en dégradé cyan.
- Libellés de section : petites majuscules espacées en couleur `brand`.

## 5. Composants

- **`card-glass`** : carte « verre » (fond translucide, flou, bordure fine), survol avec bordure cyan, légère élévation et halo.
- **`SkillBadge`** : pastille de compétence avec niveau.
- **`Timeline` / `ExperienceCard`** : frise des expériences, tags et puces de réalisations.
- **`TagFilter`** : filtres par tag.
- **En-tête** : logo, navigation avec indicateur d'onglet actif, bascule de thème.

## 6. Animations

`float` (6 s), `glow` (3 s), `slideInUp` et `slideInLeft` (0,8 s), `gradientShift`. À désactiver avec `prefers-reduced-motion`.

## 7. Responsive

Conteneur `max-w-7xl`, marges `px-4 / sm:px-6 / lg:px-8`, grilles à une colonne sur mobile, deux sur grand écran.
