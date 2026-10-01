import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "../../data/profile";
import { ObfuscatedEmail } from "../../components/ui/ObfuscatedEmail";
import { PageHeader } from "../../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contacter Côme VILLEROY de GALHAU, ingénieur cybersécurité, par e-mail ou via LinkedIn."
};

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Contact" title="Me contacter">
        Je recherche un poste technique : pentest ou conception d'infrastructure
        sécurisée. Le plus simple est de m'écrire.
      </PageHeader>

      <section aria-labelledby="titre-coordonnees" className="card max-w-prose space-y-4">
        <h2 id="titre-coordonnees" className="text-xl">
          Coordonnées
        </h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold">E-mail</dt>
            <dd>
              <ObfuscatedEmail user={profile.email.user} domain={profile.email.domain} />
              <p className="mt-1 text-sm text-muted">
                L'adresse est affichée sous forme masquée pour limiter le spam. Le
                lien cliquable apparaît quand JavaScript est activé.
              </p>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">LinkedIn</dt>
            <dd>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                Profil LinkedIn de {profile.name}{" "}
                <span className="sr-only">(s'ouvre dans un nouvel onglet)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Téléphone</dt>
            <dd>Communiqué sur demande, après un premier échange par e-mail.</dd>
          </div>
          <div>
            <dt className="font-semibold">Localisation</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
      </section>

      <p className="max-w-prose text-sm text-muted">
        Les informations contenues dans votre e-mail servent uniquement à vous
        répondre. Voir la{" "}
        <Link href="/confidentialite/">politique de confidentialité</Link>.
      </p>
    </div>
  );
}
