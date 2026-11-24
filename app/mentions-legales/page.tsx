import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "../../data/profile";
import { ObfuscatedEmail } from "../../components/ui/ObfuscatedEmail";
import { PageHeader } from "../../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du portfolio de Côme VILLEROY de GALHAU (LCEN, article 6)."
};

export default function LegalNoticePage() {
  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Informations légales" title="Mentions légales">
        Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la
        confiance dans l'économie numérique (LCEN).
      </PageHeader>

      <div className="prose-legal">
        <h2>Éditeur du site</h2>
        <p>
          {profile.name}, personne physique, à titre non professionnel et non
          commercial.
        </p>
        <ul>
          <li>
            Adresse : <span className="todo">[À COMPLÉTER : adresse postale]</span>
          </li>
          <li>
            Téléphone : <span className="todo">[À COMPLÉTER : numéro]</span>
          </li>
          <li>
            E-mail : <ObfuscatedEmail user={profile.email.user} domain={profile.email.domain} />
          </li>
        </ul>

        <h2>Directeur de la publication</h2>
        <p>{profile.name}.</p>

        <h2>Hébergement</h2>
        <p>
          Le site est auto-hébergé par son éditeur sur un serveur personnel
          (virtualisation Proxmox).
        </p>
        <ul>
          <li>
            Hébergeur : <span className="todo">[À COMPLÉTER : nom ou précision « l'éditeur lui-même »]</span>
          </li>
          <li>
            Adresse : <span className="todo">[À COMPLÉTER]</span>
          </li>
          <li>
            Téléphone : <span className="todo">[À COMPLÉTER]</span>
          </li>
        </ul>

        <h2>Service de protection et de diffusion</h2>
        <p>
          Le trafic du site transite par le service Cloudflare (filtrage,
          protection contre les attaques et contrôle d'accès). Éditeur du service :
          Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis{" "}
          <span className="todo">[À CONFIRMER : adresse à vérifier sur cloudflare.com]</span>.
          Les traitements de données associés sont décrits dans la{" "}
          <Link href="/confidentialite/">politique de confidentialité</Link>.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes et la mise en page de ce site sont la propriété de leur auteur,
          sauf mention contraire. Toute reproduction sans autorisation est interdite,
          hors courte citation avec mention de la source.
        </p>
        <p>
          Les polices IBM Plex sont distribuées sous licence SIL Open Font License
          1.1. Le site est construit avec Next.js, React et Tailwind CSS (licence MIT).
        </p>

        <h2>Responsabilité</h2>
        <p>
          L'éditeur s'efforce de publier des informations exactes et à jour, sans
          garantie d'exhaustivité. Il n'est pas responsable du contenu des sites
          externes vers lesquels pointent des liens.
        </p>
        <p>
          Aucun nom de client, document ou livrable professionnel n'est publié sur ce
          site. Les expériences sont décrites sans information confidentielle.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Ce site ne dépose aucun cookie de suivi et ne réalise aucune mesure
          d'audience. Pour le détail et l'exercice de vos droits, consultez la{" "}
          <Link href="/confidentialite/">politique de confidentialité</Link>.
        </p>

        <p className="text-sm text-muted">Dernière mise à jour : 1er octobre 2026.</p>
      </div>
    </div>
  );
}
