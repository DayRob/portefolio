export interface Hobby {
  id: string;
  label: string;
  description?: string;
}

export const hobbies: Hobby[] = [
  {
    id: "horlogerie",
    label: "Horlogerie",
    description: "Intérêt pour la précision mécanique, le design et la minutie des mouvements."
  },
  {
    id: "musique-creation",
    label: "Musique et création digitale",
    description: "Expérimentation sonore, création digitale et découverte de nouveaux univers visuels."
  },
  {
    id: "voyage",
    label: "Voyage",
    description: "Découverte de nouvelles cultures et modes de vie, avec une curiosité pour les usages numériques."
  },
  {
    id: "sports-combat",
    label: "Sports de combat",
    description: "Discipline, gestion du stress et respect de l’adversaire."
  },
  {
    id: "echecs",
    label: "Échecs",
    description: "Réflexion stratégique, anticipation et prise de décision sous contrainte."
  }
];
