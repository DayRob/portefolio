export interface Project {
  id: string;
  title: string;
  status: string;
  context: string;
  tools: string[];
  done: string[];
  learned: string[];
}

export const projects: Project[] = [
  {
    id: "homelab-proxmox",
    title: "Homelab Proxmox",
    status: "En service",
    context:
      "Laboratoire personnel d'infrastructure, utilisé pour expérimenter et pour héberger mes propres services, dont ce portfolio et le projet QG.",
    tools: ["Proxmox", "Linux"],
    done: [
      "Auto-hébergement de ce portfolio.",
      "Architecture : cluster ou nœud unique, réseaux segmentés [À CONFIRMER].",
      "Création de machines virtuelles et snapshots automatisés [À CONFIRMER]."
    ],
    learned: ["[À COMPLÉTER : ce que ce projet m'a appris]"]
  },
  {
    id: "culture-cyber",
    title: "Culture cyber : projet de veille",
    status: "[À CONFIRMER : statut]",
    context:
      "Veille continue pour suivre les menaces, les référentiels et les bonnes pratiques à partir de sources officielles.",
    tools: ["ANSSI", "CERT-FR", "ENISA", "NIST", "MITRE ATT&CK", "OWASP", "CIS"],
    done: ["[À COMPLÉTER : forme du projet (outil, notes, newsletter…)]"],
    learned: ["[À COMPLÉTER : ce que ce projet m'a appris]"]
  },
  {
    id: "qg-discord",
    title: "QG : espace Discord de recherche d'emploi",
    status: "En cours de construction",
    context:
      "Espace Discord qui m'aide dans ma recherche d'emploi grâce à plusieurs agents IA. Chaque agent est un bot distinct, qui utilise Claude via l'API, et l'ensemble est hébergé sur mon homelab.",
    tools: ["Discord", "API Claude", "Proxmox"],
    done: [
      "Un bot par agent, hébergé sur le homelab.",
      "Rôle précis de chaque agent [À COMPLÉTER]."
    ],
    learned: ["[À COMPLÉTER : ce que ce projet m'a appris]"]
  },
  {
    id: "ctf",
    title: "Plateformes d'entraînement : Root Me et TryHackMe",
    status: "Régulier",
    context:
      "Entraînement sur des défis d'exploitation de vulnérabilités, de sécurité web, de réseau, de cryptographie et de forensic.",
    tools: ["Root Me", "TryHackMe"],
    done: ["Score Root Me : [À CONFIRMER]."],
    learned: ["[À COMPLÉTER : ce que ces plateformes m'ont appris]"]
  }
];
