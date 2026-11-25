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
      "Architecture : nœud Proxmox unique, services isolés en conteneurs LXC ; segmentation réseau à mettre en place.",
      "Création de machines virtuelles et de conteneurs LXC, avec snapshots manuels avant chaque modification."
    ],
    learned: [
      "Tenir un service en production m'a appris l'exploitation : sauvegardes, reverse proxy, certificats TLS et cloisonnement des services."
    ]
  },
  {
    id: "culture-cyber",
    title: "Culture cyber : projet de veille",
    status: "En cours de construction",
    context:
      "Veille continue pour suivre les menaces, les référentiels et les bonnes pratiques à partir de sources officielles.",
    tools: ["ANSSI", "CERT-FR", "ENISA", "NIST", "MITRE ATT&CK", "OWASP", "CIS"],
    done: [
      "Veille automatisée hébergée sur mon homelab, alimentée par les bulletins du CERT-FR, de l'ANSSI et de l'ENISA.",
      "Suivi des référentiels NIST, MITRE ATT&CK, OWASP et CIS."
    ],
    learned: [
      "Distinguer le bruit de l'information utile, et remonter d'une vulnérabilité publiée à son impact sur une infrastructure donnée."
    ]
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
      "Un agent par étape du processus de candidature : sourcing, analyse d'offre, rédaction et suivi."
    ],
    learned: [
      "Concevoir et orchestrer des agents spécialisés : un gain de temps réel sur les tâches répétitives, et une charge mentale allégée sur le suivi des candidatures."
    ]
  },
  {
    id: "ctf",
    title: "Plateformes d'entraînement : Root Me et TryHackMe",
    status: "Régulier",
    context:
      "Entraînement sur des défis d'exploitation de vulnérabilités, de sécurité web, de réseau, de cryptographie et de forensic.",
    tools: ["Root Me", "TryHackMe"],
    done: ["Score Root Me : plus de 500 points."],
    learned: [
      "Une méthode : énumérer avant d'exploiter, documenter chaque étape, et reconnaître une classe de vulnérabilité plutôt qu'un exploit isolé."
    ]
  }
];
