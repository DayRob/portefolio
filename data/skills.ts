// Pas de niveaux (« Avancé », « Expert »…) tant qu'ils ne sont pas confirmés.

export interface SkillGroup {
  id: string;
  label: string;
  summary: string;
  items: string[];
  complementary?: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    id: "offensif",
    label: "Reconnaissance et tests de vulnérabilités",
    summary:
      "Cartographier la surface d'attaque en passif, puis valider par un scan actif.",
    items: [
      "recon-ng",
      "crt.sh",
      "Aquatone",
      "Microsoft Defender EASM",
      "OpenVAS",
      "Tests d'intrusion : outils et méthodes [À COMPLÉTER]"
    ]
  },
  {
    id: "infra",
    label: "Infrastructure et systèmes sécurisés",
    summary: "Concevoir, héberger et durcir des environnements.",
    items: [
      "Proxmox (homelab)",
      "SSH / TLS : audit et durcissement",
      "Administration Linux et Windows",
      "Réseau et segmentation [À CONFIRMER]"
    ]
  },
  {
    id: "veille",
    label: "Veille et référentiels",
    summary: "Rester à jour sur les menaces et les bonnes pratiques.",
    items: ["ANSSI", "CERT-FR", "ENISA", "NIST", "MITRE ATT&CK", "OWASP", "CIS"]
  },
  {
    id: "dev",
    label: "Développement et scripts",
    summary: "Automatiser et outiller.",
    items: ["PHP", "C", "Java", "Python [À CONFIRMER]", "Bash [À CONFIRMER]"]
  },
  {
    id: "grc",
    label: "Analyse de risque (compétence complémentaire)",
    summary: "Comprendre le risque métier derrière un constat technique.",
    items: ["EBIOS RM (ANSSI)", "Dossiers d'analyse de risque", "Homologation de SI"],
    complementary: true
  },
  {
    id: "langues",
    label: "Langues",
    summary: "",
    items: ["Anglais : C1, Cambridge [À CONFIRMER]", "Allemand : A2 [À CONFIRMER]"]
  }
];
