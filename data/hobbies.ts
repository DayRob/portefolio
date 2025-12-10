export interface Hobby {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

export const hobbies: Hobby[] = [
  {
    id: "horlogerie",
    label: "Horlogerie",
    emoji: "⌚",
    description: "Intérêt pour la précision mécanique, le design et la minutie des mouvements."
  },
  {
    id: "musique-creation",
    label: "Musique et création digitale",
    emoji: "🎵",
    description: "Expérimentation sonore, création digitale et découverte de nouveaux univers visuels."
  },
  {
    id: "voyage",
    label: "Voyage",
    emoji: "✈️",
    description: "Découverte de nouvelles cultures et modes de vie, avec une curiosité pour les usages numériques."
  },
  {
    id: "sports-combat",
    label: "Sports de combat",
    emoji: "🥊",
    description: "Discipline, gestion du stress et respect de l’adversaire."
  },
  {
    id: "echecs",
    label: "Échecs",
    emoji: "♟️",
    description: "Réflexion stratégique, anticipation et prise de décision sous contrainte."
  }
];
