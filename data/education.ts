export interface EducationItem {
  id: string;
  period: string;
  title: string;
  school: string;
  location?: string;
}

export const education: EducationItem[] = [
  {
    id: "cpe-ics",
    period: "2024 – 2026 [À CONFIRMER]",
    title: "Diplôme d'ingénieur, Informatique et Cybersécurité (ICS)",
    school: "CPE Lyon",
    location: "Villeurbanne"
  },
  {
    id: "bts-sio",
    period: "2021 – 2023",
    title: "BTS SIO option SLAM (Solutions Logicielles et Applications Métiers)",
    school: "ICOF",
    location: "Lyon"
  },
  {
    id: "bac-sti2d",
    period: "2019 – 2021",
    title: "Baccalauréat STI2D option SIN (Systèmes d'Information et Numérique)",
    school: "Lycée Saint-Erembert"
  }
];
