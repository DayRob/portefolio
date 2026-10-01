// Les CV PDF sont détectés au build : il suffit de déposer les fichiers dans
// public/cv/ sous ces noms exacts puis de relancer `npm run build`.
// Voir README.md, section « Ajouter ou mettre à jour les CV ».

export const cvFiles = [
  {
    lang: "fr",
    file: "cv-fr.pdf",
    label: "Télécharger le CV (PDF, français)"
  },
  {
    lang: "en",
    file: "cv-en.pdf",
    label: "Download the CV (PDF, English)"
  }
] as const;
