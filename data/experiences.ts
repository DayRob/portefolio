// Ordre d'affichage voulu : CGI d'abord, puis Villeroy & Boch, puis les stages plus anciens.

export interface Experience {
  id: string;
  company: string;
  note?: string;
  role: string;
  kind: "Alternance" | "Stage";
  period: string;
  location: string;
  highlights: string[];
  tools: string[];
}

export const experiences: Experience[] = [
  {
    id: "cgi-alternance",
    company: "CGI (ex-Apside)",
    note: "Apside a été rachetée par CGI pendant l'alternance.",
    role: "Alternant consultant cybersécurité",
    kind: "Alternance",
    period: "Septembre 2024 – Septembre 2026",
    location: "Paris",
    highlights: [
      "Reconnaissance passive et cartographie de la surface d'attaque (recon-ng, crt.sh, Microsoft Defender EASM, Aquatone), suivies d'un scan actif de vulnérabilités avec OpenVAS.",
      "Analyse de risque selon la méthode EBIOS RM de l'ANSSI et rédaction de dossiers d'analyse de risque.",
      "Préparation d'ateliers client et accompagnement à l'homologation de systèmes d'information.",
      "Mise en place d'une chaîne de sauvegarde hebdomadaire des serveurs d'un client : export des sauvegardes depuis un bastion vers un support dédié, purge par script, puis restauration de la dernière sauvegarde lors d'un scénario de crise."
    ],
    tools: ["recon-ng", "crt.sh", "Aquatone", "Defender EASM", "OpenVAS", "EBIOS RM"]
  },
  {
    id: "cgi-stage",
    company: "Apside (devenue CGI)",
    role: "Stagiaire cybersécurité",
    kind: "Stage",
    period: "Juin – Août 2024",
    location: "Paris",
    highlights: [
      "Outil de veille informationnelle automatisé pour une newsletter client.",
      "Outil de collecte web pour suivre les mentions d'une entreprise sur des forums du darknet.",
      "Initiation au test d'intrusion."
    ],
    tools: ["Veille", "Automatisation"]
  },
  {
    id: "villeroy-boch",
    company: "Villeroy & Boch",
    role: "Stagiaire cybersécurité / SOC",
    kind: "Stage",
    period: "Juin – Août 2025",
    location: "Mettlach, Allemagne",
    highlights: [
      "Analyse et traitement d'e-mails suspects (hameçonnage, spam ciblé) avec les outils de sécurité de l'entreprise.",
      "Surveillance et investigation d'incidents sur des postes de travail et des serveurs.",
      "Travail dans un environnement international."
    ],
    tools: ["SOC", "Phishing", "Investigation d'incidents"]
  },
  {
    id: "harfanglab",
    company: "HarfangLab",
    role: "Stagiaire cybersécurité et Q&A",
    kind: "Stage",
    period: "Janvier – Février 2023",
    location: "Paris",
    highlights: [
      "Participation à une campagne de tests qualité sur un EDR certifié par l'ANSSI.",
      "Rédaction, qualification et traitement de tickets.",
      "Prise en main d'un EDR (Endpoint Detection and Response) et réponse à incidents."
    ],
    tools: ["EDR", "Tickets", "Réponse à incidents"]
  },
  {
    id: "eternilab",
    company: "Eternilab",
    role: "Stagiaire cybersécurité et audit",
    kind: "Stage",
    period: "Mai – Juin 2022",
    location: "Courbevoie",
    highlights: [
      "Audit interne des protocoles SSH et TLS de l'entreprise.",
      "Déploiement de scripts pour renforcer la configuration SSH et TLS."
    ],
    tools: ["SSH", "TLS", "Durcissement", "Scripts"]
  }
];
