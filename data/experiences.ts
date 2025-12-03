export type ExperienceType = "alternance" | "stage" | "projet-perso";

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: ExperienceType;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: "apside-alt",
    title: "Alternance – Apside – Cybersécurité GRC et Pentest",
    company: "Apside",
    type: "alternance",
    role: "Alternant cybersécurité GRC et Pentest",
    period: "Septembre 2024 – Septembre 2026",
    location: "Paris",
    highlights: [
      "Déploiement d’infrastructure de sauvegarde sur le SI d’une entreprise.",
      "Pratique de VSA lors de tests d’intrusion (scan de vulnérabilités).",
      "Renforcement de la sécurité du SI dans une approche GRC/Pentest."
    ],
    tags: ["GRC", "Pentest", "Vulnérabilités", "Sauvegarde", "Cybersécurité"]
  },
  {
    id: "apside-stage",
    title: "Stage – Apside – Cybersécurité GRC et Pentest",
    company: "Apside",
    type: "stage",
    role: "Stagiaire cybersécurité GRC et Pentest",
    period: "Juin – Août 2024",
    location: "Paris",
    highlights: [
      "Création d’un outil de veille informationnelle automatisé pour une newsletter client.",
      "Création d’un outil de scrapping web sur le darknet pour suivre les mentions d’une entreprise sur les forums.",
      "Initiation au test d’intrusion avec pratique de VSA."
    ],
    tags: ["Veille", "Automatisation", "Scraping", "Darknet", "Pentest"]
  },
  {
    id: "villeroy-stage",
    title: "Stage – Villeroy & Boch – Cybersécurité et SOC",
    company: "Villeroy & Boch",
    type: "stage",
    role: "Stagiaire cybersécurité / SOC",
    period: "Juin – Août 2025",
    location: "Mettlach, Allemagne",
    highlights: [
      "Analyse et traitement d’emails suspects (phishing, spam ciblé) via les outils de sécurité de l’entreprise.",
      "Surveillance et investigation d’incidents sur endpoints et serveurs.",
      "Travail dans un environnement international."
    ],
    tags: ["SOC", "Phishing", "Investigation", "International", "Sécurité opérationnelle"]
  },
  {
    id: "harfanglab-stage",
    title: "Stage – HarfangLab – Cybersécurité et Q&A",
    company: "HarfangLab",
    type: "stage",
    role: "Stagiaire cybersécurité et Q&A",
    period: "Janvier – Février 2023",
    location: "Paris",
    highlights: [
      "Participation à une campagne Q&A sur un EDR certifié ANSSI.",
      "Rédaction, qualification et traitement de tickets.",
      "Découverte et manipulation d’un Endpoint Detection and Response.",
      "Gestion des relations clients, réponse à incidents."
    ],
    tags: ["EDR", "ANSSI", "Support", "Incidents", "Relation client"]
  },
  {
    id: "eternilab-stage",
    title: "Stage – Eternilab – Cybersécurité et audit",
    company: "Eternilab",
    type: "stage",
    role: "Stagiaire cybersécurité et audit",
    period: "Mai – Juin 2022",
    location: "Courbevoie",
    highlights: [
      "Déploiement de scripts pour renforcer la sécurité des protocoles SSH et TLS.",
      "Audit interne approfondi des protocoles SSH et TLS au sein de l’entreprise."
    ],
    tags: ["Audit", "SSH", "TLS", "Durcissement", "Scripts"]
  }
];
