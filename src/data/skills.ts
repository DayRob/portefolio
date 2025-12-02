export interface SkillCategory {
  id: string;
  label: string;
  skills: {
    name: string;
    level?: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
    description?: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "cyber",
    label: "Cybersécurité",
    skills: [
      {
        name: "Audit de sécurité, tests d’intrusion, analyse de vulnérabilités",
        level: "Avancé"
      },
      {
        name: "Surveillance et investigation de menaces (veille, forensic, threat intelligence)",
        level: "Intermédiaire"
      },
      {
        name: "Renforcement et conformité des systèmes (bonnes pratiques ANSSI / OWASP)",
        level: "Intermédiaire"
      }
    ]
  },
  {
    id: "systems",
    label: "Systèmes & Virtualisation",
    skills: [
      {
        name: "Administration Linux / Windows",
        level: "Intermédiaire"
      },
      {
        name: "Infrastructure virtualisée sous Proxmox pour environnements de test",
        level: "Intermédiaire"
      }
    ]
  },
  {
    id: "dev",
    label: "Développement",
    skills: [
      {
        name: "Développement web et applicatif (PHP, C, Java)",
        level: "Intermédiaire"
      }
    ]
  },
  {
    id: "lang",
    label: "Langues",
    skills: [
      {
        name: "Anglais – niveau C1 (Cambridge)"
      },
      {
        name: "Allemand – niveau A2"
      }
    ]
  },
  {
    id: "other",
    label: "Autres",
    skills: [
      {
        name: "Permis B depuis 2022"
      }
    ]
  }
];
