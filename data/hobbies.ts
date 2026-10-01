export interface Hobby {
  id: string;
  label: string;
}

export const hobbies: Hobby[] = [
  { id: "horlogerie", label: "Horlogerie" },
  { id: "musique", label: "Musique et création digitale" },
  { id: "voyage", label: "Voyage" },
  { id: "combat", label: "Sports de combat" },
  { id: "echecs", label: "Échecs" },
  { id: "video", label: "Création visuelle et montage vidéo (association étudiante)" }
];
