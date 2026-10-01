// Source unique des informations personnelles affichées sur le site.
// Convention : tout ce qui n'est pas confirmé est écrit « [À CONFIRMER] » ou
// « [À COMPLÉTER] ». `npm run check:todo` liste ce qui reste à traiter.

export const profile = {
  name: "Côme VILLEROY de GALHAU",
  title: "Ingénieur cybersécurité",
  location: "Paris / Lyon, France",
  // Adresse volontairement découpée : elle n'apparaît jamais d'un bloc dans le HTML.
  email: { user: "cmvilleroy", domain: "gmail.com" },
  linkedin: "https://www.linkedin.com/in/c-villeroy",
  // Lien GitHub : renseigner l'URL quand elle est confirmée, puis rebuild.
  github: null as string | null,
  target:
    "Poste technique : test d'intrusion (pentest) ou conception d'infrastructure sécurisée.",
  lead:
    "Diplômé de CPE Lyon (Informatique & Cybersécurité), je recherche un poste technique : pentest ou conception d'infrastructure sécurisée.",
  secondary:
    "Mon expérience porte sur la reconnaissance passive, la cartographie de surface d'attaque et le scan de vulnérabilités. L'analyse de risque EBIOS RM est une compétence complémentaire : elle m'aide à comprendre le risque métier derrière un constat technique.",
  availability: "Disponibilité : [À CONFIRMER]"
} as const;

export const keyTools = [
  "recon-ng",
  "crt.sh",
  "Aquatone",
  "OpenVAS",
  "Defender EASM",
  "Proxmox",
  "SSH / TLS",
  "EBIOS RM"
] as const;
