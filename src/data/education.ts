export interface EducationItem {
  id: string;
  period: string;
  title: string;
  school: string;
  location: string;
  level: string;
}

export const education: EducationItem[] = [
  {
    id: "ics-cpe",
    period: "2024 – 2026",
    title: "Ecole d’ingénieur – formation ICS (Informatique et Cybersécurité)",
    school: "CPE Lyon",
    location: "Villeurbanne 69100",
    level: "Cycle ingénieur – cybersécurité"
  },
  {
    id: "bts-sio",
    period: "2021 – 2023",
    title: "BTS SIO option SLAM (Solutions Logicielles et Applications Métiers)",
    school: "ICOF",
    location: "Lyon 69005",
    level: "Bac +2 – développement et systèmes"
  },
  {
    id: "bac-sti2d",
    period: "2019 – 2021",
    title: "BAC STI2D option SIN (Systèmes d’Information et Numérique)",
    school: "Lycée St Erembert",
    location: "St Germain en Laye 78100",
    level: "Baccalauréat technologique"
  }
];
