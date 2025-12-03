export const profile = {
  name: "Côme VILLEROY de GALHAU",
  title: "Étudiant ingénieur cybersécurité",
  location: "Paris / Lyon, France",
  email: "cmvilleroy@gmail.com",
  phone: "+33 (0)6 49 29 10 88",
  linkedin: "https://www.linkedin.com/in/c-villeroy",
  shortBio:
    "Étudiant en cybersécurité passionné par l’audit, les tests d’intrusion et la protection des systèmes d’information. J’aime concevoir des environnements de lab réalistes pour expérimenter, comprendre les menaces et proposer des réponses concrètes.",
  secondaryBio:
    "Je m’intéresse particulièrement aux approches mêlant GRC, tests d’intrusion et threat intelligence, avec une appétence pour les environnements internationaux et les infrastructures virtualisées."
} as const;

export type Profile = typeof profile;
