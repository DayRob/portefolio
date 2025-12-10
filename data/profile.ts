export const profile = {
  name: "Côme VILLEROY de GALHAU",
  title: "Étudiant ingénieur cybersécurité",
  location: "Paris / Lyon, France",
  email: "cmvilleroy@gmail.com",
  phone: "+33 (0)6 49 29 10 88",
  linkedin: "https://www.linkedin.com/in/c-villeroy",
  shortBio:
    "Passionné par la cybersécurité et les technologies de l'information.",
  secondaryBio:
    "Étudiant ingénieur spécialisé dans l'audit, les tests d'intrusion et la protection des systèmes."
} as const;

export type Profile = typeof profile;
