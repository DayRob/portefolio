export interface Project {
  id: string;
  title: string;
  type: "infra" | "ctf" | "creation";
  description: string;
  details: string[];
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: "proxmox-lab",
    title: "Infrastructure virtualisée Proxmox pour labs de sécurité",
    type: "infra",
    description:
      "Conception et administration d’une infrastructure virtualisée pour héberger des services et laboratoires de cybersécurité.",
    details: [
      "Déploiement d’un cluster Proxmox pour héberger des machines dédiées aux tests d’intrusion et aux simulations d’attaques.",
      "Mise en place de réseaux segmentés pour isoler les environnements de lab et reproduire des architectures d’entreprise.",
      "Automatisation partielle de la création de VMs et de snapshots pour faciliter les exercices de break & fix."
    ],
    technologies: ["Proxmox", "Réseau", "Linux", "Virtualisation"]
  },
  {
    id: "ctf-platforms",
    title: "Pratique sur plateformes de cybersécurité (Root Me, TryHackMe)",
    type: "ctf",
    description:
      "Participation régulière à des défis CTF orientés exploitation de vulnérabilités, forensic et sécurité web.",
    details: [
      "Root Me : plus de 500 points sur des challenges variés (web, réseau, cryptographie, forensic).",
      "TryHackMe : parcours orientés offensive security pour renforcer les compétences en pentest.",
      "Documentation des scénarios et des techniques utilisées pour capitaliser les apprentissages."
    ],
    technologies: ["CTF", "Root Me", "TryHackMe", "Pentest"]
  },
  {
    id: "creative-media",
    title: "Création visuelle et montages vidéos pour une association étudiante",
    type: "creation",
    description:
      "Production de contenus visuels et vidéos pour la communication interne et externe d’une association étudiante.",
    details: [
      "Réalisation de visuels pour les réseaux sociaux et événements.",
      "Montage vidéo et ajout d’animations légères pour valoriser les projets de l’association.",
      "Collaboration avec des équipes non techniques pour comprendre les besoins et créer des supports adaptés."
    ],
    technologies: ["Montage vidéo", "Création graphique", "Communication"]
  }
];
