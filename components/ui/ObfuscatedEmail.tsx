"use client";

import { useEffect, useState } from "react";

interface Props {
  user: string;
  domain: string;
}

// L'adresse n'est jamais présente d'un bloc dans le HTML servi.
// Sans JavaScript : texte « utilisateur [arobase] domaine [point] extension ».
// Avec JavaScript : lien mailto: cliquable.
export function ObfuscatedEmail({ user, domain }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (ready) {
    const address = `${user}@${domain}`;
    return <a href={`mailto:${address}`}>{address}</a>;
  }

  return (
    <span>
      {user} [arobase] {domain.split(".").join(" [point] ")}
    </span>
  );
}
